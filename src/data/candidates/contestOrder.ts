import type { CandidateContest, ContestKind } from "./load";

/** District number used to match a place row to a U.S. House contest. At-large is "0". */
export function districtNumber(value: string): string {
  if (/at Large/i.test(value)) return "0";
  const match = /(\d+)/.exec(value);
  if (!match) return "";
  return String(parseInt(match[1], 10));
}

/** Stored-list order: Senate, House districts, governor, other statewide. */
const KIND_ORDER: Record<ContestKind, number> = {
  senate: 0,
  house: 1,
  governor: 2,
  statewide: 3,
};

export function sortContests(contests: CandidateContest[]): CandidateContest[] {
  return contests
    .map((contest, index) => ({ contest, index }))
    .sort((a, b) => {
      const byKind = KIND_ORDER[a.contest.kind] - KIND_ORDER[b.contest.kind];
      if (byKind !== 0) return byKind;
      if (a.contest.kind === "house") {
        const left = Number(districtNumber(a.contest.district ?? ""));
        const right = Number(districtNumber(b.contest.district ?? ""));
        if (left !== right) return left - right;
      }
      return a.index - b.index;
    })
    .map((row) => row.contest);
}
