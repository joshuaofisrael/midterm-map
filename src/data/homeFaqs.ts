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
    answer: `The 2026 U.S. midterm general election is ${SITE.electionDayLabel}. Early in-person voting and mail-ballot request and return calendars vary by state. Confirm those dates, ID rules, and your polling place with your state or county election office.`,
  },
  {
    question: "Is Map the Midterms an official election website?",
    answer: `No. ${SITE.name} is an informational site operated by ${SITE.legalName}, a ${SITE.entityType}. It is not a government, secretary of state, or county election website. Verify ballots, registration, and voting rules with your state or county election office or Vote.gov.`,
  },
  {
    question: "How does the ballot ZIP lookup work?",
    answer:
      "The ZIP lookup runs in your browser and maps a prefix to a starter-state sample-ballot sketch. It is not your official ballot, not a voter-file search, and not a registration check. We do not collect Social Security numbers, voter registration numbers, or ballot images. Confirm the official sample ballot for your address with your election office.",
  },
  {
    question: "Where do candidate names and ratings come from?",
    answer:
      "Candidate names and short bios are compiled from cited public sources such as Ballotpedia, Wikipedia, and official pages. Race ratings appear only when a named outlet — for example Cook Political Report, Inside Elections, or Sabato’s Crystal Ball — has published a rating we can link. Those placements are attributions, not Map the Midterms endorsements or forecasts.",
  },
  {
    question: "When do results appear on this site?",
    answer: `The results tracker stays in awaiting-returns mode until Election Day, ${SITE.electionDayLabel}. Unofficial returns, if shown, appear around Election Night and the days after. ${SITE.name} does not certify outcomes. Until a race has returns, key-race titles open the race guide. Treat any later totals as unofficial until a state or county certifies the contest.`,
  },
  {
    question: "How do I find my state’s official election office?",
    answer:
      "Use the Ballot lookup page or a state hub on this site. Each starter-state page links to that state’s official election office. Vote.gov is the federal starting point for official state registration and election information. Always confirm details with the official office, not this site.",
  },
];
