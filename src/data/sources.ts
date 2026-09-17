import type { Citation, OfficialSource } from "./types";

export const RESEARCH_DATE = "September 17, 2026";

export const AGGREGATORS = {
  rcp: { label: "RealClearPolitics 2026 polls", href: "https://www.realclearpolitics.com/epolls/latest_polls/elections/" },
  rcpSenate: { label: "RCP 2026 Senate map", href: "https://www.realclearpolitics.com/epolls/2026/senate/" },
  rcpGovernor: { label: "RCP 2026 governor map", href: "https://www.realclearpolitics.com/epolls/2026/governor/" },
  rcpGeneric: {
    label: "RCP 2026 generic congressional ballot",
    href: "https://www.realclearpolling.com/polls/state-of-the-union/generic-congressional-vote",
  },
  fte: { label: "FiveThirtyEight / ABC News", href: "https://abcnews.go.com/538" },
  cookSenate: { label: "Cook Political Report Senate ratings", href: "https://www.cookpolitical.com/ratings/senate-race-ratings" },
  cookGov: { label: "Cook Political Report governor ratings", href: "https://www.cookpolitical.com/ratings/governor-race-ratings" },
  cookPrintSenate: {
    label: "Cook Political Report Senate ratings (Aug. 20, 2026 print)",
    href: "https://www.cookpolitical.com/print/ratings/races/senate",
  },
  ddhq: { label: "Decision Desk HQ", href: "https://decisiondeskhq.com/" },
  voteGov: { label: "Vote.gov", href: "https://www.vote.gov/" },
} as const;

export function cite(name: string, url: string, accessed = RESEARCH_DATE, published?: string): Citation {
  return published ? { name, url, accessed, published } : { name, url, accessed };
}

export function raceAggregators(extra: OfficialSource[] = []): OfficialSource[] {
  return [
    AGGREGATORS.rcp,
    AGGREGATORS.fte,
    AGGREGATORS.ddhq,
    ...extra,
  ];
}
