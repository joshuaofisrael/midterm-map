import { SITE } from "./site";
import { STARTER_STATES } from "./states";

export type VoterChecklistLink = {
  href: string;
  label: string;
};

export type VoterChecklistStep = {
  id: string;
  name: string;
  /** Plain-text instruction. The same string is the HowTo step text. */
  text: string;
  links: VoterChecklistLink[];
  /** When true, the step also lists starter-state sample ballots and hubs. */
  starterStates?: boolean;
};

export type VoterChecklistSource = {
  name: string;
  url: string;
};

export type VoterChecklistStateLink = {
  code: string;
  name: string;
  ballotHref: string;
  hubHref: string;
};

/** Official USA.gov pages checked September 26, 2026. */
const USA_GOV_VOTING = "https://www.usa.gov/voting-and-elections";
const USA_GOV_REGISTER = "https://www.usa.gov/register-to-vote";
const USA_GOV_ELECTION_OFFICES = "https://www.usa.gov/state-election-office";

function joinList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

const starterStateNames = joinList(STARTER_STATES.map((state) => state.name));

export const VOTER_CHECKLIST_STATES: VoterChecklistStateLink[] = STARTER_STATES.map((state) => ({
  code: state.code,
  name: state.name,
  ballotHref: `/ballot/${state.code}`,
  hubHref: `/states/${state.code}`,
}));

/**
 * Ballot-hub voter checklist. The same step strings render on /ballot and in HowTo JSON-LD.
 * Copy points to official offices. It does not restate state ID statutes or deadlines.
 */
export const VOTER_CHECKLIST: {
  id: string;
  name: string;
  description: string;
  steps: VoterChecklistStep[];
  sources: VoterChecklistSource[];
} = {
  id: "voter-checklist",
  name: "How to prepare to vote in the 2026 U.S. midterms",
  description: `Six steps to prepare for the 2026 general election. ${SITE.electionDayLong}. ${SITE.verifyShort}`,
  steps: [
    {
      id: "checklist-register",
      name: "Register or check your registration",
      text: `Start at Vote.gov. It links to the official registration page for your state. You can also contact your state or county election office and ask them to confirm your record. How you register, and the deadline, depends on your state. ${SITE.name} does not look up voter files and cannot tell you whether you are registered.`,
      links: [
        { href: SITE.voteGovUrl, label: "Vote.gov" },
        { href: USA_GOV_REGISTER, label: "USA.gov — How to register to vote" },
      ],
    },
    {
      id: "checklist-sample-ballot",
      name: "Confirm what is on your ballot",
      text: `Use the ballot lookup on this page for a structured sketch of a starter state. Then compare that sketch with the official sample ballot your state or county election office issues for your address. The sketch names offices that often appear. It is not your official sample ballot and not a certified list of contests or candidates. Starter states with a sketch on this site: ${starterStateNames}.`,
      starterStates: true,
      links: [
        { href: "#ballot-lookup", label: "Ballot lookup on this page" },
        { href: "#starter-states", label: "Starter states and official offices" },
        { href: USA_GOV_ELECTION_OFFICES, label: "USA.gov — State and local election offices" },
      ],
    },
    {
      id: "checklist-where-to-vote",
      name: "Find your polling place, early voting, or mail option",
      text: `Your polling place, early-voting sites, and mail-ballot options come from your state or county election office. Vote.gov and the USA.gov directory of state and local election offices point you to that office. ${SITE.name} does not publish polling-place addresses, hours, or ballot drop-off locations.`,
      links: [
        { href: SITE.voteGovUrl, label: "Vote.gov" },
        { href: USA_GOV_ELECTION_OFFICES, label: "USA.gov — State and local election offices" },
      ],
    },
    {
      id: "checklist-voter-id",
      name: "Check voter ID rules for your state",
      text: "Voter ID rules vary by state. Before you vote in person, read the identification list published by your state election office. This checklist does not restate those rules and is not legal advice.",
      links: [
        { href: USA_GOV_ELECTION_OFFICES, label: "USA.gov — State and local election offices" },
        { href: SITE.voteGovUrl, label: "Vote.gov" },
      ],
    },
    {
      id: "checklist-deadlines",
      name: "Double-check deadlines and Election Day",
      text: `Election Day is ${SITE.electionDayLabel}. Registration deadlines, mail-ballot request and return deadlines, and early-voting dates differ by state and can differ by county. Confirm each of those dates with your state or county election office. Aside from Election Day, this site does not publish voting deadlines.`,
      links: [
        { href: SITE.voteGovUrl, label: "Vote.gov" },
        { href: USA_GOV_VOTING, label: "USA.gov — Voting and elections" },
      ],
    },
    {
      id: "checklist-official-sources",
      name: "Prefer official sources for anything that affects how you vote",
      text: `If a detail changes whether you can vote, where you vote, or what is on your ballot, use your state or county election office, Vote.gov, or USA.gov. ${SITE.name} is an informational site operated by ${SITE.legalName}. It is not a government election website, not a campaign, and not an endorsement of any candidate or measure.`,
      links: [
        { href: SITE.voteGovUrl, label: "Vote.gov" },
        { href: USA_GOV_VOTING, label: "USA.gov — Voting and elections" },
        { href: "/disclaimer", label: "Disclaimer" },
      ],
    },
  ],
  sources: [
    { name: "Vote.gov", url: SITE.voteGovUrl },
    { name: "USA.gov — Voting and elections", url: USA_GOV_VOTING },
  ],
};
