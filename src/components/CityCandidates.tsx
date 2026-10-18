import { SourceLines } from "@/components/SourceLines";
import { contestsForPlace, candidateFile } from "@/data/candidates/load";
import {
  cd120BefCitation,
  congressionalBoundariesCitation,
  countyCitation,
  districtCitation,
} from "@/data/censusSources";
import type { PlaceRecord } from "@/data/places/load";
import type { Citation } from "@/data/types";

export function CityCandidates({ code, place }: { code: string; place: PlaceRecord }) {
  const file = candidateFile(code);
  if (!file) return null;

  if (file.status === "unpublished") {
    return (
      <section className="max-w-3xl">
        <h2 className="font-serif text-2xl font-semibold">2026 general election candidates</h2>
        <p className="mt-4 text-sm leading-6">
          Candidates for this state are not yet listed on this site. Check the official state
          election office below.
        </p>
        <SourceLines sources={file.sources} />
      </section>
    );
  }

  const { contests, houseBasis } = contestsForPlace(code, place);
  const sources: Citation[] = [...file.sources];
  if (houseBasis === "bef") sources.push(cd120BefCitation, countyCitation);
  if (houseBasis === "unchanged") sources.push(congressionalBoundariesCitation, districtCitation);

  return (
    <section className="max-w-3xl">
      <h2 className="font-serif text-2xl font-semibold">2026 general election candidates</h2>
      {houseBasis === "bef" ? (
        <p className="mt-4 text-sm leading-6">
          U.S. House contests below are the ones on the official list for each 120th Congressional
          District whole-block assignment that covers this place.
        </p>
      ) : null}
      {houseBasis === "unchanged" ? (
        <p className="mt-4 text-sm leading-6">
          U.S. House contests below are the ones on the official list for each 119th Congress
          district number in the relationship file for this place. The Census Bureau states that
          this jurisdiction&apos;s congressional boundaries had no changes from the 2024 cycle for
          the 2026 election.
        </p>
      ) : null}
      {contests.map((contest) => (
        <div key={`${contest.kind}-${contest.district ?? "statewide"}-${contest.office}`} className="mt-6">
          <h3 className="text-base font-semibold">{contest.office}</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6">
            {contest.candidates.map((candidate, index) => (
              <li key={`${index}-${candidate.name}-${candidate.party}`}>
                {candidate.name} — {candidate.party}
              </li>
            ))}
          </ol>
        </div>
      ))}
      <SourceLines sources={sources} />
    </section>
  );
}
