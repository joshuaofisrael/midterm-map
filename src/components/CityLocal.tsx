import { SourceLines, uniqueCitations } from "@/components/SourceLines";
import { localFile, type LocalContest, type LocalFile } from "@/data/local/load";
import type { PlaceRecord } from "@/data/places/load";
import type { Citation } from "@/data/types";

const READ = "October 17, 2026";

export function CityLocal({ code, place }: { code: string; place: PlaceRecord }) {
  const data = localFile(code);
  if (!data) return null;

  const placeLocal = data.local?.[place.geoid] ?? [];
  const readCounties = place.counties.filter((county) => data.countyRead?.[county]);
  const unpublishedCounties = place.counties.filter((county) => data.countyUnpublished?.[county]);
  const countyContests = readCounties.flatMap((county) => data.localByCounty?.[county] ?? []);
  const hasBody =
    placeLocal.length > 0 ||
    countyContests.length > 0 ||
    unpublishedCounties.length > 0 ||
    readCounties.some((county) => {
      const listing = data.countyRead?.[county];
      return Boolean(listing?.note || listing?.empty || (data.localByCounty?.[county] ?? []).length);
    });
  if (!hasBody) return null;

  const sources: Citation[] = [];
  for (const source of data.extraSources ?? []) {
    sources.push({ name: source.name, url: source.url, accessed: READ });
  }
  for (const county of [...readCounties, ...unpublishedCounties]) {
    const listing = data.countyRead?.[county] ?? data.countyUnpublished?.[county];
    if (listing) sources.push({ name: listing.label, url: listing.href, accessed: READ });
  }

  return (
    <section className="max-w-3xl">
      <h2 className="font-serif text-2xl font-semibold">Local races</h2>
      {data.date ? <p className="mt-4 text-sm leading-6">{data.date.text}</p> : null}
      {placeLocal.length > 0 ? (
        <>
          {data.localIntro ? <p className="mt-4 text-sm leading-6">{data.localIntro}</p> : null}
          {placeLocal.map((contest) => (
            <Contest key={`${contest.office}-${contest.district ?? ""}`} contest={contest} />
          ))}
        </>
      ) : null}
      {place.counties.map((county) => (
        <CountyBlock key={county} county={county} data={data} />
      ))}
      <SourceLines sources={uniqueCitations(sources)} />
    </section>
  );
}

function CountyBlock({ county, data }: { county: string; data: LocalFile }) {
  const unpublished = data.countyUnpublished?.[county];
  if (unpublished) {
    return (
      <div className="mt-4">
        <p className="text-sm leading-6">Local races: no official listing found yet</p>
        <p className="mt-2 text-sm leading-6">
          Census county: {county}.{" "}
          <a className="text-navy hover:underline" href={unpublished.href}>
            {unpublished.label}
          </a>
          .
        </p>
      </div>
    );
  }
  const read = data.countyRead?.[county];
  if (!read) return null;
  const contests = data.localByCounty?.[county] ?? [];
  if (contests.length === 0 && !read.note && !read.empty) return null;
  return (
    <div className="mt-4">
      {contests.length > 0 && read.intro ? <p className="text-sm leading-6">{read.intro}</p> : null}
      {contests.map((contest) => (
        <Contest key={`${county}-${contest.office}-${contest.district ?? ""}`} contest={contest} />
      ))}
      {read.note ? <p className="mt-2 text-sm leading-6">{read.note}</p> : null}
      {contests.length === 0 && !read.note && read.empty ? (
        <p className="text-sm leading-6">{read.empty}</p>
      ) : null}
    </div>
  );
}

function Contest({ contest }: { contest: LocalContest }) {
  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold">{contest.office}</h3>
      {contest.district ? <p className="mt-2 text-sm leading-6">District column: {contest.district}.</p> : null}
      {contest.term ? (
        <p className="mt-2 text-sm leading-6">The list&apos;s Office Term column prints {contest.term}.</p>
      ) : null}
      {contest.termType ? (
        <p className="mt-2 text-sm leading-6">The list&apos;s Term Type column prints {contest.termType}.</p>
      ) : null}
      {contest.termLength ? (
        <p className="mt-2 text-sm leading-6">The list&apos;s Term Length column prints {contest.termLength}.</p>
      ) : null}
      {contest.seats ? (
        <p className="mt-2 text-sm leading-6">The list&apos;s Number of Seats column prints {contest.seats}.</p>
      ) : null}
      {contest.incumbentLine ? (
        <p className="mt-2 text-sm leading-6">The list prints Incumbent: {contest.incumbentLine}.</p>
      ) : null}
      {contest.candidates.some((candidate) => candidate.mark) ? (
        <p className="mt-2 text-sm leading-6">
          The list&apos;s Incumbent column prints{" "}
          {contest.candidates
            .filter((candidate) => candidate.mark)
            .map((candidate) => `${candidate.name} ${candidate.mark}`)
            .join("; ")}
          .
        </p>
      ) : null}
      {contest.candidates.length > 0 ? (
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6">
          {contest.candidates.map((candidate, index) => (
            <li key={`${index}-${candidate.name}-${candidate.party}`}>
              {candidate.party ? `${candidate.name} — ${candidate.party}` : candidate.name}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
