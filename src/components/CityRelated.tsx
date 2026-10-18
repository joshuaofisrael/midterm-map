import Link from "next/link";
import { houseDistrictNumbers } from "@/data/candidates/load";
import { countyNeighbors, nearbyFor, placesForSlugs } from "@/data/places/nearby";
import type { PlaceRecord } from "@/data/places/load";
import { racesForState } from "@/data/races";
import { isStateCode } from "@/data/states";
import type { StateCode } from "@/data/types";

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

  return (
    <section>
      <h2>Related pages</h2>
      <ul>
        <li>
          <Link href={`/cities/${code}`}>Census places in {stateName}</Link>
        </li>
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
                <Link href={`/cities/${code}/${other.slug}`}>{other.name}</Link>
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
                <Link href={`/cities/${code}/${other.slug}`}>{other.name}</Link>
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
