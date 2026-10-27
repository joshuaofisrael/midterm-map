import { BallotZipNarrow } from "@/components/BallotZipNarrow";
import { CandidateContestList } from "@/components/CandidateContestList";
import { SourceLines, uniqueCitations } from "@/components/SourceLines";
import { ballotContests } from "@/data/candidates/load";
import { localFile, type LocalContest, type LocalSource } from "@/data/local/load";
import { countiesForState, placesForState } from "@/data/places/load";
import type { Citation } from "@/data/types";

function listedOffice(office: string, district?: string | null): string {
  if (!district) return office;
  if (office.toLowerCase().includes(district.toLowerCase())) return office;
  return `${office} — ${district}`;
}

function asLocalContest(contest: LocalContest) {
  return {
    office: listedOffice(contest.office, contest.district),
    kind: "local",
    district: contest.district ?? null,
    candidates: contest.candidates,
  };
}

export function BallotCandidates({ code, stateName }: { code: string; stateName: string }) {
  const ballot = ballotContests(code);
  const local = localFile(code);
  const countyEntries = Object.entries(local?.localByCounty ?? {});
  const cityEntries = Object.entries(local?.local ?? {}).filter(([, contests]) => contests.length > 0);
  const places = local ? placesForState(code) : [];
  const byGeoid = new Map(places.map((place) => [place.geoid, place]));
  const countySlugs = local
    ? new Map(
        countiesForState(code).map((county) => [county.name, county.places.map((place) => place.slug).join(" ")]),
      )
    : new Map<string, string>();
  const sources: Citation[] = ballot.sources.map((source) => ({
    name: source.name,
    url: source.url,
    accessed: source.accessed,
  }));
  const cite = (source: LocalSource) => {
    sources.push({ name: source.name, url: source.url, accessed: source.accessed ?? local?.accessed });
  };
  for (const source of local?.extraSources ?? []) cite(source);
  for (const [county] of countyEntries) {
    const listing = local?.countyRead?.[county];
    if (!listing) continue;
    sources.push({ name: listing.label, url: listing.href, accessed: local?.accessed });
    for (const source of listing.sources ?? []) cite(source);
  }
  for (const [geoid] of cityEntries) {
    for (const source of local?.localPlace?.[geoid]?.sources ?? []) cite(source);
  }

  return (
    <section id="ballot-candidates" className="rounded-xl border border-line bg-paper-card p-5">
      <h2 className="font-serif text-2xl font-semibold">Candidates on the {stateName} ballot</h2>
      <p className="mt-3 text-sm leading-6 text-ink-muted">
        Names and parties are copied in stored-list order: U.S. Senate, each U.S. House district,
        governor, then other statewide offices. State legislative contests are included when that
        stored list contains them. Local contests from the stored city and county lists follow. A
        ZIP kept in this tab’s session storage narrows U.S. House districts, and local contests,
        in this browser. It is not added to the page address.
      </p>
      <BallotZipNarrow stateCode={code} />
      {ballot.status === "unpublished" ? (
        <p className="mt-3 text-sm leading-6">
          Statewide and U.S. House candidates for {stateName} are not yet listed on this site.
        </p>
      ) : null}
      {ballot.status === "missing" ? (
        <p className="mt-3 text-sm leading-6">
          Statewide and U.S. House candidates for {stateName} are not in the stored lists.
        </p>
      ) : null}
      {ballot.contests.length > 0 ? (
        <div className="mt-4">
          <CandidateContestList contests={ballot.contests} variant="site" markHouse />
        </div>
      ) : null}
      {countyEntries.length > 0 || cityEntries.length > 0 ? (
        <div className="mt-8">
          <h3 className="font-serif text-xl font-semibold">Local contests</h3>
          {countyEntries.map(([county, contests]) => (
            <div key={county} className="mt-6" data-county-places={countySlugs.get(county) || undefined}>
              <h4 className="font-semibold">{county}</h4>
              <CandidateContestList contests={contests.map(asLocalContest)} variant="site" />
            </div>
          ))}
          {cityEntries.map(([geoid, contests]) => {
            const place = byGeoid.get(geoid);
            const slug = place?.slug;
            return (
              <div key={geoid} className="mt-6" data-place-slug={slug}>
                <h4 className="font-semibold">{place?.name ?? `GEOID ${geoid}`}</h4>
                <CandidateContestList contests={contests.map(asLocalContest)} variant="site" />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6">Local contests are not in the stored lists for {stateName}.</p>
      )}
      <SourceLines sources={uniqueCitations(sources)} />
    </section>
  );
}
