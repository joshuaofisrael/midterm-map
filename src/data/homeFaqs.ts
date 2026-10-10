import { ELECTION_DATES } from "./electionDates";
import { SITE } from "./site";

export type HomeFaq = {
  question: string;
  answer: string;
};

/**
 * Homepage FAQ copy. The same strings render on the page and in FAQPage JSON-LD.
 */
export const HOME_FAQS: HomeFaq[] = [
  {
    question: "When is Election Day 2026?",
    answer: `The 2026 U.S. midterm general election is ${SITE.electionDayLabel}. Early in-person voting and mail-ballot request and return calendars vary by state. Dates for ${ELECTION_DATES.length} states are on this site’s voting-deadlines page, each with an official source.`,
  },
  {
    question: "Is Map the Midterms an official election website?",
    answer: `No. ${SITE.name} is an informational site operated by ${SITE.legalName}, a ${SITE.entityType}. It is not a government, secretary of state, or county election website. Ballots, registration, and voting rules are published by the state or county election office and by Vote.gov.`,
  },
  {
    question: "How does the ballot ZIP lookup work?",
    answer:
      "The ZIP lookup runs in the browser and maps a prefix to a starter-state sample-ballot sketch. It is not an official ballot, not a voter-file search, and not a registration check. The site does not collect Social Security numbers, voter registration numbers, or ballot images. The official sample ballot for an address is issued by the election office.",
  },
  {
    question: "Where do candidate names and ratings come from?",
    answer:
      "Candidate names and short bios are compiled from cited public sources such as Ballotpedia, Wikipedia, and official pages. Race ratings appear only when a named outlet — for example Cook Political Report, Inside Elections, or Sabato’s Crystal Ball — has published a rating this site can link. Those placements are attributions, not Map the Midterms endorsements or forecasts.",
  },
  {
    question: "When do results appear on this site?",
    answer: `The results tracker stays in awaiting-returns mode until Election Day, ${SITE.electionDayLabel}. Unofficial returns, if shown, appear around Election Night and the days after. ${SITE.name} does not certify outcomes. Until a race has returns, key-race titles open the race guide. Later totals remain unofficial until a state or county certifies the contest.`,
  },
  {
    question: "Where are official election offices listed?",
    answer:
      "The ballot lookup page and each starter-state hub link to that state’s official election office. Vote.gov publishes state registration information.",
  },
];
