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
        assert j["source"] in ("greenhouse", "ashby", "lever")
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
    assert 25 <= len(cs) <= 32
    for c in cs:
        assert c["name"] and c["domain"] and isinstance(c["open_roles"], int)


# ---- /api/jobs/logo/{domain} ----
@pytest.mark.parametrize("domain", ["stripe.com", "notion.so", "cred.club"])
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
