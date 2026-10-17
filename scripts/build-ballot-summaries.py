#!/usr/bin/env python3
"""Build Census SLD assignments and official 2026 contest slices for place pages.

Reads the 2024 Census place-to-SLD relationship files and official candidate
lists already saved under /tmp/cand. Does not invent offices, names, or dates.
"""

from __future__ import annotations

import json
import re
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLACES = ROOT / "src" / "data" / "places"
OUT = ROOT / "src" / "data" / "ballot"
CAND = Path("/tmp/cand")
LISTS = CAND / "lists"
SLD_UPPER = Path("/tmp/sld/sldu.txt")
SLD_LOWER = Path("/tmp/sld/sldl.txt")

READ = "October 17, 2026"


def person(name: str, party: str, mark: str | None = None) -> dict:
    row = {"name": name.strip(), "party": party.strip()}
    if mark:
        row["mark"] = mark.strip()
    return row


def contest(office: str, key: str | None, people: list[dict], **extra) -> dict:
    row = {"office": office, "key": key, "candidates": people}
    for field, value in extra.items():
        if value:
            row[field] = value
    return row


class Rows(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.rows: list[list[str]] = []
        self.cur: list[str] | None = None
        self.cell: list[str] | None = None

    def handle_starttag(self, tag: str, attrs) -> None:
        if tag == "tr":
            self.cur = []
        elif tag in ("td", "th") and self.cur is not None:
            self.cell = []

    def handle_endtag(self, tag: str) -> None:
        if tag in ("td", "th") and self.cell is not None and self.cur is not None:
            self.cur.append(" ".join("".join(self.cell).split()))
            self.cell = None
        elif tag == "tr" and self.cur is not None:
            if any(self.cur):
                self.rows.append(self.cur)
            self.cur = None

    def handle_data(self, data: str) -> None:
        if self.cell is not None:
            self.cell.append(data)


def html_rows(path: Path) -> list[list[str]]:
    parser = Rows()
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))
    return parser.rows


def load_places() -> dict[str, list[dict]]:
    states: dict[str, list[dict]] = {}
    for path in sorted(PLACES.glob("*.json")):
        if path.name in ("manifest.json", "cd120.json", "sld.json"):
            continue
        states[path.stem] = json.loads(path.read_text(encoding="utf-8"))
    return states


def norm_name(value: str) -> str:
    value = value.lower().replace(".", " ").replace("'", "")
    value = value.replace("-", " ")
    return " ".join(value.split())


def build_sld(known: set[str]) -> dict[str, dict[str, list[str]]]:
    assigned: dict[str, dict[str, set[str]]] = defaultdict(lambda: {"u": set(), "l": set()})
    for chamber, path in (("u", SLD_UPPER), ("l", SLD_LOWER)):
        with path.open(encoding="latin1") as handle:
            next(handle)
            for line in handle:
                parts = line.rstrip("\n").split("|")
                if len(parts) < 16:
                    continue
                name, place, land = parts[2], parts[8], parts[15]
                if not name or place not in known:
                    continue
                try:
                    if int(land) <= 0:
                        continue
                except ValueError:
                    continue
                assigned[place][chamber].add(name)
    compact: dict[str, dict[str, list[str]]] = {}
    for geoid, chambers in assigned.items():
        row = {}
        if chambers["u"]:
            row["u"] = sorted(chambers["u"])
        if chambers["l"]:
            row["l"] = sorted(chambers["l"])
        if row:
            compact[geoid] = row
    return compact


def quoted_date(path: Path, needle: str, sentence: str) -> dict | None:
    text = path.read_text(encoding="utf-8", errors="replace")
    if needle not in text:
        raise SystemExit(f"{path} does not contain {needle!r}")
    return {"quote": needle, "text": sentence}


def parse_nc() -> dict:
    text = (CAND / "nc.txt").read_text(encoding="utf-8", errors="replace")
    office = None
    current: list[dict] = []
    found: list[tuple[str, list[dict]]] = []
    header = re.compile(
        r"^(US SENATE|US HOUSE OF REPRESENTATIVES DISTRICT \d+|NC SUPREME COURT ASSOCIATE JUSTICE SEAT \d+|NC COURT OF APPEALS JUDGE SEAT \d+|NC STATE SENATE DISTRICT \d+|NC HOUSE OF REPRESENTATIVES DISTRICT \d+)$"
    )

    def flush() -> None:
        nonlocal current, office
        if office and current:
            found.append((office, current))
        current = []

    for raw in text.splitlines():
        line = raw.strip()
        if line and not raw.startswith(" "):
            if header.fullmatch(line):
                flush()
                office = line
            elif "CANDIDATE LIST" not in line and "STATE BOARD" not in line and "Page " not in line and "Oct " not in line:
                flush()
                office = None
            continue
        if office is None:
            continue
        match = re.search(r"([A-Z]{2,4})\s+\d{2}/\d{2}/\d{4}", raw)
        if not match:
            continue
        parts = [part.strip() for part in re.split(r"\s{2,}", raw[: match.start()].strip()) if part.strip()]
        if parts:
            current.append(person(parts[-1], match.group(1)))
    flush()
    statewide = []
    upper: dict[str, dict] = {}
    lower: dict[str, dict] = {}
    for title, people in found:
        if title.startswith("NC SUPREME") or title.startswith("NC COURT OF APPEALS"):
            statewide.append(contest(title, None, people))
        elif title.startswith("NC STATE SENATE"):
            number = str(int(re.search(r"(\d+)", title).group(1)))
            upper[number] = contest(title, number, people)
        elif title.startswith("NC HOUSE"):
            number = str(int(re.search(r"(\d+)", title).group(1)))
            lower[number] = contest(title, number, people)
    return {
        "date": quoted_date(
            CAND / "nc.txt",
            "11/03/2026",
            "The North Carolina list's criteria line prints Election: 11/03/2026.",
        ),
        "statewide": statewide,
        "upper": upper,
        "lower": lower,
    }


def parse_wi() -> dict:
    text = (CAND / "wi.txt").read_text(encoding="utf-8", errors="replace")
    office = None
    incumbent = None
    pending: list[tuple[int, str, str]] = []
    rows: list[tuple[str, str, list[dict]]] = []

    def flush() -> None:
        nonlocal pending, office, incumbent
        if office and pending:
            pending.sort(key=lambda item: item[0])
            people = [person(name, party) for _order, name, party in pending]
            rows.append((office, incumbent or "", people))
        pending = []
        incumbent = None

    for raw in text.splitlines():
        if "Office :" in raw:
            flush()
            label = raw.split("Office :", 1)[1]
            incumbent = raw.split("Incumbent:", 1)[1].strip() if "Incumbent:" in raw else ""
            office = label.split("Incumbent:")[0].strip()
            continue
        if office is None or raw.strip().startswith("Total Number"):
            continue
        match = re.match(r"^\s*(\d+)\s+(?:\d{5,}\s+)?(.+?)\s{2,}([A-Za-z].+?)\s*$", raw)
        if match:
            pending.append((int(match.group(1)), match.group(2).strip(), match.group(3).strip()))
            continue
        wrap = raw.strip()
        if pending and wrap and wrap[0].isalpha() and " " not in wrap and not wrap.startswith("Printed"):
            order, name, party = pending[-1]
            pending[-1] = (order, name, f"{party} {wrap}")
    flush()
    annotations = {}
    statewide = []
    upper = {}
    lower = {}
    for title, incumbent_line, people in rows:
        note = {"incumbentLine": incumbent_line} if incumbent_line else {}
        if title == "GOVERNOR" or title.startswith("REPRESENTATIVE IN CONGRESS"):
            annotations[title] = note
            continue
        if title in ("ATTORNEY GENERAL", "SECRETARY OF STATE", "STATE TREASURER"):
            statewide.append(contest(title, None, people, incumbentLine=incumbent_line))
            continue
        senate = re.fullmatch(r"STATE SENATOR DISTRICT (\d+)", title)
        assembly = re.fullmatch(r"REPRESENTATIVE TO THE ASSEMBLY DISTRICT (\d+)", title)
        if senate:
            number = str(int(senate.group(1)))
            upper[number] = contest(title, number, people, incumbentLine=incumbent_line)
        elif assembly:
            number = str(int(assembly.group(1)))
            lower[number] = contest(title, number, people, incumbentLine=incumbent_line)
    return {
        "date": quoted_date(
            CAND / "wi.txt",
            "11/3/2026",
            "The Wisconsin list header prints 2026 General Election - 11/3/2026.",
        ),
        "annotations": annotations,
        "statewide": statewide,
        "upper": upper,
        "lower": lower,
    }


def parse_mi() -> dict:
    rows = html_rows(CAND / "mi.html")
    office = None
    current: list[dict] = []
    found: list[tuple[str, list[dict]]] = []

    def flush() -> None:
        nonlocal current, office
        if office and current:
            found.append((office, current))
        current = []

    for row in rows:
        text = " ".join(cell for cell in row if cell).strip()
        if "Position" in text and ("Year Term" in text or text.startswith("Governor")):
            flush()
            office = text
            continue
        if office is None or len(row) < 5:
            continue
        party = row[3].strip()
        name = row[4].strip()
        if party.endswith("Party") and name and not re.fullmatch(r"\d{2}/\d{2}/\d{4}", name):
            current.append(person(name, party))
    flush()
    statewide = []
    upper = {}
    lower = {}
    for title, people in found:
        if "Judge" in title or "Justice" in title:
            continue
        if title.startswith("Governor") or "U.S. Senate" in title or "Representative in Congress" in title:
            continue
        if title.startswith("Secretary of State") or title.startswith("Attorney General"):
            statewide.append(contest(title, None, people))
            continue
        senate = re.match(r"(\d+)(?:st|nd|rd|th) District State Senator", title)
        house = re.match(r"(\d+)(?:st|nd|rd|th) District Representative in State Legislature", title)
        if senate:
            upper[str(int(senate.group(1)))] = contest(title, str(int(senate.group(1))), people)
        elif house:
            lower[str(int(house.group(1)))] = contest(title, str(int(house.group(1))), people)
    return {
        "date": quoted_date(
            CAND / "mi.html",
            "Tuesday, November 3, 2026",
            "The Michigan candidate listing prints Tuesday, November 3, 2026.",
        ),
        "statewide": statewide,
        "upper": upper,
        "lower": lower,
    }


def parse_il() -> dict:
    lines = (LISTS / "il.md").read_text(encoding="utf-8", errors="replace").splitlines()
    title = None
    block: list[str] = []
    groups: list[tuple[str, list[str]]] = []
    for raw in lines:
        header = raw.strip()
        if re.fullmatch(r"\d+(ST|ND|RD|TH) (SENATE|REPRESENTATIVE)", header):
            if title:
                groups.append((title, block))
            title = header
            block = []
            continue
        if title and re.fullmatch(r"[A-Z0-9][A-Z0-9 /'\-]*", header) and not header.startswith("Page"):
            if not re.match(r"^(DEMOCRATIC|REPUBLICAN|AMERICAN CENTER PARTY|INDEPENDENT|GREEN)", header):
                groups.append((title, block))
                title = None
                block = []
                continue
        if title:
            block.append(raw)
    if title:
        groups.append((title, block))
    upper = {}
    lower = {}
    party_re = re.compile(
        r"^(DEMOCRATIC|REPUBLICAN|AMERICAN CENTER PARTY|INDEPENDENT|GREEN|INDEPENDENCE PARTY|WORKING CLASS PARTY)\s+(.+?)\s+\d{1,2}/\d{1,2}/\d{4}"
    )
    for header, rows in groups:
        people = []
        pending: list[str] = []

        def finish(removed: bool) -> None:
            nonlocal pending
            if pending and not removed:
                match = party_re.match(pending[0])
                if match:
                    name = match.group(2).strip()
                    if len(pending) > 1:
                        mate = re.match(r"^(.+?)\s+\([A-Za-z .'\-]+\)\s+\d{1,2}/\d{1,2}/\d{4}", pending[1])
                        if mate:
                            name = f"{name} / {mate.group(1).strip()}"
                    people.append(person(name, match.group(1)))
            pending = []

        for raw in rows:
            line = raw.strip()
            if not line or line.startswith("Page ") or line.startswith("##"):
                continue
            if line.startswith("REMOVED"):
                finish(True)
                continue
            if party_re.match(line) or re.match(r"^(DEMOCRATIC|REPUBLICAN|AMERICAN CENTER PARTY|INDEPENDENT|GREEN)\s+", line):
                finish(False)
                pending = [line]
            elif pending and re.match(r"^[A-Za-z].+\s+\d{1,2}/\d{1,2}/\d{4}", line):
                pending.append(line)
        finish(False)
        number = str(int(re.match(r"(\d+)", header).group(1)))
        if header.endswith("SENATE"):
            upper[number] = contest(header, number, people)
        elif header.endswith("REPRESENTATIVE"):
            lower[number] = contest(header, number, people)
    upper = {key: value for key, value in upper.items() if value["candidates"]}
    lower = {key: value for key, value in lower.items() if value["candidates"]}
    return {
        "date": quoted_date(
            LISTS / "il.md",
            "11/ 3/2026",
            "The Illinois list prints General Election - 11/ 3/2026.",
        ),
        "statewide": [],
        "upper": upper,
        "lower": lower,
    }


def parse_nm() -> dict:
    class Visible(HTMLParser):
        def __init__(self) -> None:
            super().__init__()
            self.rows: list[list[str]] = []
            self.cur: list[str] | None = None
            self.cell: list[str] | None = None

        def handle_starttag(self, tag: str, attrs) -> None:
            style = dict(attrs).get("style", "")
            hidden = "display:none" in style.replace(" ", "")
            if tag == "tr":
                self.cur = []
            elif tag in ("td", "th") and self.cur is not None and not hidden:
                self.cell = []
            elif tag == "br" and self.cell is not None:
                self.cell.append(" ")

        def handle_endtag(self, tag: str) -> None:
            if tag in ("td", "th") and self.cell is not None and self.cur is not None:
                self.cur.append(" ".join("".join(self.cell).split()))
                self.cell = None
            elif tag == "tr" and self.cur is not None:
                if any(self.cur):
                    self.rows.append(self.cur)
                self.cur = None

        def handle_data(self, data: str) -> None:
            if self.cell is not None:
                self.cell.append(data)

    visible = Visible()
    visible.feed((CAND / "nm.html").read_text(encoding="utf-8", errors="replace"))
    grouped: dict[str, list[tuple[int, dict]]] = {}
    for row in visible.rows:
        if len(row) < 9 or row[0] in ("Contest",):
            continue
        office, _county, name, party, _address, _contact, _filed, ballot, status = row[:9]
        if status != "Qualified":
            continue
        if not (office.startswith("State Senator") or office.startswith("State Representative")):
            continue
        grouped.setdefault(office, []).append((int(ballot), person(name, party)))
    upper = {}
    lower = {}
    for office, people in grouped.items():
        people.sort(key=lambda item: item[0])
        match = re.search(r"DISTRICT\s+(\d+)", office)
        if not match:
            continue
        number = str(int(match.group(1)))
        item = contest(office, number, [row for _order, row in people])
        if office.startswith("State Senator"):
            upper[number] = item
        else:
            lower[number] = item
    return {"statewide": [], "upper": upper, "lower": lower}


def parse_ne() -> dict:
    text = (LISTS / "ne.md").read_text(encoding="utf-8", errors="replace")
    grouped: dict[str, list[dict]] = {}
    terms: dict[str, str] = {}
    for line in text.splitlines():
        if not line.startswith("| For Member of the Legislature"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 8:
            continue
        _office, district, term_cell, _vote, party, name, _city, incumbency = cells[:8]
        match = re.search(r"(\d+)", district)
        if not match:
            continue
        number = str(int(match.group(1)))
        previous = terms.get(number)
        if previous and previous != term_cell:
            raise SystemExit(f"NE district {number} has more than one Term value")
        terms[number] = term_cell
        grouped.setdefault(number, []).append(person(name, party, incumbency))
    upper = {
        number: contest(
            f"For Member of the Legislature District {number}",
            number,
            people,
            term=terms[number],
        )
        for number, people in grouped.items()
    }
    return {"statewide": [], "upper": upper, "lower": {}}


def parse_tx() -> dict:
    text = (CAND / "tx.txt").read_text(encoding="utf-8", errors="replace")
    office = None
    occurrences: dict[str, list[tuple[str, str]]] = defaultdict(list)
    seen_offices: list[str] = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("Page ") or line.startswith("08/") or line.startswith("Texas Secretary"):
            continue
        if line.startswith("County") or line.startswith("2026 ") or line.startswith("Ballot Certification") or line.startswith("November "):
            office = None
            continue
        match = re.fullmatch(r"([A-Z][A-Z .'\-]*[A-Z])\s+(REP|DEM|LIB|GRE|IND)", line)
        if match and office:
            occurrences[office].append((match.group(1).strip(), match.group(2)))
            continue
        if re.fullmatch(r"[A-Z0-9][A-Z0-9 .,'()/\-]*", line) and not re.search(r"\s(REP|DEM|LIB|GRE|IND)$", line):
            office = line
            if office not in occurrences:
                seen_offices.append(office)
                occurrences[office] = []
    statewide = []
    upper = {}
    lower = {}
    for title in seen_offices:
        people_rows = occurrences[title]
        if not people_rows:
            continue
        # Keep the first county block only when later blocks repeat it.
        first: list[tuple[str, str]] = []
        for name, party in people_rows:
            if (name, party) in first:
                break
            first.append((name, party))
        if not first:
            continue
        people = [person(name, party) for name, party in first]
        senate = re.fullmatch(r"STATE SENATOR, DISTRICT (\d+)", title)
        house = re.fullmatch(r"STATE REPRESENTATIVE DISTRICT (\d+)", title)
        if senate:
            number = str(int(senate.group(1)))
            upper[number] = contest(title, number, people)
            continue
        if house:
            number = str(int(house.group(1)))
            lower[number] = contest(title, number, people)
            continue
        # Statewide offices repeat for every county. A districted office does not.
        if len(people_rows) < 200:
            continue
        if any(word in title for word in ("PRECINCT", "JUSTICE OF THE PEACE", "COUNTY", "DISTRICT")):
            continue
        statewide.append(contest(title, None, people))
    # Governor, U.S. senator, and U.S. representative are already on the candidate list.
    statewide = [
        row
        for row in statewide
        if row["office"] not in ("GOVERNOR", "U. S. SENATOR") and not row["office"].startswith("U. S. REPRESENTATIVE")
    ]
    return {
        "date": quoted_date(
            CAND / "tx.txt",
            "November 03, 2026",
            "The Texas ballot certification prints November 03, 2026.",
        ),
        "statewide": statewide,
        "upper": upper,
        "lower": lower,
    }


def parse_va(places: list[dict]) -> dict:
    rows = html_rows(LISTS / "va.html")
    by_name: dict[str, list[dict]] = defaultdict(list)
    for place in places:
        match = re.match(r"^(.*)\s+(city|town|village|borough|cdp)$", place["name"], re.I)
        if not match:
            continue
        by_name[norm_name(match.group(1))].append({"geoid": place["geoid"], "cls": match.group(2).lower(), "name": place["name"]})

    def place_for(district: str) -> str | None:
        cleaned = district.strip()
        if re.search(r"ward|precinct|seat", cleaned, re.I):
            return None
        kind = None
        label = None
        match = re.fullmatch(r"(Town|City) of (.+)", cleaned)
        if match:
            kind = match.group(1).lower()
            label = norm_name(match.group(2))
        elif re.fullmatch(r".+ City", cleaned):
            kind = "city"
            label = norm_name(cleaned[: -len(" City")])
        if not label:
            return None
        choices = by_name.get(label, [])
        typed = [item for item in choices if item["cls"] == kind] if kind else []
        if len(typed) == 1:
            return typed[0]["geoid"]
        if len(choices) == 1:
            return choices[0]["geoid"]
        return None

    annotations: dict[str, dict] = {}
    upper: dict[str, dict] = {}
    lower: dict[str, dict] = {}
    local_rows: dict[tuple, dict] = {}
    for row in rows:
        if len(row) < 11 or row[0] == "Locality":
            continue
        office, district, seats, term = row[3], row[4], row[5], row[6]
        party, name, mark = row[8], row[9], row[10]
        try:
            order = int(row[2])
        except ValueError:
            continue
        if office == "Member, United States Senate":
            key = office
            ann = annotations.setdefault(key, {"term": term, "marks": []})
            if not any(item["name"] == name and item["party"] == party for item in ann["marks"]):
                ann["marks"].append({"name": name, "party": party, "mark": mark, "order": order})
            continue
        if office == "Member, House of Representatives":
            number = re.search(r"(\d+)", district)
            if not number:
                continue
            key = f"{office} {int(number.group(1))}"
            ann = annotations.setdefault(key, {"term": term, "marks": []})
            if not any(item["name"] == name and item["party"] == party for item in ann["marks"]):
                ann["marks"].append({"name": name, "party": party, "mark": mark, "order": order})
            continue
        if office == "Member, House of Delegates":
            number = re.search(r"(\d+)", district)
            if not number:
                continue
            bucket = lower.setdefault(
                str(int(number.group(1))),
                contest(f"{office} {district}".strip(), str(int(number.group(1))), [], term=term, seats=seats),
            )
            ident = (name, party)
            if not any(item["name"] == name and item["party"] == party for item in bucket["candidates"]):
                bucket["candidates"].append({**person(name, party, mark), "order": order})
            continue
        geoid = place_for(district)
        if not geoid:
            continue
        if office in ("Member, United States Senate", "Member, House of Representatives", "Member, House of Delegates"):
            continue
        local_key = (geoid, office, district)
        bucket = local_rows.setdefault(
            local_key,
            {
                "office": office,
                "district": district,
                "term": term,
                "seats": seats,
                "candidates": [],
            },
        )
        if not any(item["name"] == name and item["party"] == party for item in bucket["candidates"]):
            bucket["candidates"].append({**person(name, party, mark), "order": order})

    def sort_people(people: list[dict]) -> list[dict]:
        people.sort(key=lambda item: item.get("order", 0))
        for item in people:
            item.pop("order", None)
        return people

    for ann in annotations.values():
        sort_people(ann["marks"])
    for item in lower.values():
        sort_people(item["candidates"])
    local: dict[str, list[dict]] = defaultdict(list)
    for (geoid, _office, _district), item in local_rows.items():
        sort_people(item["candidates"])
        if item["candidates"]:
            local[geoid].append(item)
    for geoid in local:
        local[geoid].sort(key=lambda item: (item["office"], item["district"]))
    date = None
    if "November 3, 2026" in (LISTS / "va.html").read_text(encoding="utf-8", errors="replace"):
        date = {
            "quote": "November 3, 2026",
            "text": "The Virginia Department of Elections page is the November 3, 2026 general election candidate list.",
        }
    else:
        raise SystemExit("VA html missing November 3, 2026")
    return {
        "date": date,
        "annotations": annotations,
        "statewide": [],
        "upper": upper,
        "lower": lower,
        "local": local,
    }


def pack_state(parsed: dict) -> dict:
    record = {
        "statewide": parsed.get("statewide", []),
        "upper": parsed.get("upper", {}),
        "lower": parsed.get("lower", {}),
        "local": parsed.get("local", {}),
        "annotations": parsed.get("annotations", {}),
    }
    if parsed.get("date"):
        record["date"] = parsed["date"]
    return record


def main() -> None:
    places = load_places()
    known = {place["geoid"] for rows in places.values() for place in rows}
    sld = build_sld(known)
    (PLACES / "sld.json").write_text(json.dumps(sld, separators=(",", ":"), ensure_ascii=False), encoding="utf-8")

    parsed = {
        "NC": parse_nc(),
        "WI": parse_wi(),
        "MI": parse_mi(),
        "IL": parse_il(),
        "NM": parse_nm(),
        "NE": parse_ne(),
        "TX": parse_tx(),
        "VA": parse_va(places["VA"]),
    }
    OUT.mkdir(parents=True, exist_ok=True)
    local_places = 0
    for code, record in parsed.items():
        packed = pack_state(record)
        local_places += len(packed["local"])
        (OUT / f"{code}.json").write_text(json.dumps(packed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(
            code,
            "statewide",
            len(packed["statewide"]),
            "upper",
            len(packed["upper"]),
            "lower",
            len(packed["lower"]),
            "local places",
            len(packed["local"]),
            "annotations",
            len(packed["annotations"]),
        )
    coverage = {
        "placeCount": len(known),
        "sldPlaces": len(sld),
        "localPlaces": local_places,
        "federalStateOnly": len(known) - local_places,
        "accessed": READ,
    }
    (OUT / "coverage.json").write_text(json.dumps(coverage, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(coverage, indent=2))
    # Spot checks that must not drift.
    va = json.loads((OUT / "VA.json").read_text(encoding="utf-8"))
    if "Mark R. Warner" not in json.dumps(va["annotations"].get("Member, United States Senate", {})):
        raise SystemExit("VA senate annotation missing Warner")
    nc = json.loads((OUT / "NC.json").read_text(encoding="utf-8"))
    if "1" not in nc["upper"] or "1" not in nc["lower"]:
        raise SystemExit("NC legislative districts missing")
    wi = json.loads((OUT / "WI.json").read_text(encoding="utf-8"))
    if "Tony Evers" not in wi["annotations"]["GOVERNOR"]["incumbentLine"]:
        raise SystemExit(wi["annotations"]["GOVERNOR"])
    if "1" not in wi["lower"]:
        raise SystemExit("WI assembly missing")


if __name__ == "__main__":
    main()
