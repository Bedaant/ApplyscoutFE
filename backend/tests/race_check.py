# Ad-hoc check: concurrent signups of the same friend email with a ref
import os, time, requests
from concurrent.futures import ThreadPoolExecutor
API = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") + "/api"
inv = f"test+race{int(time.time()*1000)}@example.com"
a = requests.post(f"{API}/signups", json={"email": inv}).json()
fr = f"test+racefr{int(time.time()*1000)}@example.com"
with ThreadPoolExecutor(8) as ex:
    res = list(ex.map(lambda _: requests.post(f"{API}/signups", json={"email": fr, "ref": a["code"]}).json(), range(8)))
print("new responses:", sum(1 for r in res if not r["already_on_list"]), "positions:", {r["position"] for r in res})
print("inviter referrals:", requests.post(f"{API}/signups", json={"email": inv}).json()["referrals"])
