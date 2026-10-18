#!/usr/bin/env python3
"""Turn official 2026 general-election lists read on October 17, 2026 into JSON.

The script reads files already downloaded under /tmp/cand. It does not guess
names. States without a file written here get an unpublished record.
"""

from __future__ import annotations

import csv
import html as html_lib
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

import openpyxl

ROOT = Path("/workspace")
CAND = Path("/tmp/cand")
LISTS = CAND / "lists"
OUT = ROOT / "src" / "data" / "candidates"
READ = "October 17, 2026"

PARTIES_CA = (
    "American Independent",
    "Peace and Freedom",
    "No Party Preference",
    "Non-Partisan",
    "Nonpartisan",
    "Democratic",
    "Republican",
    "Libertarian",
    "Green",
)


def contest(office: str, kind: str, district: str | None, people: list[dict]) -> dict:
    return {"office": office, "kind": kind, "district": district, "candidates": people}


def person(name: str, party: str) -> dict:
    name = " ".join(name.split())
    party = " ".join(party.split())
    if not name:
        raise SystemExit("empty candidate name")
    return {"name": name, "party": party}


def pack(sources: list[dict], contests: list[dict]) -> dict:
    return {"status": "published", "sources": sources, "contests": contests}


def source(name: str, url: str, published: str | None = None) -> dict:
    row = {"name": name, "url": url, "accessed": READ}
    if published:
        row["published"] = published
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


def parse_nc() -> dict:
    text = (CAND / "nc.txt").read_text(encoding="utf-8", errors="replace")
    office = None
    buckets: list[dict] = []
    current: list[dict] = []

    def flush() -> None:
        nonlocal current, office
        if office and current:
            if office == "US SENATE":
                buckets.append(contest(office, "senate", None, current))
            else:
                number = re.search(r"(\d+)", office).group(1)
                buckets.append(contest(office, "house", str(int(number)), current))
        current = []

    for raw in text.splitlines():
        line = raw.strip()
        if line and not raw.startswith(" "):
            if re.fullmatch(r"US SENATE", line) or re.fullmatch(r"US HOUSE OF REPRESENTATIVES DISTRICT \d+", line):
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
    return pack(
        [
            source(
                "North Carolina State Board of Elections, 2026 general candidate list by contest (federal and state), printed Oct 13, 2026 12:25 pm",
                "https://dl.ncsbe.gov/Elections/2026/Candidate%20Filing/2026_general_candidate_list_by_contest_federal_and_state.pdf",
                "October 13, 2026",
            )
        ],
        [row for row in buckets if row["kind"] in ("senate", "house")],
    )


def parse_tx() -> dict:
    text = (CAND / "tx.txt").read_text(encoding="utf-8", errors="replace")
    office = None
    seen: set[str] = set()
    buckets: dict[str, dict] = {}
    for raw in text.splitlines():
        line = raw.strip()
        header = None
        if line == "U. S. SENATOR":
            header = ("senate", None, "U. S. SENATOR")
        elif line == "GOVERNOR":
            header = ("governor", None, "GOVERNOR")
        else:
            match = re.fullmatch(r"U\. S\. REPRESENTATIVE DISTRICT (\d+)", line)
            if match:
                header = ("house", str(int(match.group(1))), line)
        if header:
            office = header
            key = f"{header[0]}:{header[1]}"
            if key not in seen:
                seen.add(key)
                buckets[key] = contest(header[2], header[0], header[1], [])
            else:
                office = None
            continue
        match = re.fullmatch(r"([A-Z][A-Z .'\-]*[A-Z])\s+(REP|DEM|LIB|GRE)", line)
        if office and match:
            key = f"{office[0]}:{office[1]}"
            buckets[key]["candidates"].append(person(match.group(1), match.group(2)))
            continue
        if office and line and re.fullmatch(r"[A-Z0-9][A-Z0-9 .,'/\-]*", line):
            office = None
    return pack(
        [
            source(
                "Texas Secretary of State, 2026 ballot certification for the November 3, 2026 general election, signed August 28, 2026",
                "https://www.sos.texas.gov/elections/forms/2026-ballot-cert.pdf",
                "August 28, 2026",
            )
        ],
        list(buckets.values()),
    )


def parse_ca() -> dict:
    lines = [
        line.strip()
        for line in (CAND / "ca-raw.txt").read_text(encoding="utf-8", errors="replace").splitlines()
        if line.strip()
    ]
    office = None
    expecting = None
    buckets: list[dict] = []
    current: list[dict] = []

    def flush() -> None:
        nonlocal current, office, expecting
        if office and current:
            if office == "Governor":
                buckets.append(contest("Governor", "governor", None, current))
            else:
                number = re.search(r"(\d+)", office).group(1)
                buckets.append(contest(office, "house", str(int(number)), current))
        current = []
        expecting = None

    for line in lines:
        if line in ("* Incumbent",) or line.startswith("Page ") or line.startswith("General Election") or line.startswith("Official Certified"):
            continue
        if line == "Governor" or re.fullmatch(r"United States Representative District \d+", line):
            flush()
            office = line
            expecting = "candidate"
            continue
        if office is None:
            continue
        party = next((item for item in PARTIES_CA if line.endswith(" " + item)), None)
        if expecting == "candidate" and party:
            name = line[: -len(party)].strip().rstrip("*").strip()
            current.append(person(name, party))
            expecting = "designation"
            continue
        if expecting == "designation":
            expecting = "candidate"
            continue
        flush()
        office = None
    flush()
    return pack(
        [
            source(
                "California Secretary of State, certified list of candidates for the November 3, 2026 general election",
                "https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf",
                "August 27, 2026",
            )
        ],
        buckets,
    )


def parse_wi() -> dict:
    text = (CAND / "wi.txt").read_text(encoding="utf-8", errors="replace")
    office = None
    pending: list[tuple[int, str, str]] = []
    buckets: list[dict] = []

    def flush() -> None:
        nonlocal pending, office
        if office and pending:
            pending.sort(key=lambda item: item[0])
            people = [person(name, party) for _order, name, party in pending]
            if office == "GOVERNOR":
                buckets.append(contest("GOVERNOR", "governor", None, people))
            else:
                number = re.search(r"(\d+)", office).group(1)
                buckets.append(contest(office, "house", str(int(number)), people))
        pending = []

    for raw in text.splitlines():
        if "Office :" in raw:
            flush()
            label = raw.split("Office :", 1)[1]
            label = label.split("Incumbent:")[0].strip()
            office = label if label == "GOVERNOR" or label.startswith("REPRESENTATIVE IN CONGRESS DISTRICT") else None
            continue
        if office is None or raw.strip().startswith("Total Number"):
            continue
        match = re.match(r"^\s*(\d+)\s+(?:\d{5,}\s+)?(.+?)\s{2,}([A-Za-z].+?)\s*$", raw)
        if match:
            pending.append((int(match.group(1)), match.group(2).strip(), match.group(3).strip()))
            continue
        # Wrapped party word, kept with the previous candidate.
        wrap = raw.strip()
        if pending and wrap and wrap[0].isalpha() and " " not in wrap and not wrap.startswith("Printed"):
            order, name, party = pending[-1]
            pending[-1] = (order, name, f"{party} {wrap}")
    flush()
    return pack(
        [
            source(
                "Wisconsin Elections Commission, candidates on the ballot, 2026 General Election, printed 8/25/2026 4:39:33 PM",
                "https://elections.wi.gov/sites/default/files/documents/Candidates%20on%20Ballot%20By%20Election_November%203%202026%20General%20Election.pdf",
                "August 25, 2026",
            )
        ],
        buckets,
    )


def parse_ia() -> dict:
    text = (CAND / "ia.txt").read_text(encoding="utf-8", errors="replace")
    office = None
    buckets: list[dict] = []
    current: list[dict] = []
    parties = ("Republican", "Democratic", "Libertarian", "No Party")

    def flush() -> None:
        nonlocal current, office
        if office and current:
            if office == "United States Senator":
                buckets.append(contest(office, "senate", None, current))
            elif office == "Governor":
                buckets.append(contest(office, "governor", None, current))
            else:
                number = re.search(r"(\d+)", office).group(1)
                buckets.append(contest(office, "house", str(int(number)), current))
        current = []

    for raw in text.splitlines():
        line = raw.strip()
        header = None
        for label in (
            "United States Senator",
            "Governor",
            *[f"United States Representative District {n}" for n in range(1, 5)],
        ):
            if line.startswith(label + " ") or line == label:
                header = label
                break
        if header:
            flush()
            office = header
            rest = line[len(header) :].strip()
        else:
            rest = line
            if office not in (
                "United States Senator",
                "Governor",
                *[f"United States Representative District {n}" for n in range(1, 5)],
            ):
                continue
        for party in parties:
            if rest.startswith(party + " "):
                tail = rest[len(party) :].strip()
                name = re.split(r"\s{2,}|\s+(?:PO Box|\d)", tail, maxsplit=1)[0].strip(" -")
                current.append(person(name, party))
                break
        else:
            if header is None and office and rest.startswith("Lieutenant"):
                flush()
                office = None
    flush()
    return pack(
        [
            source(
                "Iowa Secretary of State, candidate list, November 3, 2026 general election",
                "https://sos.iowa.gov/sites/default/files/2026-08/2026%20General%20-%20Candidate%20List%20Database%20-%20All%20Elections_1.pdf",
            )
        ],
        buckets,
    )


def parse_me() -> dict:
    book = openpyxl.load_workbook(CAND / "me.xlsx", data_only=True)
    sheet = book["November 3, 2026"]
    rows = list(sheet.iter_rows(values_only=True))
    header = [str(cell).strip() if cell is not None else "" for cell in rows[0]]
    index = {name: pos for pos, name in enumerate(header)}
    grouped: dict[tuple, list] = {}
    order: list[tuple] = []
    for row in rows[1:]:
        office = row[index["Office"]]
        if office not in ("US", "CG", "GOV"):
            continue
        district = row[index["Dist"]]
        key = (office, None if district in (None, "") else str(int(district)) if str(district).isdigit() else str(district))
        last = row[index["Last Name"]] or ""
        first = row[index["First Name"]] or ""
        middle = row[index["Middle Name"]] or ""
        suffix = row[index["Suffix"]] or ""
        given = " ".join(part for part in (str(first).strip(), str(middle).strip(), str(suffix).strip()) if part)
        name = f"{str(last).strip()}, {given}" if given else str(last).strip()
        party = row[index["Party"]]
        party_text = "" if party is None else str(party).strip()
        if key not in grouped:
            grouped[key] = []
            order.append(key)
        grouped[key].append(person(name, party_text))
    labels = {"US": "US", "CG": "CG", "GOV": "GOV"}
    kinds = {"US": "senate", "CG": "house", "GOV": "governor"}
    contests = []
    for key in order:
        office, district = key
        title = labels[office] if office != "CG" else f"CG {district}"
        contests.append(contest(title, kinds[office], district if office == "CG" else None, grouped[key]))
    return pack(
        [
            source(
                "Maine Secretary of State, 2026 general election candidate list (Excel)",
                "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/2026%20General%20Candidate%20List%20-%20FINAL.xlsx",
            )
        ],
        contests,
    )


def parse_mn() -> dict:
    rows = (CAND / "mn.txt").read_text(encoding="latin1").splitlines()
    grouped: dict[str, list] = {}
    order: list[str] = []
    for raw in rows:
        parts = raw.split(";")
        if len(parts) < 7:
            continue
        office = parts[3]
        if office not in ("U.S. Senator",) and not office.startswith("U.S. Representative District") and "Governor" not in office:
            continue
        if office not in grouped:
            grouped[office] = []
            order.append(office)
        grouped[office].append(person(parts[1], parts[-1]))
    contests = []
    for office in order:
        if office == "U.S. Senator":
            contests.append(contest(office, "senate", None, grouped[office]))
        elif "Governor" in office:
            contests.append(contest(office, "governor", None, grouped[office]))
        else:
            number = re.search(r"(\d+)", office).group(1)
            contests.append(contest(office, "house", str(int(number)), grouped[office]))
    return pack(
        [
            source(
                "Minnesota Secretary of State, candidate file cand.txt for the November 3, 2026 election",
                "https://electionresultsfiles.sos.mn.gov/20261103/cand.txt",
            )
        ],
        contests,
    )


def fl_people(table_html: str) -> list[dict]:
    parser = Rows()
    parser.feed(table_html)
    people = []
    for row in parser.rows:
        cells = [cell for cell in row if cell]
        if not cells or cells[0] in ("Candidate", "District"):
            continue
        if row[0].isdigit():
            text = row[1] if len(row) > 1 else ""
        else:
            text = row[0]
        if "Qualified" not in row:
            continue
        text = text.replace("*Incumbent", "").replace("*", "").strip()
        match = re.search(r"\(([A-Z]+)\)", text)
        if not match:
            continue
        party = match.group(1)
        before = text[: match.start()].strip(" /")
        after = text[match.end() :].strip()
        if after.startswith("/"):
            before = f"{before} / {after[1:].strip()}"
        people.append(person(before, party))
    return people


def parse_fl() -> dict:
    fed = (CAND / "fl-fed.html").read_text(encoding="utf-8", errors="replace")
    cab = (LISTS / "fl-cab.html").read_text(encoding="utf-8", errors="replace")
    contests = []
    for html, kind in ((fed, "fed"), (cab, "cab")):
        parts = re.split(r'color="#CCOOOO"[^>]*>\s*<b>\s*([^<]+?)\s*</b>', html)
        for pos in range(1, len(parts), 2):
            title = " ".join(parts[pos].split())
            body = parts[pos + 1]
            if title == "United States Senator":
                contests.append(contest(title, "senate", None, fl_people(body.split("</table>", 1)[0])))
            elif title == "United States Representative":
                # District tables follow this header until the next bold office.
                people_by_district: dict[str, list] = {}
                order: list[str] = []
                parser = Rows()
                parser.feed(body)
                current = None
                for row in parser.rows:
                    if not row or row[0] in ("District", "Candidate"):
                        continue
                    if row[0].isdigit():
                        current = str(int(row[0]))
                        text = row[1] if len(row) > 1 else ""
                    elif current and len(row) > 1 and row[1]:
                        text = row[1]
                    else:
                        continue
                    if "Qualified" not in row:
                        continue
                    text = text.replace("*Incumbent", "").replace("*", "").strip()
                    match = re.search(r"\(([A-Z]+)\)", text)
                    if not match:
                        continue
                    if current not in people_by_district:
                        people_by_district[current] = []
                        order.append(current)
                    before = text[: match.start()].strip(" /")
                    after = text[match.end() :].strip()
                    if after.startswith("/"):
                        before = f"{before} / {after[1:].strip()}"
                    people_by_district[current].append(person(before, match.group(1)))
                for district in order:
                    contests.append(
                        contest(
                            f"United States Representative District {district}",
                            "house",
                            district,
                            people_by_district[district],
                        )
                    )
            elif title == "Governor" and kind == "cab":
                contests.append(contest("Governor", "governor", None, fl_people(body.split("</table>", 1)[0])))
    return pack(
        [
            source(
                "Florida Division of Elections, qualified candidate listing for the November 3, 2026 general election (name order)",
                "https://dos.elections.myflorida.com/candidates/CanList.asp?elecid=20261103-GEN",
            )
        ],
        contests,
    )


def parse_ak() -> dict:
    html = (CAND / "ak.html").read_text(encoding="utf-8", errors="replace")
    chunks = re.split(r"<h4[^>]*>\s*(?:<a[^>]*>\s*</a>)?\s*([^<]+)</h4>", html)
    contests = []
    wanted = {
        "GOVERNOR / LIEUTENANT GOVERNOR": ("governor", None),
        "UNITED STATES SENATOR": ("senate", None),
        "UNITED STATES REPRESENTATIVE": ("house", "0"),
    }
    for pos in range(1, len(chunks), 2):
        title = " ".join(chunks[pos].split())
        if title not in wanted:
            continue
        kind, district = wanted[title]
        people = []
        for match in re.finditer(
            r"<strong>([^<]+)</strong>\s*<br>\s*<small>\(([^)]+)\)\s*\(([^)]+)\)</small>",
            chunks[pos + 1],
        ):
            status = match.group(3).strip()
            if status != "Certified":
                continue
            people.append(person(html_lib.unescape(match.group(1)), html_lib.unescape(match.group(2))))
        contests.append(contest(title, kind, district, people))
    return pack(
        [
            source(
                "Alaska Division of Elections, 2026 general election candidate list (page last updated September 25, 2026)",
                "https://www.elections.alaska.gov/candidates/?election=26genr",
                "September 25, 2026",
            )
        ],
        contests,
    )


def parse_mi() -> dict:
    rows = html_rows(CAND / "mi.html")
    office = None
    buckets: list[dict] = []
    current: list[dict] = []

    def flush() -> None:
        nonlocal current, office
        if office and current:
            buckets.append(office_contest(office, current))
        current = []

    for row in rows:
        text = " ".join(cell for cell in row if cell)
        if "Position" in text and (
            "Governor / Lt. Governor" in text or "U.S. Senate" in text or "Representative in Congress" in text
        ):
            flush()
            office = re.sub(r"\s+Files In [A-Z][A-Za-z .'-]* County$", "", text)
            continue
        if "Position" in text or "Judge" in text or "Justice" in text:
            flush()
            office = None
            continue
        if office is None or len(row) < 5:
            continue
        party = row[3].strip()
        name = row[4].strip()
        if party.endswith("Party") and name:
            current.append(person(name, party))
    flush()
    return pack(
        [
            source(
                "Michigan Bureau of Elections, official candidate listing, November 3, 2026 general election",
                "https://mi-boe.entellitrak.com/etk-mi-boe-prod/page.request.do?electionType=GEN&electionYear=2026&page=page.miboePublicReport",
            )
        ],
        buckets,
    )


def office_contest(title: str, people: list[dict]) -> dict:
    if title.startswith("Governor"):
        return contest(title, "governor", None, people)
    if "U.S. Senate" in title:
        return contest(title, "senate", None, people)
    match = re.search(r"(\d+)", title)
    district = str(int(match.group(1))) if match else "0"
    return contest(title, "house", district, people)


def parse_co() -> dict:
    text = (LISTS / "co.md").read_text(encoding="utf-8", errors="replace")
    grouped: dict[tuple, list] = {}
    order: list[tuple] = []
    for line in text.splitlines():
        if not line.startswith("|"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 5 or cells[0] in ("Candidate name", "---"):
            continue
        name, office, district, party, write_in = cells[:5]
        if write_in != "N":
            continue
        if office not in ("US Senate", "US House of Representatives", "Governor"):
            continue
        key = (office, None if district == "State" else str(int(district)))
        if key not in grouped:
            grouped[key] = []
            order.append(key)
        grouped[key].append(person(name, party))
    contests = []
    for office, district in order:
        kind = {"US Senate": "senate", "Governor": "governor", "US House of Representatives": "house"}[office]
        title = office if district is None else f"{office} {district}"
        contests.append(contest(title, kind, district, grouped[(office, district)]))
    return pack(
        [
            source(
                "Colorado Secretary of State, 2026 general election official candidate list (certified to the counties on September 4; names stricken through or marked write-in are not copied)",
                "https://coloradosos.gov/pubs/elections/vote/generalCandidates.html",
                "September 4, 2026",
            )
        ],
        contests,
    )


def parse_ne() -> dict:
    text = (LISTS / "ne.md").read_text(encoding="utf-8", errors="replace")
    grouped: dict[tuple, list] = {}
    order: list[tuple] = []
    for line in text.splitlines():
        if not line.startswith("| For "):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 6:
            continue
        office, district, _term, _vote, party, name = cells[:6]
        if office not in ("For United States Senator", "For Representative in Congress", "For Governor and Lt. Governor"):
            continue
        number = None
        if office == "For Representative in Congress":
            number = str(int(re.search(r"(\d+)", district).group(1)))
        key = (office, number)
        if key not in grouped:
            grouped[key] = []
            order.append(key)
        grouped[key].append(person(name, party))
    contests = []
    for office, number in order:
        kind = "senate" if "Senator" in office else "governor" if "Governor" in office else "house"
        title = office if number is None else f"{office} District {number}"
        contests.append(contest(title, kind, number, grouped[(office, number)]))
    return pack(
        [
            source(
                "Nebraska Secretary of State, final statewide general candidate list, November 3, 2026 general election",
                "https://sos.nebraska.gov/sites/default/files/doc/elections/2026/Final_Statewide_General_Candidate_Filing_List_9.11.26.pdf",
                "September 11, 2026",
            )
        ],
        contests,
    )


def parse_ny() -> dict:
    text = (LISTS / "ny.md").read_text(encoding="utf-8", errors="replace")
    contests = []
    current: dict | None = None
    people: list[dict] = []

    def flush() -> None:
        nonlocal current, people
        if current and people:
            contests.append(contest(current["office"], current["kind"], current["district"], people))
        current = None
        people = []

    pending_house = False
    for raw in text.splitlines():
        line = raw.strip()
        house = re.search(r"Representative in Congress(?:\s+District:)?\s+(\d+)\b", line)
        if house and "Office" in line:
            flush()
            district = str(int(house.group(1)))
            current = {"office": f"Representative in Congress {district}", "kind": "house", "district": district}
            pending_house = False
            continue
        if line.startswith("Office: Representative in Congress"):
            flush()
            pending_house = True
            continue
        if pending_house:
            match = re.search(r"District:\s*(\d+)", line)
            if match:
                district = str(int(match.group(1)))
                current = {"office": f"Representative in Congress {district}", "kind": "house", "district": district}
                pending_house = False
            continue
        if line.startswith("Office: Governor"):
            flush()
            current = {"office": "Governor and Lt. Governor", "kind": "governor", "district": None}
            continue
        if line.startswith("Office:") or (line.startswith("| Office:")):
            flush()
            continue
        if current is None or not line.startswith("|"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 2 or cells[0] in ("Party", "---") or set(cells[0]) <= {"-"}:
            continue
        party = cells[0]
        if current["kind"] == "governor" and len(cells) >= 3 and cells[1]:
            name = cells[1] if not cells[2] else f"{cells[1]} / {cells[2]}"
            people.append(person(name, party))
        elif len(cells) >= 2 and cells[1] and cells[0] not in ("Governor Candidate Name",):
            people.append(person(cells[1], party))
    flush()
    return pack(
        [
            source(
                "New York State Board of Elections, amended certification for the November 3, 2026 general election",
                "https://elections.ny.gov/system/files/documents/2026/10/accessible-2026-general-ballot-certification-10.7.2026.pdf",
                "October 7, 2026",
            )
        ],
        contests,
    )


def tn_rows(path: Path, parties: tuple[str, ...]) -> list[tuple[str, str]]:
    people = []
    for raw in path.read_text(encoding="utf-8", errors="replace").splitlines():
        line = raw.strip()
        if not line or line.startswith("Name") or line.startswith("Candidates") or line.startswith("November") or line.startswith("Page") or line.startswith("Jurisdictio"):
            continue
        party = next((item for item in parties if re.search(rf"\s{re.escape(item)}(?:\s|$)", line)), None)
        if not party:
            continue
        name = line.split(party, 1)[0].strip()
        if name and name not in ("District",):
            people.append((name, party))
    return people


def parse_tn() -> dict:
    subprocess.check_call(["pdftotext", "-layout", str(LISTS / "tn-house.pdf"), str(LISTS / "tn-house.txt")])
    subprocess.check_call(["pdftotext", "-layout", str(LISTS / "tn-sen.pdf"), str(LISTS / "tn-sen.txt")])
    subprocess.check_call(["pdftotext", "-layout", str(LISTS / "tn-gov.pdf"), str(LISTS / "tn-gov.txt")])
    parties = ("Republican", "Democratic", "Independent")
    senate = [person(name, party) for name, party in tn_rows(LISTS / "tn-sen.txt", parties)]
    governor = [person(name, party) for name, party in tn_rows(LISTS / "tn-gov.txt", parties)]
    house_text = (LISTS / "tn-house.txt").read_text(encoding="utf-8", errors="replace")
    parts = re.split(r"District\s+(\d+)", house_text)
    contests = [contest("United States Senate", "senate", None, senate), contest("Governor", "governor", None, governor)]
    for pos in range(1, len(parts), 2):
        district = str(int(parts[pos]))
        body = parts[pos + 1]
        people = []
        for raw in body.splitlines():
            if raw.strip().startswith("Jurisdictio") or raw.strip().startswith("District"):
                break
            line = raw.strip()
            party = next((item for item in parties if re.search(rf"\s{re.escape(item)}(?:\s|$)", line)), None)
            if not party or line.startswith("Name"):
                continue
            people.append(person(line.split(party, 1)[0].strip(), party))
        contests.append(contest(f"United States House of Representatives District {district}", "house", district, people))
    return pack(
        [
            source(
                "Tennessee Secretary of State, candidate lists for the November 3, 2026 general election (Governor, United States Senate, and United States House PDFs)",
                "https://sos.tn.gov/elections/2026-candidate-lists",
            )
        ],
        contests,
    )


ORDINALS = {
    "First": "1",
    "Second": "2",
    "Third": "3",
    "Fourth": "4",
    "Fifth": "5",
    "Sixth": "6",
    "Seventh": "7",
    "Eighth": "8",
    "Ninth": "9",
    "Tenth": "10",
    "Eleventh": "11",
    "Twelfth": "12",
}


def parse_nj() -> dict:
    senate_text = (LISTS / "nj-sen.txt").read_text(encoding="utf-8", errors="replace")
    house_text = (LISTS / "nj-house.txt").read_text(encoding="utf-8", errors="replace")
    senate = nj_people(senate_text)
    contests = [contest("US Senate", "senate", None, senate)]
    parts = re.split(r"\n([A-Za-z]+) Congressional District:", house_text)
    for pos in range(1, len(parts), 2):
        word = parts[pos]
        if word not in ORDINALS:
            continue
        people = nj_people(parts[pos + 1].split("Congressional District:", 1)[0])
        district = ORDINALS[word]
        contests.append(contest(f"{word} Congressional District", "house", district, people))
    return pack(
        [
            source(
                "New Jersey Division of Elections, official general election candidates for U.S. Senate (July 27, 2026) and U.S. House of Representatives (September 4, 2026)",
                "https://nj.gov/state/elections/election-information-2026.shtml",
            )
        ],
        contests,
    )


def nj_people(text: str) -> list[dict]:
    people = []
    for raw in text.splitlines():
        match = re.match(
            r"^([A-Z][A-Z .'\-]+?)(?:\s+\*)?\s{2,}(?:P\.O\.|PO |[0-9]).+\s{2,}([A-Za-z][A-Za-z' ]+?)\s*$",
            raw,
        )
        if not match:
            continue
        name = match.group(1).strip()
        party = match.group(2).strip()
        if name in ("NAME", "CANDIDATES FOR US SENATE", "CANDIDATES FOR HOUSE OF REPRESENTATIVES"):
            continue
        people.append(person(name, party))
    return people


def parse_md() -> dict:
    contests = []
    with (LISTS / "md-gov.csv").open(encoding="utf-8-sig", newline="") as handle:
        people = []
        for row in csv.DictReader(handle):
            if row["Candidate Status"] != "Active":
                continue
            first = row["Candidate First Name and Middle Name"].strip()
            last = row["Candidate Ballot Last Name and Suffix"].strip()
            related_first = (row.get("Related Candidate First Name and Middle Name") or "").strip()
            related_last = (row.get("Related Candidate Last Name and Suffix") or "").strip()
            name = f"{first} {last}".strip()
            if related_first or related_last:
                name = f"{name} / {related_first} {related_last}".strip()
            people.append(person(name, row["Office Political Party"].strip()))
        contests.append(contest("Governor / Lt. Governor", "governor", None, people))
    grouped: dict[str, list] = {}
    order: list[str] = []
    with (LISTS / "md-house.csv").open(encoding="utf-8-sig", newline="") as handle:
        for row in csv.DictReader(handle):
            if row["Candidate Status"] != "Active":
                continue
            district = str(int(re.search(r"(\d+)", row["Contest Run By District Name and Number"]).group(1)))
            first = row["Candidate First Name and Middle Name"].strip()
            last = row["Candidate Ballot Last Name and Suffix"].strip()
            if district not in grouped:
                grouped[district] = []
                order.append(district)
            grouped[district].append(person(f"{first} {last}".strip(), row["Office Political Party"].strip()))
    for district in order:
        contests.append(contest(f"Representative in Congress Congressional District {district}", "house", district, grouped[district]))
    return pack(
        [
            source(
                "Maryland State Board of Elections, 2026 gubernatorial general election candidate lists (statewide CSV last updated 10/16/2026 06:00 PM on the statewide page)",
                "https://elections.maryland.gov/elections/2026/general_candidates/2026_GG_statewide_candidatelist.html",
                "October 16, 2026",
            )
        ],
        contests,
    )


def parse_va() -> dict:
    rows = html_rows(LISTS / "va.html")
    grouped: dict[tuple, list] = {}
    order_numbers: dict[tuple, dict] = {}
    sequence: list[tuple] = []
    for row in rows:
        if len(row) < 10:
            continue
        office = row[3]
        scope = row[4]
        if office not in ("Member, United States Senate", "Member, House of Representatives"):
            continue
        try:
            ballot_order = int(row[2])
        except ValueError:
            continue
        party = row[8]
        name = row[9]
        district = None
        if office.startswith("Member, House"):
            match = re.search(r"(\d+)", scope)
            if not match:
                continue
            district = str(int(match.group(1)))
        key = (office, district)
        ident = (name, party)
        if key not in grouped:
            grouped[key] = []
            order_numbers[key] = {}
            sequence.append(key)
        if ident not in order_numbers[key]:
            order_numbers[key][ident] = ballot_order
            grouped[key].append(person(name, party))
    contests = []
    for key in sequence:
        office, district = key
        people = sorted(grouped[key], key=lambda item: order_numbers[key][(item["name"], item["party"])])
        kind = "senate" if "Senate" in office else "house"
        title = office if district is None else f"{office} {district}"
        contests.append(contest(title, kind, district, people))
    return pack(
        [
            source(
                "Virginia Department of Elections, November 3, 2026 general election candidate list, all offices",
                "https://www.elections.virginia.gov/casting-a-ballot/candidate-list/november-3-2026-gen-elect-all-offices/",
            )
        ],
        contests,
    )


def parse_il() -> dict:
    lines = (LISTS / "il.md").read_text(encoding="utf-8", errors="replace").splitlines()
    office = None
    group: list[str] = []
    contests = []

    def consume(title: str, block: list[str]) -> None:
        people = []
        pending: list[str] = []

        def finish(removed: bool) -> None:
            nonlocal pending
            if pending and not removed:
                party_line = pending[0]
                match = re.match(
                    r"^(DEMOCRATIC|REPUBLICAN|AMERICAN CENTER PARTY|INDEPENDENT|GREEN|INDEPENDENCE PARTY|WORKING CLASS PARTY)\s+(.+?)\s+\d{1,2}/\d{1,2}/\d{4}",
                    party_line,
                )
                if match:
                    name = match.group(2).strip()
                    if len(pending) > 1:
                        mate = re.match(r"^(.+?)\s+\([A-Za-z .'\-]+\)\s+\d{1,2}/\d{1,2}/\d{4}", pending[1])
                        if mate:
                            name = f"{name} / {mate.group(1).strip()}"
                    people.append(person(name, match.group(1)))
            pending = []

        for raw in block:
            line = raw.strip()
            if not line or line.startswith("Page ") or line.startswith("##"):
                continue
            if line.startswith("REMOVED"):
                finish(True)
                continue
            if re.match(r"^(DEMOCRATIC|REPUBLICAN|AMERICAN CENTER PARTY|INDEPENDENT|GREEN|INDEPENDENCE PARTY|WORKING CLASS PARTY)\s+", line):
                finish(False)
                pending = [line]
            elif pending and re.match(r"^[A-Za-z].+\s+\d{1,2}/\d{1,2}/\d{4}", line):
                pending.append(line)
        finish(False)
        if not people:
            return
        if title == "UNITED STATES SENATOR":
            contests.append(contest(title, "senate", None, people))
        elif title.startswith("GOVERNOR"):
            contests.append(contest(title, "governor", None, people))
        else:
            number = re.match(r"(\d+)", title)
            contests.append(contest(title, "house", str(int(number.group(1))), people))

    current_title = None
    current: list[str] = []
    for raw in lines:
        header = raw.strip()
        if (
            current_title
            and re.fullmatch(r"[A-Z][A-Z0-9 /'\-]+", header)
            and "CONGRESS" not in header
            and header not in ("UNITED STATES SENATOR", "GOVERNOR AND LIEUTENANT GOVERNOR")
        ):
            consume(current_title, current)
            current_title = None
            current = []
            continue
        if header in ("UNITED STATES SENATOR", "GOVERNOR AND LIEUTENANT GOVERNOR") or re.fullmatch(r"\d+(ST|ND|RD|TH) CONGRESS", header):
            if current_title:
                consume(current_title, current)
            current_title = header
            current = []
            continue
        if header.endswith(" SENATE") or header.endswith(" REPRESENTATIVE"):
            if current_title:
                consume(current_title, current)
                current_title = None
            break
        if current_title:
            current.append(raw)
    if current_title:
        consume(current_title, current)
    return pack(
        [
            source(
                "Illinois State Board of Elections, general election candidate list, November 3, 2026",
                "https://www.elections.il.gov/ElectionOperations/CandidateList.aspx?ElectionID=sejIrI%2BQmww%3D",
            )
        ],
        contests,
    )


def parse_mo() -> dict:
    blocks = {
        "Republican": "District 1, Paul Berry III District 2, Ann Wagner District 3, Bob Onder District 4, Mark Alford District 5, Rick Brattin District 6, Chris Stigall District 7, Eric W. Burlison District 8, Jason T. Smith",
        "Democratic": "District 1, Wesley Bell District 2, Fred Wellman District 3, Bethany E Mann District 4, Jordan Herrera District 5, Emanuel Cleaver, II District 6, Josh Smead District 7, Missi Hesketh District 8, Chris Reichard",
        "Libertarian": "District 1, Tom Schmitz District 2, Brandon Coulter Daugherty District 3, Jim Higgins District 4, Thomas Holbrook District 5, Randall (Randy) Langkraehr District 6, Andy Maidment District 7, Kevin Craig District 8, Rebecca Sharpe Lombard",
    }
    grouped: dict[str, list] = {str(n): [] for n in range(1, 9)}
    for party, block in blocks.items():
        parts = re.split(r"District (\d+), ", block)
        for pos in range(1, len(parts), 2):
            grouped[str(int(parts[pos]))].append(person(parts[pos + 1].strip(), party))
    contests = [
        contest(f"For U.S. Representative District {district}", "house", district, grouped[district])
        for district in grouped
    ]
    return pack(
        [
            source(
                "Missouri Secretary of State, certification of candidates for the November 3, 2026 general election",
                "https://www.sos.mo.gov/CMSImages/ElectionCandidates/2026GeneralElectionCertifiedCandidates.pdf",
                "August 25, 2026",
            )
        ],
        contests,
    )


def parse_nm() -> dict:
    html = (CAND / "nm.html").read_text(encoding="utf-8", errors="replace")
    # Keep only cells the page shows. Hidden cells repeat name parts and contact fields.
    class Visible(HTMLParser):
        def __init__(self) -> None:
            super().__init__()
            self.rows: list[list[str]] = []
            self.cur: list[str] | None = None
            self.cell: list[str] | None = None

        def handle_starttag(self, tag: str, attrs) -> None:
            style = dict(attrs).get("style", "")
            hidden = "display:none" in style
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
    visible.feed(html)
    grouped: dict[str, list[tuple[int, dict]]] = {}
    order: list[str] = []
    for row in visible.rows:
        if len(row) < 9 or row[0] in ("Contest",):
            continue
        office, _county, name, party, _address, _contact, _filed, ballot, status = row[:9]
        if status != "Qualified":
            continue
        if office not in (
            "United States Senator",
            "Governor and Lieutenant Governor",
        ) and not office.startswith("United States Representative DISTRICT "):
            continue
        if office not in grouped:
            grouped[office] = []
            order.append(office)
        grouped[office].append((int(ballot), person(name, party)))
    contests = []
    for office in order:
        people = [item for _ballot, item in sorted(grouped[office], key=lambda pair: pair[0])]
        if office == "United States Senator":
            contests.append(contest(office, "senate", None, people))
        elif office == "Governor and Lieutenant Governor":
            contests.append(contest(office, "governor", None, people))
        else:
            number = office.rsplit(" ", 1)[-1]
            contests.append(contest(office, "house", str(int(number)), people))
    return pack(
        [
            source(
                "New Mexico Secretary of State, 2026 General Election Contest/Candidate List",
                "https://candidateportal.servis.sos.state.nm.us/CandidateList.aspx",
            )
        ],
        contests,
    )


def unpublished_records() -> dict[str, dict]:
    text = (ROOT / "src" / "data" / "electionOffices.ts").read_text(encoding="utf-8")
    found = re.findall(
        r'code: "([A-Z]{2})",\s*office: \{\s*label: "([^"]+)",\s*href: "([^"]+)"',
        text,
    )
    records = {}
    for code, label, href in found:
        records[code] = {
            "status": "unpublished",
            "sources": [source(label, href)],
            "contests": [],
        }
    return records


def check(published: dict[str, dict]) -> None:
    def one(code: str, kind: str, district: str | None = None) -> dict:
        for row in published[code]["contests"]:
            if row["kind"] == kind and row["district"] == district:
                return row
        raise SystemExit(f"missing {code} {kind} {district}")

    governor = one("CA", "governor")
    names = [item["name"] for item in governor["candidates"]]
    if names != ["Xavier Becerra", "Steve Hilton"]:
        raise SystemExit(f"CA governor {names}")
    if len(one("CA", "house", "52")["candidates"]) != 2:
        raise SystemExit("CA 52 spilled")
    if one("NC", "senate")["candidates"][0]["name"] != "Michael Dublin":
        raise SystemExit(one("NC", "senate")["candidates"][0])
    if len(one("NC", "house", "14")["candidates"]) > 8:
        raise SystemExit("NC 14 spilled")
    if [item["name"] for item in one("TX", "governor")["candidates"]] != ["GREG ABBOTT", "GINA HINOJOSA", "PAT DIXON"]:
        raise SystemExit(one("TX", "governor")["candidates"])
    if len(one("IL", "governor")["candidates"]) != 3:
        raise SystemExit(one("IL", "governor")["candidates"])
    if not any(item["name"].startswith("Patronis") for item in one("FL", "house", "1")["candidates"]):
        raise SystemExit(one("FL", "house", "1")["candidates"])
    il17 = [row for row in published["IL"]["contests"] if row["district"] == "17"]
    if len(il17) != 1:
        raise SystemExit(f"IL 17 duplicated {len(il17)}")
    if not any(item["name"].startswith("El-Sayed") for item in one("MI", "senate")["candidates"]):
        raise SystemExit(one("MI", "senate"))
    house = [row for row in published["MI"]["contests"] if row["kind"] == "house"]
    if len(house) != 13:
        raise SystemExit(f"MI house {len(house)}")
    if any("Torres" in item["name"] for item in one("NY", "house", "14")["candidates"]):
        raise SystemExit(one("NY", "house", "14"))
    if not any(item["name"] == "Mike Marvin" for item in one("NE", "senate")["candidates"]):
        raise SystemExit(one("NE", "senate")["candidates"])
    wi = [item["name"] for item in one("WI", "house", "3")["candidates"]]
    if wi != ["Derrick Van Orden", "Rebecca Cooke", "Alexander Valiensi Kent", "Rustin Provance"]:
        raise SystemExit(wi)
    ia = [item["name"] for item in one("IA", "senate")["candidates"]]
    if ia != ["Ashley Hinson", "Josh Turek", "Thomas Laehn"]:
        raise SystemExit(ia)
    if not any(row["district"] == "9" for row in published["TN"]["contests"]):
        raise SystemExit("TN district 9 missing")
    nm = [item["name"] for item in one("NM", "senate")["candidates"]]
    if nm != ["BEN R LUJAN", "LARRY E MARKER"]:
        raise SystemExit(nm)
    nm_gov = [(item["name"], item["party"]) for item in one("NM", "governor")["candidates"]]
    if nm_gov != [
        ("GREGGORY D HULL AND DAVID M GALLEGOS", "REP"),
        ("DEB HAALAND AND STEPHANIE GARCIA RICHARD", "DEM"),
    ]:
        raise SystemExit(nm_gov)


def main() -> None:
    published = {
        "NC": parse_nc(),
        "TX": parse_tx(),
        "CA": parse_ca(),
        "WI": parse_wi(),
        "IA": parse_ia(),
        "ME": parse_me(),
        "MN": parse_mn(),
        "FL": parse_fl(),
        "AK": parse_ak(),
        "MI": parse_mi(),
        "CO": parse_co(),
        "NE": parse_ne(),
        "NY": parse_ny(),
        "TN": parse_tn(),
        "NJ": parse_nj(),
        "MD": parse_md(),
        "VA": parse_va(),
        "IL": parse_il(),
        "MO": parse_mo(),
        "NM": parse_nm(),
    }
    records = unpublished_records()
    missing = [code for code in published if code not in records]
    if missing:
        raise SystemExit(f"unknown codes {missing}")
    check(published)
    records.update(published)
    OUT.mkdir(parents=True, exist_ok=True)
    for code, record in records.items():
        for row in record["contests"]:
            if not row["candidates"]:
                raise SystemExit(f"{code} empty contest {row['office']}")
        (OUT / f"{code}.json").write_text(json.dumps(record, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    summary = {
        code: {
            "status": record["status"],
            "contests": [
                {"office": row["office"], "n": len(row["candidates"]), "district": row["district"]}
                for row in record["contests"]
            ],
        }
        for code, record in records.items()
        if record["status"] == "published"
    }
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
