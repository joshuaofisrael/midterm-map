#!/usr/bin/env python3
"""Build per-state Census place JSON for the city pages.

Reads only official U.S. Census Bureau files:

- 2026 Gazetteer national places (place list, names, legal/statistical status)
- 2020 Census Redistricting Data (P.L. 94-171) geographic headers, summary
  level 160 (2020 place population)
- 2026 Geographic Reference File — Codes (current county for each place)
- 2020 national place-by-county reference file (county fallback)
- 2026 Gazetteer national counties (county names)
- National 119th Congressional District to 2020 Place relationship file

Fictitious place records (FUNCSTAT F, the "balance" remainders) are omitted.
They are not incorporated places or census-designated places.

Re-run from the repo root: python3 scripts/build-census-places.py
"""

from __future__ import annotations

import json
import re
import unicodedata
import zipfile
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "src" / "data" / "places"
CACHE = Path("/tmp/census-places-cache")
UA = "Mozilla/5.0 (compatible; MapTheMidterms/1.0; +https://mapthemidterms.com)"

GAZ_PLACES = (
    "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/"
    "2026_Gazetteer/2026_Gaz_place_national.zip"
)
GAZ_COUNTIES = (
    "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/"
    "2026_Gazetteer/2026_Gaz_counties_national.zip"
)
PLACE_COUNTY_2020 = (
    "https://www2.census.gov/geo/docs/reference/codes2020/"
    "national_place_by_county2020.txt"
)
CD_REL = (
    "https://www2.census.gov/geo/docs/maps-data/data/rel2020/cd-sld/"
    "tab20_cd11920_place20_natl.txt"
)
GRF_BASE = "https://www2.census.gov/geo/docs/maps-data/data/grf/2026"
PL_BASE = (
    "https://www2.census.gov/programs-surveys/decennial/2020/data/"
    "01-Redistricting_File--PL_94-171"
)

# Postal, FIPS, PL folder, state name. Island areas are not in the gazetteer.
JURISDICTIONS = [
    ("AL", "01", "Alabama", "Alabama"),
    ("AK", "02", "Alaska", "Alaska"),
    ("AZ", "04", "Arizona", "Arizona"),
    ("AR", "05", "Arkansas", "Arkansas"),
    ("CA", "06", "California", "California"),
    ("CO", "08", "Colorado", "Colorado"),
    ("CT", "09", "Connecticut", "Connecticut"),
    ("DE", "10", "Delaware", "Delaware"),
    ("DC", "11", "District_of_Columbia", "District of Columbia"),
    ("FL", "12", "Florida", "Florida"),
    ("GA", "13", "Georgia", "Georgia"),
    ("HI", "15", "Hawaii", "Hawaii"),
    ("ID", "16", "Idaho", "Idaho"),
    ("IL", "17", "Illinois", "Illinois"),
    ("IN", "18", "Indiana", "Indiana"),
    ("IA", "19", "Iowa", "Iowa"),
    ("KS", "20", "Kansas", "Kansas"),
    ("KY", "21", "Kentucky", "Kentucky"),
    ("LA", "22", "Louisiana", "Louisiana"),
    ("ME", "23", "Maine", "Maine"),
    ("MD", "24", "Maryland", "Maryland"),
    ("MA", "25", "Massachusetts", "Massachusetts"),
    ("MI", "26", "Michigan", "Michigan"),
    ("MN", "27", "Minnesota", "Minnesota"),
    ("MS", "28", "Mississippi", "Mississippi"),
    ("MO", "29", "Missouri", "Missouri"),
    ("MT", "30", "Montana", "Montana"),
    ("NE", "31", "Nebraska", "Nebraska"),
    ("NV", "32", "Nevada", "Nevada"),
    ("NH", "33", "New_Hampshire", "New Hampshire"),
    ("NJ", "34", "New_Jersey", "New Jersey"),
    ("NM", "35", "New_Mexico", "New Mexico"),
    ("NY", "36", "New_York", "New York"),
    ("NC", "37", "North_Carolina", "North Carolina"),
    ("ND", "38", "North_Dakota", "North Dakota"),
    ("OH", "39", "Ohio", "Ohio"),
    ("OK", "40", "Oklahoma", "Oklahoma"),
    ("OR", "41", "Oregon", "Oregon"),
    ("PA", "42", "Pennsylvania", "Pennsylvania"),
    ("RI", "44", "Rhode_Island", "Rhode Island"),
    ("SC", "45", "South_Carolina", "South Carolina"),
    ("SD", "46", "South_Dakota", "South Dakota"),
    ("TN", "47", "Tennessee", "Tennessee"),
    ("TX", "48", "Texas", "Texas"),
    ("UT", "49", "Utah", "Utah"),
    ("VT", "50", "Vermont", "Vermont"),
    ("VA", "51", "Virginia", "Virginia"),
    ("WA", "53", "Washington", "Washington"),
    ("WV", "54", "West_Virginia", "West Virginia"),
    ("WI", "55", "Wisconsin", "Wisconsin"),
    ("WY", "56", "Wyoming", "Wyoming"),
    ("PR", "72", "Puerto_Rico", "Puerto Rico"),
]

# 2020 Census place totals used as a sanity check on the geographic-header field.
EXPECTED_POP = {
    "3651000": 8804190,  # New York city
    "0644000": 3898747,  # Los Angeles city
    "1714000": 2746388,  # Chicago city
    "4835000": 2304580,  # Houston city
    "0100124": 2358,  # Abbeville city, Alabama
}


def fetch(url: str, dest: Path) -> None:
    if dest.exists() and dest.stat().st_size > 0:
        print(f"cached {dest.name}", flush=True)
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".part")
    print(f"get {url}", flush=True)
    req = Request(url, headers={"User-Agent": UA})
    with urlopen(req, timeout=180) as response, tmp.open("wb") as handle:
        while True:
            chunk = response.read(1024 * 256)
            if not chunk:
                break
            handle.write(chunk)
    tmp.replace(dest)


def read_text(path: Path) -> str:
    raw = path.read_bytes()
    if raw.startswith(b"\xef\xbb\xbf"):
        raw = raw[3:]
    return raw.decode("utf-8")


def pipe_rows(text: str):
    lines = text.splitlines()
    header = lines[0].split("|")
    for line in lines[1:]:
        if not line.strip():
            continue
        yield dict(zip(header, line.split("|")))


def slugify(name: str) -> str:
    text = unicodedata.normalize("NFKD", name)
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower().replace("'", "").replace("’", "")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def load_places(path: Path) -> list[dict]:
    with zipfile.ZipFile(path) as archive:
        name = [item for item in archive.namelist() if item.endswith(".txt")][0]
        text = archive.read(name).decode("utf-8-sig")
    rows = []
    for row in pipe_rows(text):
        if row["FUNCSTAT"] == "F":
            continue
        rows.append(row)
    return rows


def load_county_names(path: Path) -> dict[str, str]:
    with zipfile.ZipFile(path) as archive:
        name = [item for item in archive.namelist() if item.endswith(".txt")][0]
        text = archive.read(name).decode("utf-8-sig")
    names = {}
    for row in pipe_rows(text):
        names[row["GEOID"]] = row["NAME"]
    return names


def load_place_county_2020(path: Path) -> dict[str, list[str]]:
    counties: dict[str, list[str]] = defaultdict(list)
    for row in pipe_rows(read_text(path)):
        geoid = row["STATEFP"] + row["PLACEFP"]
        name = row["COUNTYNAME"]
        if name not in counties[geoid]:
            counties[geoid].append(name)
    return counties


def load_districts(path: Path) -> dict[str, list[str]]:
    """Place GEOID -> district names, land-area overlap only."""
    order: dict[str, dict[str, str]] = defaultdict(dict)
    for row in pipe_rows(read_text(path)):
        place = row["GEOID_PLACE_20"]
        if not place:
            continue
        land = int(row["AREALAND_PART"] or "0")
        if land <= 0:
            continue
        code = row["GEOID_CD119_20"]
        order[place][code] = row["NAMELSAD_CD119_20"]
    return {place: [names[code] for code in sorted(names)] for place, names in order.items()}


def population_from_zip(path: Path) -> dict[str, int]:
    found: dict[str, int] = {}
    with zipfile.ZipFile(path) as archive:
        geo_name = [item for item in archive.namelist() if item.endswith("geo2020.pl")][0]
        with archive.open(geo_name) as handle:
            for raw in handle:
                if b"|160|" not in raw[:24]:
                    continue
                parts = raw.decode("latin1").rstrip("\n").split("|")
                if parts[2] != "160":
                    continue
                found[parts[9]] = int(parts[90])
    return found


def grf_counties(path: Path) -> dict[str, set[str]]:
    """Place GEOID -> set of county GEOIDs assigned on 2026 GRF blocks."""
    found: dict[str, set[str]] = defaultdict(set)
    with path.open("r", encoding="utf-8", errors="replace") as handle:
        header = handle.readline().rstrip("\n").split("|")
        state_i = header.index("CURSTATE")
        county_i = header.index("CURCOUNTY")
        place_i = header.index("PLACEFP")
        for line in handle:
            parts = line.rstrip("\n").split("|")
            place = parts[place_i]
            if place == "99999" or not place:
                continue
            state = parts[state_i]
            county = parts[county_i]
            if county in ("", "000"):
                continue
            found[state + place].add(state + county)
    return found


def build_population() -> dict[str, int]:
    cache = CACHE / "population.json"
    if cache.exists():
        print("using cached population", flush=True)
        return {key: int(value) for key, value in json.loads(cache.read_text()).items()}

    def one(item: tuple[str, str, str, str]) -> dict[str, int]:
        postal, _fips, folder, _name = item
        dest = CACHE / f"{postal.lower()}2020.pl.zip"
        url = f"{PL_BASE}/{folder}/{postal.lower()}2020.pl.zip"
        fetch(url, dest)
        pops = population_from_zip(dest)
        dest.unlink()
        print(f"pop {postal} {len(pops)}", flush=True)
        return pops

    merged: dict[str, int] = {}
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(one, item) for item in JURISDICTIONS]
        for future in as_completed(futures):
            merged.update(future.result())
    for geoid, expected in EXPECTED_POP.items():
        actual = merged.get(geoid)
        if actual != expected:
            raise SystemExit(f"Population check failed for {geoid}: {actual} != {expected}")
    cache.write_text(json.dumps(merged, separators=(",", ":")))
    print(f"population places {len(merged)}", flush=True)
    return merged


def build_grf_counties() -> dict[str, set[str]]:
    cache = CACHE / "grf-counties.json"
    if cache.exists():
        print("using cached GRF counties", flush=True)
        raw = json.loads(cache.read_text())
        return {key: set(value) for key, value in raw.items()}

    def one(item: tuple[str, str, str, str]) -> dict[str, set[str]]:
        _postal, fips, _folder, _name = item
        dest = CACHE / f"public_grfc_cur26_{fips}.txt"
        fetch(f"{GRF_BASE}/public_grfc_cur26_{fips}.txt", dest)
        found = grf_counties(dest)
        dest.unlink()
        print(f"grf {fips} places {len(found)}", flush=True)
        return found

    merged: dict[str, set[str]] = {}
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(one, item) for item in JURISDICTIONS]
        for future in as_completed(futures):
            for geoid, counties in future.result().items():
                merged.setdefault(geoid, set()).update(counties)
    cache.write_text(json.dumps({key: sorted(value) for key, value in merged.items()}, separators=(",", ":")))
    print(f"grf places {len(merged)}", flush=True)
    return merged


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    fetch(GAZ_PLACES, CACHE / "2026_Gaz_place_national.zip")
    fetch(GAZ_COUNTIES, CACHE / "2026_Gaz_counties_national.zip")
    fetch(PLACE_COUNTY_2020, CACHE / "national_place_by_county2020.txt")
    fetch(CD_REL, CACHE / "tab20_cd11920_place20_natl.txt")

    places = load_places(CACHE / "2026_Gaz_place_national.zip")
    county_names = load_county_names(CACHE / "2026_Gaz_counties_national.zip")
    county_2020 = load_place_county_2020(CACHE / "national_place_by_county2020.txt")
    districts = load_districts(CACHE / "tab20_cd11920_place20_natl.txt")
    population = build_population()
    grf = build_grf_counties()

    names = {postal: name for postal, _fips, _folder, name in JURISDICTIONS}
    by_state: dict[str, list[dict]] = defaultdict(list)
    missing_county = []
    missing_pop = []
    grf_county = 0
    fallback_county = 0

    for place in places:
        postal = place["USPS"]
        if postal not in names:
            raise SystemExit(f"Unexpected postal code {postal}")
        geoid = place["GEOID"]
        county_list: list[str] = []
        county_source = ""
        if geoid in grf:
            county_list = []
            for county_geoid in sorted(grf[geoid]):
                label = county_names.get(county_geoid)
                if not label:
                    raise SystemExit(f"No 2026 county name for {county_geoid} ({place['NAME']})")
                county_list.append(label)
            county_source = "grf2026"
            grf_county += 1
        elif geoid in county_2020:
            county_list = county_2020[geoid]
            county_source = "place2020"
            fallback_county += 1
        else:
            missing_county.append(f"{postal} {place['NAME']} {geoid}")

        pop = population.get(geoid)
        if pop is None:
            missing_pop.append(geoid)

        record = {
            "geoid": geoid,
            "name": place["NAME"],
            "pop": pop,
            "counties": county_list,
            "countySource": county_source,
        }
        if geoid in districts:
            record["districts"] = districts[geoid]
        by_state[postal].append(record)

    if missing_county:
        raise SystemExit(
            f"{len(missing_county)} places have no Census county. Examples: {missing_county[:8]}"
        )

    state_index = []
    for postal, _fips, _folder, name in JURISDICTIONS:
        rows = by_state.get(postal, [])
        groups: dict[str, list[dict]] = defaultdict(list)
        for row in rows:
            groups[slugify(row["name"])].append(row)
        for base, group in groups.items():
            if len(group) == 1:
                group[0]["slug"] = base
            else:
                for row in group:
                    row["slug"] = f"{base}-{row['geoid'][-5:]}"
        slugs = [row["slug"] for row in rows]
        if len(slugs) != len(set(slugs)):
            raise SystemExit(f"Slug collision in {postal}")
        if any(not row["slug"] for row in rows):
            raise SystemExit(f"Empty slug in {postal}")
        rows.sort(key=lambda row: (row["name"].lower(), row["geoid"]))
        payload = [
            {
                "geoid": row["geoid"],
                "slug": row["slug"],
                "name": row["name"],
                "pop": row["pop"],
                "counties": row["counties"],
                "countySource": row["countySource"],
                **({"districts": row["districts"]} if row.get("districts") else {}),
            }
            for row in rows
        ]
        (OUT_DIR / f"{postal}.json").write_text(
            json.dumps(payload, separators=(",", ":"), ensure_ascii=False) + "\n"
        )
        state_index.append({"code": postal, "name": name, "count": len(rows)})
        print(f"wrote {postal} {len(rows)}", flush=True)

    manifest = {
        "accessed": "October 17, 2026",
        "placeCount": sum(item["count"] for item in state_index),
        "withPopulation": sum(item["count"] for item in state_index) - len(missing_pop),
        "withoutPopulation": len(missing_pop),
        "countiesFromGrf2026": grf_county,
        "countiesFromPlace2020": fallback_county,
        "states": state_index,
    }
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
