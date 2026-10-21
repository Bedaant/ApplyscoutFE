# ApplyScout v2 regression: live jobs feed, companies, logo proxy, signups, preview
import os
import uuid
from datetime import datetime, timezone, timedelta

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"
REGIONS = ["all", "india", "remote", "us", "europe"]


@pytest.fixture(scope="module")
def s():
    return requests.Session()


# ---- /api/jobs/live ----
@pytest.mark.parametrize("region", REGIONS)
def test_live_jobs_shape(s, region):
    r = s.get(f"{API}/jobs/live", params={"region": region, "limit": 5}, timeout=60)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["region"] == region
    assert d["fresh_days"] == 14
    assert d["adzuna"] is False
    assert d["refreshed_at"]
    jobs = d["jobs"]
    assert isinstance(jobs, list) and 0 < len(jobs) <= 5, f"{region}: {len(jobs)} jobs"
    cutoff = datetime.now(timezone.utc) - timedelta(days=14, hours=1)
    companies = [j["company"] for j in jobs]
    assert len(companies) == len(set(companies)), "duplicate company in deck"
    for j in jobs:
        for k in ["company", "domain", "title", "location", "regions", "posted_at", "url", "source"]:
            assert k in j, f"missing {k}"
        assert "_id" not in j and "location_full" not in j
        assert j["source"] in ("greenhouse", "ashby", "lever", "remotive", "arbeitnow")
        assert j["url"].startswith("https://")
        posted = datetime.fromisoformat(j["posted_at"].replace("Z", "+00:00"))
        assert posted >= cutoff, f"stale posting {j['posted_at']}"
        if region != "all":
            assert region in j["regions"], f"{j['company']} {j['location']} not tagged {region}"


def test_india_locations_look_indian(s):
    d = s.get(f"{API}/jobs/live", params={"region": "india", "limit": 12}, timeout=60).json()
    words = ["india", "bengaluru", "bangalore", "mumbai", "pune", "hyderabad", "delhi", "gurgaon",
             "gurugram", "noida", "chennai", "kolkata", "ahmedabad"]
    bad = [j["location"] for j in d["jobs"] if not any(w in j["location"].lower() for w in words)]
    assert not bad, f"non-Indian display locations in india deck: {bad}"


def test_live_jobs_invalid_region(s):
    r = s.get(f"{API}/jobs/live", params={"region": "mars"})
    assert r.status_code == 400


@pytest.mark.parametrize("limit,code", [(0, 422), (13, 422), (1, 200), (12, 200)])
def test_live_jobs_limit_bounds(s, limit, code):
    r = s.get(f"{API}/jobs/live", params={"region": "all", "limit": limit}, timeout=60)
    assert r.status_code == code
    if code == 200:
        assert len(r.json()["jobs"]) <= limit


# ---- /api/jobs/companies ----
def test_companies(s):
    r = s.get(f"{API}/jobs/companies")
    assert r.status_code == 200
    cs = r.json()["companies"]
    assert len(cs) == 43
    for c in cs:
        assert c["name"] and c["domain"] and isinstance(c["open_roles"], int)


# ---- /api/jobs/logo/{domain} ----
@pytest.mark.parametrize("domain", ["stripe.com", "notion.so", "cred.club", "cursor.com", "perplexity.ai", "pinterest.com"])
def test_logo_allowed(s, domain):
    r = s.get(f"{API}/jobs/logo/{domain}", timeout=40)
    assert r.status_code == 200
    assert r.headers["content-type"].startswith("image/")
    assert len(r.content) > 200


def test_all_company_logos(s):
    cs = s.get(f"{API}/jobs/companies").json()["companies"]
    missing = [c["domain"] for c in cs if s.get(f"{API}/jobs/logo/{c['domain']}", timeout=40).status_code != 200]
    assert not missing, f"logos missing: {missing}"


@pytest.mark.parametrize("domain", ["evil.com", "STRIPE.COM.evil.com"])
def test_logo_disallowed(s, domain):
    assert s.get(f"{API}/jobs/logo/{domain}").status_code == 404


# ---- existing ----
def test_signup_and_duplicate(s):
    email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    r1 = s.post(f"{API}/signups", json={"email": email, "source": "pytest"})
    assert r1.status_code == 200 and r1.json()["already_on_list"] is False
    r2 = s.post(f"{API}/signups", json={"email": email.upper()})
    assert r2.json()["already_on_list"] is True
    assert s.post(f"{API}/signups", json={"email": "nope"}).status_code == 422


def test_preview(s):
    r = s.post(f"{API}/preview", json={"target_role": "TEST_PM"})
    assert r.status_code == 200
    d = r.json()
    assert len(d["matches"]) == 3 and "_id" not in d


# ---- iteration 3: remote deck labels + classifier fixes ----
def test_remote_deck_locations_say_remote(s):
    d = s.get(f"{API}/jobs/live", params={"region": "remote", "limit": 12}, timeout=60).json()
    words = ["remote", "anywhere", "distributed", "work from home"]
    bad = [f"{j['company']}: {j['location']}" for j in d["jobs"]
           if not (any(w in j["location"].lower() for w in words) or j["location"].startswith("Remote · "))]
    assert not bad, f"non-remote locations in remote deck: {bad}"


def test_classify_unit():
    import sys
    sys.path.insert(0, "/app/backend")
    from jobs import classify
    assert "us" in classify("Remote - Texas")
    assert "us" in classify("Remote - SF Bay Area")
    assert "us" not in classify("Toronto, CA")
    assert "us" not in classify("Remote or Hybrid, Toronto")
    assert "us" in classify("San Francisco, CA")
    assert "remote" in classify("Remote - Texas")


# ---- iteration 4: role search q + aggregators ----
BOARDS = ("greenhouse", "ashby", "lever")


@pytest.mark.parametrize("region", REGIONS)
def test_search_designer(s, region):
    r = s.get(f"{API}/jobs/live", params={"region": region, "limit": 12, "q": "designer"}, timeout=60)
    assert r.status_code == 200
    d = r.json()
    assert d["q"] == "designer"
    assert isinstance(d["sources"], list)
    cos = [j["company"] for j in d["jobs"]]
    assert len(cos) == len(set(cos))
    for j in d["jobs"]:
        assert "designer" in j["title"].lower(), j["title"]
        if region != "all":
            assert region in j["regions"]
    assert sorted({j["source"] for j in d["jobs"]}) == d["sources"]


def test_search_multiword(s):
    d = s.get(f"{API}/jobs/live", params={"region": "all", "limit": 12, "q": "data engineer"}, timeout=60).json()
    assert d["jobs"], "expected some data engineer roles"
    for j in d["jobs"]:
        t = j["title"].lower()
        assert "data" in t and "engineer" in t, j["title"]


def test_search_case_insensitive(s):
    a = s.get(f"{API}/jobs/live", params={"limit": 12, "q": "DESIGNER"}, timeout=60).json()
    b = s.get(f"{API}/jobs/live", params={"limit": 12, "q": "designer"}, timeout=60).json()
    assert [j["id"] for j in a["jobs"]] == [j["id"] for j in b["jobs"]]


def test_search_max_len(s):
    assert s.get(f"{API}/jobs/live", params={"q": "a" * 60}, timeout=60).status_code == 200
    assert s.get(f"{API}/jobs/live", params={"q": "a" * 61}, timeout=60).status_code == 422


def test_search_regex_safe_and_nomatch(s):
    r = s.get(f"{API}/jobs/live", params={"q": "zzqx(.*["}, timeout=60)
    assert r.status_code == 200
    assert r.json()["jobs"] == [] and r.json()["sources"] == []


def test_boards_before_aggregators(s):
    for q in ["", "engineer", "manager", "entwickler"]:
        d = s.get(f"{API}/jobs/live", params={"region": "europe", "limit": 12, "q": q}, timeout=60).json()
        kinds = [0 if j["source"] in BOARDS else 1 for j in d["jobs"]]
        assert kinds == sorted(kinds), f"q={q}: {[j['source'] for j in d['jobs']]}"
        for j in d["jobs"]:
            if j["source"] not in BOARDS:
                assert j["domain"] is None


def test_aggregator_jobs_present(s):
    d = s.get(f"{API}/jobs/live", params={"region": "europe", "limit": 12, "q": "entwickler"}, timeout=60).json()
    srcs = {j["source"] for j in d["jobs"]}
    print("entwickler sources:", srcs, [(j["company"], j["title"]) for j in d["jobs"]][:5])
    assert "arbeitnow" in srcs
