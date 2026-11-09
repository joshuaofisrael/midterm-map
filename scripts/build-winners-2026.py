"""Build src/data/winners2026.json from the Guardian's published AP results JSON.

Every 2026 Senate, governor and House general-election contest is written out.
`status` is "called" only when AP marks the race Called and flags a winner;
"runoff" when AP reports the race heads to a runoff; otherwise "uncalled".
No winner is ever inferred from vote shares. Each record carries the state's
official results page from src/data/live-sources.json.
"""
import json, urllib.request, re, datetime
BASE = "https://interactive.guim.co.uk/2026/11/us-election-data/production/v1/latest/details/results_{}.json"
PARTY = {"Dem": "Democratic", "GOP": "Republican", "Lib": "Libertarian", "Grn": "Green", "Ind": "Independent",
         "NPA": "No party affiliation", "Una": "Unaffiliated", "Con": "Constitution", "CST": "Constitution",
         "FWD": "Forward", "WCP": "Working Class", "NP": "Nonpartisan", "Oth": "Other"}
OFFICE = {"S": "Senate", "H": "House", "G": "Governor"}
OFFICIAL = {s["code"]: {"label": s["resultsLabel"], "href": s["resultsUrl"]}
            for s in json.load(open("src/data/live-sources.json"))["states"]}
out = []
for o in "SGH":
    for r in json.load(urllib.request.urlopen(BASE.format(o))):
        st = r["statePostal"]
        if st not in OFFICIAL or r.get("level") != "state":
            continue  # skips the national House popular-vote aggregate
        call = r.get("raceCallStatus")
        has_winner = any(c.get("winner") == "X" for c in r["candidates"])
        status = "called" if call == "Called" and has_winner else ("runoff" if call == "Runoff" else "uncalled")
        special = "Special" in (r.get("raceType") or "")
        if o == "H":
            n = "at-large" if st in {"AK","DE","ND","SD","VT","WY"} else (re.sub(r"\D", "", r.get("seatName") or "") or "at-large")
            slug = f"{st.lower()}-house-district-{n}" if n != "at-large" else f"{st.lower()}-house-at-large"
            label = f"{r['stateName']} {'at-large House' if n=='at-large' else 'House District ' + n}"
        else:
            slug = f"{st.lower()}-{OFFICE[o].lower()}" + ("-special" if special else "")
            label = f"{r['stateName']} {OFFICE[o]}" + (" special" if special else "")
        out.append({"slug": slug, "office": OFFICE[o], "state": st, "stateName": r["stateName"], "label": label,
            "status": status, "apStatus": call, "special": special,
            "flipped": bool(r.get("flippedSeat")) if status == "called" else False, "eevp": r.get("eevp"),
            "lastUpdated": r.get("lastUpdated"), "calledAt": r.get("winnerDateTime") if status == "called" else None,
            "totalVotes": r.get("totalvotes"), "official": OFFICIAL[st],
            "candidates": sorted([{"name": f"{c.get('first','')} {c.get('last','')}".strip(),
                "party": PARTY.get(c["party"], c["party"]), "votes": c.get("voteCount", 0),
                "pct": round(c.get("voteShare") or 0, 1),
                "winner": status == "called" and c.get("winner") == "X"} for c in r["candidates"]],
                key=lambda c: -c["votes"])})
assert len({x["slug"] for x in out}) == len(out)
json.dump(out, open("src/data/winners2026.json", "w"), indent=0)
json.dump({"fetchedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")},
          open("src/data/winners2026-meta.json", "w"))
from collections import Counter
print(len(out), Counter((x["office"], x["status"]) for x in out))
