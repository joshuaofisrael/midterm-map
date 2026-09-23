import { ballotSectionsForState } from "./ballots";
import { SITE } from "./site";
import type { RaceGuide, StateProfile } from "./types";

export type BallotFaq = {
  question: string;
  answer: string;
};

/**
 * Ballot-page FAQ copy. The same strings render on /ballot/[code] and in FAQPage JSON-LD.
 * Answers only restate the state profile, official links, sample-ballot notes,
 * the sketch section titles already rendered on the page, and race-guide titles.
 */
export function ballotStateFaqs(state: StateProfile, races: RaceGuide[]): BallotFaq[] {
  const office = state.officialElectionOffice.label;
  const sample = state.sampleBallotOfficial;
  const distinctSample = sample && sample.href !== state.officialElectionOffice.href;
  const offices = joinList(state.statewideOffices2026);
  const guideTitles = joinList(races.map((race) => race.title));
  const houseGuides = races.filter((race) => race.chamber === "house");
  const sectionTitles = ballotSectionsForState(state.code).map((section) => section.title);

  const senate = state.hasSenateClass2
    ? `${state.name} has a Class 2 U.S. Senate seat on the regular 2026 cycle.`
    : `No Class 2 U.S. Senate seat is scheduled for ${state.name} in 2026. A special election would appear only if official authorities call one.`;
  const governor = state.hasGovernor2026
    ? `The governor’s office is on the 2026 cycle.`
    : `The governor’s office is not on the regular 2026 ballot in ${state.name}.`;
  const extraNotes = state.sampleBallotNotes.filter((note) => {
    const normalized = note.toLowerCase();
    return !normalized.startsWith("u.s. senate") && !normalized.startsWith("governor");
  });

  const sampleWhere = distinctSample
    ? `For an official sample ballot, start with ${sample.label}. For registration and election rules, use ${office}.`
    : `For an official sample ballot, registration, and election rules, start with ${office}.`;

  const houseCaveat =
    houseGuides.length === 0
      ? ""
      : houseGuides.length === 1
        ? ` ${houseGuides[0].title} is one district example. It is not a claim that the district is yours.`
        : " The U.S. House guides are district examples, not a lookup of your district.";

  const guides =
    races.length === 0
      ? `Map the Midterms does not yet publish a ${state.name} race guide for this ballot sketch. Use your official sample ballot for every contest on your address, and confirm it with ${office}.`
      : `The race guides that relate to this ${state.name} ballot sketch are ${guideTitles}.${houseCaveat} These pages cite public sources. They are not a certified candidate list, not a poll average, and not an endorsement. Other districts and local contests in ${state.name} are not covered in depth. Open the race guides on this page, then confirm names with ${office}.`;

  const sections =
    sectionTitles.length === 0
      ? "the contest groups shown on this page"
      : sectionTitles.join("; ");

  return [
    {
      question: `Is this my official ${state.name} sample ballot?`,
      answer: `No. This ${state.name} page is a sectioned sketch of contests that often appear. It is incomplete, may be outdated, and is not a substitute for the sample ballot issued by your county or ${office}. It is not an official ballot and not a certified candidate list.`,
    },
    {
      question: `How do I get an official ${state.name} sample ballot or verify registration?`,
      answer: `This sketch cannot issue your ballot or check your registration. ${sampleWhere} You can also start registration from ${state.voteGov.label}. ${state.registrationNote} ${state.mailNote} Map the Midterms does not look up voter records, issue sample ballots, or request mail ballots.`,
    },
    {
      question: `What contests does this ${state.name} ballot sketch cover for 2026?`,
      answer: `This structured sketch covers these sections: ${sections}. ${senate} ${governor} Statewide offices often on the ${state.name} ballot include ${offices}. ${extraNotes.length ? `${extraNotes.join(" ")} ` : ""}The sketch is not your official ballot and not a list of candidates. Confirm the final ballot with ${office}.`,
    },
    {
      question: `Which Map the Midterms race guides relate to this ${state.name} ballot sketch?`,
      answer: guides,
    },
    {
      question: "Is Map the Midterms an official election website?",
      answer: `No. ${SITE.name} is an informational site operated by ${SITE.legalName}, a ${SITE.entityType}. It is not a government, secretary of state, or county election website, and this sample-ballot sketch is not issued by an election office. The official election office for ${state.name} is ${office}. Verify registration, sample ballots, and voting rules there or with ${state.voteGov.label}.`,
    },
  ];
}

function joinList(items: string[]): string {
  if (items.length === 0) return "the offices your election office lists for this cycle";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
