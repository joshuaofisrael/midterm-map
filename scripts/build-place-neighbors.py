#!/usr/bin/env python3
"""Nearest Census places by 2026 Gazetteer interior point.

Writes src/data/places/nearby/{ST}.json. Each GEOID maps to
[latitude, longitude, slug, slug, ...], the five nearest other places
in the same state. The coordinates are the Census interior point.
"""

from __future__ import annotations

import json
import math
import zipfile
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLACES = ROOT / "src" / "data" / "places"
GAZ = Path("/tmp/census-places-cache/2026_Gaz_place_national.zip")
OUT = PLACES / "nearby"
NEAREST = 5


def interior_points() -> dict[str, tuple[float, float]]:
    with zipfile.ZipFile(GAZ) as archive:
        name = [item for item in archive.namelist() if item.endswith(".txt")][0]
        text = archive.read(name).decode("utf-8-sig")
    points: dict[str, tuple[float, float]] = {}
    header = text.splitlines()[0].split("|")
    lat_i = header.index("INTPTLAT")
    lon_i = header.index("INTPTLONG")
    id_i = header.index("GEOID")
    for line in text.splitlines()[1:]:
        if not line.strip():
            continue
        cols = line.split("|")
        points[cols[id_i]] = (float(cols[lat_i]), float(cols[lon_i]))
    return points


def haversine(a: tuple[float, float], b: tuple[float, float]) -> float:
    lat1, lon1 = math.radians(a[0]), math.radians(a[1])
    lat2, lon2 = math.radians(b[0]), math.radians(b[1])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    h = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    return 2 * math.asin(math.sqrt(h))


def main() -> None:
    points = interior_points()
    OUT.mkdir(parents=True, exist_ok=True)
    missing = 0
    written = 0
    for path in sorted(PLACES.glob("??.json")):
        places = json.loads(path.read_text())
        located = []
        for place in places:
            point = points.get(place["geoid"])
            if point is None:
                missing += 1
                continue
            located.append((place["geoid"], place["slug"], point))
        nearest: dict[str, list] = {}
        for index, (geoid, _slug, point) in enumerate(located):
            ranked = sorted(
                (
                    (haversine(point, other_point), other_slug)
                    for other_index, (_other_geoid, other_slug, other_point) in enumerate(located)
                    if other_index != index
                ),
                key=lambda item: (item[0], item[1]),
            )
            nearest[geoid] = [round(point[0], 6), round(point[1], 6), *[slug for _dist, slug in ranked[:NEAREST]]]
        dest = OUT / f"{path.stem}.json"
        dest.write_text(json.dumps(nearest, separators=(",", ":")))
        written += len(nearest)
        print(f"{path.stem} {len(nearest)}", flush=True)
    print(f"places {written} missing {missing}", flush=True)


if __name__ == "__main__":
    main()
