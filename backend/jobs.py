"""Live job postings from public company career boards (Greenhouse, Ashby, Lever),
plus an optional Adzuna search that only switches on when ADZUNA_APP_ID/ADZUNA_APP_KEY exist.

Postings are normalised, filtered to the last 14 days, and cached in MongoDB (`job_cache`).
The cache refreshes about once an hour; if a source is down, the last saved postings are kept.
"""
import asyncio
import logging
import os
import re
from datetime import datetime, timezone, timedelta
from typing import Optional

import httpx

log = logging.getLogger("jobs")

FRESH_DAYS = 14
REFRESH_SECONDS = 60 * 60
PER_COMPANY = 150
AGG_REFRESH_SECONDS = 6 * 60 * 60  # Remotive asks for a few calls a day at most
BOARDS = ["greenhouse", "ashby", "lever"]

# (name, board, token, domain)
COMPANIES = [
    ("Stripe", "greenhouse", "stripe", "stripe.com"),
    ("Figma", "greenhouse", "figma", "figma.com"),
    ("Cloudflare", "greenhouse", "cloudflare", "cloudflare.com"),
    ("GitLab", "greenhouse", "gitlab", "gitlab.com"),
    ("Airbnb", "greenhouse", "airbnb", "airbnb.com"),
    ("Databricks", "greenhouse", "databricks", "databricks.com"),
    ("Coinbase", "greenhouse", "coinbase", "coinbase.com"),
    ("Reddit", "greenhouse", "reddit", "reddit.com"),
    ("Duolingo", "greenhouse", "duolingo", "duolingo.com"),
    ("Twilio", "greenhouse", "twilio", "twilio.com"),
    ("MongoDB", "greenhouse", "mongodb", "mongodb.com"),
    ("Elastic", "greenhouse", "elastic", "elastic.co"),
    ("Datadog", "greenhouse", "datadog", "datadoghq.com"),
    ("Grafana Labs", "greenhouse", "grafanalabs", "grafana.com"),
    ("Samsara", "greenhouse", "samsara", "samsara.com"),
    ("Groww", "greenhouse", "groww", "groww.in"),
    ("Pinterest", "greenhouse", "pinterest", "pinterest.com"),
    ("Lyft", "greenhouse", "lyft", "lyft.com"),
    ("Asana", "greenhouse", "asana", "asana.com"),
    ("Okta", "greenhouse", "okta", "okta.com"),
    ("Instacart", "greenhouse", "instacart", "instacart.com"),
    ("Roblox", "greenhouse", "roblox", "roblox.com"),
    ("Toast", "greenhouse", "toast", "toasttab.com"),
    ("Discord", "greenhouse", "discord", "discord.com"),
    ("Rubrik", "greenhouse", "rubrik", "rubrik.com"),
    ("Zscaler", "greenhouse", "zscaler", "zscaler.com"),
    ("Druva", "greenhouse", "druva", "druva.com"),
    ("Notion", "ashby", "notion", "notion.so"),
    ("Linear", "ashby", "linear", "linear.app"),
    ("Ramp", "ashby", "ramp", "ramp.com"),
    ("OpenAI", "ashby", "openai", "openai.com"),
    ("Supabase", "ashby", "supabase", "supabase.com"),
    ("Plaid", "ashby", "plaid", "plaid.com"),
    ("Sarvam AI", "ashby", "sarvam", "sarvam.ai"),
    ("Vanta", "ashby", "vanta", "vanta.com"),
    ("Cursor", "ashby", "cursor", "cursor.com"),
    ("Perplexity", "ashby", "perplexity", "perplexity.ai"),
    ("ElevenLabs", "ashby", "elevenlabs", "elevenlabs.io"),
    ("CRED", "lever", "cred", "cred.club"),
    ("Meesho", "lever", "meesho", "meesho.com"),
    ("Zeta", "lever", "zeta", "zeta.tech"),
    ("Spotify", "lever", "spotify", "spotify.com"),
    ("Palantir", "lever", "palantir", "palantir.com"),
]

INDIA = r"india|bengaluru|bangalore|mumbai|pune|hyderabad|delhi|gurgaon|gurugram|noida|chennai|kolkata|ahmedabad"
EUROPE = (r"united kingdom|\buk\b|england|london|manchester|edinburgh|dublin|ireland|berlin|munich|germany|amsterdam|"
          r"netherlands|paris|france|madrid|barcelona|spain|lisbon|portugal|warsaw|poland|stockholm|sweden|"
          r"copenhagen|denmark|oslo|norway|helsinki|finland|zurich|switzerland|vienna|austria|milan|rome|italy|"
          r"brussels|belgium|prague|czech|europe|emea|tallinn|bucharest|romania|athens|greece")
US = (r"united states|\busa\b|\bus\b|u\.s\.|new york|san francisco|bay area|seattle|austin|boston|chicago|denver|"
      r"los angeles|atlanta|miami|washington|portland|san jose|palo alto|mountain view|menlo park|"
      r"california|texas|florida|illinois|massachusetts|colorado|georgia|oregon|virginia|utah|arizona|"
      r"new jersey|pennsylvania|minnesota|michigan|ohio|north carolina|tennessee|missouri|maryland|"
      r",\s*(ca|ny|wa|tx|ma|il|co|ga|fl|or|nc|va|ut|az|nj|pa|mn|mi|oh|dc)\b|north america")
REMOTE = r"remote|anywhere|distributed|work from home"


def classify(location: str, remote_flag: bool = False) -> list:
    loc = (location or "").lower()
    if "canada" in loc or "toronto" in loc or "vancouver" in loc:
        loc = loc.replace(", ca", "")
    regions = []
    if remote_flag or re.search(REMOTE, loc):
        regions.append("remote")
    if re.search(INDIA, loc):
        regions.append("india")
    if re.search(EUROPE, loc):
        regions.append("europe")
    if re.search(US, loc) and "india" not in regions:
        regions.append("us")
    return regions


def _parse(ts) -> Optional[datetime]:
    if ts is None:
        return None
    try:
        if isinstance(ts, (int, float)):
            return datetime.fromtimestamp(ts / 1000, tz=timezone.utc)
        return datetime.fromisoformat(str(ts).replace("Z", "+00:00")).astimezone(timezone.utc)
    except (ValueError, OSError):
        return None


def _title(t: str) -> str:
    t = (t or "").strip()
    return t.title() if t and t == t.lower() else t


def _parts(loc: str) -> list:
    loc = (loc or "").replace("•", ";").replace("|", ";")
    return [p.strip() for p in loc.split(";") if p.strip()]


def _short_loc(loc: str, prefer: Optional[str] = None) -> str:
    parts = _parts(loc)
    if not parts:
        return "Location not listed"
    first = parts[0]
    if prefer:
        first = next((p for p in parts if prefer in classify(p)), first)
    return first + (f" +{len(parts) - 1}" if len(parts) > 1 else "")


def _job(company, domain, source, jid, title, location, posted, url, remote=False):
    prefix = "Remote · " if remote and not re.search(REMOTE, (location or "").lower()) else ""
    return {
        "id": f"{source}:{jid}",
        "company": company,
        "domain": domain,
        "title": _title(title),
        "location": prefix + _short_loc(location),
        "location_full": "; ".join(_parts(location)),
        "remote_prefix": prefix,
        "regions": classify(location, remote),
        "posted_at": posted.isoformat() if posted else None,
        "url": url,
        "source": source,
        "logo": None,
    }


async def _greenhouse(c, name, token, domain):
    r = await c.get(f"https://boards-api.greenhouse.io/v1/boards/{token}/jobs")
    r.raise_for_status()
    out = []
    for j in r.json().get("jobs", []):
        posted = _parse(j.get("first_published") or j.get("updated_at"))
        loc = (j.get("location") or {}).get("name", "")
        out.append(_job(name, domain, "greenhouse", j.get("id"), j.get("title"), loc, posted, j.get("absolute_url")))
    return out


async def _ashby(c, name, token, domain):
    r = await c.get(f"https://api.ashbyhq.com/posting-api/job-board/{token}")
    r.raise_for_status()
    out = []
    for j in r.json().get("jobs", []):
        if j.get("isListed") is False:
            continue
        locs = [j.get("location") or ""] + [s.get("location", "") for s in j.get("secondaryLocations") or []]
        out.append(_job(name, domain, "ashby", j.get("id"), j.get("title"), "; ".join(x for x in locs if x),
                        _parse(j.get("publishedAt")), j.get("jobUrl"), bool(j.get("isRemote"))))
    return out


async def _lever(c, name, token, domain):
    r = await c.get(f"https://api.lever.co/v0/postings/{token}?mode=json")
    r.raise_for_status()
    out = []
    for j in r.json():
        cat = j.get("categories") or {}
        locs = cat.get("allLocations") or [cat.get("location") or ""]
        loc = "; ".join(_title(x) for x in locs if x)
        if j.get("country") == "IN" and "india" not in loc.lower():
            loc = f"{loc}, India" if loc else "India"
        out.append(_job(name, domain, "lever", j.get("id"), j.get("text"), loc, _parse(j.get("createdAt")),
                        j.get("hostedUrl"), j.get("workplaceType") == "remote"))
    return out


ADZUNA_COUNTRIES = {"india": ["in"], "us": ["us"], "europe": ["gb", "de", "nl", "fr"], "remote": ["gb", "us"]}


async def _adzuna(c):
    app_id, app_key = os.environ.get("ADZUNA_APP_ID"), os.environ.get("ADZUNA_APP_KEY")
    if not (app_id and app_key):
        return []
    out = []
    seen = set()
    for region, countries in ADZUNA_COUNTRIES.items():
        for cc in countries:
            if cc in seen and region != "remote":
                continue
            seen.add(cc)
            params = {"app_id": app_id, "app_key": app_key, "results_per_page": 30,
                      "max_days_old": FRESH_DAYS, "sort_by": "date", "content-type": "application/json"}
            if region == "remote":
                params["what"] = "remote"
            try:
                r = await c.get(f"https://api.adzuna.com/v1/api/jobs/{cc}/search/1", params=params)
                r.raise_for_status()
            except httpx.HTTPError as e:
                log.warning("adzuna %s failed: %s", cc, type(e).__name__)
                continue
            for j in r.json().get("results", []):
                co = (j.get("company") or {}).get("display_name") or ""
                if not co:
                    continue
                loc = (j.get("location") or {}).get("display_name", "")
                job = _job(co, None, "adzuna", j.get("id"), j.get("title"), loc, _parse(j.get("created")),
                           j.get("redirect_url"), region == "remote")
                if region not in job["regions"]:
                    job["regions"].append(region)
                out.append(job)
    return out


FETCHERS = {"greenhouse": _greenhouse, "ashby": _ashby, "lever": _lever}


# ---------- free job aggregators (widen cities and roles) ----------
def _utc(ts):
    return ts + "+00:00" if isinstance(ts, str) and ts and "+" not in ts and not ts.endswith("Z") else ts


async def _remotive(c):
    """Remote roles worldwide. Free API; jobs must link back to Remotive and be credited."""
    r = await c.get("https://remotive.com/api/remote-jobs", params={"limit": 300})
    r.raise_for_status()
    out = []
    for j in r.json().get("jobs", []):
        loc = j.get("candidate_required_location") or "Worldwide"
        job = _job(j.get("company_name") or "", None, "remotive", j.get("id"), j.get("title"),
                   f"Remote · {loc}", _parse(_utc(j.get("publication_date"))),
                   j.get("url"), True)
        job["location"] = f"Remote · {_short_loc(loc)}"
        job["remote_prefix"] = "Remote · "
        job["location_full"] = loc
        for reg in classify(loc):
            if reg not in job["regions"]:
                job["regions"].append(reg)
        if re.search(r"worldwide|anywhere|global", loc.lower()):
            job["regions"] = list(dict.fromkeys(job["regions"] + ["us", "europe", "india"]))
        job["logo"] = j.get("company_logo")
        out.append(job)
    return out


async def _arbeitnow(c):
    """Mostly Europe (Germany-heavy). Free API, no key."""
    out = []
    for page in (1, 2, 3):
        r = await c.get("https://www.arbeitnow.com/api/job-board-api", params={"page": page})
        r.raise_for_status()
        for j in r.json().get("data", []):
            out.append(_job(j.get("company_name") or "", None, "arbeitnow", j.get("slug"), j.get("title"),
                            j.get("location") or "", _parse(j.get("created_at") * 1000 if isinstance(j.get("created_at"), (int, float)) else j.get("created_at")),
                            j.get("url"), bool(j.get("remote"))))
    for job in out:
        if "europe" not in job["regions"]:
            job["regions"].append("europe")
    return out


AGGREGATORS = {"remotive": _remotive, "arbeitnow": _arbeitnow}


class JobFeed:
    def __init__(self, db):
        self.col = db.job_cache
        self.meta = db.job_cache_meta
        self._lock = asyncio.Lock()

    @staticmethod
    def adzuna_on() -> bool:
        return bool(os.environ.get("ADZUNA_APP_ID") and os.environ.get("ADZUNA_APP_KEY"))

    async def refresh(self, force=False):
        async with self._lock:
            meta = await self.meta.find_one({"_id": "feed"}, {"_id": 0})
            now = datetime.now(timezone.utc)
            if not force and meta and (now - _parse(meta["refreshed_at"])).total_seconds() < REFRESH_SECONDS:
                return
            cutoff = now - timedelta(days=FRESH_DAYS)
            async with httpx.AsyncClient(timeout=12, headers={"User-Agent": "ApplyScout/1.0"}) as c:
                async def one(name, board, token, domain):
                    try:
                        return name, await FETCHERS[board](c, name, token, domain)
                    except Exception as e:  # noqa: BLE001 - one bad board must not break the feed
                        log.warning("board %s failed: %s", name, type(e).__name__)
                        return name, None

                results = await asyncio.gather(*(one(*co) for co in COMPANIES))
                adz = await _adzuna(c) if self.adzuna_on() else None
                agg = {}
                agg_meta = await self.meta.find_one({"_id": "aggregators"}) or {}
                for name, fn in AGGREGATORS.items():
                    last = agg_meta.get(name)
                    if not force and last and (now - _parse(last)).total_seconds() < AGG_REFRESH_SECONDS:
                        continue
                    try:
                        agg[name] = await fn(c)
                    except Exception as e:  # noqa: BLE001
                        log.warning("aggregator %s failed: %s", name, type(e).__name__)

            ok = 0
            for name, jobs in results:
                if jobs is None:
                    continue  # source down: keep last saved postings for this company
                ok += 1
                fresh = [j for j in jobs if j["posted_at"] and _parse(j["posted_at"]) >= cutoff]
                fresh.sort(key=lambda j: j["posted_at"], reverse=True)
                await self.col.delete_many({"company": name, "source": {"$in": BOARDS}})
                if fresh:
                    await self.col.insert_many([dict(j, _id=k) for k, j in {x["id"]: x for x in fresh[:PER_COMPANY]}.items()])
            if adz is not None:
                await self.col.delete_many({"source": "adzuna"})
                fresh = {j["id"]: j for j in adz if j["posted_at"] and _parse(j["posted_at"]) >= cutoff}
                if fresh:
                    await self.col.insert_many([dict(j, _id=k) for k, j in fresh.items()])
            for name, jobs in agg.items():
                fresh = {j["id"]: j for j in jobs if j["company"] and j["posted_at"] and _parse(j["posted_at"]) >= cutoff}
                await self.col.delete_many({"source": name})
                if fresh:
                    await self.col.insert_many([dict(j, _id=k) for k, j in fresh.items()])
                await self.meta.update_one({"_id": "aggregators"}, {"$set": {name: now.isoformat()}}, upsert=True)
                log.info("aggregator %s: %d fresh postings", name, len(fresh))
            # drop anything that aged past the freshness window
            await self.col.delete_many({"posted_at": {"$lt": cutoff.isoformat()}})
            await self.meta.update_one({"_id": "feed"}, {"$set": {"refreshed_at": now.isoformat(), "boards_ok": ok}},
                                       upsert=True)
            log.info("job feed refreshed: %d/%d boards ok", ok, len(COMPANIES))

    async def refreshed_at(self):
        meta = await self.meta.find_one({"_id": "feed"}, {"_id": 0})
        return meta.get("refreshed_at") if meta else None

    async def pick(self, region: str, limit: int, query: str = ""):
        q = {} if region == "all" else {"regions": region}
        if not self.adzuna_on():
            q["source"] = {"$ne": "adzuna"}
        words = [w for w in re.split(r"\s+", query.strip())[:6] if w]
        if words:
            q["$and"] = [{"title": {"$regex": re.escape(w), "$options": "i"}} for w in words]
        docs = await self.col.find(q, {"_id": 0}).sort("posted_at", -1).to_list(3000)
        # well-known company boards first, then the wider aggregators; one posting per company
        docs.sort(key=lambda d: 0 if d.get("source") in BOARDS else 1)
        seen, picked = set(), []
        for d in docs:
            if d["company"] in seen:
                continue
            seen.add(d["company"])
            if region != "all" and d.get("location_full"):
                d["location"] = d.get("remote_prefix", "") + _short_loc(d["location_full"], region)
            d.pop("location_full", None)
            d.pop("remote_prefix", None)
            picked.append(d)
            if len(picked) >= limit:
                break
        return picked

    async def stats(self, days: int = 7):
        """Real counts for the proof strip: postings and distinct companies seen in the last `days`."""
        cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
        q = {"posted_at": {"$gte": cutoff}}
        if not self.adzuna_on():
            q["source"] = {"$ne": "adzuna"}
        roles = await self.col.count_documents(q)
        companies = len(await self.col.distinct("company", q))
        return {"roles": roles, "companies": companies, "days": days}

    async def companies(self):
        counts = {r["_id"]: r["n"] for r in await self.col.aggregate(
            [{"$match": {"source": {"$in": BOARDS}}}, {"$group": {"_id": "$company", "n": {"$sum": 1}}}]
        ).to_list(200)}
        return [{"name": n, "domain": d, "open_roles": counts.get(n, 0)} for n, _, _, d in COMPANIES]


# ---------- company logos (fetched from each company's own site, cached) ----------
ALLOWED_DOMAINS = {d for _, _, _, d in COMPANIES}
ICON_RE = re.compile(r"<link\b[^>]*>", re.I)
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/126 Safari/537.36"}


def _icon_candidates(html: str, base: str) -> list:
    cands = []
    for tag in ICON_RE.findall(html or ""):
        rel = re.search(r'rel=["\']([^"\']+)["\']', tag, re.I)
        href = re.search(r'href=["\']([^"\']+)["\']', tag, re.I)
        if not rel or not href or "icon" not in rel.group(1).lower() or "mask" in rel.group(1).lower():
            continue
        sizes = re.search(r'sizes=["\'](\d+)x', tag, re.I)
        score = int(sizes.group(1)) if sizes else 32
        if "apple-touch" in rel.group(1).lower():
            score += 400
        if href.group(1).endswith(".svg"):
            score += 300
        cands.append((score, str(httpx.URL(base).join(href.group(1)))))
    cands.sort(reverse=True)
    return [u for _, u in cands]


async def fetch_logo(db, domain: str):
    if domain not in ALLOWED_DOMAINS:
        return None
    hit = await db.logo_cache.find_one({"_id": domain})
    if hit and (datetime.now(timezone.utc) - _parse(hit["fetched_at"])).days < 7:
        return hit["content_type"], hit["data"]
    found = None
    async with httpx.AsyncClient(timeout=8, follow_redirects=True, headers=UA) as c:
        urls = []
        try:
            r = await c.get(f"https://{domain}/")
            if r.status_code == 200:
                urls = _icon_candidates(r.text[:300000], str(r.url))
        except httpx.HTTPError:
            pass
        # keep the fallbacks reachable even when the page lists many (broken) icons
        urls = urls[:4] + [f"https://{domain}/apple-touch-icon.png",
                           f"https://www.google.com/s2/favicons?domain={domain}&sz=128"]
        for u in urls:
            try:
                r = await c.get(u)
            except httpx.HTTPError:
                continue
            ctype = r.headers.get("content-type", "").split(";")[0]
            if r.status_code == 200 and ctype.startswith("image/") and 200 < len(r.content) < 400000:
                found = (ctype, r.content)
                break
    if found:
        await db.logo_cache.update_one({"_id": domain}, {"$set": {
            "content_type": found[0], "data": found[1],
            "fetched_at": datetime.now(timezone.utc).isoformat()}}, upsert=True)
    elif hit:
        return hit["content_type"], hit["data"]
    return found
