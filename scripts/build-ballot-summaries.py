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


def parse_nm_local(rows: list[list[str]], places: list[dict]) -> dict:
    """Countywide qualified offices. Commissioner and magistrate districts stay off the place."""
    census = census_county_index(places)
    compact = {}
    for name in census.values():
        base = re.sub(r"\s+County$", "", name, flags=re.I)
        compact[re.sub(r"[^a-z]", "", base.lower().replace("ñ", "n"))] = name
    countywide = {
        "County Sheriff",
        "County Assessor",
        "Probate Judge",
        "County Clerk",
        "County Treasurer",
        "County Councilor",
    }
    grouped: dict[tuple[str, str], list[tuple[int, dict]]] = {}
    omitted: set[str] = set()
    seen: set[str] = set()
    for row in rows:
        if len(row) < 9 or row[0] in ("Contest",) or row[8] != "Qualified":
            continue
        office, filing_county = row[0], row[1]
        if not filing_county.strip():
            continue
        if office.startswith(("State Senator", "State Representative", "United States", "Governor", "Lieutenant Governor", "Secretary of State", "Attorney General", "State Auditor", "State Treasurer", "Commissioner of Public Lands")):
            continue
        token = re.sub(r"[^a-z]", "", filing_county.lower())
        county = compact.get(token)
        if not county:
            raise SystemExit(f"NM county {filing_county!r} is not a Census county")
        seen.add(county)
        districted = bool(re.search(r"\b(DISTRICT|DIVISION|DIST)\b", office, re.I))
        if office not in countywide or districted:
            omitted.add(county)
            continue
        try:
            ballot = int(row[7])
        except ValueError:
            continue
        grouped.setdefault((county, office), []).append((ballot, person(row[2], row[3])))
    local_by_county: dict[str, list[dict]] = {}
    for (county, office), people in grouped.items():
        people.sort(key=lambda item: item[0])
        local_by_county.setdefault(county, []).append(contest(office, None, [row for _order, row in people]))
    for county in local_by_county:
        local_by_county[county].sort(key=lambda item: item["office"])
    label = "New Mexico Secretary of State, 2026 General Election Contest/Candidate List"
    href = "https://candidateportal.servis.sos.state.nm.us/CandidateList.aspx"
    county_read = {}
    for county in sorted(census.values()):
        record = {
            "label": label,
            "href": href,
            "intro": f"The New Mexico Secretary of State candidate list names these qualified local offices filed in {county}.",
        }
        if county in omitted:
            record["note"] = (
                f"The New Mexico candidate list also includes district contests filed in {county} and does not "
                "identify which places are in each district, so those contests are not copied here."
            )
        elif county not in local_by_county:
            record["empty"] = (
                f"The New Mexico Secretary of State candidate list does not include a countywide local contest filed in {county}."
            )
        county_read[county] = record
    return {"localByCounty": local_by_county, "countyRead": county_read}


def parse_nm(places: list[dict] | None = None) -> dict:
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
    local = parse_nm_local(visible.rows, places) if places is not None else {}
    return {"statewide": [], "upper": upper, "lower": lower, **local}


def parse_mn(places: list[dict]) -> dict:
    """Countywide offices from cand.txt. County IDs come from the same election's CntyTbl.txt.

    Commissioner districts and soil-and-water districts are not copied onto places.
    """
    census = census_county_index(places)
    codes: dict[str, str] = {}
    for line in (CAND / "mn-cnty.txt").read_text(encoding="utf-8", errors="replace").splitlines():
        if not line.strip():
            continue
        county_id, name, _precincts = line.split(";")
        census_name = census.get(county_key(f"{name} County"))
        if not census_name:
            raise SystemExit(f"MN county {name!r} is not a Census county")
        codes[county_id] = census_name
    if len(codes) != 87:
        raise SystemExit(f"MN county table has {len(codes)} rows")
    countywide = {
        "County Sheriff",
        "County Attorney",
        "County Auditor/Treasurer",
        "County Recorder",
        "County Auditor",
        "County Treasurer",
    }
    grouped: dict[tuple[str, str], list[dict]] = defaultdict(list)
    omitted: set[str] = set()
    for line in (CAND / "mn.txt").read_text(encoding="utf-8", errors="replace").splitlines():
        parts = line.strip().split(";")
        if len(parts) != 7:
            raise SystemExit(f"MN candidate row has {len(parts)} fields")
        _candidate_id, name, _office_id, office, county_id, _party_id, party = parts
        if county_id == "88" or office.startswith(("U.S. ", "State ", "Governor")):
            continue
        county = codes.get(county_id)
        if not county:
            raise SystemExit(f"MN county id {county_id} is not in CntyTbl.txt")
        if office not in countywide:
            omitted.add(county)
            continue
        people = grouped[(county, office)]
        if not any(item["name"] == name and item["party"] == party for item in people):
            people.append(person(name, party))
    local_by_county: dict[str, list[dict]] = defaultdict(list)
    for (county, office), people in grouped.items():
        if people:
            local_by_county[county].append(contest(office, None, people))
    for county in local_by_county:
        local_by_county[county].sort(key=lambda item: item["office"])
    label = "Minnesota Secretary of State, candidate file cand.txt for the November 3, 2026 election"
    href = "https://electionresultsfiles.sos.mn.gov/20261103/cand.txt"
    county_read = {}
    for county in sorted(set(codes.values())):
        record = {
            "label": label,
            "href": href,
            "intro": f"The Minnesota candidate file lists these local offices for {county}.",
        }
        if county in omitted:
            record["note"] = (
                f"The Minnesota candidate file also lists district contests for {county} and does not identify "
                "which places are in each district, so those contests are not copied here."
            )
        elif county not in local_by_county:
            record["empty"] = (
                f"The Minnesota candidate file does not include a countywide local contest for {county}."
            )
        county_read[county] = record
    return {
        "statewide": [],
        "upper": {},
        "lower": {},
        "localByCounty": local_by_county,
        "countyRead": county_read,
        "extraSources": [
            {
                "name": "Minnesota Secretary of State, county table CntyTbl.txt for the November 3, 2026 election",
                "url": "https://electionresultsfiles.sos.mn.gov/20261103/CntyTbl.txt",
            }
        ],
    }


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


def county_key(value: str) -> str:
    value = value.lower().replace("ñ", "n").replace("&", " and ")
    value = value.replace(".", " ").replace("'", "").replace("-", " ")
    return " ".join(re.sub(r"[^a-z0-9]+", " ", value).split())


def census_county_index(places: list[dict]) -> dict[str, str]:
    index: dict[str, str] = {}
    for place in places:
        for county in place["counties"]:
            index[county_key(county)] = county
    return index


def tx_office_class(title: str) -> str:
    text = title.upper()
    if text.startswith("U. S.") or text.startswith("U.S."):
        return "federal"
    if text in {
        "GOVERNOR",
        "LIEUTENANT GOVERNOR",
        "ATTORNEY GENERAL",
        "COMPTROLLER OF PUBLIC ACCOUNTS",
        "COMMISSIONER OF THE GENERAL LAND OFFICE",
        "COMMISSIONER OF AGRICULTURE",
        "RAILROAD COMMISSIONER",
    } or "SUPREME COURT" in text or "COURT OF CRIMINAL APPEALS" in text:
        return "statewide"
    if text.startswith("STATE SENATOR") or text.startswith("STATE REPRESENTATIVE"):
        return "legislature"
    if "STATE BOARD OF EDUCATION" in text:
        return "sboe"
    if "COURT OF APPEALS" in text:
        return "appeals"
    if "PRECINCT" in text:
        return "precinct"
    if (
        "JUDICIAL DISTRICT" in text
        or text.startswith("DISTRICT JUDGE")
        or text.startswith("DISTRICT ATTORNEY")
        or "MULTICOUNTY" in text
    ):
        return "judicial-district"
    if text.startswith("JUSTICE OF THE PEACE"):
        return "jp"
    countyish = (
        "COUNTY" in text
        or text.startswith("DISTRICT CLERK")
        or text.startswith("DISTRICT AND COUNTY CLERK")
        or "SHERIFF" in text
        or text.startswith("PROBATE COURT")
        or text.startswith("JUDGE, PROBATE")
        or text.startswith("CRIMINAL DISTRICT ATTORNEY")
        or text.startswith("CRIMINAL DISTRICT JUDGE")
    )
    if countyish:
        return "local"
    return "other"


def parse_tx_local(places: list[dict]) -> dict:
    """Countywide offices from the certification. Precinct and judicial-district rows stay off the place."""
    census = census_county_index(places)
    compact = {
        re.sub(r"[^A-Z]", "", re.sub(r"\s+County$", "", name, flags=re.I).upper()): name
        for name in census.values()
    }
    text = (CAND / "tx.txt").read_text(encoding="utf-8", errors="replace").splitlines()
    office_re = re.compile(r"[A-Z0-9][A-Z0-9 .,'()/\-&#]*\Z")
    cand_re = re.compile(r"^(.+?)\s+(REP|DEM|LIB|GRE|IND)$")
    county = None
    office = None
    people: list[tuple[str, str]] = []
    blocks: dict[str, dict[str, list[tuple[str, str]]]] = defaultdict(dict)
    classes: dict[str, set[str]] = defaultdict(set)

    def flush() -> None:
        nonlocal office, people
        if county and office and people:
            blocks[county][office] = people[:]
        office = None
        people = []

    for raw in text:
        line = raw.strip()
        match = re.match(r"^County\s+([A-Z][A-Z .'\-]*)$", line)
        if match:
            flush()
            token = re.sub(r"[^A-Z]", "", match.group(1).upper())
            if token not in compact:
                raise SystemExit(f"TX county {match.group(1)!r} is not a Census county")
            county = compact[token]
            continue
        if not county or not line:
            continue
        if line.startswith(("Page ", "08/", "Texas Secretary", "2026 ", "Ballot Certification", "November ")):
            continue
        cand = cand_re.match(line)
        if cand and office:
            people.append((cand.group(1).strip(), cand.group(2)))
            continue
        if office_re.fullmatch(line) and not cand_re.match(line):
            flush()
            office = line
            classes[county].add(tx_office_class(line))
            if tx_office_class(line) == "other":
                raise SystemExit(f"TX unclassified office {line!r}")
    flush()
    if set(blocks) != set(census.values()):
        raise SystemExit(f"TX counties parsed {len(blocks)} census {len(census)}")

    label = "Texas Secretary of State, 2026 ballot certification for the November 3, 2026 general election, signed August 28, 2026"
    href = "https://www.sos.texas.gov/elections/forms/2026-ballot-cert.pdf"
    local_by_county: dict[str, list[dict]] = {}
    county_read: dict[str, dict] = {}
    for name in sorted(census.values()):
        contests = []
        for title, rows in blocks.get(name, {}).items():
            if tx_office_class(title) != "local" or not rows:
                continue
            contests.append(contest(title, None, [person(candidate, party) for candidate, party in rows]))
        kinds = classes.get(name, set())
        omitted = []
        if "precinct" in kinds or "jp" in kinds:
            omitted.append("precinct contests")
        if "judicial-district" in kinds or "appeals" in kinds:
            omitted.append("judicial-district or court-of-appeals contests")
        if "sboe" in kinds:
            omitted.append("State Board of Education contests")
        note = None
        if omitted:
            listed = " and ".join(omitted) if len(omitted) < 3 else ", ".join(omitted[:-1]) + ", and " + omitted[-1]
            note = (
                f"The certification also lists {listed} under {name} and does not identify which "
                "places are in each of those districts, so those contests are not copied here."
            )
        record = {
            "label": label,
            "href": href,
            "intro": f"The Texas ballot certification lists these local offices under {name}.",
        }
        if note:
            record["note"] = note
        if not contests and not note:
            record["empty"] = (
                f"The Texas ballot certification does not include a countywide local contest under {name}."
            )
        if contests:
            local_by_county[name] = contests
        county_read[name] = record
    return {"localByCounty": local_by_county, "countyRead": county_read}


def parse_tx(places: list[dict]) -> dict:
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
    local = parse_tx_local(places)
    return {
        "date": quoted_date(
            CAND / "tx.txt",
            "November 03, 2026",
            "The Texas ballot certification prints November 03, 2026.",
        ),
        "statewide": statewide,
        "upper": upper,
        "lower": lower,
        "localByCounty": local["localByCounty"],
        "countyRead": local["countyRead"],
    }


def parse_va(places: list[dict]) -> dict:
    rows = html_rows(LISTS / "va.html")
    by_name: dict[str, list[dict]] = defaultdict(list)
    for place in places:
        match = re.match(r"^(.*)\s+(city|town|village|borough|cdp)$", place["name"], re.I)
        if not match:
            continue
        by_name[norm_name(match.group(1))].append(
            {
                "geoid": place["geoid"],
                "cls": match.group(2).lower(),
                "name": place["name"],
                "counties": place["counties"],
            }
        )

    census = census_county_index(places)
    by_compact: dict[str, list[dict]] = defaultdict(list)
    for key, items in by_name.items():
        by_compact[key.replace(" ", "")].extend(items)
    city_place = {}
    for place in places:
        if place["name"].endswith(" city"):
            city_place[place["name"]] = place["geoid"]

    def one_place(label: str, kind: str | None) -> dict | None:
        choices = by_name.get(norm_name(label), [])
        if not choices:
            choices = by_compact.get(norm_name(label).replace(" ", ""), [])
        if kind:
            typed = [item for item in choices if item["cls"] == kind]
            if len(typed) == 1:
                return typed[0]
        incorporated = [item for item in choices if item["cls"] in ("city", "town")]
        if len(incorporated) == 1:
            return incorporated[0]
        if len(choices) == 1:
            return choices[0]
        if label.lower().startswith("mt "):
            return one_place("Mount " + label[3:], kind)
        return None

    skip_label = re.compile(
        r"^(at large|at-large|special|seat [a-z0-9]+|district \d+[a-z]?|ward \d+|district [a-z])$",
        re.I,
    )

    def place_from_label(label: str, strong: bool) -> dict | None:
        label = label.strip()
        if not label or skip_label.match(label):
            return None
        match = re.fullmatch(r"(Town|City) of (.+)", label)
        if match:
            return one_place(match.group(2), match.group(1).lower())
        match = re.fullmatch(r"(.+) City", label)
        if match:
            return one_place(match.group(1), "city")
        match = re.match(r"^(.+?)\s+Ward\b", label)
        if match and not re.search(r"\b(district|precinct)\b", label, re.I):
            found = one_place(match.group(1), None)
            if found:
                return found
        if not strong or re.search(r"\b(district|ward|precinct|seat|borough)\b", label, re.I):
            return None
        return one_place(label, None)

    countywide_offices = {
        "sheriff",
        "treasurer",
        "commonwealth's attorney",
        "clerk of court",
        "commissioner of revenue",
        "member county board",
        "chairman board of supervisors",
        "member board of supervisors at large",
    }

    def is_at_large(district: str, county: str | None) -> bool:
        folded = county_key(district) if district.strip() else ""
        if folded in ("", "at large", "at-large"):
            return True
        return bool(county and folded == county_key(county))

    def named_counties(district: str) -> list[str] | None:
        if "," not in district:
            return None
        found = []
        for part in [piece.strip() for piece in district.split(",")]:
            county = census.get(county_key(part))
            if county:
                found.append(county)
                continue
            place = place_from_label(part, strong=True)
            if place and len(place["counties"]) == 1:
                found.append(place["counties"][0])
                continue
            return None
        return found or None

    annotations: dict[str, dict] = {}
    upper: dict[str, dict] = {}
    lower: dict[str, dict] = {}
    local_rows: dict[tuple, dict] = {}
    county_rows: dict[tuple, dict] = {}
    unmapped: set[tuple[str, str, str]] = set()
    seen_localities: set[str] = set()
    for row in rows:
        if len(row) < 11 or row[0] == "Locality":
            continue
        office, district, seats, term = row[3], row[4], row[5], row[6]
        party, name, mark = row[8], row[9], row[10]
        seen_localities.add(row[0])
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
        county = census.get(county_key(row[0]))
        labels = [part.strip() for part in office.split(" - ")[1:]]
        if district.strip():
            labels.append(district.strip())
        matched = None
        for label in labels:
            matched = place_from_label(label, strong=True)
            if matched:
                break
        municipal = office.startswith("Mayor") or "Town Council" in office or office.startswith("Member City Council")
        if not matched and municipal:
            for label in labels:
                matched = place_from_label(label, strong=True)
                if matched:
                    break
        if matched and county and county not in matched["counties"] and not any(
            piece.lower().startswith("town of") or piece.lower().startswith("city of") for piece in labels
        ):
            matched = None
        base = office.split(" - ")[0].strip().casefold()
        school = base.startswith("member school board") or base.startswith("member, school board")
        multi = named_counties(district) if base in countywide_offices else None
        payload = {
            "office": office,
            "district": district,
            "term": term,
            "seats": seats,
            "candidates": [],
        }
        if matched:
            bucket = local_rows.setdefault((matched["geoid"], office, district), dict(payload))
            if not any(item["name"] == name and item["party"] == party for item in bucket["candidates"]):
                bucket["candidates"].append({**person(name, party, mark), "order": order})
            continue
        if multi:
            for county_name in multi:
                bucket = county_rows.setdefault((county_name, office, district), dict(payload))
                if not any(item["name"] == name and item["party"] == party for item in bucket["candidates"]):
                    bucket["candidates"].append({**person(name, party, mark), "order": order})
            continue
        if county and (base in countywide_offices or school or base == "member board of supervisors at large") and is_at_large(district, county):
            bucket = county_rows.setdefault((county, office, district), dict(payload))
            if not any(item["name"] == name and item["party"] == party for item in bucket["candidates"]):
                bucket["candidates"].append({**person(name, party, mark), "order": order})
            continue
        if county and county.endswith(" city") and county in city_place:
            bucket = local_rows.setdefault((city_place[county], office, district), dict(payload))
            if not any(item["name"] == name and item["party"] == party for item in bucket["candidates"]):
                bucket["candidates"].append({**person(name, party, mark), "order": order})
            continue
        if county:
            unmapped.add((county, office, district))

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
    local_by_county: dict[str, list[dict]] = defaultdict(list)
    for (county_name, _office, _district), item in county_rows.items():
        sort_people(item["candidates"])
        if item["candidates"]:
            local_by_county[county_name].append(item)
    for county_name in local_by_county:
        local_by_county[county_name].sort(key=lambda item: (item["office"], item["district"]))
    unmapped_counties: set[str] = {county for county, _office, _district in unmapped}
    label = "Virginia Department of Elections, November 3, 2026 general election candidate list, all offices"
    href = "https://www.elections.virginia.gov/casting-a-ballot/candidate-list/november-3-2026-gen-elect-all-offices/"
    county_read: dict[str, dict] = {}
    for locality in seen_localities:
        county_name = census.get(county_key(locality))
        if not county_name:
            continue
        record = {
            "label": label,
            "href": href,
            "intro": f"The Virginia Department of Elections November 3, 2026 list names these local offices under {county_name}.",
        }
        city_has_place_contests = county_name.endswith(" city") and city_place.get(county_name) in local
        if county_name in unmapped_counties:
            record["note"] = (
                f"The Virginia list also includes contests in {county_name} whose district cell does not name "
                "one Census place, so those contests are not copied here."
            )
        elif county_name not in local_by_county and not city_has_place_contests:
            record["empty"] = (
                f"The Virginia Department of Elections November 3, 2026 list does not include a countywide "
                f"local contest for {county_name}."
            )
        county_read[county_name] = record
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
        "localIntro": "The Virginia Department of Elections November 3, 2026 list names these local offices for this place.",
        "localByCounty": local_by_county,
        "countyRead": county_read,
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
    for key in ("localIntro", "localByCounty", "countyRead", "countyUnpublished", "extraSources"):
        if parsed.get(key):
            record[key] = parsed[key]
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
        "MN": parse_mn(places["MN"]),
        "IL": parse_il(),
        "NM": parse_nm(places["NM"]),
        "NE": parse_ne(),
        "TX": parse_tx(places["TX"]),
        "VA": parse_va(places["VA"]),
    }
    OUT.mkdir(parents=True, exist_ok=True)
    packed_by: dict[str, dict] = {}
    for code, record in parsed.items():
        packed = pack_state(record)
        packed_by[code] = packed
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
            "counties",
            len(packed.get("localByCounty", {})),
            "annotations",
            len(packed["annotations"]),
        )

    def has_local(place: dict, packed: dict) -> bool:
        if packed.get("local", {}).get(place["geoid"]):
            return True
        by_county = packed.get("localByCounty") or {}
        return any(by_county.get(county) for county in place["counties"])

    by_state: dict[str, dict] = {}
    local_places = 0
    unchecked_places = 0
    for code in sorted(places):
        rows = places[code]
        packed = packed_by.get(code, {})
        read = set(packed.get("countyRead") or {})
        unpublished = set(packed.get("countyUnpublished") or {})
        counties = {county for place in rows for county in place["counties"]}
        with_local = sum(1 for place in rows if has_local(place, packed))
        unchecked = sum(
            1
            for place in rows
            if any(county not in read and county not in unpublished for county in place["counties"])
        )
        local_places += with_local
        unchecked_places += unchecked
        by_state[code] = {
            "places": len(rows),
            "placesWithLocal": with_local,
            "counties": len(counties),
            "countiesRead": len(counties & read),
            "countiesUnpublished": len(counties & unpublished),
            "countiesUnchecked": len(counties - read - unpublished),
        }
    local_sources = []
    seen_sources = set()
    for packed in packed_by.values():
        for source in packed.get("extraSources") or []:
            key = (source["name"], source["url"])
            if key in seen_sources:
                continue
            seen_sources.add(key)
            local_sources.append({**source, "accessed": READ})
        for listing in (packed.get("countyRead") or {}).values():
            key = (listing["label"], listing["href"])
            if key in seen_sources:
                continue
            seen_sources.add(key)
            local_sources.append({"name": listing["label"], "url": listing["href"], "accessed": READ})
    coverage = {
        "placeCount": len(known),
        "sldPlaces": len(sld),
        "localPlaces": local_places,
        "federalStateOnly": len(known) - local_places,
        "placesUnchecked": unchecked_places,
        "accessed": READ,
        "localSources": local_sources,
        "byState": by_state,
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
    tx = json.loads((OUT / "TX.json").read_text(encoding="utf-8"))
    harris = tx["localByCounty"]["Harris County"]
    if not any(item["office"] == "COUNTY JUDGE" and item["candidates"][0]["name"] == "ORLANDO SANCHEZ" for item in harris):
        raise SystemExit("TX Harris county judge missing")
    if any("PRECINCT" in item["office"] for rows in tx["localByCounty"].values() for item in rows):
        raise SystemExit("TX precinct contest was copied onto a county")
    belle = va["local"].get("5105912", [])
    if not any(item["office"].startswith("Mayor") for item in belle):
        raise SystemExit("VA Belle Haven mayor missing")
    if "gmail" in json.dumps(va["local"]).lower() or "gmail" in json.dumps(va.get("localByCounty", {})).lower():
        raise SystemExit("VA local JSON contains an email")
    nm = json.loads((OUT / "NM.json").read_text(encoding="utf-8"))
    bernalillo = nm["localByCounty"].get("Bernalillo County", [])
    if not any(item["office"] == "County Sheriff" for item in bernalillo):
        raise SystemExit("NM Bernalillo sheriff missing")
    if "DISTRICT" in json.dumps([item["office"] for rows in nm["localByCounty"].values() for item in rows]):
        raise SystemExit("NM district contest copied as countywide")
    mn = json.loads((OUT / "MN.json").read_text(encoding="utf-8"))
    if "County Sheriff" not in {item["office"] for item in mn["localByCounty"].get("Hennepin County", [])}:
        raise SystemExit("MN Hennepin sheriff missing")
    if any("District" in item["office"] for rows in mn["localByCounty"].values() for item in rows):
        raise SystemExit("MN district contest copied as countywide")


if __name__ == "__main__":
    main()
