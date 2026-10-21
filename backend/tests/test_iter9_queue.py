# Iteration 9: true-queue signup positions, resume years with today's date, sample_people dept
import os, time, uuid, pytest, requests
BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"

def uniq(t):
    return f"test+{t}{uuid.uuid4().hex[:8]}@example.com"

def su(email, ref=None):
    r = requests.post(f"{API}/signups", json={"email": email, **({"ref": ref} if ref else {})}, timeout=30)
    assert r.status_code == 200, r.text
    return r.json()

class TestQueue:
    def test_ref_moves_up_and_unique_positions(self):
        a = su(uniq("qa"))
        later = [su(uniq(f"ql{i}")) for i in range(3)]
        # later signups are behind A
        for l in later:
            assert l["position"] > a["position"]
        before = su(a["email"])["position"]
        su(uniq("qf"), ref=a["code"])
        after = su(a["email"])
        print("A before", before, "after", after["position"])
        assert after["referrals"] == 1
        jumped = before - after["position"]
        print("jumped", jumped)
        assert max(1, before - 10) <= after["position"] < before
        # uniqueness across A + later
        poss = [su(a["email"])["position"]] + [su(l["email"])["position"] for l in later]
        print("positions", poss)
        assert len(set(poss)) == len(poss)

    def test_moves_up_at_most_ten(self):
        a = su(uniq("t10"))
        before = su(a["email"])["position"]
        su(uniq("t10f"), ref=a["code"])
        after = su(a["email"])["position"]
        print("before", before, "after", after)
        assert max(1, before - 10) <= after < before

class TestResumeYears:
    def test_years_about_9(self):
        txt = ("Rohan Gupta\nBengaluru, India\nSenior PM, Flipkart (2019-present)\n- Shipped UPI checkout lifting conversion 12%\n"
               "Product Manager, Swiggy (2017-2019)\n- Launched Instamart pilot in 3 cities\nSkills: SQL, roadmaps\n")
        r = requests.post(f"{API}/flow/resume", files={"file": ("r.txt", txt.encode(), "text/plain")}, timeout=120)
        assert r.status_code == 200
        d = r.json(); print(d)
        assert d["readable"] is True
        assert d["years"] in (8, 9, 10)

class TestPeopleDept:
    def test_designer_dept_and_variety(self):
        r = requests.post(f"{API}/flow/match", json={"title": "Product Designer", "locations": ["Remote"]}, timeout=60)
        assert r.status_code == 200
        jobs = r.json()["jobs"]
        names = set()
        for j in jobs:
            hm = j["people"][0]["role"]
            print(j["title"], "|", hm, "|", [p["name"] for p in j["people"]])
            names.update(p["name"] for p in j["people"])
            if "design" in j["title"].lower():
                assert hm == "Hiring Manager, Design"
        assert len(names) >= min(len(jobs) * 2, 6) * 0.7
