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
    answer: `No. ${SITE.name} is an informational site. It is not a government, secretary of state, or county election website. Ballots, registration, and voting rules are published by the state or county election office and by Vote.gov.`,
  },
  {
    question: "How does the ballot ZIP lookup work?",
    answer:
      "The ballot ZIP lookup runs in the browser. The first three digits select a starter-state sample-ballot sketch from a table shipped with the page. A five-digit ZIP is kept in session storage for this tab until the tab closes, and narrows U.S. House districts and local contests. It is not added to the page address. The browser loads a public Census file from this site at /zcta/ plus the first three digits and .json, and uses the five-digit ZIP only as the key for a row in that file. An older ballot address that still has #zip= is copied into that session storage and the fragment is removed before advertising or analytics scripts run. The separate Census place search on the homepage does not add the ZIP to the page address and does not store it. It loads the same kind of three-digit file and reads the five-digit ZIP in the browser. Neither lookup is an official ballot, a voter-file search, or a registration check. The ballot lookup does not write the ZIP into local storage or a cookie set by this site. The site does not collect Social Security numbers, voter registration numbers, or ballot images. The official sample ballot for an address is issued by the election office.",
  },
  {
    question: "Where do candidate names and ratings come from?",
    answer:
      "A race guide names a 2026 candidate only when an election-office candidate list, certified ballot, certified results page, or the Clerk of the House nominee list includes that name. The short bio restates that listing. Race ratings appear only when a named outlet — for example Cook Political Report, Inside Elections, or Sabato’s Crystal Ball — has published a rating this site can link. Those placements are attributions, not Map the Midterms endorsements or forecasts.",
  },
  {
    question: "When do results appear on this site?",
    answer: `The results tracker stays in awaiting-returns mode until Election Day, ${SITE.electionDayLabel}. It links a results page for each starter state and for each race guide, plus the live results page. Unofficial returns, if shown, appear around Election Night and the days after. ${SITE.name} does not certify outcomes. Later totals remain unofficial until a state or county certifies the contest.`,
  },
  {
    question: "Where are official election offices listed?",
    answer:
      "The ballot lookup page and each starter-state hub link to that state’s official election office. Vote.gov publishes state registration information.",
  },
];
