import os
import uuid
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://scout-apply.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    assert "ApplyScout" in r.json().get("message", "")


def test_signup_valid_and_duplicate(session):
    email = f"test_{uuid.uuid4().hex[:10]}@example.com"
    r1 = session.post(f"{API}/signups", json={"email": email, "source": "pytest"})
    assert r1.status_code == 200, r1.text
    d1 = r1.json()
    assert d1["email"] == email
    assert d1["already_on_list"] is False
    assert isinstance(d1["position"], int) and d1["position"] > 0

    # duplicate
    r2 = session.post(f"{API}/signups", json={"email": email.upper(), "source": "pytest"})
    assert r2.status_code == 200, r2.text
    d2 = r2.json()
    assert d2["already_on_list"] is True
    assert d2["email"] == email  # lower-cased
    assert d2["position"] == d1["position"]  # count unchanged


def test_signup_invalid_email(session):
    r = session.post(f"{API}/signups", json={"email": "nope"})
    assert r.status_code == 422


def test_preview_shape(session):
    r = session.post(f"{API}/preview", json={"target_role": "Product Manager", "file_name": "sample-resume.pdf"})
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["target_role"] == "Product Manager"
    assert data["file_name"] == "sample-resume.pdf"
    assert isinstance(data["facts"], list) and len(data["facts"]) >= 1
    assert isinstance(data["matches"], list) and len(data["matches"]) == 3
    for m in data["matches"]:
        for k in ["title", "company", "location", "posted", "fit", "reason",
                  "question", "answer", "sources", "removed_claim"]:
            assert k in m, f"missing {k}"
        assert isinstance(m["sources"], list) and len(m["sources"]) > 0
    # ensure no mongo _id leaks
    assert "_id" not in data
