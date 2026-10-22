import Link from "next/link";
import type { PlaceRecord } from "@/data/places/load";
import { placeDisplayName, placeIndexLetter, placeIsStandalone, placeTargetPath } from "@/lib/placeNames";
import { formatPopulation } from "@/lib/placeText";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");

export function PlaceIndex({
  stateCode,
  places,
  heading,
}: {
  stateCode: string;
  places: PlaceRecord[];
  heading: string;
}) {
  const groups = new Map<string, PlaceRecord[]>();
  const ordered = [...places].sort((a, b) => {
    const byName = placeDisplayName(a.name).localeCompare(placeDisplayName(b.name), "en");
    return byName === 0 ? a.geoid.localeCompare(b.geoid) : byName;
  });
  for (const place of ordered) {
    const letter = placeIndexLetter(place.name);
    const list = groups.get(letter);
    if (list) list.push(place);
    else groups.set(letter, [place]);
  }

  return (
    <section>
      <h2 className="font-serif text-2xl font-semibold">{heading}</h2>
      <nav aria-label="A to Z" className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {LETTERS.map((letter) =>
          groups.has(letter) ? (
            <a key={letter} className="font-medium text-navy hover:underline" href={`#letter-${letter}`}>
              {letter}
            </a>
          ) : (
            <span key={letter} className="text-ink-muted">
              {letter}
            </span>
          ),
        )}
      </nav>
      {LETTERS.filter((letter) => groups.has(letter)).map((letter) => (
        <div key={letter} id={`letter-${letter}`} className="mt-6">
          <h3 className="font-serif text-xl font-semibold">{letter}</h3>
          <ul className="mt-2 divide-y divide-line border-y border-line text-sm">
            {groups.get(letter)?.map((place) => {
              const ownPage = placeIsStandalone(place);
              return (
                <li key={place.geoid} className="flex flex-wrap gap-x-3 py-1.5">
                  <Link
                    className="font-medium text-navy hover:underline"
                    href={ownPage ? `/cities/${stateCode}/${place.slug}` : placeTargetPath(stateCode, place)}
                  >
                    {placeDisplayName(place.name)}
                  </Link>
                  <span className="text-ink-muted">{place.name}</span>
                  <span className="text-ink-muted">
                    {place.pop == null ? "No 2020 population" : formatPopulation(place.pop)}
                  </span>
                  {ownPage ? null : <span className="text-ink-muted">Listed on the county page</span>}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
