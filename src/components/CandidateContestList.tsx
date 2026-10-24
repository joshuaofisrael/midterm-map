import { BallotpediaLink } from "@/components/BallotpediaLink";
import { districtNumber } from "@/data/candidates/district";

export type ListedCandidate = { name: string; party: string; ballotpedia?: string };

export type ListedContest = {
  office: string;
  kind: string;
  district: string | null;
  candidates: ListedCandidate[];
  source?: { name: string; url: string };
};

function contestKey(contest: ListedContest, index: number): string {
  return `${index}-${contest.kind}-${contest.district ?? ""}-${contest.office}`;
}

export function CandidateContestList({
  contests,
  variant,
  markHouse = false,
}: {
  contests: ListedContest[];
  variant: "city" | "site";
  markHouse?: boolean;
}) {
  return contests.map((contest, index) => {
    const houseDistrict =
      markHouse && contest.kind === "house" ? districtNumber(contest.district ?? contest.office) : "";
    const heading = contest.office;
    if (variant === "city") {
      return (
        <div key={contestKey(contest, index)} data-house-district={houseDistrict || undefined}>
          <h3>{heading}</h3>
          <ol>
            {contest.candidates.map((candidate, candidateIndex) => (
              <li key={`${candidateIndex}-${candidate.name}-${candidate.party}`}>
                {candidate.party ? `${candidate.name} — ${candidate.party}` : candidate.name}{" "}
                <BallotpediaLink href={candidate.ballotpedia} />
              </li>
            ))}
          </ol>
          {contest.source?.url ? (
            <p>
              Source:{" "}
              <a href={contest.source.url} rel="noopener noreferrer">
                {contest.source.name}
              </a>
            </p>
          ) : null}
        </div>
      );
    }
    return (
      <div
        key={contestKey(contest, index)}
        className="mt-6 border-t border-line pt-4 first:mt-0 first:border-t-0 first:pt-0"
        data-house-district={houseDistrict || undefined}
      >
        <h3 className="font-semibold">{heading}</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6">
          {contest.candidates.map((candidate, candidateIndex) => (
            <li key={`${candidateIndex}-${candidate.name}-${candidate.party}`}>
              {candidate.party ? `${candidate.name} — ${candidate.party}` : candidate.name}{" "}
              <BallotpediaLink href={candidate.ballotpedia} />
            </li>
          ))}
        </ol>
        {contest.source?.url ? (
          <p className="mt-2 text-xs leading-5 text-ink-muted">
            Source:{" "}
            <a className="text-navy hover:underline" href={contest.source.url} rel="noopener noreferrer">
              {contest.source.name}
            </a>
          </p>
        ) : null}
      </div>
    );
  });
}
