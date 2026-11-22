import Link from "next/link";
import { houseDistrictNumbers } from "@/data/candidates/load";
import { countyNeighbors, nearbyFor, placesForSlugs } from "@/data/places/nearby";
import type { PlaceRecord } from "@/data/places/load";
import { racesForState } from "@/data/races";
import { isStateCode } from "@/data/states";
import { districtShort, repDistrictPath, repState } from "@/data/representatives2026";
import type { StateCode } from "@/data/types";
import { livePlaceHref } from "@/lib/cityIndexable";
import { stateHasCycle2026 } from "@/lib/cycleRedirects";
import { countyHrefByName } from "@/lib/prunedPlaces";

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
        {isStateCode(code) && stateHasCycle2026(code) ? (
          <li>
            <Link href={`/states/${code}/#cycle-2026`}>{stateName} 2026 election</Link>
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
        {place.counties.map((county) => {
          const href = countyHrefByName(code, county);
          return (
            <li key={county}>
              {href ? <Link href={href}>Places in {county}</Link> : <span>Places in {county}</span>}
            </li>
          );
        })}
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
            {neighbors.map((other) => {
              const href = livePlaceHref(code, other);
              return (
                <li key={other.geoid}>
                  {href ? <Link href={href}>{other.name}</Link> : <span>{other.name}</span>}
                </li>
              );
            })}
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
            {nearest.map((other) => {
              const href = livePlaceHref(code, other);
              return (
                <li key={other.geoid}>
                  {href ? <Link href={href}>{other.name}</Link> : <span>{other.name}</span>}
                </li>
              );
            })}
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
