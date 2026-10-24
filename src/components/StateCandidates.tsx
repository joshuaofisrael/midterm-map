import { CandidateContestList } from "@/components/CandidateContestList";
import { ballotContests } from "@/data/candidates/load";

/** November 3, 2026 candidates for a state hub, in stored-list order. */
export function StateCandidates({ code, stateName }: { code: string; stateName: string }) {
  const ballot = ballotContests(code);
  if (ballot.contests.length === 0) return null;
  return (
    <section id="candidates" className="rounded-xl border border-line bg-paper-card p-5">
      <h2 className="font-serif text-2xl font-semibold">
        Candidates on the {stateName} ballot, November 3, 2026
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-muted">
        Names and parties are copied in stored-list order: U.S. Senate, each U.S. House district,
        governor, then other statewide offices, including attorney general, secretary of state,
        treasurer, auditor, comptroller, superintendent, commissioners, and state supreme court
        seats when that list contains them. State legislative contests are included when that
        stored list contains them.
      </p>
      <div className="mt-4">
        <CandidateContestList contests={ballot.contests} variant="site" />
      </div>
    </section>
  );
}
