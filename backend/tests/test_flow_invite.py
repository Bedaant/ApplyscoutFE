# Regression tests: Find-my-jobs flow (resume/match/draft) + invite rewards (signups/ref)
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"

RESUME = """Priya Sharma
Bengaluru, India | priya@example.com
Senior Product Manager

Experience
Senior Product Manager, Flipkart (2019 - present)
- Launched a one-tap checkout that lifted conversion by 18% across 40M users
- Led a team of 6 engineers and 2 designers to ship the seller analytics dashboard
Product Manager, Swiggy (2017 - 2019)
- Cut delivery ETA errors by 25% with a new prediction model rollout
Skills: SQL, A/B testing, roadmapping, user research
Education: B.Tech, IIT Madras
"""


def uniq(tag="x"):
    return f"test+{tag}{int(time.time()*1000)}@example.com"


# ---------- resume ----------
class TestResume:
    def test_resume_txt_readable(self):
        r = requests.post(f"{API}/flow/resume", files={"file": ("resume.txt", RESUME.encode(), "text/plain")}, timeout=120)
        assert r.status_code == 200, r.text
        d = r.json()
        print(d)
        assert d["readable"] is True
        assert isinstance(d["title"], str) and d["title"]
        assert d["years"] is None or isinstance(d["years"], int)
        assert isinstance(d["locations"], list)
        assert isinstance(d["facts"], list) and 1 <= len(d["facts"]) <= 3

    def test_tiny_text_unreadable(self):
        r = requests.post(f"{API}/flow/resume", files={"file": ("a.txt", b"hello world", "text/plain")}, timeout=60)
        assert r.status_code == 200
        assert r.json() == {"readable": False}

    def test_non_resume_text_unreadable(self):
        txt = b"The quick brown fox jumps over the lazy dog. A recipe for banana bread: flour, bananas, sugar, butter, eggs. Bake at 180C for 50 minutes."
        r = requests.post(f"{API}/flow/resume", files={"file": ("recipe.txt", txt, "text/plain")}, timeout=120)
        assert r.status_code == 200
        print(r.json())
        assert r.json()["readable"] is False

    def test_png_415(self):
        r = requests.post(f"{API}/flow/resume", files={"file": ("a.png", b"\x89PNG" + b"0" * 100, "image/png")}, timeout=30)
        assert r.status_code == 415

    def test_too_big_413(self):
        r = requests.post(f"{API}/flow/resume", files={"file": ("big.txt", b"a" * (5 * 1024 * 1024 + 10), "text/plain")}, timeout=60)
        assert r.status_code == 413


# ---------- match ----------
class TestMatch:
    def test_match_pm_bengaluru(self):
        r = requests.post(f"{API}/flow/match", json={"title": "Product Manager", "locations": ["Bengaluru"]}, timeout=60)
        assert r.status_code == 200, r.text
        d = r.json()
        print({k: d[k] for k in ("count", "companies", "people_estimate", "widened")}, len(d["jobs"]))
        assert d["count"] > 0 and d["companies"] > 0 and d["people_estimate"] > 0
        assert 1 <= len(d["jobs"]) <= 9
        companies = [j["company"] for j in d["jobs"]]
        assert len(companies) == len(set(companies))
        for j in d["jobs"]:
            assert "_id" not in j and j.get("url")
            assert len(j["people"]) == 2
            for p in j["people"]:
                assert p["name"] and p["role"] and "•" in p["masked"] and "@" in p["email"]

    def test_match_nonsense_widened(self):
        r = requests.post(f"{API}/flow/match", json={"title": "Zorblax Wizard", "locations": ["Bengaluru"]}, timeout=60)
        assert r.status_code == 200
        d = r.json()
        print(d["widened"], d["count"])
        assert len(d["jobs"]) > 0
        assert d["widened"]

    def test_match_validation(self):
        r = requests.post(f"{API}/flow/match", json={"title": "", "locations": []}, timeout=30)
        assert r.status_code == 422


# ---------- draft ----------
class TestDraft:
    def test_draft_tags(self):
        body = {"job_title": "Product Manager", "company": "Acme", "person_name": "Priya Sharma",
                "person_role": "Hiring Manager, Product",
                "facts": [{"id": "t", "text": "Product Manager, 6+ years"}, {"id": "l", "text": "Based in Bengaluru"}]}
        r = requests.post(f"{API}/flow/draft", json=body, timeout=120)
        assert r.status_code == 200, r.text
        d = r.json()
        print(d)
        assert d["subject"]
        assert len(d["lines"]) >= 2
        for ln in d["lines"]:
            assert ln["tag"] in {"t", "l", "job", "greet", "close"}
            assert ln["text"]

    def test_draft_requires_facts(self):
        body = {"job_title": "PM", "company": "A", "person_name": "B", "person_role": "C", "facts": []}
        r = requests.post(f"{API}/flow/draft", json=body, timeout=30)
        assert r.status_code == 422


# ---------- invites ----------
class TestInvite:
    def test_invite_flow(self):
        inviter = uniq("inv")
        r = requests.post(f"{API}/signups", json={"email": inviter}, timeout=30)
        assert r.status_code == 200
        a = r.json()
        assert a["already_on_list"] is False and a["referrals"] == 0 and a["code"]
        pos0, code = a["position"], a["code"]

        assert requests.get(f"{API}/signups/invite/{code}").json() == {"valid": True}
        assert requests.get(f"{API}/signups/invite/deadbeef00").json() == {"valid": False}

        friend = uniq("fr")
        f = requests.post(f"{API}/signups", json={"email": friend, "ref": code}).json()
        assert f["already_on_list"] is False

        again = requests.post(f"{API}/signups", json={"email": inviter}).json()
        assert again["already_on_list"] is True
        assert again["referrals"] == 1
        # true queue: moves up by up to 10 spots (fewer if people in that window already moved ahead)
        assert max(1, pos0 - 10) <= again["position"] < pos0

        # same friend again shouldn't double count
        requests.post(f"{API}/signups", json={"email": friend, "ref": code})
        requests.post(f"{API}/signups", json={"email": friend.upper(), "ref": code})
        again2 = requests.post(f"{API}/signups", json={"email": inviter}).json()
        assert again2["referrals"] == 1

        # self-referral doesn't count
        self_ref = requests.post(f"{API}/signups", json={"email": inviter, "ref": code}).json()
        assert self_ref["referrals"] == 1

    def test_position_floor(self):
        inviter = uniq("floor")
        a = requests.post(f"{API}/signups", json={"email": inviter}).json()
        n = a["position"] // 10 + 2
        for i in range(n):
            requests.post(f"{API}/signups", json={"email": uniq(f"f{i}_"), "ref": a["code"]})
        d = requests.post(f"{API}/signups", json={"email": inviter}).json()
        assert d["referrals"] == n
        assert d["position"] == 1
