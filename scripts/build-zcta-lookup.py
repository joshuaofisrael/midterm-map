#!/usr/bin/env python3
"""Build prefix-sharded ZCTA lookups for the static ZIP search.

Reads Census relationship files from /tmp/zcta and place pages from
src/data/places. Writes public/zcta/{first3}.json. Does not invent a
120th ZCTA-to-district file: the nine states with new 2026 boundaries
use the ZCTA-to-block relationship file joined to the 120th block
equivalency files. Every other jurisdiction uses the 119th ZCTA file.
"""

from __future__ import annotations

import json
import zipfile
from collections import defaultdict
from pathlib import Path

ROOT = Path("/workspace")
SRC = Path("/tmp/zcta")
OUT = ROOT / "public" / "zcta"
BEF_ZIP = Path("/tmp/cand/cd120.zip")

# Census says these states delineated new congressional boundaries for 2026.
CHANGED_FIPS = {"01", "06", "12", "22", "37", "39", "47", "48", "49"}
BEF_NAMES = {
    "01": "CD120_01.txt",
    "06": "CD120_06.txt",
    "12": "CD120_12.txt",
    "22": "CD120_22.txt",
    "37": "CD120_37.txt",
    "39": "CD120_39.txt",
    "47": "CD120_47.txt",
    "48": "CD120_48.txt",
    "49": "CD120_49.txt",
}

FIPS_TO_POSTAL = {
    "01": "AL",
    "02": "AK",
    "04": "AZ",
    "05": "AR",
    "06": "CA",
    "08": "CO",
    "09": "CT",
    "10": "DE",
    "11": "DC",
    "12": "FL",
    "13": "GA",
    "15": "HI",
    "16": "ID",
    "17": "IL",
    "18": "IN",
    "19": "IA",
    "20": "KS",
    "21": "KY",
    "22": "LA",
    "23": "ME",
    "24": "MD",
    "25": "MA",
    "26": "MI",
    "27": "MN",
    "28": "MS",
    "29": "MO",
    "30": "MT",
    "31": "NE",
    "32": "NV",
    "33": "NH",
    "34": "NJ",
    "35": "NM",
    "36": "NY",
    "37": "NC",
    "38": "ND",
    "39": "OH",
    "40": "OK",
    "41": "OR",
    "42": "PA",
    "44": "RI",
    "45": "SC",
    "46": "SD",
    "47": "TN",
    "48": "TX",
    "49": "UT",
    "50": "VT",
    "51": "VA",
    "53": "WA",
    "54": "WV",
    "55": "WI",
    "56": "WY",
    "72": "PR",
}


def load_places() -> dict[str, tuple[str, str, str]]:
    """GEOID -> (postal, slug, display name)."""
    by_state: dict[str, list[dict]] = {}
    for path in sorted((ROOT / "src" / "data" / "places").glob("*.json")):
        if path.name in ("manifest.json", "cd120.json"):
            continue
        rows = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(rows, list):
            continue
        by_state[path.stem] = rows
    counts: dict[tuple[str, str], int] = defaultdict(int)
    for postal, rows in by_state.items():
        for place in rows:
            counts[(postal, place["name"])] += 1
    index: dict[str, tuple[str, str, str]] = {}
    for postal, rows in by_state.items():
        for place in rows:
            name = place["name"]
            if counts[(postal, name)] > 1:
                name = f"{name} (GEOID {place['geoid']})"
            index[place["geoid"]] = (postal, place["slug"], name)
    return index


def load_bef() -> dict[str, str]:
    blocks: dict[str, str] = {}
    with zipfile.ZipFile(BEF_ZIP) as archive:
        for fips, name in BEF_NAMES.items():
            with archive.open(name) as handle:
                header = True
                for raw in handle:
                    if header:
                        header = False
                        continue
                    geoid, _state, _county, _tract, _block, cdfp = raw.decode("utf-8").rstrip("\n").split(",")
                    blocks[geoid] = cdfp
                    if geoid[:2] != fips:
                        raise SystemExit(f"{name} block {geoid} is not FIPS {fips}")
    return blocks


def district_name(cdfp: str) -> str:
    if cdfp == "00":
        return "Congressional District (at Large)"
    return f"Congressional District {int(cdfp)}"


def land_value(text: str) -> int:
    if not text or text == "0":
        return 0
    return int(text)


def main() -> None:
    places = load_places()
    print("places", len(places))
    bef = load_bef()
    print("bef blocks", len(bef))

    # zcta -> geoid -> land
    place_land: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    place_rows = 0
    with (SRC / "place.txt").open(encoding="utf-8-sig") as handle:
        header = handle.readline().rstrip("\n").split("|")
        if header[1] != "GEOID_ZCTA5_20" or header[9] != "GEOID_PLACE_20" or header[16] != "AREALAND_PART":
            raise SystemExit(header)
        for line in handle:
            parts = line.rstrip("\n").split("|")
            zcta = parts[1]
            geoid = parts[9]
            land = land_value(parts[16])
            if not zcta or not geoid or land <= 0 or geoid not in places:
                continue
            place_land[zcta][geoid] += land
            place_rows += 1
    print("place overlaps kept", place_rows, "zctas", len(place_land))

    # zcta -> (postal, name) -> land
    district_land: dict[str, dict[tuple[str, str], int]] = defaultdict(lambda: defaultdict(int))
    skipped_changed = 0
    with (SRC / "cd119.txt").open(encoding="utf-8-sig") as handle:
        header = handle.readline().rstrip("\n").split("|")
        if header[1] != "GEOID_CD119_20" or header[2] != "NAMELSAD_CD119_20" or header[8] != "GEOID_ZCTA5_20":
            raise SystemExit(header)
        if header[15] != "AREALAND_PART":
            raise SystemExit(header)
        for line in handle:
            parts = line.rstrip("\n").split("|")
            cd_geoid = parts[1]
            name = parts[2]
            zcta = parts[8]
            land = land_value(parts[15])
            if not cd_geoid or not zcta or not name or land <= 0:
                continue
            fips = cd_geoid[:2]
            if fips in CHANGED_FIPS:
                skipped_changed += 1
                continue
            postal = FIPS_TO_POSTAL.get(fips)
            if not postal:
                continue
            district_land[zcta][(postal, name)] += land
    print("119 rows skipped for changed states", skipped_changed)

    block_path = SRC / "blocks.txt"
    expected = 1_057_697_144
    size = block_path.stat().st_size
    if size != expected:
        raise SystemExit(f"block file size {size} != {expected}")
    missing_bef = 0
    kept_blocks = 0
    with block_path.open(encoding="utf-8-sig") as handle:
        header = handle.readline().rstrip("\n").split("|")
        if header[1] != "GEOID_ZCTA5_20" or header[9] != "GEOID_TABBLOCK_20" or header[15] != "AREALAND_PART":
            raise SystemExit(header)
        for line in handle:
            parts = line.rstrip("\n").split("|")
            zcta = parts[1]
            if not zcta:
                continue
            block = parts[9]
            if len(block) < 2 or block[:2] not in CHANGED_FIPS:
                continue
            land = land_value(parts[15])
            if land <= 0:
                continue
            cdfp = bef.get(block)
            if not cdfp:
                missing_bef += 1
                continue
            postal = FIPS_TO_POSTAL[block[:2]]
            district_land[zcta][(postal, district_name(cdfp))] += land
            kept_blocks += 1
    print("120 block overlaps", kept_blocks, "missing bef", missing_bef)
    if missing_bef:
        raise SystemExit("BEF did not cover every changed-state ZCTA block with land")

    shards: dict[str, dict[str, dict]] = defaultdict(dict)
    for zcta in set(place_land) | set(district_land):
        place_rows_out = [
            [places[geoid][0], places[geoid][1], places[geoid][2]]
            for geoid, _land in sorted(
                place_land.get(zcta, {}).items(),
                key=lambda item: (-item[1], places[item[0]][2], item[0]),
            )
        ]
        district_rows_out = [
            [postal, name]
            for (postal, name), _land in sorted(
                district_land.get(zcta, {}).items(),
                key=lambda item: (-item[1], item[0][0], item[0][1]),
            )
        ]
        if not place_rows_out and not district_rows_out:
            continue
        row: dict[str, list] = {}
        if place_rows_out:
            row["p"] = place_rows_out
        if district_rows_out:
            row["d"] = district_rows_out
        shards[zcta[:3]][zcta] = row

    if OUT.exists():
        for old in OUT.glob("*.json"):
            old.unlink()
    OUT.mkdir(parents=True, exist_ok=True)
    zip_count = 0
    byte_count = 0
    multi = 0
    for prefix, rows in sorted(shards.items()):
        text = json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
        (OUT / f"{prefix}.json").write_text(text, encoding="utf-8")
        byte_count += len(text.encode("utf-8"))
        zip_count += len(rows)
        multi += sum(1 for row in rows.values() if len(row.get("d", [])) > 1)
    print("prefixes", len(shards), "zctas", zip_count, "bytes", byte_count, "multi-district", multi)

    # Spot checks against the relationship files, not against outside knowledge.
    sample = shards.get("303", {}).get("30303")
    print("30303", sample)
    abanda = None
    for rows in shards.values():
        for zcta, row in rows.items():
            if any(place[1] == "abanda-cdp" for place in row.get("p", [])):
                abanda = (zcta, row)
                break
        if abanda:
            break
    print("abanda sample", abanda)


if __name__ == "__main__":
    main()
