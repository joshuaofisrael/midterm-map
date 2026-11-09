"""Build src/data/representatives2026.json from official member lists.

Sources (read at build time):
- U.S. Senate: https://www.senate.gov/general/contact_information/senators_cfm.xml
- Clerk of the U.S. House: https://clerk.house.gov/xml/lists/MemberData.xml
2026 winners come from src/data/winners2026.json (AP calls only); nothing is inferred.
"""
import json, re, urllib.request, xml.etree.ElementTree as ET

UA = {"User-Agent": "Mozilla/5.0 (mapthemidterms.com data build)"}
def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()

PARTY = {"D": "Democratic", "R": "Republican", "I": "Independent", "ID": "Independent", "L": "Libertarian"}
races = json.load(open("src/data/winners2026.json"))
names = {r["state"]: r["stateName"] for r in races}

sen_root = ET.fromstring(get("https://www.senate.gov/general/contact_information/senators_cfm.xml"))
senate_updated = (sen_root.findtext("last_updated") or "").strip()
senators = {}
for m in sen_root.findall("member"):
    st = m.findtext("state").strip()
    senators.setdefault(st, []).append({
        "name": f"{m.findtext('first_name').strip()} {m.findtext('last_name').strip()}",
        "party": PARTY.get(m.findtext("party").strip(), m.findtext("party").strip()),
        "class": m.findtext("class").strip().replace("Class ", ""),
        "website": (m.findtext("website") or "").strip(),
        "bioguide": (m.findtext("bioguide_id") or "").strip(),
    })

clerk = ET.fromstring(get("https://clerk.house.gov/xml/lists/MemberData.xml"))
clerk_date = clerk.get("publish-date")
house = {}
for m in clerk.find("members"):
    sd = m.findtext("statedistrict"); st, num = sd[:2], sd[2:]
    if st not in names:
        continue  # territories and DC delegates are outside the 2026 state contests here
    dist = "at-large" if num == "00" else str(int(num))
    info = m.find("member-info")
    name = (info.findtext("official-name") or "").strip()
    house.setdefault(st, {})[dist] = None if not name else {
        "name": name,
        "party": PARTY.get((info.findtext("party") or "").strip(), (info.findtext("party") or "").strip()),
        "bioguide": (info.findtext("bioguideID") or "").strip(),
    }

def race_of(slug):
    return next((r for r in races if r["slug"] == slug), None)

out = {"sources": {"senate": {"url": "https://www.senate.gov/general/contact_information/senators_cfm.xml", "updated": senate_updated},
                   "house": {"url": "https://clerk.house.gov/xml/lists/MemberData.xml", "updated": clerk_date}},
       "states": {}}
for st in sorted(names, key=lambda s: names[s]):
    hs = []
    for dist in sorted(house.get(st, {}), key=lambda d: 0 if d == "at-large" else int(d)):
        slug = f"{st.lower()}-house-at-large" if dist == "at-large" else f"{st.lower()}-house-district-{dist}"
        assert race_of(slug), slug
        hs.append({"district": dist, "current": house[st][dist], "race": slug})
    seats = []
    for s in sorted(senators.get(st, []), key=lambda s: s["class"]):
        cls = {"I": 1, "II": 2, "III": 3}[s["class"]]
        slug = f"{st.lower()}-senate" if cls == 2 else (f"{st.lower()}-senate-special" if race_of(f"{st.lower()}-senate-special") and cls == 3 else None)
        if slug and not race_of(slug):
            slug = None
        seats.append({"current": s, "race": slug})
    assert len(seats) == 2, st
    out["states"][st] = {"name": names[st], "senate": seats, "house": hs}
assert sum(len(v["house"]) for v in out["states"].values()) == 435
json.dump(out, open("src/data/representatives2026.json", "w"), indent=0)
print("states", len(out["states"]), "house", sum(len(v["house"]) for v in out["states"].values()), senate_updated, clerk_date)
