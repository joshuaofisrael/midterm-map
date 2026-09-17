import type { Candidate, CandidateLink, Citation, OfficialSource, RaceRating } from "../types";
import { cite } from "../sources";

export function wiki(name: string, slug: string): CandidateLink {
  return { label: "Wikipedia", href: `https://en.wikipedia.org/wiki/${slug}` };
}

export function ballotpedia(name: string, path: string): CandidateLink {
  return { label: "Ballotpedia", href: `https://ballotpedia.org/${path}` };
}

export function officialSite(label: string, href: string): CandidateLink {
  return { label, href };
}

export function person(
  input: Omit<Candidate, "links" | "sources"> & {
    links?: CandidateLink[];
    sources?: Citation[];
  },
): Candidate {
  return {
    ...input,
    links: input.links ?? [],
    sources: input.sources ?? [],
  };
}

export function cook(tier: RaceRating["tier"], asOf: string, url: string): RaceRating {
  return { outlet: "Cook Political Report", tier, asOf, url };
}

export function sabato(tier: RaceRating["tier"], asOf: string, url: string): RaceRating {
  return { outlet: "Sabato's Crystal Ball", tier, asOf, url };
}

export function insideElections(tier: RaceRating["tier"], asOf: string, url: string): RaceRating {
  return { outlet: "Inside Elections", tier, asOf, url };
}

export function decisionDesk(tier: RaceRating["tier"], asOf: string, url: string): RaceRating {
  return { outlet: "Decision Desk HQ", tier, asOf, url };
}

export const BP_GA_SENATE = "https://ballotpedia.org/United_States_Senate_election_in_Georgia,_2026";
export const BP_MI_SENATE = "https://ballotpedia.org/United_States_Senate_election_in_Michigan,_2026";
export const BP_NC_SENATE = "https://ballotpedia.org/United_States_Senate_election_in_North_Carolina,_2026";
export const BP_TX_SENATE = "https://ballotpedia.org/United_States_Senate_election_in_Texas,_2026";

export const senateOfficeExplainer =
  "Each state elects two U.S. senators. A senator’s term is six years. Class 2 seats are on the regular 2026 cycle. The Senate writes and votes on federal legislation, confirms many presidential nominees, and tries impeachments. The winner of a November general election takes office only after the state’s official canvass and the new Congress is seated.";

export const governorOfficeExplainer =
  "A governor is the state’s chief executive. Typical duties include proposing a budget, signing or vetoing bills, appointing some officials, and commanding the state National Guard under state and federal law. Term length and term limits are set by each state’s constitution. Lieutenant-governor pairing, if any, follows that state’s ballot design.";

export const houseOfficeExplainer =
  "Each U.S. House district elects one representative for a two-year term. Your district is assigned by official maps and your registered address — not by opening a page on this site. The House originates revenue bills, shares lawmaking with the Senate, and can impeach federal officers. All 435 voting seats are on the ballot in 2026.";

export function standardFaqs(office: string, officialLabel: string): { question: string; answer: string }[] {
  return [
    {
      question: "When is Election Day?",
      answer:
        "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. Early voting and mail-ballot calendars differ by state.",
    },
    {
      question: `Is this the official candidate list for ${office}?`,
      answer: `No. Map the Midterms is not an election office. Confirm qualified names with ${officialLabel} and the official sample ballot for your address.`,
    },
    {
      question: "Are the poll numbers a forecast?",
      answer:
        "No. Tables show individual published surveys with the pollster, dates, sample, and a link. They are not a prediction and not an average unless a cited aggregator says so.",
    },
  ];
}

export const cookSenatePrint = cite(
  "Cook Political Report, 2026 Senate race ratings (print)",
  "https://www.cookpolitical.com/print/ratings/races/senate",
  "September 17, 2026",
  "August 20, 2026",
);

export function senateAggregators(ballotpediaUrl: string, rcpUrl?: string): OfficialSource[] {
  return [
    { label: "Ballotpedia race page", href: ballotpediaUrl },
    { label: "RealClearPolitics 2026 polls", href: rcpUrl ?? "https://www.realclearpolitics.com/epolls/latest_polls/elections/" },
    { label: "FiveThirtyEight / ABC News", href: "https://abcnews.go.com/538" },
    { label: "Cook Political Report Senate ratings", href: "https://www.cookpolitical.com/ratings/senate-race-ratings" },
    { label: "Decision Desk HQ", href: "https://decisiondeskhq.com/" },
  ];
}

export function govAggregators(ballotpediaUrl: string, rcpUrl?: string): OfficialSource[] {
  return [
    { label: "Ballotpedia race page", href: ballotpediaUrl },
    { label: "RealClearPolitics 2026 governor polls", href: rcpUrl ?? "https://www.realclearpolitics.com/epolls/2026/governor/" },
    { label: "FiveThirtyEight / ABC News", href: "https://abcnews.go.com/538" },
    { label: "Cook Political Report governor ratings", href: "https://www.cookpolitical.com/ratings/governor-race-ratings" },
  ];
}

export function houseAggregators(ballotpediaUrl: string): OfficialSource[] {
  return [
    { label: "Ballotpedia race page", href: ballotpediaUrl },
    { label: "House.gov find your representative", href: "https://www.house.gov/representatives/find-your-representative" },
    { label: "RealClearPolitics 2026 polls", href: "https://www.realclearpolitics.com/epolls/latest_polls/elections/" },
  ];
}
