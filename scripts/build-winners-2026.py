"""Build src/data/winners2026.json from Guardian/AP results JSON. Only AP-called races."""
import json, urllib.request, re
BASE = "https://interactive.guim.co.uk/2026/11/us-election-data/production/v1/latest/details/results_{}.json"
PARTY = {"Dem": "Democratic", "GOP": "Republican", "Lib": "Libertarian", "Grn": "Green", "Ind": "Independent",
         "NPA": "No party affiliation", "Una": "Unaffiliated", "Con": "Constitution", "CST": "Constitution",
         "FWD": "Forward", "WCP": "Working Class", "NP": "Nonpartisan", "Oth": "Other"}
OFFICE = {"S": "Senate", "H": "House", "G": "Governor"}
out = []
for o in "SGH":
    for r in json.load(urllib.request.urlopen(BASE.format(o))):
        if r.get("raceCallStatus") != "Called" or not any(c.get("winner") == "X" for c in r["candidates"]):
            continue
        st = r["statePostal"]; special = "Special" in (r.get("raceType") or "")
        if o == "H":
            n = "at-large" if st in {"AK","DE","ND","SD","VT","WY"} else (re.sub(r"\D", "", r.get("seatName") or "") or "at-large")
            slug = f"{st.lower()}-house-district-{n}" if n != "at-large" else f"{st.lower()}-house-at-large"
            label = f"{r['stateName']} {'at-large House' if n=='at-large' else 'House District ' + n}"
        else:
            slug = f"{st.lower()}-{OFFICE[o].lower()}" + ("-special" if special else "")
            label = f"{r['stateName']} {OFFICE[o]}" + (" special" if special else "")
        out.append({"slug": slug, "office": OFFICE[o], "state": st, "stateName": r["stateName"], "label": label,
            "special": special, "flipped": bool(r.get("flippedSeat")), "eevp": r.get("eevp"),
            "lastUpdated": r.get("lastUpdated"), "calledAt": r.get("winnerDateTime"), "totalVotes": r.get("totalvotes"),
            "candidates": sorted([{"name": f"{c.get('first','')} {c.get('last','')}".strip(),
                "party": PARTY.get(c["party"], c["party"]), "votes": c.get("voteCount", 0),
                "pct": round(c.get("voteShare") or 0, 1), "winner": c.get("winner") == "X"} for c in r["candidates"]],
                key=lambda c: -c["votes"])})
assert len({x["slug"] for x in out}) == len(out)
json.dump(out, open("src/data/winners2026.json", "w"), indent=0)
print(len(out), {k: sum(x["office"] == k for x in out) for k in OFFICE.values()})
