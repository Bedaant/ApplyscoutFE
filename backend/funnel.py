"""Anonymous conversion funnel: events in, per-step counts out (secret key only).

No names or emails are ever stored with events: only an event name, a random
per-tab session id, a few whitelisted short labels and a timestamp.
"""
import os
import re
import hmac
from datetime import datetime, timedelta, timezone
from typing import Dict, Optional

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

# order = the funnel; everything else is a side metric
FUNNEL = [
    ("landing_view", "Landing page viewed"),
    ("cta_click", "Clicked a \"Find my jobs\" button"),
    ("flow_start", "Started the flow"),
    ("matches_shown", "Saw their matches"),
    ("job_picked", "Picked a job"),
    ("draft_shown", "Saw their draft"),
    ("paywall_reached", "Reached the paywall"),
    ("pay_method", "Tapped a payment method"),
]
SIDE = {
    "resume_ok": "Resume read OK",
    "resume_fail": "Resume read failed",
    "email_saved": "Saved matches by email",
    "email_skipped": "Skipped the email step",
    "draft_email_saved": "Paywall: \"email me this draft\"",
    "flow_left": "Left mid-flow",
}
EVENTS = {k for k, _ in FUNNEL} | set(SIDE)
PROP_KEYS = {"src", "step", "method", "path"}
SAFE = re.compile(r"^[a-z0-9_\-]{1,32}$")
BREAKDOWN = {"cta_click": "src", "flow_start": "path", "pay_method": "method", "flow_left": "step"}


class EventIn(BaseModel):
    name: str = Field(max_length=32)
    sid: str = Field(min_length=8, max_length=40)
    props: Dict[str, str] = Field(default_factory=dict)


def build_router(db) -> APIRouter:
    r = APIRouter()
    col = db.funnel_events

    @r.post("/events", status_code=204)
    async def record(ev: EventIn):
        if ev.name not in EVENTS or not SAFE.match(ev.sid.lower().replace("-", "_")):
            raise HTTPException(400, "unknown event")
        props = {k: v.lower() for k, v in ev.props.items() if k in PROP_KEYS and SAFE.match(str(v).lower())}
        await col.insert_one({"name": ev.name, "sid": ev.sid, "props": props,
                              "at": datetime.now(timezone.utc).isoformat()})

    @r.get("/funnel")
    async def funnel(key: str = Query("", max_length=128), days: Optional[int] = Query(None, ge=1, le=365)):
        secret = os.environ.get("FUNNEL_KEY", "")
        if not secret or not hmac.compare_digest(key, secret):
            raise HTTPException(404, "Not found")
        match = {}
        if days:
            match["at"] = {"$gte": (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()}
        rows = await col.aggregate([
            {"$match": match},
            {"$group": {"_id": "$name", "sessions": {"$addToSet": "$sid"}, "total": {"$sum": 1}}},
            {"$project": {"sessions": {"$size": "$sessions"}, "total": 1}},
        ]).to_list(100)
        by = {x["_id"]: x for x in rows}
        steps, prev, first = [], None, None
        for k, label in FUNNEL:
            n = by.get(k, {}).get("sessions", 0)
            first = n if first is None else first
            steps.append({
                "key": k, "label": label, "sessions": n, "total": by.get(k, {}).get("total", 0),
                "from_prev": round(100 * n / prev, 1) if prev else None,
                "drop_off": round(100 * (1 - n / prev), 1) if prev else None,
                "of_first": round(100 * n / first, 1) if first else None,
            })
            prev = n
        side = [{"key": k, "label": v, "sessions": by.get(k, {}).get("sessions", 0),
                 "total": by.get(k, {}).get("total", 0)} for k, v in SIDE.items()]
        breakdowns = {}
        for name, prop in BREAKDOWN.items():
            got = await col.aggregate([
                {"$match": {**match, "name": name}},
                {"$group": {"_id": f"$props.{prop}", "sessions": {"$addToSet": "$sid"}}},
                {"$project": {"sessions": {"$size": "$sessions"}}},
                {"$sort": {"sessions": -1}},
            ]).to_list(50)
            breakdowns[name] = [{"value": g["_id"] or "unknown", "sessions": g["sessions"]} for g in got]
        return {"days": days, "steps": steps, "side": side, "breakdowns": breakdowns,
                "generated_at": datetime.now(timezone.utc).isoformat()}

    return r
