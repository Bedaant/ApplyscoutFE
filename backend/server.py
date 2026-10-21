import asyncio
from fastapi import FastAPI, APIRouter, Query, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator, AliasChoices, EmailStr
from typing import List, Optional, Annotated
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

from jobs import JobFeed, fetch_logo, ALLOWED_DOMAINS  # noqa: E402
from fastapi.responses import Response  # noqa: E402

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, validation_alias=AliasChoices("_id", "id"))

    def to_mongo(self) -> dict:
        data = self.model_dump(by_alias=True, exclude={"id"})
        return data

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc)


class Match(BaseModel):
    title: str
    company: str
    location: str
    posted: str
    fit: int
    reason: str
    question: str
    answer: str
    sources: List[str]
    removed_claim: str


class PreviewSession(BaseDocument):
    target_role: str
    file_name: str
    facts: List[str]
    matches: List[Match]
    created_at: str


class PreviewRequest(BaseModel):
    target_role: str = Field(min_length=1, max_length=80)
    file_name: str = Field(default="sample-resume.pdf", max_length=200)


SAMPLE_FACTS = [
    "5 years across operations and product roles",
    "Rebuilt the customer onboarding flow (Role 2)",
    "Reduced support tickets by 18% (Role 2)",
    "Tools: SQL, Figma, Notion, Jira",
]


def build_matches(role: str) -> List[Match]:
    base = [
        ("", "Northwind Labs", "Remote · Europe", "6 hours ago", 92,
         "Your onboarding work maps directly to their #1 listed priority."),
        ("Senior ", "Halden & Co.", "Hybrid · London", "1 day ago", 86,
         "Strong overlap on process improvement; they ask for SQL, which you have."),
        ("", "Brightloom", "Remote · Worldwide", "2 days ago", 74,
         "Good fit on tools, but they want 7+ years. Flagged so you can decide."),
    ]
    out = []
    for prefix, company, loc, posted, fit, reason in base:
        out.append(Match(
            title=f"{prefix}{role}",
            company=company,
            location=loc,
            posted=posted,
            fit=fit,
            reason=reason,
            question="Tell us about a time you improved a process.",
            answer=(
                f"In my second role I rebuilt our customer onboarding flow, which reduced support "
                f"tickets by 18%. I'd bring the same approach to {company}: map where people get "
                f"stuck, fix the biggest drop-off first, and measure it with SQL before and after."
            ),
            sources=["Resume · Role 2, line 3", "Resume · Role 2, line 4", "Resume · Skills"],
            removed_claim="“Managed a team of 12” — not in your resume, so it was removed.",
        ))
    return out


class SignupRequest(BaseModel):
    email: EmailStr
    source: str = Field(default="hero", max_length=40)


class SignupResponse(BaseModel):
    email: str
    already_on_list: bool
    position: int


@api_router.get("/")
async def root():
    return {"message": "ApplyScout API"}


@api_router.post("/signups", response_model=SignupResponse)
async def create_signup(req: SignupRequest):
    email = req.email.strip().lower()
    existing = await db.signups.find_one({"email": email})
    if existing is not None:
        return SignupResponse(email=email, already_on_list=True, position=existing.get("position", 1))
    position = await db.signups.count_documents({}) + 1
    await db.signups.insert_one({
        "email": email,
        "source": req.source,
        "position": position,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return SignupResponse(email=email, already_on_list=False, position=position)


@api_router.post("/preview", response_model=PreviewSession)
async def create_preview(req: PreviewRequest):
    session = PreviewSession(
        target_role=req.target_role.strip(),
        file_name=req.file_name,
        facts=SAMPLE_FACTS,
        matches=build_matches(req.target_role.strip()),
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    result = await db.preview_sessions.insert_one(session.to_mongo())
    doc = await db.preview_sessions.find_one({"_id": result.inserted_id})
    return PreviewSession.from_mongo(doc)


feed = JobFeed(db)
REGIONS = {"all", "india", "remote", "us", "europe"}


async def _refresh_quietly(force=False):
    try:
        await feed.refresh(force=force)
    except Exception as e:  # noqa: BLE001
        logging.getLogger("jobs").warning("feed refresh failed: %s", e)


@api_router.get("/jobs/live")
async def live_jobs(region: str = Query("all"), limit: int = Query(5, ge=1, le=12),
                    q: str = Query("", max_length=60)):
    region = region.lower()
    if region not in REGIONS:
        raise HTTPException(400, "region must be one of: all, india, remote, us, europe")
    refreshed = await feed.refreshed_at()
    if refreshed is None:
        await _refresh_quietly()  # first ever load: wait for it
        refreshed = await feed.refreshed_at()
    else:
        asyncio.create_task(_refresh_quietly())  # stale-while-revalidate, hourly
    jobs = await feed.pick(region, limit, q)
    return {
        "region": region,
        "q": q,
        "sources": sorted({j["source"] for j in jobs}),
        "jobs": jobs,
        "refreshed_at": refreshed,
        "fresh_days": 14,
        "adzuna": JobFeed.adzuna_on(),
    }


@api_router.get("/jobs/logo/{domain}")
async def company_logo(domain: str):
    got = await fetch_logo(db, domain.lower())
    if not got:
        raise HTTPException(404, "No logo for that company")
    return Response(content=got[1], media_type=got[0], headers={"Cache-Control": "public, max-age=86400"})


@api_router.get("/jobs/companies")
async def job_companies():
    return {"companies": await feed.companies()}


app.include_router(api_router)


@app.on_event("startup")
async def warm_feed():
    asyncio.create_task(_refresh_quietly())

    async def warm_logos():
        for d in sorted(ALLOWED_DOMAINS):
            try:
                await fetch_logo(db, d)
            except Exception:  # noqa: BLE001
                pass
    asyncio.create_task(warm_logos())

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
