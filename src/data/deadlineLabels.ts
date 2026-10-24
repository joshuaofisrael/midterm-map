import type { StateCode } from "./types";

/** Plain-language caveat shown wherever the browser markers appear. */
export const MARKER_NOTE =
  "“Passed,” “Deadline today,” “In progress,” and “Upcoming” markers use only the date on the device. They ignore cutoff times and the state’s time zone, so a deadline marked for today may already have closed. The marker is not an official cutoff.";

export const DEADLINE_CATEGORY_LABEL = {
  registration: "Voter registration",
  early: "Early or in-person absentee voting",
  "mail-request": "Mail or absentee ballot request",
  "mail-return": "Mail or absentee ballot return",
} as const;

export const VOTING_DEADLINES_PATH = "/voting-deadlines";

/** Deep link to one state's row on the voting-deadlines page. Trailing slash matches GitHub Pages. */
export function votingDeadlinesStateHref(code: StateCode): string {
  return `${VOTING_DEADLINES_PATH}/#${code}`;
}

/** Deep link to the key-dates section on a state hub. */
export function stateKeyDatesHref(code: StateCode): string {
  return `/states/${code}/#key-dates`;
}
