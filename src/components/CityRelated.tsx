import Link from "next/link";
import { houseDistrictNumbers } from "@/data/candidates/load";
import { countyNeighbors, nearbyFor, placesForSlugs } from "@/data/places/nearby";
import type { PlaceRecord } from "@/data/places/load";
import { racesForState } from "@/data/races";
import { isStateCode } from "@/data/states";
import { districtShort, repDistrictPath, repState } from "@/data/representatives2026";
import type { StateCode } from "@/data/types";
import { countyPath, placeIsStandalone, placeTargetPath } from "@/lib/placeNames";

export function CityRelated({
  code,
  stateName,
  place,
}: {
  code: string;
  stateName: string;
  place: PlaceRecord;
}) {
  const near = nearbyFor(code, place.geoid);
  const nearest = near ? placesForSlugs(code, near.slugs) : [];
  const neighbors = countyNeighbors(code, place);
  const districtLinks = districtRaceLinks(code, place);
  const repLinks = representativeLinks(code, place);

  return (
    <section>
      <h2>Related pages</h2>
      <ul>
        {isStateCode(code) ? (
          <li>
            <Link href={`/results/state/${code}`}>{stateName} 2026 midterm results</Link>
          </li>
        ) : null}
        {repLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        <li>
          <Link href={`/cities/${code}`}>Census places in {stateName}</Link>
        </li>
        {place.counties.map((county) => (
          <li key={county}>
            <Link href={countyPath(code, county)}>Places in {county}</Link>
          </li>
        ))}
        {districtLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      {neighbors.length > 0 ? (
        <>
          <h3>Other places in the same county</h3>
          <ul>
            {neighbors.map((other) => (
              <li key={other.geoid}>
                <Link href={placeIsStandalone(other) ? `/cities/${code}/${other.slug}` : placeTargetPath(code, other)}>
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {nearest.length > 0 ? (
        <>
          <h3>Nearest Census places</h3>
          <p className="muted">
            Ranked by Census interior points. <a href="/sources/#nearest">How nearest places are chosen</a>
          </p>
          <ul>
            {nearest.map((other) => (
              <li key={other.geoid}>
                <Link href={placeIsStandalone(other) ? `/cities/${code}/${other.slug}` : placeTargetPath(code, other)}>
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}

function districtRaceLinks(code: string, place: PlaceRecord): { href: string; label: string }[] {
  if (!isStateCode(code)) return [];
  const numbers = new Set(houseDistrictNumbers(code, place));
  if (numbers.size === 0) return [];
  return racesForState(code as StateCode)
    .filter((race) => race.chamber === "house" && race.district && numbers.has(race.district))
    .map((race) => ({ href: `/races/${race.slug}`, label: race.title }));
}

/** Representative pages for this place: its House district(s), else the state page. */
function representativeLinks(code: string, place: PlaceRecord): { href: string; label: string }[] {
  const s = repState(code);
  if (!s) return [];
  const nums = new Set(houseDistrictNumbers(code, place).map((n) => (n === "0" ? "at-large" : n)));
  if (s.house.length === 1) nums.add("at-large");
  const seats = s.house.filter((h) => nums.has(h.district));
  const links = seats.map((h) => ({
    href: repDistrictPath(s.code, h.district),
    label: `Who represents ${districtShort(s.code, h.district)} in Congress`,
  }));
  return [...links, { href: `/representatives/${s.code}`, label: `${s.name} senators and representatives` }];
}
