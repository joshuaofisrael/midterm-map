import { SITE } from "./site";
import type { RaceGuide, StateProfile } from "./types";

export type StateFaq = {
  question: string;
  answer: string;
};

/**
 * State-hub FAQ copy. The same strings render on /states/[code] and in FAQPage JSON-LD.
 * Answers only restate fields already stored on the state profile and race guides.
 */
export function stateHubFaqs(state: StateProfile, races: RaceGuide[]): StateFaq[] {
  const office = state.officialElectionOffice.label;
  const offices = joinList(state.statewideOffices2026);
  const guideTitles = joinList(races.map((race) => race.title));
  const houseGuides = races.filter((race) => race.chamber === "house");
  const sample = state.sampleBallotOfficial;
  const distinctSample = sample && sample.href !== state.officialElectionOffice.href;

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

  const houseCaveat =
    houseGuides.length === 0
      ? ""
      : houseGuides.length === 1
        ? ` ${houseGuides[0].title} is one district example. It is not a claim that the district is yours.`
        : " The U.S. House guides are district examples, not a lookup of your district.";

  const sampleWhere = distinctSample
    ? `For an official sample ballot, start with ${sample.label}. For registration and election rules, use ${office}.`
    : `For an official sample ballot, registration, and election rules, start with ${office}.`;

  const guides =
    races.length === 0
      ? `Map the Midterms does not yet publish a ${state.name} race guide. Use your official sample ballot for every contest on your address.`
      : `Map the Midterms publishes ${races.length} ${state.name} race ${races.length === 1 ? "guide" : "guides"}: ${guideTitles}.${houseCaveat} These pages cite public sources. They are not a certified candidate list, not a poll average, and not an endorsement. Other districts and local contests in ${state.name} are not covered in depth. Open the race guides on this page, then confirm names with ${office}.`;

  return [
    {
      question: `What is on the ${state.name} ballot in the 2026 midterms?`,
      answer: `${senate} ${governor} Statewide offices often on the ${state.name} ballot include ${offices}. ${extraNotes.length ? `${extraNotes.join(" ")} ` : ""}This is a sketch of offices, not your official ballot and not a list of candidates. Confirm the final ballot with ${office}.`,
    },
    {
      question: `How do I get an official ${state.name} sample ballot or verify registration?`,
      answer: `${sampleWhere} You can also start registration from ${state.voteGov.label}. ${state.registrationNote} ${state.mailNote} Map the Midterms does not look up voter records, issue sample ballots, or request mail ballots.`,
    },
    {
      question: `Which Map the Midterms race guides cover ${state.name}?`,
      answer: guides,
    },
    {
      question: `When is Election Day 2026 in ${state.name}?`,
      answer: `The 2026 U.S. midterm general election is ${SITE.electionDayLabel}. ${state.timezoneNote} ${state.earlyVotingNote} Map the Midterms does not publish registration deadlines or county voting hours. Confirm those dates with ${office}.`,
    },
    {
      question: `Is Map the Midterms an official ${state.name} election website?`,
      answer: `No. ${SITE.name} is an informational site operated by ${SITE.legalName}, a ${SITE.entityType}. It is not a government, secretary of state, or county election website. The official election office for ${state.name} is ${office}. Verify registration, sample ballots, and voting rules there or with ${state.voteGov.label}.`,
    },
  ];
}

function joinList(items: string[]): string {
  if (items.length === 0) return "the offices your election office lists for this cycle";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
