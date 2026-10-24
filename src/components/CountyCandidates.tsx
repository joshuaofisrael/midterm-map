import { CandidateContestList } from "@/components/CandidateContestList";
import { SourceLines, uniqueCitations } from "@/components/SourceLines";
import { candidateFile, contestsForPlaces, type CandidateSource } from "@/data/candidates/load";
import { localFile, type LocalContest } from "@/data/local/load";
import type { CountyBucket } from "@/data/places/load";
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

export function CountyCandidates({ code, county }: { code: string; county: CountyBucket }) {
  const file = candidateFile(code);
  const { contests, houseBasis } = contestsForPlaces(code, county.places);
  const local = localFile(code);
  const countyContests = local?.localByCounty?.[county.name] ?? [];
  const read = local?.countyRead?.[county.name];
  const unpublished = local?.countyUnpublished?.[county.name];
  const sources: Citation[] = [];
  for (const source of file?.sources ?? []) sources.push(sourceCitation(source));
  if (read) sources.push({ name: read.label, url: read.href, accessed: local?.accessed });
  if (unpublished) sources.push({ name: unpublished.label, url: unpublished.href, accessed: local?.accessed });
  for (const source of read?.sources ?? []) sources.push(sourceCitation(source, local?.accessed));
  for (const source of unpublished?.sources ?? []) sources.push(sourceCitation(source, local?.accessed));

  return (
    <section id="candidates" className="rounded-xl border border-line bg-paper-card p-5">
      <h2 className="font-serif text-2xl font-semibold">Candidates</h2>
      <p className="mt-3 text-sm leading-6 text-ink-muted">
        Names and parties are copied in stored-list order: U.S. Senate, each U.S. House district
        that covers a Census place in this county, governor, then other statewide offices. State
        legislative contests are included when that stored list contains them. Local contests from
        the stored county list follow. City contests stay on each city page.
      </p>
      {file?.status === "unpublished" ? (
        <p className="mt-3 text-sm leading-6">
          Statewide and U.S. House candidates for this state are not yet listed on this site.
        </p>
      ) : null}
      {!file ? (
        <p className="mt-3 text-sm leading-6">
          Statewide and U.S. House candidates for this state are not in the stored lists.
        </p>
      ) : null}
      {houseBasis === "bef" ? (
        <p className="mt-3 text-sm leading-6">
          U.S. House contests follow the <a className="text-navy underline" href="/sources/#house-120">120th block assignment</a>.
        </p>
      ) : null}
      {houseBasis === "unchanged" ? (
        <p className="mt-3 text-sm leading-6">
          U.S. House contests follow the <a className="text-navy underline" href="/sources/#house-119">119th district numbers</a>.
        </p>
      ) : null}
      {contests.length > 0 ? (
        <div className="mt-4">
          <CandidateContestList contests={contests} variant="site" />
        </div>
      ) : null}
      {countyContests.length > 0 ? (
        <div className="mt-8">
          <h3 className="font-serif text-xl font-semibold">Local contests</h3>
          {read?.intro ? <p className="mt-2 text-sm leading-6">{read.intro}</p> : null}
          <CandidateContestList contests={countyContests.map(asLocalContest)} variant="site" />
        </div>
      ) : null}
      {unpublished ? (
        <p className="mt-4 text-sm leading-6">
          Local races: no official listing found yet.{" "}
          <a className="text-navy underline" href={unpublished.href}>
            {unpublished.label}
          </a>
          .
        </p>
      ) : null}
      {read?.note ? <p className="mt-4 text-sm leading-6">{read.note}</p> : null}
      {countyContests.length === 0 && read?.empty ? (
        <p className="mt-4 text-sm leading-6">{read.empty}</p>
      ) : null}
      {!local && file?.status === "published" ? (
        <p className="mt-4 text-sm leading-6">Local contests are not in the stored lists for this state.</p>
      ) : null}
      <SourceLines sources={uniqueCitations(sources)} />
    </section>
  );
}

function sourceCitation(source: CandidateSource, accessed?: string): Citation {
  return { name: source.name, url: source.url, accessed: source.accessed ?? accessed };
}
