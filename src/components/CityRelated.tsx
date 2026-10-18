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
    <section className="max-w-3xl">
      <h2 className="font-serif text-2xl font-semibold">Related pages</h2>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <Link className="font-medium text-navy hover:underline" href={`/cities/${code}`}>
            Census places in {stateName}
          </Link>
        </li>
        {districtLinks.map((link) => (
          <li key={link.href}>
            <Link className="font-medium text-navy hover:underline" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {neighbors.length > 0 ? (
        <>
          <h3 className="mt-6 text-base font-semibold">Other places in the same county</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {neighbors.map((other) => (
              <li key={other.geoid}>
                <Link className="text-navy hover:underline" href={`/cities/${code}/${other.slug}`}>
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {nearest.length > 0 ? (
        <>
          <h3 className="mt-6 text-base font-semibold">Nearest Census places</h3>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Ranked by distance between Census interior points in the 2026 Gazetteer places file.
          </p>
          <ul className="mt-2 space-y-2 text-sm">
            {nearest.map((other) => (
              <li key={other.geoid}>
                <Link className="text-navy hover:underline" href={`/cities/${code}/${other.slug}`}>
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
