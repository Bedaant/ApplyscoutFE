"""'Find my jobs' flow: AI resume reading, live-job matching, fact-tagged drafts.

Payment, accounts, Gmail and sending are mocked on the frontend; nothing here sends anything.
"""
import json
import logging
import os
import re
import tempfile
import uuid
import hashlib
from datetime import datetime, timezone

from fastapi import APIRouter, File, HTTPException, UploadFile
from pydantic import BaseModel, Field
from typing import List, Optional

from emergentintegrations.llm.chat import FileContentWithMimeType, LlmChat, StreamDone, TextDelta, UserMessage

log = logging.getLogger("flow")
MODEL = ("gemini", "gemini-3.1-pro-preview")
MAX_BYTES = 5 * 1024 * 1024


def _key():
    k = os.environ.get("EMERGENT_LLM_KEY")
    if not k:
        raise HTTPException(503, "AI is not configured")
    return k


async def _ask(system: str, text: str, files=None) -> str:
    chat = LlmChat(api_key=_key(), session_id=f"flow-{uuid.uuid4()}", system_message=system).with_model(*MODEL)
    out = []
    async for ev in chat.stream_message(UserMessage(text=text, file_contents=files or None)):
        if isinstance(ev, TextDelta):
            out.append(ev.content)
        elif isinstance(ev, StreamDone):
            break
    return "".join(out)


def _json(raw: str):
    m = re.search(r"\{.*\}", raw or "", re.S)
    if not m:
        return None
    try:
        return json.loads(m.group(0))
    except json.JSONDecodeError:
        return None


def build_router(feed) -> APIRouter:
    r = APIRouter(prefix="/flow")

    # ---------- 1. resume reading ----------
    @r.post("/resume")
    async def read_resume(file: UploadFile = File(...)):
        data = await file.read()
        if len(data) > MAX_BYTES:
            raise HTTPException(413, "Resume must be 5 MB or smaller")
        name = (file.filename or "resume").lower()
        tmp_paths = []
        try:
            if name.endswith(".pdf"):
                mime, suffix, payload = "application/pdf", ".pdf", data
            elif name.endswith(".docx"):
                from docx import Document
                import io
                doc = Document(io.BytesIO(data))
                text = "\n".join(p.text for p in doc.paragraphs)
                mime, suffix, payload = "text/plain", ".txt", text.encode()
            elif name.endswith((".txt", ".md")):
                mime, suffix, payload = "text/plain", ".txt", data
            else:
                raise HTTPException(415, "Use a PDF, Word (.docx) or text file")
            if len(payload.strip()) < 40:
                return {"readable": False}
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as t:
                t.write(payload)
                tmp_paths.append(t.name)
            raw = await _ask(
                "You extract facts from resumes. Never invent anything. Use only what is written. Reply with JSON only.",
                f'Today is {datetime.now(timezone.utc):%B %Y} ("present" means today). '
                'Read this resume. Return JSON: {"title": most recent or target job title or null, '
                '"years": total years of professional experience as an integer or null, '
                '"locations": up to 3 cities/countries or "Remote" mentioned as where they live or want to work, '
                '"facts": 2 or 3 short (max 14 words) concrete achievements or skills, each copied faithfully '
                'from the resume}. If this is not a resume, return {"title": null}.',
                [FileContentWithMimeType(file_path=tmp_paths[0], mime_type=mime)],
            )
        except HTTPException:
            raise
        except Exception as e:  # noqa: BLE001
            log.warning("resume read failed: %s", e)
            return {"readable": False}
        finally:
            for p in tmp_paths:  # resumes are never kept
                try:
                    os.unlink(p)
                except OSError:
                    pass
        parsed = _json(raw) or {}
        if not parsed.get("title"):
            return {"readable": False}
        facts = [str(f).strip() for f in (parsed.get("facts") or []) if str(f).strip()][:3]
        years = parsed.get("years")
        return {
            "readable": True,
            "title": str(parsed["title"])[:80],
            "years": int(years) if isinstance(years, (int, float)) else None,
            "locations": [str(x)[:40] for x in (parsed.get("locations") or [])][:3],
            "facts": facts,
        }

    # ---------- 2. matching live jobs ----------
    class MatchReq(BaseModel):
        title: str = Field(min_length=1, max_length=80)
        locations: List[str] = Field(default_factory=list, max_length=6)
        years: Optional[int] = None

    SENIORITY = r"\b(senior|sr\.?|junior|jr\.?|lead|principal|staff|head of|associate|intern|ii|iii|iv|i)\b"
    RELATED = {
        "product manager": ["product owner", "product lead", "program manager"],
        "product designer": ["designer", "ux"],
        "software engineer": ["engineer", "developer"],
        "frontend": ["front end", "engineer"],
        "data analyst": ["analyst", "data scientist", "analytics"],
        "data scientist": ["machine learning", "data"],
        "marketing": ["growth", "brand"],
        "sales": ["account executive", "business development"],
        "operations": ["ops", "program manager"],
        "recruiter": ["talent", "recruiting"],
    }
    REGION_WORDS = {"remote": "remote", "india": "india", "us": "us", "usa": "us", "united states": "us", "europe": "europe"}
    CITY_ALIASES = {"bengaluru": "bengaluru|bangalore", "delhi ncr": "delhi|gurgaon|gurugram|noida", "new york": "new york|nyc"}

    def _title_q(words):
        return [{"title": {"$regex": re.escape(w), "$options": "i"}} for w in words]

    def _loc_q(locations):
        ors = []
        for loc in locations:
            k = loc.strip().lower()
            if not k:
                continue
            if k in REGION_WORDS:
                ors.append({"regions": REGION_WORDS[k]})
            else:
                pat = CITY_ALIASES.get(k, re.escape(k))
                ors.append({"location_full": {"$regex": pat, "$options": "i"}})
                ors.append({"location": {"$regex": pat, "$options": "i"}})
        return ors

    async def _run(words, locations):
        q = {"$and": _title_q(words)} if words else {}
        lq = _loc_q(locations)
        if lq:
            q = {"$and": [q, {"$or": lq}]} if q else {"$or": lq}
        count = await feed.col.count_documents(q)
        docs = await feed.col.find(q, {"_id": 0}).sort("posted_at", -1).to_list(400) if count else []
        return count, docs

    @r.post("/match")
    async def match(req: MatchReq):
        base = re.sub(SENIORITY, " ", req.title.lower())
        words = [w for w in re.split(r"[^a-z0-9+#]+", base) if len(w) > 1][:4]
        locs = [x for x in req.locations if x.strip()]
        attempts = [(words, locs, None)]
        for key, alts in RELATED.items():
            if key in base:
                for a in alts:
                    attempts.append((a.split(), locs, f"No exact '{req.title}' roles, so I looked at related '{a}' roles too."))
        attempts.append((words, ["Remote"], "Nothing close in your locations, so I included Remote roles."))
        if words:
            attempts.append((words[-1:], locs, f"I widened the search to any '{words[-1]}' role."))
        attempts.append((words[-1:], ["Remote"], f"I widened to any remote '{words[-1] if words else ''}' role."))
        attempts.append((words[-1:], [], "I widened to every location."))
        attempts.append(([], locs or ["Remote"], "I couldn't find that title, so here are the freshest roles in your locations. Try a broader title."))

        count, docs, note, ids = 0, [], None, set()
        rank = {}
        for ai, (w, l, n) in enumerate(attempts):
            c, found = await _run(w, l)
            if not c:
                continue
            fresh = [d for d in found if d["id"] not in ids]
            if not fresh:
                continue
            if not docs:
                note = n
            elif len({d["company"] for d in docs}) < 3 and not (note or "").startswith("Only"):
                note = f"Only {len({d['company'] for d in docs})} close match{'es' if len({d['company'] for d in docs}) > 1 else ''} in your locations, so I added a few related or remote roles too."
            ids.update(d["id"] for d in fresh)
            rank.update({d["id"]: ai for d in fresh})
            docs.extend(fresh)
            count += len(fresh)
            if len({d["company"] for d in docs}) >= 3:
                break
        pats = []
        for loc in locs:
            k = loc.strip().lower()
            pats.append(("remote" if k == "remote" else None, re.compile(CITY_ALIASES.get(k, re.escape(k)), re.I)))

        def loc_rank(d):
            for i, (reg, pat) in enumerate(pats):
                if (reg and reg in d.get("regions", [])) or pat.search(d.get("location_full") or d.get("location") or ""):
                    return i
            return len(pats)
        docs.sort(key=lambda d: (rank.get(d["id"], 99), loc_rank(d), 0 if d.get("source") in ("greenhouse", "ashby", "lever") else 1))
        seen, top = set(), []
        for d in docs:
            if d["company"] in seen:
                continue
            seen.add(d["company"])
            d.pop("location_full", None)
            d.pop("remote_prefix", None)
            d["people"] = sample_people(d)
            top.append(d)
            if len(top) >= 9:
                break
        companies = len({d["company"] for d in docs})
        return {"count": count, "companies": companies, "people_estimate": companies * 2 + min(count, 40),
                "widened": note, "jobs": top}

    # ---------- 3. fact-tagged draft ----------
    class Fact(BaseModel):
        id: str = Field(max_length=10)
        text: str = Field(max_length=200)

    class DraftReq(BaseModel):
        job_title: str = Field(max_length=160)
        company: str = Field(max_length=120)
        person_name: str = Field(max_length=80)
        person_role: str = Field(max_length=80)
        facts: List[Fact] = Field(min_length=1, max_length=8)
        variant: int = 0

    @r.post("/draft")
    async def draft(req: DraftReq):
        ids = {f.id for f in req.facts}
        fact_list = "\n".join(f"{f.id}: {f.text}" for f in req.facts)
        raw = await _ask(
            "You write short, warm, human outreach emails for job seekers. You NEVER state anything about the "
            "candidate that is not in the provided facts. Reply with JSON only.",
            f"Write a short email from the candidate to {req.person_name} ({req.person_role}) at {req.company} "
            f"about the '{req.job_title}' role they just applied for.\nCandidate facts (the ONLY things you may "
            f"claim about the candidate):\n{fact_list}\n\nReturn JSON: {{\"subject\": \"...\", \"lines\": "
            f"[{{\"text\": \"one sentence\", \"tag\": \"<fact id> | job | greet | close\"}}]}}. "
            f"5 to 7 lines: a greeting (tag greet), 1 line about the role (tag job), 2-4 lines each built on "
            f"exactly one fact (tag = that fact id), and a closing ask + sign-off without a name (tag close). "
            f"Plain, specific, no clichés. Variation seed: {req.variant}.",
        )
        parsed = _json(raw) or {}
        lines = []
        for ln in parsed.get("lines") or []:
            tag = str(ln.get("tag", "")).strip()
            text = str(ln.get("text", "")).strip()
            if text and (tag in ids or tag in ("job", "greet", "close")):
                lines.append({"text": text, "tag": tag})  # lines without a valid source are dropped
        if not lines:
            raise HTTPException(502, "Maggie couldn't write a draft just now. Try again.")
        return {"subject": str(parsed.get("subject") or f"{req.job_title} application")[:140], "lines": lines}

    return r


FIRST = ["Priya", "Arjun", "Sara", "Daniel", "Meera", "Lukas", "Aisha", "Tom", "Neha", "Elena", "Rahul", "Chloe",
         "Kavya", "Marco", "Ines", "Sam", "Tanvi", "Oliver", "Zara", "Jonas"]
LAST = ["Sharma", "Mehta", "Okafor", "Fischer", "Iyer", "Novak", "Khan", "Bennett", "Rao", "Rossi", "Verma", "Martin",
        "Kapoor", "Silva", "Nguyen", "Brennan", "Desai", "Larsen", "Haddad", "Moreau", "Pillai", "Weber", "Costa"]


def sample_people(job):
    """Demo contacts (clearly labelled as samples on the UI). Deterministic per job."""
    h = int(hashlib.md5(job["id"].encode()).hexdigest(), 16)
    dom = job.get("domain") or re.sub(r"[^a-z0-9]", "", job["company"].lower())[:20] + ".com"
    title = job.get("title", "")
    dept = "Design" if re.search(r"design|ux|ui\b", title, re.I) else "Engineering" if re.search(r"engineer|developer", title, re.I) \
        else "Product" if re.search(r"product", title, re.I) else "Data" if re.search(r"data|analyst", title, re.I) else "Operations"
    out = []
    for k, role in enumerate([f"Hiring Manager, {dept}", "Talent Partner"]):
        f, l = FIRST[(h >> (k * 9)) % len(FIRST)], LAST[(h >> (k * 9 + 5)) % len(LAST)]
        local = f"{f[0].lower()}.{l.lower()}"
        out.append({"name": f"{f} {l}", "role": role, "email": f"{local}@{dom}",
                    "masked": f"{local[0]}{'•' * 6}@{dom}", "avatar": (h >> k) % 4 + 1})
    return out
