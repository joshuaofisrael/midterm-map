import type { StateCode } from "./types";

/**
 * Key dates for the November 3, 2026 general election.
 * Each state's `checkedOn` is the day its linked pages were read.
 * Lines re-read on October 10, 2026 use that date. Minnesota was re-read on
 * October 11, 2026 for the state hub. Maine was read on October 12, 2026 for
 * the state hub. Iowa was read on October 13, 2026 for the state hub.
 * Alaska was read on October 14, 2026 for the state hub. The Alaska Legislature
 * statute pages did not return section text, so Alaska lines cite the Division
 * of Elections pages that print the dates.
 * Kansas was read on October 16, 2026 for the state hub. Kansas lines cite the
 * Secretary of State pages, the linked general-election dates file, K.S.A.
 * 25-106, 25-1122, 25-1132, and 25-2311, and Vote.gov. A relative statutory
 * period is not converted into a calendar date the office did not print.
 * Arizona's secretary of state
 * pages and Vote.gov returned 403, and the Nevada elections FAQ returned an
 * Incapsula block, so those lines stay on October 6, 2026.
 * Ohio: ohiosos.gov blocks automated reads, so statewide rules cite the Ohio Revised Code
 * (codes.ohio.gov) and Vote.gov; Cuyahoga County items are labeled as county-only.
 * Vote.gov returned 403 on October 10, 2026. The Ohio dates below were re-read from
 * the Revised Code and the Cuyahoga County Board of Elections.
 * A field that could not be verified is listed under `omitted` instead of guessed.
 * `startsOn` / `endsOn` are calendar dates the cited page prints (YYYY-MM-DD).
 * Relative rules stay in `text` when the office did not print a calendar date.
 */

export type DeadlineCategory = "registration" | "early" | "mail-request" | "mail-return";

export interface DeadlineSource {
  label: string;
  href: string;
}

export interface DeadlineFact {
  id: string;
  category: DeadlineCategory;
  label: string;
  text: string;
  /** First calendar day of a window, when the source prints one. */
  startsOn?: string;
  /** Last calendar day used for a browser passed / upcoming marker. */
  endsOn?: string;
  sources: DeadlineSource[];
  /**
   * Shown only after `endsOn` has passed, and only when the cited office
   * describes an option that remains.
   */
  ifPassed?: string;
  /**
   * Set only when this line was not re-read on the state's `checkedOn` date.
   */
  checkedOn?: string;
}

export interface OmittedDeadline {
  category: DeadlineCategory;
  label: string;
  text: string;
}

export interface StateElectionDates {
  code: StateCode;
  /** Day the linked sources for this state were read, except a fact that sets its own date. */
  checkedOn: string;
  /** Short sourced answer. Same string is used in the hub FAQ and FAQPage JSON-LD. */
  faqAnswer: string;
  facts: DeadlineFact[];
  omitted: OmittedDeadline[];
}

const AZ_CALENDAR: DeadlineSource = {
  label: "Arizona Secretary of State — calendar dates",
  href: "https://azsos.gov/elections/calendar-dates",
};

const AZ_EARLY: DeadlineSource = {
  label: "Arizona Secretary of State — early voting procedures",
  href: "https://azsos.gov/elections/about-elections/elections-procedures/early-voting-procedures",
};

const AZ_VOTEGOV: DeadlineSource = {
  label: "Vote.gov — register in Arizona",
  href: "https://vote.gov/register/arizona",
};

const OH_ORC_3503_19: DeadlineSource = {
  label: "Ohio Revised Code § 3503.19 — registration deadline",
  href: "https://codes.ohio.gov/ohio-revised-code/section-3503.19",
};

const OH_ORC_3509_051: DeadlineSource = {
  label: "Ohio Revised Code § 3509.051 — in-person absentee voting period",
  href: "https://codes.ohio.gov/ohio-revised-code/section-3509.051",
};

const OH_ORC_3509_03: DeadlineSource = {
  label: "Ohio Revised Code § 3509.03 — absentee application deadline",
  href: "https://codes.ohio.gov/ohio-revised-code/section-3509.03",
};

const OH_ORC_3509_05: DeadlineSource = {
  label: "Ohio Revised Code § 3509.05 — absentee ballot return",
  href: "https://codes.ohio.gov/ohio-revised-code/section-3509.05",
};

const OH_ORC_3501_32: DeadlineSource = {
  label: "Ohio Revised Code § 3501.32 — Election Day poll hours",
  href: "https://codes.ohio.gov/ohio-revised-code/section-3501.32",
};

const OH_VOTEGOV: DeadlineSource = {
  label: "Vote.gov — register in Ohio",
  href: "https://vote.gov/register/ohio",
};

const OH_CUYAHOGA_FAQ: DeadlineSource = {
  label: "Cuyahoga County Board of Elections — November 3, 2026 FAQs (county source)",
  href: "https://boe.cuyahogacounty.gov/voters/election-faqs",
};

const OH_CUYAHOGA_EARLY: DeadlineSource = {
  label: "Cuyahoga County Board of Elections — early in-person voting hours (Cuyahoga County only)",
  href: "https://boe.cuyahogacounty.gov/voters/vote-early-in-person",
};

/**
 * Prior single-table check date. Kept so a line that could not be re-read
 * still names October 6, 2026. Each state now stores its own `checkedOn`.
 */
export const DATES_CHECKED_ON = "October 6, 2026";

/** States in the deadlines table that do not have a state hub page. */
export const DEADLINE_ONLY_STATES: { code: StateCode; name: string }[] = [];

/** Plain-language caveat shown wherever the browser markers appear. */
export const MARKER_NOTE =
  "“Passed,” “Deadline today,” “In progress,” and “Upcoming” markers use only the date on the device. They ignore cutoff times and the state’s time zone, so a deadline marked for today may already have closed. The marker is not an official cutoff.";


export const ELECTION_DATES: StateElectionDates[] = [
  {
    code: "AZ",
    checkedOn: "October 6, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Arizona Secretary of State lists 11:59 p.m. on October 5, 2026 as the last day to register for that election, October 7, 2026 as the day early voting begins and early ballots are mailed, and 7:00 p.m. on Election Day as the deadline to return a completed ballot-by-mail. A request to have a ballot mailed must reach the county by 5:00 p.m. on the 11th day before the election, which that office describes as two Fridays before Election Day. County hours vary, and dates can change. The Arizona Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "az-register",
        category: "registration",
        label: "Voter registration",
        text: "The Secretary of State lists 11:59 p.m. on October 5, 2026 as the last day to register for the November 3, 2026 general election. That calendar does not split the deadline into mail, online, and in-person cutoffs. Vote.gov says online registration closes 29 days before Election Day and that a mail registration must be postmarked 29 days before Election Day.",
        endsOn: "2026-10-05",
        sources: [AZ_CALENDAR, AZ_VOTEGOV],
      },
      {
        id: "az-early",
        category: "early",
        label: "Early voting",
        text: "Early voting begins October 7, 2026, and early ballots are mailed that day. The calendar does not list a separate statewide last day for in-person early voting. County hours vary.",
        startsOn: "2026-10-07",
        sources: [AZ_CALENDAR],
      },
      {
        id: "az-request",
        category: "mail-request",
        label: "Ballot-by-mail request",
        text: "To have a ballot mailed for a specific election, the county must receive the request by 5:00 p.m. on the 11th day before the election. The Secretary of State describes that cutoff as two Fridays before Election Day.",
        sources: [AZ_EARLY],
      },
      {
        id: "az-return",
        category: "mail-return",
        label: "Ballot-by-mail return",
        text: "A completed ballot-by-mail must be delivered to the county recorder, the officer in charge of elections, an official drop-off site, or any voting location in the county no later than 7:00 p.m. on Election Day.",
        endsOn: "2026-11-03",
        sources: [AZ_EARLY],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Not listed on the calendar and early-voting pages read for this update. Those pages do not describe same-day registration. The Arizona Secretary of State is the official source.",
      },
    ],
  },
  {
    code: "GA",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. Georgia.gov lists October 5, 2026 as the voter registration deadline, October 13–30 as the early voting period, October 23, 2026 as the day a county must receive an absentee application, and 7 p.m. on Election Day as the deadline to receive a returned absentee ballot. County hours vary, and dates can change. The Georgia Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "ga-register",
        category: "registration",
        label: "Voter registration",
        text: "Georgia.gov lists October 5, 2026 as the voter registration deadline for the general election. That calendar does not split the deadline into mail, online, and in-person cutoffs.",
        endsOn: "2026-10-05",
        sources: [
          {
            label: "Georgia.gov — election guide",
            href: "https://georgia.gov/georgia-election-guide",
          },
        ],
      },
      {
        id: "ga-early",
        category: "early",
        label: "Early voting",
        text: "The early voting period for the general election is October 13–30, 2026. County hours vary.",
        startsOn: "2026-10-13",
        endsOn: "2026-10-30",
        sources: [
          {
            label: "Georgia.gov — election guide",
            href: "https://georgia.gov/georgia-election-guide",
          },
        ],
      },
      {
        id: "ga-request",
        category: "mail-request",
        label: "Absentee application",
        text: "An absentee application must be received by the county office by October 23, 2026 for the general election.",
        endsOn: "2026-10-23",
        sources: [
          {
            label: "Georgia.gov — election guide",
            href: "https://georgia.gov/georgia-election-guide",
          },
        ],
      },
      {
        id: "ga-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "A ballot returned by mail must be received by 7 p.m. on Election Day. A ballot delivered to the county board of registrars must also arrive by 7 p.m. on Election Day. Drop boxes inside early voting locations are available during early voting hours only.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Georgia.gov — election guide",
            href: "https://georgia.gov/georgia-election-guide",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Not listed on the Georgia.gov election guide read for this update. That guide does not describe same-day registration. The Georgia Secretary of State is the official source.",
      },
    ],
  },
  {
    code: "MI",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Michigan Secretary of State lists October 19, 2026 as the last day to register by mail or online, in-person registration at the local clerk’s office from October 20 through Election Day, a constitutionally required early-voting period of October 24–November 1, and 8 p.m. on Election Day as the deadline for a local clerk to receive an absentee ballot. Online and mailed absentee applications must arrive by 5 p.m. the Friday before Election Day. County hours vary, and dates can change. The Michigan Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "mi-register-mail",
        category: "registration",
        label: "Registration by mail or online",
        text: "October 19, 2026 is the last day to register by mail or online for the November election. The registration page says a mail application must be received by, or postmarked to, the local clerk at least 15 days before Election Day.",
        endsOn: "2026-10-19",
        sources: [
          {
            label: "Michigan Secretary of State — elections",
            href: "https://www.michigan.gov/sos/elections",
          },
          {
            label: "Michigan Secretary of State — register to vote",
            href: "https://www.michigan.gov/sos/elections/voting/register-to-vote",
          },
        ],
      },
      {
        id: "mi-register-person",
        category: "registration",
        label: "In-person registration near Election Day",
        text: "From October 20 through November 3, 2026, the Secretary of State lists in-person registration at the local clerk’s office for this election. The same pages list 8 p.m. on Election Day as the in-line cutoff at the clerk’s office.",
        startsOn: "2026-10-20",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Michigan Secretary of State — elections",
            href: "https://www.michigan.gov/sos/elections",
          },
          {
            label: "Michigan Secretary of State — register to vote",
            href: "https://www.michigan.gov/sos/elections/voting/register-to-vote",
          },
          {
            label: "Michigan Secretary of State — absentee voting",
            href: "https://www.michigan.gov/sos/elections/voting/absentee-voting",
          },
        ],
      },
      {
        id: "mi-early",
        category: "early",
        label: "Early voting",
        text: "The constitutionally required early-voting period is October 24–November 1, 2026. County and city hours vary.",
        startsOn: "2026-10-24",
        endsOn: "2026-11-01",
        sources: [
          {
            label: "Michigan Secretary of State — elections",
            href: "https://www.michigan.gov/sos/elections",
          },
        ],
      },
      {
        id: "mi-request-mail",
        category: "mail-request",
        label: "Absentee application online or by mail",
        text: "Absentee ballots are available beginning September 24, 2026. Online applications may be submitted until 5 p.m. the Friday before Election Day. A mailed application must be received by the local clerk by that same time.",
        endsOn: "2026-10-30",
        sources: [
          {
            label: "Michigan Secretary of State — elections",
            href: "https://www.michigan.gov/sos/elections",
          },
          {
            label: "Michigan Secretary of State — absentee voting",
            href: "https://www.michigan.gov/sos/elections/voting/absentee-voting",
          },
        ],
      },
      {
        id: "mi-request-person",
        category: "mail-request",
        label: "Absentee application in person",
        text: "The absentee-voting page lists 4 p.m. the day before Election Day as the in-person application deadline.",
        endsOn: "2026-11-02",
        sources: [
          {
            label: "Michigan Secretary of State — absentee voting",
            href: "https://www.michigan.gov/sos/elections/voting/absentee-voting",
          },
        ],
      },
      {
        id: "mi-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "For voters other than military and overseas voters, an absentee ballot must be received by the local clerk by 8 p.m. on Election Day. Military and overseas absentee ballots must be postmarked by Election Day and received within six days after the election.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Michigan Secretary of State — absentee voting",
            href: "https://www.michigan.gov/sos/elections/voting/absentee-voting",
          },
        ],
      },
    ],
    omitted: [],
  },
  {
    code: "NC",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The North Carolina State Board of Elections lists 5 p.m. on October 9, 2026 as the regular registration deadline, in-person early voting from October 15 through 3 p.m. on October 31 with same-day registration at those sites, a 5 p.m. October 20 absentee-request deadline, and a 7:30 p.m. November 3 absentee-return deadline. A paper registration must be received by the county board or postmarked by October 9. County hours vary, and dates can change. The North Carolina State Board of Elections publishes the current calendar.",
    facts: [
      {
        id: "nc-register",
        category: "registration",
        label: "Regular voter registration",
        text: "The regular voter registration deadline is 5 p.m. on Friday, October 9, 2026. A paper application must be received by the county board of elections or postmarked by October 9. The State Board’s pages also list an online application. Military and overseas deadlines differ.",
        endsOn: "2026-10-09",
        sources: [
          {
            label: "North Carolina State Board of Elections — upcoming election",
            href: "https://www.ncsbe.gov/voting/upcoming-election",
          },
          {
            label: "North Carolina State Board of Elections — October 2, 2026 release",
            href: "https://www.ncsbe.gov/news/press-releases/2026/10/02/regular-voter-registration-deadline-approaching-2026-general-election",
          },
        ],
      },
      {
        id: "nc-sameday",
        category: "registration",
        label: "Same-day registration during early voting",
        text: "Same-day registration is available during early voting, beginning October 15, 2026, per the North Carolina State Board of Elections.",
        startsOn: "2026-10-15",
        endsOn: "2026-10-31",
        sources: [
          {
            label: "North Carolina State Board of Elections — upcoming election",
            href: "https://www.ncsbe.gov/voting/upcoming-election",
          },
          {
            label: "North Carolina State Board of Elections — October 2, 2026 release",
            href: "https://www.ncsbe.gov/news/press-releases/2026/10/02/regular-voter-registration-deadline-approaching-2026-general-election",
          },
        ],
      },
      {
        id: "nc-early",
        category: "early",
        label: "In-person early voting",
        text: "In-person early voting runs from October 15, 2026 through 3 p.m. on October 31, 2026. Sites and daily hours are set by county boards.",
        startsOn: "2026-10-15",
        endsOn: "2026-10-31",
        sources: [
          {
            label: "North Carolina State Board of Elections — upcoming election",
            href: "https://www.ncsbe.gov/voting/upcoming-election",
          },
        ],
      },
      {
        id: "nc-request",
        category: "mail-request",
        label: "Absentee ballot request",
        text: "The absentee ballot request deadline is 5 p.m. on October 20, 2026. Military and overseas deadlines differ.",
        endsOn: "2026-10-20",
        sources: [
          {
            label: "North Carolina State Board of Elections — upcoming election",
            href: "https://www.ncsbe.gov/voting/upcoming-election",
          },
        ],
      },
      {
        id: "nc-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "The absentee ballot return deadline is 7:30 p.m. on November 3, 2026. Military and overseas deadlines differ.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "North Carolina State Board of Elections — upcoming election",
            href: "https://www.ncsbe.gov/voting/upcoming-election",
          },
        ],
      },
    ],
    omitted: [],
  },
  {
    code: "NV",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Nevada Secretary of State’s 2026 Elections Procedures Manual lists October 6, 2026 for registration by mail or in person at the clerk, October 12, 2026 at a voter-registration agency such as the DMV, and November 3, 2026 for online registration. A footnote on that table says voters who register online within 14 days of the election are not sent a mail ballot. Same-day registration is available at vote centers during early voting and on Election Day. The Secretary of State’s FAQ lists early voting as October 17–30, 2026. Active registered voters are mailed a ballot unless they opt out. A mailed ballot must be postmarked by Election Day and received by 5 p.m. on the fourth day after the election, or returned in person before the polls close. The manual says a ballot received by mail before 5 p.m. on the third day after the election that is not postmarked is deemed postmarked by Election Day, and it states a drop-off deadline of not later than 7 p.m. on Election Day. County hours vary, and dates can change. The Nevada Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "nv-register-mail",
        category: "registration",
        label: "Registration by mail or in person at the clerk",
        text: "The 2026 Elections Procedures Manual lists October 6, 2026 as the general-election date for registration by mail or in person at the clerk or registrar’s office (the fourth Tuesday before the election).",
        endsOn: "2026-10-06",
        sources: [
          {
            label: "Nevada Secretary of State — 2026 Elections Procedures Manual",
            href: "http://epubs.nsla.nv.gov/statepubs/epubs/779609-2026.pdf",
          },
        ],
      },
      {
        id: "nv-register-agency",
        category: "registration",
        label: "Registration at an agency such as the DMV",
        text: "The same manual lists October 12, 2026 as the general-election date for registration at a voter-registration agency, five days after the mail deadline.",
        endsOn: "2026-10-12",
        sources: [
          {
            label: "Nevada Secretary of State — 2026 Elections Procedures Manual",
            href: "http://epubs.nsla.nv.gov/statepubs/epubs/779609-2026.pdf",
          },
        ],
      },
      {
        id: "nv-register-online",
        category: "registration",
        label: "Online registration",
        text: "The manual lists November 3, 2026 as the general-election date for registration in NOVA, the state’s online system. A footnote on that table says voters who register online within 14 days of the election will not be sent a mail ballot.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Nevada Secretary of State — 2026 Elections Procedures Manual",
            href: "http://epubs.nsla.nv.gov/statepubs/epubs/779609-2026.pdf",
          },
        ],
      },
      {
        id: "nv-sameday",
        category: "registration",
        label: "Same-day registration",
        text: "Same-day registration is available during early voting (October 17–30, 2026) and on Election Day, per the Nevada Secretary of State’s elections FAQ and the 2026 Elections Procedures Manual.",
        startsOn: "2026-10-17",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Nevada Secretary of State — elections FAQ",
            href: "https://www.nvsos.gov/sos/sos-information/office-facts/faqs-all-division/elections",
          },
          {
            label: "Nevada Secretary of State — 2026 Elections Procedures Manual",
            href: "http://epubs.nsla.nv.gov/statepubs/epubs/779609-2026.pdf",
          },
        ],
      },
      {
        id: "nv-early",
        category: "early",
        label: "Early voting",
        text: "The elections FAQ lists early voting for the 2026 general election as October 17–30, 2026. County hours vary.",
        checkedOn: "October 6, 2026",
        startsOn: "2026-10-17",
        endsOn: "2026-10-30",
        sources: [
          {
            label: "Nevada Secretary of State — elections FAQ",
            href: "https://www.nvsos.gov/sos/sos-information/office-facts/faqs-all-division/elections",
          },
        ],
      },
      {
        id: "nv-request",
        category: "mail-request",
        label: "Mail ballot distribution",
        text: "Unless a voter has opted out, the clerk or registrar must send a mail ballot to each active registered voter in the county. In-state ballots must be sent on or after the fifth Monday before the election and no later than the fourth Monday before it. The manual does not list a separate application deadline for that automatic mailing.",
        sources: [
          {
            label: "Nevada Secretary of State — 2026 Elections Procedures Manual",
            href: "http://epubs.nsla.nv.gov/statepubs/epubs/779609-2026.pdf",
          },
        ],
      },
      {
        id: "nv-return",
        category: "mail-return",
        label: "Mail ballot return",
        text: "A mail ballot returned in person must arrive before the polls close on Election Day. The manual also states a drop-off deadline of not later than 7 p.m. on Election Day. A ballot returned by mail must be postmarked on or before Election Day and received by the county elections office no later than 5 p.m. on the fourth day after the election. A ballot received by mail before 5 p.m. on the third day after the election that is not postmarked is deemed to have been postmarked on or before Election Day.",
        endsOn: "2026-11-07",
        sources: [
          {
            label: "Nevada Secretary of State — 2026 Elections Procedures Manual",
            href: "http://epubs.nsla.nv.gov/statepubs/epubs/779609-2026.pdf",
          },
        ],
      },
    ],
    omitted: [],
  },
  {
    code: "OH",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. Ohio law requires voters to register by the 30th day before the election, and the Cuyahoga County Board of Elections lists that deadline for this election as Monday, October 5, 2026. Under the Ohio Revised Code, early in-person (absentee) voting runs from the day after registration closes (October 6, per the Cuyahoga board) through 5 p.m. on Sunday, November 1; a vote-by-mail application must reach the county board of elections by the close of business on Tuesday, October 27; and a voted absentee ballot must reach the county board by the close of the polls (7:30 p.m.) on Election Day. Daily early-voting hours are set by each county board. The Ohio Secretary of State website blocked automated reads for this update. Dates can change. The Ohio Secretary of State and county boards of elections publish the current calendar.",
    facts: [
      {
        id: "oh-register",
        category: "registration",
        label: "Voter registration",
        text: "Ohio Revised Code § 3503.19 requires a registration to be received, or a mailed form to be postmarked, no later than the 30th day before the election. Vote.gov also lists 30 days before Election Day for online, mail, and in-person registration in Ohio. The 30th day before November 3, 2026 is Sunday, October 4. The Cuyahoga County Board of Elections lists the deadline for this election as Monday, October 5, 2026, with a mailed form postmarked by October 5. That board says its office is open until 9 p.m. that day. That closing time applies to Cuyahoga County only.",
        endsOn: "2026-10-05",
        sources: [OH_ORC_3503_19, OH_VOTEGOV, OH_CUYAHOGA_FAQ],
      },
      {
        id: "oh-early",
        category: "early",
        label: "Early in-person (absentee) voting",
        text: "Ohio Revised Code § 3509.051 allows in-person absentee voting from the first day after voter registration closes through 5 p.m. on the Sunday before the election, which is November 1, 2026. The Cuyahoga County Board of Elections lists Tuesday, October 6, 2026 as the first day. Daily hours are not set by that statute. The hour-by-hour calendar linked here is Cuyahoga County’s only. Other counties publish their own hours.",
        startsOn: "2026-10-06",
        endsOn: "2026-11-01",
        sources: [OH_ORC_3509_051, OH_CUYAHOGA_FAQ, OH_CUYAHOGA_EARLY],
      },
      {
        id: "oh-request",
        category: "mail-request",
        label: "Vote-by-mail application",
        text: "Ohio Revised Code § 3509.03 requires an absentee (vote-by-mail) application to reach the county board of elections by the close of business on the seventh day before the election, which is Tuesday, October 27, 2026. The Cuyahoga County Board of Elections says it accepts applications until 8:30 p.m. that day. That closing time is Cuyahoga County only. Other counties publish their own hours.",
        endsOn: "2026-10-27",
        sources: [OH_ORC_3509_03, OH_CUYAHOGA_FAQ],
      },
      {
        id: "oh-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "Ohio Revised Code § 3509.05, as amended by Senate Bill 293 (effective March 20, 2026), requires a voted absentee ballot to be delivered to the county board of elections no later than the close of the polls on Election Day. Ballots that arrive later are not counted. Military and overseas voters follow separate rules. Ohio Revised Code § 3501.32 sets Election Day poll hours at 6:30 a.m. to 7:30 p.m., and the Cuyahoga County Board of Elections lists the same 7:30 p.m. arrival deadline.",
        endsOn: "2026-11-03",
        sources: [OH_ORC_3509_05, OH_ORC_3501_32, OH_CUYAHOGA_FAQ],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Not listed in the Ohio Revised Code sections and county FAQ read for this update. Those sources do not describe Election Day registration. The Secretary of State website blocked automated reads for this update. The Ohio Secretary of State is the official source.",
      },
    ],
  },
  {
    code: "PA",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Pennsylvania Department of State lists October 19, 2026 as the last day to register before the November election, October 27, 2026 as the last day to apply for a mail-in or civilian absentee ballot, and 8:00 p.m. on November 3, 2026 as the deadline for a county election office to receive those completed ballots. That calendar does not list a statewide early-voting window. Dates can change. The Pennsylvania Department of State and county election offices publish the current calendar.",
    facts: [
      {
        id: "pa-register",
        category: "registration",
        label: "Voter registration",
        text: "October 19, 2026 is the last day to register before the November election. The calendar does not split that deadline into mail, online, and in-person cutoffs.",
        endsOn: "2026-10-19",
        sources: [
          {
            label: "Pennsylvania Department of State — upcoming elections",
            href: "https://www.pa.gov/agencies/vote/elections/upcoming-elections",
          },
        ],
      },
      {
        id: "pa-request",
        category: "mail-request",
        label: "Mail-in or civilian absentee application",
        text: "October 27, 2026 is the last day to apply for a mail-in or civilian absentee ballot.",
        endsOn: "2026-10-27",
        sources: [
          {
            label: "Pennsylvania Department of State — upcoming elections",
            href: "https://www.pa.gov/agencies/vote/elections/upcoming-elections",
          },
        ],
      },
      {
        id: "pa-return",
        category: "mail-return",
        label: "Mail-in or civilian absentee return",
        text: "November 3, 2026 is the last day for a county election office to receive a completed mail-in or civilian absentee ballot, and it must be received by 8:00 p.m. Military and overseas ballots use a later receipt date on that calendar.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Pennsylvania Department of State — upcoming elections",
            href: "https://www.pa.gov/agencies/vote/elections/upcoming-elections",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early or in-person absentee voting",
        text: "Not listed on the 2026 upcoming-elections page read for this update. That page does not list a statewide early-voting window. The Pennsylvania Department of State and county election offices are the official sources.",
      },
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Not listed on the upcoming-elections calendar read for this update. That calendar does not describe same-day registration. The Pennsylvania Department of State is the official source.",
      },
    ],
  },
  {
    code: "WI",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Wisconsin Elections Commission calendar lists October 14, 2026 as the deadline to register by mail or online (mail postmarked by then; online closes at 11:59 p.m.), in-person registration at the municipal clerk through 5 p.m. on October 30, and registration at the polling place after mail and online registration close. In-person absentee voting may begin October 20; municipalities set the hours and may end as late as November 1. Regular absentee requests by mail, online, email, or fax are due by 5 p.m. on October 29. Absentee ballots must be delivered by 8 p.m. on Election Day. Dates can change. The Wisconsin Elections Commission and municipal clerks publish the current calendar.",
    facts: [
      {
        id: "wi-register-mail",
        category: "registration",
        label: "Registration by mail or online",
        text: "October 14, 2026 is the deadline to register by mail or online for the general election. A mail form must be postmarked no later than the third Wednesday before the election. Online registration closes at 11:59 p.m. After that date, voters register in person at the municipal clerk’s office or at the polling place.",
        endsOn: "2026-10-14",
        sources: [
          {
            label: "Wisconsin Elections Commission — 2026–2027 election calendar",
            href: "https://elections.wi.gov/sites/default/files/documents/2026_2027%20Election%20Calendar_0.pdf",
          },
        ],
      },
      {
        id: "wi-register-clerk",
        category: "registration",
        label: "In-person registration at the clerk",
        text: "The deadline to register in the municipal clerk’s office or another designated location is 5 p.m. on October 30, 2026, or the close of business, whichever is later.",
        endsOn: "2026-10-30",
        sources: [
          {
            label: "Wisconsin Elections Commission — 2026–2027 election calendar",
            href: "https://elections.wi.gov/sites/default/files/documents/2026_2027%20Election%20Calendar_0.pdf",
          },
        ],
      },
      {
        id: "wi-register-eday",
        category: "registration",
        label: "Election Day registration",
        text: "After mail and online registration close, the calendar says electors register in person at the municipal clerk’s office or at the polling place. Election Day is November 3, 2026.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Wisconsin Elections Commission — 2026–2027 election calendar",
            href: "https://elections.wi.gov/sites/default/files/documents/2026_2027%20Election%20Calendar_0.pdf",
          },
        ],
      },
      {
        id: "wi-early",
        category: "early",
        label: "In-person absentee voting",
        text: "Clerks may begin issuing in-person absentee ballots on October 20, 2026, and not earlier than 14 days before the election. The latest day on the calendar for most voters to apply in person is November 1, 2026, and the calendar says the final date is set by the municipality and can end earlier. Hours vary by city, village, and town.",
        startsOn: "2026-10-20",
        endsOn: "2026-11-01",
        sources: [
          {
            label: "Wisconsin Elections Commission — 2026–2027 election calendar",
            href: "https://elections.wi.gov/sites/default/files/documents/2026_2027%20Election%20Calendar_0.pdf",
          },
        ],
      },
      {
        id: "wi-request",
        category: "mail-request",
        label: "Absentee request by mail, online, email, or fax",
        text: "For regular and overseas voters, the deadline to request an absentee ballot by mail, online, email, or fax is 5 p.m. on October 29, 2026. The calendar lists later request times for some other categories, including indefinitely confined voters and certain military voters.",
        endsOn: "2026-10-29",
        sources: [
          {
            label: "Wisconsin Elections Commission — 2026–2027 election calendar",
            href: "https://elections.wi.gov/sites/default/files/documents/2026_2027%20Election%20Calendar_0.pdf",
          },
        ],
      },
      {
        id: "wi-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "All absentee ballots must be delivered to the polling place or central count location by 8 p.m. on November 3, 2026.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Wisconsin Elections Commission — 2026–2027 election calendar",
            href: "https://elections.wi.gov/sites/default/files/documents/2026_2027%20Election%20Calendar_0.pdf",
          },
        ],
      },
    ],
    omitted: [],
  },
  {
    code: "TX",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Texas Secretary of State lists Monday, October 5, 2026 as the last day to register, early voting by personal appearance from October 19 through October 30, Friday, October 23 as the last day for a ballot-by-mail application to be received (not merely postmarked), and a receipt rule of 7:00 p.m. on Election Day if the carrier envelope is not postmarked, or 5:00 p.m. on November 4 if it was postmarked by 7:00 p.m. on Election Day. County hours vary, and dates can change. The Texas Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "tx-register",
        category: "registration",
        label: "Voter registration",
        text: "For the Tuesday, November 3, 2026 uniform election date, the last day to register to vote is Monday, October 5, 2026. That calendar does not split the deadline into mail, online, and in-person cutoffs.",
        endsOn: "2026-10-05",
        sources: [
          {
            label: "Texas Secretary of State — important election dates",
            href: "https://www.sos.texas.gov/elections/voter/important-election-dates.shtml",
          },
        ],
      },
      {
        id: "tx-early",
        category: "early",
        label: "Early voting by personal appearance",
        text: "Early voting by personal appearance runs from Monday, October 19, 2026 through Friday, October 30, 2026. County hours vary.",
        startsOn: "2026-10-19",
        endsOn: "2026-10-30",
        sources: [
          {
            label: "Texas Secretary of State — important election dates",
            href: "https://www.sos.texas.gov/elections/voter/important-election-dates.shtml",
          },
        ],
      },
      {
        id: "tx-request",
        category: "mail-request",
        label: "Application for a ballot by mail",
        text: "The last day to apply for a ballot by mail is Friday, October 23, 2026, and the application must be received, not merely postmarked. The first day to apply for this election date is listed as January 1, 2026.",
        endsOn: "2026-10-23",
        sources: [
          {
            label: "Texas Secretary of State — important election dates",
            href: "https://www.sos.texas.gov/elections/voter/important-election-dates.shtml",
          },
        ],
      },
      {
        id: "tx-return",
        category: "mail-return",
        label: "Ballot-by-mail return",
        text: "A ballot by mail must be received by 7:00 p.m. on Election Day if the carrier envelope is not postmarked, or by 5:00 p.m. on Wednesday, November 4, 2026 if it was postmarked by 7:00 p.m. at the location of the election on Election Day. The Secretary of State notes different deadlines for some military and overseas voters.",
        endsOn: "2026-11-04",
        sources: [
          {
            label: "Texas Secretary of State — important election dates",
            href: "https://www.sos.texas.gov/elections/voter/important-election-dates.shtml",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Not listed on the important-dates page read for this update. That page does not describe same-day registration. The Texas Secretary of State is the official source.",
      },
    ],
  },
  {
    code: "FL",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Florida Division of Elections lists October 5, 2026 as the registration deadline, October 22, 2026 as the deadline to request that a ballot be mailed, a mandatory early-voting period of October 24–31, and 7:00 p.m. local time on Election Day as the deadline for a voted vote-by-mail ballot to be received, regardless of postmark. Overseas voters have a 10-day extension on this general election if the ballot is postmarked or dated by Election Day. County hours vary, and dates can change. The Florida Division of Elections and county supervisors of elections publish the current calendar.",
    facts: [
      {
        id: "fl-register",
        category: "registration",
        label: "Voter registration",
        text: "The deadline to register to vote for the 2026 general election is October 5, 2026. The election-dates page does not split that deadline into mail, online, and in-person cutoffs.",
        endsOn: "2026-10-05",
        sources: [
          {
            label: "Florida Division of Elections — election dates",
            href: "https://dos.fl.gov/elections/for-voters/election-dates/",
          },
        ],
      },
      {
        id: "fl-early",
        category: "early",
        label: "Early voting",
        text: "The mandatory early-voting period is October 24–31, 2026. Supervisors of elections may offer additional days. County hours vary.",
        startsOn: "2026-10-24",
        endsOn: "2026-10-31",
        sources: [
          {
            label: "Florida Division of Elections — election dates",
            href: "https://dos.fl.gov/elections/for-voters/election-dates/",
          },
        ],
      },
      {
        id: "fl-request",
        category: "mail-request",
        label: "Vote-by-mail request",
        text: "The deadline to request that a ballot be mailed is October 22, 2026. The vote-by-mail page says that request is due no later than 5 p.m. on the 12th day before the election. A separate in-person pickup rule is described on that page.",
        endsOn: "2026-10-22",
        sources: [
          {
            label: "Florida Division of Elections — election dates",
            href: "https://dos.fl.gov/elections/for-voters/election-dates/",
          },
          {
            label: "Florida Division of Elections — vote-by-mail",
            href: "https://dos.fl.gov/elections/for-voters/voting/vote-by-mail/",
          },
        ],
      },
      {
        id: "fl-return",
        category: "mail-return",
        label: "Vote-by-mail return",
        text: "A returned voted ballot must be received by the supervisor of elections no later than 7:00 p.m. local time on Election Day, regardless of postmark. On a general election, overseas voters have a 10-day extension if the ballot is postmarked or dated by Election Day.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Florida Division of Elections — vote-by-mail",
            href: "https://dos.fl.gov/elections/for-voters/voting/vote-by-mail/",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Not listed on the election-dates page read for this update. That page does not describe same-day registration. The Florida Division of Elections is the official source.",
      },
    ],
  },
  {
    code: "CA",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The California Secretary of State lists October 19, 2026 as the last day to register, conditional same-day registration from October 20 through November 3, early-voting sites opening October 5, and vote-by-mail ballots mailed to each registered voter no later than October 5. A vote-by-mail ballot returned by mail must be postmarked on or before Election Day and received by the county by November 10, 2026. That key-dates page does not list a separate application deadline. County hours vary, and dates can change. The California Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "ca-register",
        category: "registration",
        label: "Voter registration",
        text: "October 19, 2026 is the last day to register to vote for the general election. The key-dates page does not split that deadline into mail, online, and in-person cutoffs.",
        endsOn: "2026-10-19",
        sources: [
          {
            label: "California Secretary of State — key dates and deadlines",
            href: "https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2026/key-dates-deadlines",
          },
        ],
      },
      {
        id: "ca-sameday",
        category: "registration",
        label: "Conditional same-day registration",
        text: "Same-day registration is available October 20–November 3, 2026, per the California Secretary of State key-dates page.",
        startsOn: "2026-10-20",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "California Secretary of State — key dates and deadlines",
            href: "https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2026/key-dates-deadlines",
          },
        ],
      },
      {
        id: "ca-early",
        category: "early",
        label: "Early voting",
        text: "Early-voting sites open October 5, 2026. Counties under the Voter’s Choice Act open vote centers on October 24, 2026. The key-dates page does not list one statewide closing day for those sites before Election Day. County hours vary. Election Day polls are open from 7:00 a.m. to 8:00 p.m.",
        startsOn: "2026-10-05",
        sources: [
          {
            label: "California Secretary of State — key dates and deadlines",
            href: "https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2026/key-dates-deadlines",
          },
        ],
      },
      {
        id: "ca-mail",
        category: "mail-request",
        label: "Vote-by-mail ballot mailing",
        text: "No later than October 5, 2026, county elections officials begin mailing each registered voter a vote-by-mail ballot. The key-dates page does not list a separate application deadline for that mailing.",
        sources: [
          {
            label: "California Secretary of State — key dates and deadlines",
            href: "https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2026/key-dates-deadlines",
          },
        ],
      },
      {
        id: "ca-return",
        category: "mail-return",
        label: "Vote-by-mail return",
        text: "A vote-by-mail ballot returned by mail must be postmarked on or before Election Day and received by the county elections office by November 10, 2026.",
        endsOn: "2026-11-10",
        sources: [
          {
            label: "California Secretary of State — key dates and deadlines",
            href: "https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2026/key-dates-deadlines",
          },
        ],
      },
    ],
    omitted: [],
  },
  {
    code: "NY",
    checkedOn: "October 10, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The New York State Board of Elections says a mail or in-person registration application must be received by October 24, 2026. Early voting is October 24–November 1, and county hours vary. An application for an early-mail or absentee ballot to be sent by mail must be received no later than ten days before the election; an in-person application must be received no later than the day before the election. A ballot mailed back must be postmarked by November 3 and received by the county board by November 10, or it can be returned in person by 9 p.m. on November 3. Dates can change. The New York State Board of Elections publishes the current calendar.",
    facts: [
      {
        id: "ny-register",
        category: "registration",
        label: "Registration by mail or in person",
        text: "A mail registration application must be received by a board of elections no later than October 24, 2026 to vote in the general election. An in-person application must also be received no later than October 24, 2026.",
        endsOn: "2026-10-24",
        sources: [
          {
            label: "New York State Board of Elections — registration and voting deadlines",
            href: "https://elections.ny.gov/registration-and-voting-deadlines",
          },
        ],
      },
      {
        id: "ny-early",
        category: "early",
        label: "Early voting",
        text: "Early voting for the November 3, 2026 general election is October 24–November 1. Hours vary by county. Polls on Election Day are open from 6:00 a.m. to 9:00 p.m.",
        startsOn: "2026-10-24",
        endsOn: "2026-11-01",
        sources: [
          {
            label: "New York State Board of Elections",
            href: "https://elections.ny.gov/",
          },
        ],
      },
      {
        id: "ny-request",
        category: "mail-request",
        label: "Early-mail or absentee application",
        text: "An application to receive an early-mail ballot, or an absentee ballot, by mail must be received by the county board of elections no later than ten days before the election. An application for a ballot to be received in person must arrive no later than the day before the election. The request page states those rules as day counts and does not print a separate calendar date for them.",
        sources: [
          {
            label: "New York State Board of Elections — request a ballot",
            href: "https://elections.ny.gov/request-ballot",
          },
        ],
      },
      {
        id: "ny-return",
        category: "mail-return",
        label: "Early-mail or absentee return",
        text: "For the November 3, 2026 general election, a ballot put in the mail must be postmarked no later than November 3 and received by the county board of elections no later than November 10. It can also be brought to the county board, or to a poll site, by 9 p.m. on November 3, or to an early-voting site in the county from October 24 through November 1.",
        endsOn: "2026-11-10",
        sources: [
          {
            label: "New York State Board of Elections — request a ballot",
            href: "https://elections.ny.gov/request-ballot",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Online registration deadline",
        text: "The registration-deadlines page read for this update states October 24, 2026 for mail and in-person applications and does not print a separate online-portal date. The New York State Board of Elections is the official source.",
      },
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Not listed on the pages read for this update. Those pages do not describe same-day registration. The New York State Board of Elections is the official source.",
      },
    ],
  },
  {
    code: "MN",
    checkedOn: "October 11, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Minnesota Secretary of State’s 2026 elections calendar lists Tuesday, October 13, 2026 as the last day to pre-register, with in-person drop-off closing at 5:00 p.m. and online registration closing at 11:59 p.m. Minnesota Statutes § 201.061 allows registration at the polling place on election day. The same calendar lists absentee voting from September 18, 2026 through November 2, 2026, a last day to apply for an absentee ballot of 5:00 p.m. on November 2, 2026, and a return rule of 5:00 p.m. in person or 8:00 p.m. by mail or package delivery on Election Day. The register-to-vote page refers to early voting locations and does not print a separate start date for them. County hours vary, and dates can change. The Minnesota Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "mn-preregister",
        category: "registration",
        label: "Pre-registration",
        text: "The Secretary of State’s 2026 elections calendar lists Tuesday, October 13, 2026 as the last day to pre-register for the November general election. In-person drop-off closes at 5:00 p.m. Online registration closes at 11:59 p.m. Minnesota Statutes § 201.061, subdivision 1, states that an in-person or mailed registration must be received no later than 5:00 p.m. on the 21st day before an election, and that an electronic registration through the secretary of state’s website must be received no later than 11:59 p.m. that day.",
        endsOn: "2026-10-13",
        sources: [
          {
            label: "Minnesota Secretary of State — 2026 elections calendar (PDF)",
            href: "https://www.sos.mn.gov/media/444mstt3/secretary-of-state-elections-calendar.pdf",
          },
          {
            label: "Minnesota Statutes § 201.061 — registration on or before election day",
            href: "https://www.revisor.mn.gov/statutes/cite/201.061",
          },
        ],
      },
      {
        id: "mn-eday",
        category: "registration",
        label: "Election Day registration",
        text: "Minnesota Statutes § 201.061, subdivision 3, states that an eligible voter may register or update a registration on election day by appearing in person at the polling place for the precinct where the voter maintains residence. The Secretary of State’s calendar lists that election as Tuesday, November 3, 2026. The register-to-vote page also says voters can register at early voting locations before Election Day. That page does not print the first day of those locations.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Minnesota Statutes § 201.061 — registration on or before election day",
            href: "https://www.revisor.mn.gov/statutes/cite/201.061",
          },
          {
            label: "Minnesota Secretary of State — 2026 elections calendar (PDF)",
            href: "https://www.sos.mn.gov/media/444mstt3/secretary-of-state-elections-calendar.pdf",
          },
          {
            label: "Minnesota Secretary of State — register to vote",
            href: "https://www.sos.mn.gov/elections-voting/register-to-vote/",
          },
        ],
      },
      {
        id: "mn-absentee",
        category: "early",
        label: "Absentee voting, including in person",
        text: "The 2026 elections calendar lists absentee voting for the general election from Friday, September 18, 2026 through Monday, November 2, 2026. It says the county auditor’s office and a municipal clerk’s office that conducts absentee voting must be open for extra hours. The calendar prints these hours: Saturday, October 24, 9:00 a.m. to 3:00 p.m.; Tuesday, October 27, until 7:00 p.m.; Saturday, October 31, 9:00 a.m. to 3:00 p.m.; and Sunday, November 1, 9:00 a.m. to 3:00 p.m. It says locations must be open until 5:00 p.m. on Monday, November 2, for absentee applications.",
        startsOn: "2026-09-18",
        endsOn: "2026-11-02",
        sources: [
          {
            label: "Minnesota Secretary of State — 2026 elections calendar (PDF)",
            href: "https://www.sos.mn.gov/media/444mstt3/secretary-of-state-elections-calendar.pdf",
          },
        ],
      },
      {
        id: "mn-request",
        category: "mail-request",
        label: "Absentee ballot application",
        text: "The calendar lists Monday, November 2, 2026 as the last day to apply for an absentee ballot, and says the office must be open until 5:00 p.m. It cites exceptions in Minnesota Statutes § 203B.04, subdivision 2, and § 203B.11, subdivisions 3 and 4.",
        endsOn: "2026-11-02",
        sources: [
          {
            label: "Minnesota Secretary of State — 2026 elections calendar (PDF)",
            href: "https://www.sos.mn.gov/media/444mstt3/secretary-of-state-elections-calendar.pdf",
          },
        ],
      },
      {
        id: "mn-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "On the November 3, 2026 general election, the calendar says a returned absentee ballot may be delivered in person by the voter or an agent until 5:00 p.m. A ballot delivered by mail or a package delivery service must arrive by 8:00 p.m. An agent delivery-and-return ballot under Minnesota Statutes § 203B.11, subdivision 4, must arrive by 8:00 p.m. The calendar says absentee ballots are returned to the county or local clerk’s office listed on the return envelope.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Minnesota Secretary of State — 2026 elections calendar (PDF)",
            href: "https://www.sos.mn.gov/media/444mstt3/secretary-of-state-elections-calendar.pdf",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Separate early-voting start date",
        text: "The register-to-vote page refers to early voting locations before Election Day and does not print a first day for them. The 2026 elections calendar lists absentee-voting dates and does not print a separate early-voting start date. The Minnesota Secretary of State is the official source.",
      },
    ],
  },
  {
    code: "ME",
    checkedOn: "October 12, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The State of Maine Voter Guide lists October 13, 2026 as the day a mail or third-person registration for the November general election must be received, by close of business, and 5 p.m. that day for online registration. It lists October 27, 2026 for registration through the Bureau of Motor Vehicles, and in-person registration through the close of the polls on Election Day. Title 21-A, §626 states that polls close at 8 p.m. on election day, except in municipalities with a population of less than 100, which may close after all registered voters have voted, and that municipalities set the opening time inside a statutory range. The Secretary of State’s September 4, 2026 update lists in-person absentee voting from October 4, 2026 through close of business on October 29, 2026, and October 29 as the last day to request a no-excuse absentee ballot. Absentee ballots must be received by 8 p.m. on November 3, 2026. Municipal hours vary, and dates can change. The Maine Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "me-register-mail",
        category: "registration",
        label: "Mail or third-person registration",
        text: "The State of Maine Voter Guide lists October 13, 2026 as the date a registration submitted by mail or by a third person for the November general election must be received by the voter’s town or city, by close of business. That guide calls October 13 the 21st day before Election Day. Title 21-A, §121-A states that a mail or third-person application is due at the close of business on the 21st day before election day. Vote.gov says a mail registration must be received 21 days before Election Day.",
        endsOn: "2026-10-13",
        sources: [
          {
            label: "Maine Secretary of State — State of Maine Voter Guide",
            href: "https://www.maine.gov/sos/elections-voting/state-of-maine-voter-guide",
          },
          {
            label: "Maine Title 21-A, §121-A — deadline for registration",
            href: "https://www.mainelegislature.org/Legis/Statutes/21-A/title21-Asec121-A-3.html",
          },
          {
            label: "Vote.gov — register in Maine",
            href: "https://vote.gov/register/maine",
          },
        ],
      },
      {
        id: "me-register-online",
        category: "registration",
        label: "Online registration",
        text: "The voter guide lists 5 p.m. on October 13, 2026 as the online registration deadline for the November general election. Title 21-A, §121-A states that an online application is due at 5 p.m. on the 21st day before election day. Vote.gov says the online registration deadline is 21 days before Election Day.",
        endsOn: "2026-10-13",
        sources: [
          {
            label: "Maine Secretary of State — State of Maine Voter Guide",
            href: "https://www.maine.gov/sos/elections-voting/state-of-maine-voter-guide",
          },
          {
            label: "Maine Title 21-A, §121-A — deadline for registration",
            href: "https://www.mainelegislature.org/Legis/Statutes/21-A/title21-Asec121-A-3.html",
          },
          {
            label: "Vote.gov — register in Maine",
            href: "https://vote.gov/register/maine",
          },
        ],
      },
      {
        id: "me-register-bmv",
        category: "registration",
        label: "Bureau of Motor Vehicles registration",
        text: "The voter guide lists October 27, 2026 for registration through the Bureau of Motor Vehicles, and calls that date the 7th day before the November general election. Title 21-A, §121-A states that an application transmitted by the Bureau of Motor Vehicles, or by a source agency other than the Bureau of Motor Vehicles under the automatic-registration sections, is due by midnight on the 7th day before election day.",
        endsOn: "2026-10-27",
        sources: [
          {
            label: "Maine Secretary of State — State of Maine Voter Guide",
            href: "https://www.maine.gov/sos/elections-voting/state-of-maine-voter-guide",
          },
          {
            label: "Maine Title 21-A, §121-A — deadline for registration",
            href: "https://www.mainelegislature.org/Legis/Statutes/21-A/title21-Asec121-A-3.html",
          },
        ],
      },
      {
        id: "me-register-in-person",
        category: "registration",
        label: "In-person registration and Election Day",
        text: "The voter guide says in-person registration runs through the close of the polls on Election Day. The upcoming-elections page titles that election November 3, 2026. Title 21-A, §121-A states that an in-person application is due by the close of the polls on election day. Title 21-A, §626 states that the polls close at 8 p.m. on election day, except in municipalities with a population of less than 100, which may close the polls after all registered voters have voted. The same section states that the polls open no earlier than 6 a.m. and no later than 8 a.m., except that in a municipality with a population of less than 500 the polls open no later than 10:00 a.m. Municipal officers set the opening time inside those limits. The September 28, 2026 voting place report lists each municipality’s opening time.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Maine Secretary of State — State of Maine Voter Guide",
            href: "https://www.maine.gov/sos/elections-voting/state-of-maine-voter-guide",
          },
          {
            label: "Maine Secretary of State — upcoming elections",
            href: "https://www.maine.gov/sos/elections-voting/upcoming-elections",
          },
          {
            label: "Maine Title 21-A, §121-A — deadline for registration",
            href: "https://www.mainelegislature.org/Legis/Statutes/21-A/title21-Asec121-A-3.html",
          },
          {
            label: "Maine Title 21-A, §626 — polling times",
            href: "https://www.mainelegislature.org/legis/statutes/21-a/title21-Asec626.html",
          },
          {
            label: "Maine Secretary of State — November 3, 2026 voting place report (PDF)",
            href: "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/11.3.2026%20Voting%20Place%20Report%20Posting%20Version.pdf",
          },
        ],
      },
      {
        id: "me-register-uocava",
        category: "registration",
        label: "UOCAVA registration",
        text: "The voter guide lists noon on November 2, 2026 as the deadline, for the November general election, for UOCAVA voters under Title 21-A, section 777-A, by mail or electronically.",
        endsOn: "2026-11-02",
        sources: [
          {
            label: "Maine Secretary of State — State of Maine Voter Guide",
            href: "https://www.maine.gov/sos/elections-voting/state-of-maine-voter-guide",
          },
        ],
      },
      {
        id: "me-early",
        category: "early",
        label: "In-person absentee voting",
        text: "The Secretary of State’s September 4, 2026 update lists October 4, 2026, 30 days before Election Day, as the day the in-person, no-excuse absentee voting period begins. It says that period goes through close of business in a voter’s town on Thursday, October 29. The voter guide says absentee ballots are available 30 days before the election at the municipal clerk’s office, and that the deadline for absentee voting in the presence of the clerk, unless special circumstances exist, is the Thursday before the election. Municipal hours vary.",
        startsOn: "2026-10-04",
        endsOn: "2026-10-29",
        sources: [
          {
            label: "Maine Secretary of State — September 4, 2026 general-election update",
            href: "https://www.maine.gov/sos/news/general-election-two-months-away-secretary-states-office-provides-update-maine-election-1",
          },
          {
            label: "Maine Secretary of State — State of Maine Voter Guide",
            href: "https://www.maine.gov/sos/elections-voting/state-of-maine-voter-guide",
          },
        ],
      },
      {
        id: "me-request",
        category: "mail-request",
        label: "Absentee ballot request",
        text: "The August 3, 2026 announcement says requests for the November 3, 2026 general election could be made starting that day, and that municipal clerks begin issuing ballots 30 days before Election Day. The September 4, 2026 update lists October 29, 2026 as the last day to request a no-excuse absentee ballot, and says a request must be received at least three business days before Election Day unless special circumstances exist. Title 21-A, §753-B states the rule for a request received after the 3rd business day before election day.",
        startsOn: "2026-08-03",
        endsOn: "2026-10-29",
        sources: [
          {
            label: "Maine Secretary of State — August 3, 2026 absentee-ballot announcement",
            href: "https://www.maine.gov/sos/news/maine-voters-can-request-absentee-ballots-nov-3-election-starting-today-ballots-will-be-mailed",
          },
          {
            label: "Maine Secretary of State — September 4, 2026 general-election update",
            href: "https://www.maine.gov/sos/news/general-election-two-months-away-secretary-states-office-provides-update-maine-election-1",
          },
          {
            label: "Maine Title 21-A, §753-B — absentee ballot procedure",
            href: "https://www.mainelegislature.org/legis/statutes/21-a/title21-Asec753-B.html",
          },
        ],
      },
      {
        id: "me-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "The August 3, 2026 announcement says absentee ballots for the November 3, 2026 general election must be received by a voter’s municipality by 8 p.m. on November 3, 2026. The September 4 update says only ballots received by 8 p.m. on Election Day are counted, regardless of postmark. The absentee request and tracking service says ballots for that election must be received no later than 8:00 p.m. Eastern Time on Election Day. Title 21-A, §755 states that an absentee ballot must be delivered to the municipal clerk before the polls are closed.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Maine Secretary of State — August 3, 2026 absentee-ballot announcement",
            href: "https://www.maine.gov/sos/news/maine-voters-can-request-absentee-ballots-nov-3-election-starting-today-ballots-will-be-mailed",
          },
          {
            label: "Maine Secretary of State — September 4, 2026 general-election update",
            href: "https://www.maine.gov/sos/news/general-election-two-months-away-secretary-states-office-provides-update-maine-election-1",
          },
          {
            label: "Maine Secretary of State — absentee ballot request and tracking",
            href: "https://absenteeballotrequest.sos.maine.gov/",
          },
          {
            label: "Maine Title 21-A, §755 — absentee ballot deadline",
            href: "https://www.mainelegislature.org/legis/Statutes/21-A/title21-Asec755.html",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Separate early-voting window",
        text: "The voter guide and the September 4, 2026 update describe in-person absentee voting and do not print a separate early-voting period. The Maine Secretary of State is the official source.",
      },
      {
        category: "mail-request",
        label: "Special-circumstance absentee request reasons",
        text: "The September 4, 2026 update refers to special circumstances for a request after the no-excuse deadline. Title 21-A, §753-B is the statute for that request. The Maine Secretary of State and that statute are the official sources.",
      },
    ],
  },
  {
    code: "IA",
    checkedOn: "October 13, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Iowa Secretary of State’s three-year election calendar lists Monday, October 19, 2026 as the voter pre-registration deadline for that election, and that page says the deadline is 5 p.m. The 2026 general-election candidate guide says the pre-registration deadline that day is 5:00 p.m., and that a mailed registration form postmarked on or before that day is on time. Iowa Code §48A.7A provides for registration on election day at the polling place. The Secretary of State’s voter-ready page lists Wednesday, October 14 as the first day of absentee voting and Monday, November 2 as the in-person absentee deadline. It lists Tuesday, August 25, 2026 as the first day to file an absentee ballot request, and Monday, October 19 as the deadline for a mailed absentee ballot to be received by the county auditor prior to 5:00 p.m. CT. Iowa Code §53.17 states that a return envelope must be received before the polls close in order for the ballot to be counted. Iowa Code §49.73 states that polling places close at 8:00 p.m. The voter-ready page says polls are open from 7:00 a.m. until 8:00 p.m. CT and that absentee ballots must be received in the county auditor’s office prior to 8:00 p.m. CT on Election Day. County hours vary, and dates can change. The Iowa Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "ia-preregister",
        category: "registration",
        label: "Pre-registration",
        text: "The Secretary of State’s three-year election calendar, under 2026, lists Monday, October 19 as the voter pre-registration deadline for the November 3 general election. That page says the deadline to register to vote is 5 p.m. on the days it lists. The 2026 general-election candidate guide lists Monday, October 19 as the pre-registration deadline at 5:00 p.m., and says a mailed registration form postmarked on or before that day is on time even if it is received later. Iowa Code §48A.9 states that registration closes at 5:00 p.m. fifteen days before each election, that a mailed form is on time if it is postmarked no later than the fifteenth day before the election or received by 5:00 p.m. on the last day, and that a form submitted to a voter registration agency, a motor vehicle driver’s license station, or a participating county treasurer’s office is on time if it is received no later than 11:59 p.m. on the day registration closes. The Secretary of State’s voter-ready registration page says a mailed registration must be received by 5:00 p.m. CT or postmarked fifteen days prior to the election, and that an online registration must be completed at or before 11:59 p.m. CT fifteen days prior to the election. Vote.gov says the online registration deadline is 15 days before Election Day and that a mail registration must be postmarked 15 days before Election Day.",
        endsOn: "2026-10-19",
        sources: [
          {
            label: "Iowa Secretary of State — three-year election calendar",
            href: "https://sos.iowa.gov/three-year-election-calendar",
          },
          {
            label: "Iowa Secretary of State — 2026 general election candidate guide (PDF)",
            href: "https://sos.iowa.gov/sites/default/files/2026-07/2026%20General%20Candidate%27s%20Guide.pdf",
          },
          {
            label: "Iowa Code §48A.9 — voter registration deadlines",
            href: "https://www.legis.iowa.gov/docs/code/2026/48A.9.pdf",
          },
          {
            label: "Iowa Secretary of State — Voter Ready registration",
            href: "https://voterready.iowa.gov/registertovote/",
          },
          {
            label: "Vote.gov — register in Iowa",
            href: "https://vote.gov/register/iowa",
          },
        ],
      },
      {
        id: "ia-eday",
        category: "registration",
        label: "Election Day and in-person absentee registration",
        text: "Iowa Code §48A.7A states that a person may register on election day by appearing in person at the polling place for the precinct where the person resides, and that after the §48A.9 deadline and before election day a person may register and vote an absentee ballot at the commissioner’s office or a satellite absentee voting station. The Secretary of State’s election-day page says a person may register and vote on election day. The voter-ready registration page calls registration after the pre-registration deadline Election Day Registration and says it applies during in-person absentee voting at the county auditor’s office and at the polling place on Election Day. Vote.gov says in-person registration is available up to and including on Election Day. The three-year calendar and the candidate guide list that election as Tuesday, November 3, 2026.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Iowa Code §48A.7A — election day and in-person absentee registration",
            href: "https://www.legis.iowa.gov/docs/code/2026/48A.7A.pdf",
          },
          {
            label: "Iowa Secretary of State — Election Day",
            href: "https://sos.iowa.gov/voters/election-day",
          },
          {
            label: "Iowa Secretary of State — Voter Ready registration",
            href: "https://voterready.iowa.gov/registertovote/",
          },
          {
            label: "Vote.gov — register in Iowa",
            href: "https://vote.gov/register/iowa",
          },
          {
            label: "Iowa Secretary of State — three-year election calendar",
            href: "https://sos.iowa.gov/three-year-election-calendar",
          },
          {
            label: "Iowa Secretary of State — 2026 general election candidate guide (PDF)",
            href: "https://sos.iowa.gov/sites/default/files/2026-07/2026%20General%20Candidate%27s%20Guide.pdf",
          },
        ],
      },
      {
        id: "ia-absentee-in-person",
        category: "early",
        label: "Absentee voting in person",
        text: "The voter-ready page’s November 2026 dates list Wednesday, October 14 as the first day of absentee voting and Monday, November 2 as the in-person absentee deadline. The candidate guide lists Wednesday, October 14, 2026 as the first day absentee ballots may be voted in the county auditor’s office, citing Iowa Code §53.10, and Monday, November 2, 2026 as the last day to request and vote an absentee ballot in person at that office. The same guide lists Saturday, October 31, 2026 as a day the county auditor’s office must be open for at least 8 hours. Iowa Code §53.10 states that in-person absentee voting at the commissioner’s office begins not more than twenty days before the general election. The absentee-voting page says absentee ballots for a primary or general election are available no earlier than 20 days at the county auditor’s office, and that in-person absentee voting is not available on election day at that office unless the polls open at noon. County hours otherwise vary.",
        startsOn: "2026-10-14",
        endsOn: "2026-11-02",
        sources: [
          {
            label: "Iowa Secretary of State — Voter Ready",
            href: "https://voterready.iowa.gov/",
          },
          {
            label: "Iowa Secretary of State — 2026 general election candidate guide (PDF)",
            href: "https://sos.iowa.gov/sites/default/files/2026-07/2026%20General%20Candidate%27s%20Guide.pdf",
          },
          {
            label: "Iowa Code §53.10 — absentee voting at the commissioner’s office",
            href: "https://www.legis.iowa.gov/docs/code/2026/53.10.pdf",
          },
          {
            label: "Iowa Secretary of State — absentee voting",
            href: "https://sos.iowa.gov/voters/absentee-voting",
          },
        ],
      },
      {
        id: "ia-request",
        category: "mail-request",
        label: "Mailed absentee ballot request",
        text: "The voter-ready page lists Tuesday, August 25, 2026 as the first day to file an absentee ballot request with the county auditor, and Monday, October 19 as the deadline for a request that the absentee ballot be mailed, received by the county auditor prior to 5:00 p.m. CT. The candidate guide lists Monday, October 19, 2026 as the last day to request that an absentee ballot be mailed, and says the deadline is 5:00 p.m. Iowa Code §53.2 states that a written application must be received no later than 5:00 p.m. on the same day as the voter registration deadline in §48A.9, except when the ballot is requested and voted at the commissioner’s office, that a written application received more than seventy days before the election is returned, and that an in-person application may be made not more than seventy days before the election. The absentee-voting page says a written application for a mailed absentee ballot must be received by the county auditor no later than 5:00 p.m. fifteen days before the election.",
        startsOn: "2026-08-25",
        endsOn: "2026-10-19",
        sources: [
          {
            label: "Iowa Secretary of State — Voter Ready",
            href: "https://voterready.iowa.gov/",
          },
          {
            label: "Iowa Secretary of State — 2026 general election candidate guide (PDF)",
            href: "https://sos.iowa.gov/sites/default/files/2026-07/2026%20General%20Candidate%27s%20Guide.pdf",
          },
          {
            label: "Iowa Code §53.2 — application for ballot",
            href: "https://www.legis.iowa.gov/docs/code/2026/53.2.pdf",
          },
          {
            label: "Iowa Secretary of State — absentee voting",
            href: "https://sos.iowa.gov/voters/absentee-voting",
          },
        ],
      },
      {
        id: "ia-uocava-request",
        category: "mail-request",
        label: "Military and overseas ballot request",
        text: "The Secretary of State’s military and overseas page says a request to receive a ballot by email or fax must be received in the county auditor’s office by the close of business on the Monday before the election, and that a UOCAVA voter may request a ballot by mail through the day before the election. That page does not print a calendar date for those request deadlines. The three-year calendar lists the 2026 general election as November 3.",
        sources: [
          {
            label: "Iowa Secretary of State — military and overseas civilian voters",
            href: "https://sos.iowa.gov/voters/military-and-overseas-civilian-voters",
          },
          {
            label: "Iowa Secretary of State — three-year election calendar",
            href: "https://sos.iowa.gov/three-year-election-calendar",
          },
        ],
      },
      {
        id: "ia-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "Iowa Code §53.17 states that, in order for the ballot to be counted, the return envelope must be received in the commissioner’s office before the polls close on election day. Iowa Code §49.73 states that the polling places close at 8:00 p.m. The candidate guide lists Tuesday, November 3, 2026 as election day, says polls are open from 7:00 a.m. until 8:00 p.m., and says absentee ballots may be delivered to the county auditor until 8:00 p.m. The voter-ready page says polls are open from 7:00 a.m. until 8:00 p.m. CT and that absentee ballots must be received in the county auditor’s office prior to 8:00 p.m. CT on Election Day. The polling-place finder says that for all elections the polls are open from 7:00 a.m. until 8:00 p.m. Iowa Code §39.1 states that the general election is held on the first Tuesday after the first Monday in November of each even-numbered year. Iowa Code §53.8 states that an absentee ballot is mailed not more than twenty days before the election.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Iowa Code §53.17 — mailing or delivering ballot",
            href: "https://www.legis.iowa.gov/docs/code/2026/53.17.pdf",
          },
          {
            label: "Iowa Code §49.73 — time of opening and closing polls",
            href: "https://www.legis.iowa.gov/docs/code/2026/49.73.pdf",
          },
          {
            label: "Iowa Code §39.1 — general election",
            href: "https://www.legis.iowa.gov/docs/code/2026/39.1.pdf",
          },
          {
            label: "Iowa Code §53.8 — ballot mailed",
            href: "https://www.legis.iowa.gov/docs/code/2026/53.8.pdf",
          },
          {
            label: "Iowa Secretary of State — 2026 general election candidate guide (PDF)",
            href: "https://sos.iowa.gov/sites/default/files/2026-07/2026%20General%20Candidate%27s%20Guide.pdf",
          },
          {
            label: "Iowa Secretary of State — Voter Ready",
            href: "https://voterready.iowa.gov/",
          },
          {
            label: "Iowa Secretary of State — find your polling place",
            href: "https://apps.sos.iowa.gov/elections/voterreg/pollingplace/search.aspx",
          },
        ],
      },
      {
        id: "ia-uocava-return",
        category: "mail-return",
        label: "Military and overseas ballot return",
        text: "The candidate guide lists noon on Monday, November 9, 2026 for UOCAVA and Safe at Home absentee ballots confirmed sent on the day before the election or earlier by postmark or postal service barcode, and it cites Iowa Code §53.17(2). The Iowa Code 2026 text of §53.17(2) states that the return envelope must be received before the polls close and does not print November 9. The military and overseas page says a mailed ballot must be postmarked by the Monday before election day or earlier and received in the county auditor’s office no later than noon on the Monday following election day. Iowa Code §53.44 states that an armed-forces absentee ballot is counted if the return envelope is received before the polls close, or if it is postmarked or has a postal barcode for entry into the federal mail system not later than the day before the election and is received not later than noon on the Monday following the election. Section 53.44 does not print November 9.",
        endsOn: "2026-11-09",
        sources: [
          {
            label: "Iowa Secretary of State — 2026 general election candidate guide (PDF)",
            href: "https://sos.iowa.gov/sites/default/files/2026-07/2026%20General%20Candidate%27s%20Guide.pdf",
          },
          {
            label: "Iowa Code §53.17 — mailing or delivering ballot",
            href: "https://www.legis.iowa.gov/docs/code/2026/53.17.pdf",
          },
          {
            label: "Iowa Secretary of State — military and overseas civilian voters",
            href: "https://sos.iowa.gov/voters/military-and-overseas-civilian-voters",
          },
          {
            label: "Iowa Code §53.44 — armed forces absentee ballot affidavit",
            href: "https://www.legis.iowa.gov/docs/code/2026/53.44.pdf",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Separate early-voting window",
        text: "The voter-ready page and the absentee-voting page describe absentee voting in person and do not print a separate early-voting period. Satellite absentee hours are set by the county auditor. The Iowa Secretary of State is the official source.",
      },
      {
        category: "mail-return",
        label: "Conflicting poll-close hour on one military-page sentence",
        text: "The military and overseas page’s federal write-in email-or-fax sentence names a poll-close hour that differs from the 8:00 p.m. close stated on that page’s other return section, the voter-ready page, the candidate guide, and Iowa Code §49.73. This site lists the 8:00 p.m. close from those sources.",
      },
      {
        category: "mail-return",
        label: "Other ballots received after the polls close",
        text: "Iowa Code §53.17A describes counting some absentee ballots received after the polls close and before the official canvass. That section does not print a calendar date. The Iowa Secretary of State and that section are the official sources.",
      },
    ],
  },
  {
    code: "AK",
    checkedOn: "October 14, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Alaska Division of Elections’ 2026 general-election candidate page lists Sunday, October 4, 2026 as the voter registration deadline. The Division’s election calendar lists October 4, 2026 as the deadline to register or update a registration and describes it as the 30th day prior to the election. The absentee and early-voting page says a registration application must be postmarked or received 30 days before Election Day. Vote.gov says the online, by-mail, and in-person registration deadlines are 30 days before Election Day, and that a mail registration must be received by that day. Vote.gov does not print October 4. The election calendar lists October 19, 2026 as the day absentee in-person, early voting, electronic transmission, and special-needs voting begins. The absentee and early-voting page says absentee in-person and early voting locations are open starting 15 days prior and through Election Day, and that each location has different hours. The calendar lists November 3, 2026 as General Election Day and says polls are open from 7 a.m. to 8 p.m. The calendar lists January 1, 2026 as the first day absentee by-mail applications may be filed for elections in the calendar year, and October 24, 2026 as the deadline to receive those applications. The Division’s homepage states that October 24 deadline for the 2026 general election. The absentee page lists October 19, 2026 as the general-election day an online-delivery ballot may be requested, beginning 15 days prior to Election Day, and November 2, 2026 as the general-election deadline for an electronic-transmission application, no later than 5:00 p.m. Alaska Standard Time the day before Election Day. The calendar lists November 2, 2026 as the deadline to receive electronic-transmission applications and says they must be received by 5 p.m. Alaska Time. The absentee page says a mailed ballot must be postmarked on or before Election Day and that an in-person return to a voting location is by 8:00 p.m. on Election Day. The calendar lists November 13, 2026 as the deadline to receive by-mail ballots mailed from within the United States, Puerto Rico, Guam, the Virgin Islands, and American Samoa when postmarked by November 3, 2026, and November 18, 2026 as the deadline to receive by-mail ballots mailed from overseas addresses when postmarked by November 3, 2026. It lists November 3, 2026 as the deadline for a ballot returned by electronic transmission to be received, by 8:00 p.m. Alaska Time. Location hours vary, and dates can change. The Alaska Division of Elections publishes the current calendar.",
    facts: [
      {
        id: "ak-register",
        category: "registration",
        label: "Voter registration",
        text: "The Division of Elections’ 2026 general-election candidate page lists Sunday, October 4, 2026 as the voter registration deadline. The election calendar lists October 4, 2026 as the deadline for voters to register or update their registration. The calendar’s note says the deadline always falls on a Sunday and is the 30th day prior to the election. The calendar’s reference line reads AS 15.05.010 and AS 15.07.070 (c, d). The absentee and early-voting page says that, when registering or updating registration information, the application must be postmarked or received 30 days before Election Day. That page does not print October 4. Vote.gov says the online registration deadline is 30 days before Election Day, that a mail registration must be received 30 days before Election Day, and that the in-person registration deadline is 30 days before Election Day. Vote.gov does not print October 4.",
        endsOn: "2026-10-04",
        sources: [
          {
            label: "Alaska Division of Elections — 2026 general election candidate list",
            href: "https://www.elections.alaska.gov/candidates/?election=26genr",
          },
          {
            label: "Alaska Division of Elections — election calendar",
            href: "https://www.elections.alaska.gov/calendar/",
          },
          {
            label: "Alaska Division of Elections — absentee and early voting",
            href: "https://www.elections.alaska.gov/voter-information/absentee-and-early-voting/",
          },
          {
            label: "Vote.gov — register in Alaska",
            href: "https://vote.gov/register/alaska",
          },
        ],
      },
      {
        id: "ak-early",
        category: "early",
        label: "Absentee in-person and early voting",
        text: "The election calendar lists October 19, 2026 as the day absentee in-person, early voting, electronic transmission, and special-needs voting begins. The calendar’s reference line reads AS 15.20.045, AS 15.20.061–.081, and 6 AAC 25.500. The absentee and early-voting page says absentee in-person and early voting locations are open starting 15 days prior and through Election Day, and that each location has different hours. The calendar lists November 3, 2026 as General Election Day and says polls are open from 7 a.m. to 8 p.m. The calendar’s reference line for that election day reads AS 15.15.020.",
        startsOn: "2026-10-19",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Alaska Division of Elections — election calendar",
            href: "https://www.elections.alaska.gov/calendar/",
          },
          {
            label: "Alaska Division of Elections — absentee and early voting",
            href: "https://www.elections.alaska.gov/voter-information/absentee-and-early-voting/",
          },
        ],
      },
      {
        id: "ak-request",
        category: "mail-request",
        label: "Absentee by-mail application",
        text: "The election calendar lists January 1, 2026 as the first day voters may submit absentee by-mail ballot applications for all elections in the calendar year. The calendar’s reference line for that day reads AS 15.20.081(b), AS 15.20.081(i), and 42 U.S.C. The calendar lists October 24, 2026 as the deadline to receive absentee by-mail applications, and its reference line reads AS 15.20.081(b). The absentee and early-voting page lists October 24, 2026 as the general-election absentee by-mail application deadline. The Division of Elections homepage says the absentee by-mail application deadline for the 2026 general election is October 24.",
        startsOn: "2026-01-01",
        endsOn: "2026-10-24",
        sources: [
          {
            label: "Alaska Division of Elections — election calendar",
            href: "https://www.elections.alaska.gov/calendar/",
          },
          {
            label: "Alaska Division of Elections — absentee and early voting",
            href: "https://www.elections.alaska.gov/voter-information/absentee-and-early-voting/",
          },
          {
            label: "Alaska Division of Elections — homepage",
            href: "https://www.elections.alaska.gov/",
          },
        ],
      },
      {
        id: "ak-request-electronic",
        category: "mail-request",
        label: "Electronic transmission and online-delivery application",
        text: "The absentee and early-voting page says an online-delivery ballot may be requested beginning 15 days prior to Election Day, and it lists October 19, 2026 for the general election. That page says a completed electronic-transmission application must be received no later than 5:00 p.m. Alaska Standard Time the day before Election Day, and it lists November 2, 2026 as that general-election deadline. The election calendar lists November 2, 2026 as the deadline to receive absentee by electronic transmission ballot applications and says applications must be received by 5 p.m. Alaska Time. The calendar’s reference line reads AS 15.20.081(b).",
        startsOn: "2026-10-19",
        endsOn: "2026-11-02",
        sources: [
          {
            label: "Alaska Division of Elections — absentee and early voting",
            href: "https://www.elections.alaska.gov/voter-information/absentee-and-early-voting/",
          },
          {
            label: "Alaska Division of Elections — election calendar",
            href: "https://www.elections.alaska.gov/calendar/",
          },
        ],
      },
      {
        id: "ak-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "The absentee and early-voting page lists the general-election deadline to return a voted ballot as postmarked or received by November 3, 2026. That page says a mailed ballot must be postmarked on or before Election Day, and that a voted absentee ballot returned in person to a voting location must be returned by 8:00 p.m. on Election Day. The election calendar lists November 3, 2026 as the day absentee ballots returned by mail must be postmarked on or before Election Day. The calendar’s reference line reads AS 15.20.081(e). The calendar lists November 3, 2026 as General Election Day and says polls are open from 7 a.m. to 8 p.m.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Alaska Division of Elections — absentee and early voting",
            href: "https://www.elections.alaska.gov/voter-information/absentee-and-early-voting/",
          },
          {
            label: "Alaska Division of Elections — election calendar",
            href: "https://www.elections.alaska.gov/calendar/",
          },
        ],
      },
      {
        id: "ak-return-domestic",
        category: "mail-return",
        label: "By-mail ballots from the United States and named territories",
        text: "The election calendar lists November 13, 2026 as the deadline to receive absentee ballots mailed from within the United States and from Puerto Rico, Guam, the Virgin Islands, and American Samoa. The calendar says those ballots must be postmarked by November 3, 2026 to be eligible. The calendar’s reference line reads AS 15.20.081(e).",
        endsOn: "2026-11-13",
        sources: [
          {
            label: "Alaska Division of Elections — election calendar",
            href: "https://www.elections.alaska.gov/calendar/",
          },
        ],
      },
      {
        id: "ak-return-overseas",
        category: "mail-return",
        label: "By-mail ballots from overseas addresses",
        text: "The election calendar lists November 18, 2026 as the deadline to receive by-mail ballots mailed from overseas addresses. The calendar says those ballots must be postmarked by November 3, 2026 to be eligible. The calendar’s reference line for that deadline reads AS 15.20.81(h).",
        endsOn: "2026-11-18",
        sources: [
          {
            label: "Alaska Division of Elections — election calendar",
            href: "https://www.elections.alaska.gov/calendar/",
          },
        ],
      },
      {
        id: "ak-return-electronic",
        category: "mail-return",
        label: "Electronic transmission ballot return",
        text: "The election calendar lists November 3, 2026 as the deadline for ballots returned by electronic transmission to be received, and says a ballot returned that way must be received by 8:00 p.m. Alaska Time. The calendar’s reference line reads 6 AAC 25.680(g). The absentee and early-voting page says a ballot returned by fax must be received by fax on or before 8:00 p.m. Alaska Standard Time on Election Day.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Alaska Division of Elections — election calendar",
            href: "https://www.elections.alaska.gov/calendar/",
          },
          {
            label: "Alaska Division of Elections — absentee and early voting",
            href: "https://www.elections.alaska.gov/voter-information/absentee-and-early-voting/",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Same-day registration for the November 3, 2026 general election",
        text: "The election-information page describes same-day registration for voting for President and Vice-President and cites AS 15.05.014. The 2026 general-election candidate page lists October 4, 2026 as the voter registration deadline. The pages read for this update do not describe same-day registration for the November 3, 2026 general election. The Alaska Division of Elections is the official source.",
      },
      {
        category: "early",
        label: "Statewide early-voting hours",
        text: "The absentee and early-voting page says each location has different hours. The election calendar lists some regional-office hours and says those hours are a policy of the Division and are not required by law. This site does not treat those policy hours as a statewide schedule. The Alaska Division of Elections is the official source.",
      },
    ],
  },
  {
    code: "KS",
    checkedOn: "October 16, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Kansas Secretary of State’s important-election-dates page lists October 13, 2026 as the deadline to register or to update a registration to change an address or a name for that election. An October 13, 2026 Secretary of State announcement says paper registration forms are due by the close of business at the county election office and that online registration is available until midnight that day. The voter-registration page says the registration books close 21 days before an election until the election is completed. K.S.A. 25-2311 states that registration is not provided on the 20 days preceding a general election or on election day, and that applications received by a voter registration agency or the division of motor vehicles not later than the 21st day preceding the election, or mailed applications postmarked not later than that day, are accepted and processed. A mailed application with a missing or illegible postmark is accepted if it is received by the ninth day preceding the election. Vote.gov says the online, mail, and in-person registration deadlines are 21 days before Election Day and that a mail registration must be postmarked by that day. Vote.gov does not print October 13, and that page says it was last updated November 18, 2024. The important-dates page lists October 14, 2026 as the first day of advance voting, with advance ballots by mail transmitted that day and in-person advance voting allowed to begin, and October 27, 2026 as the day in-person advance voting must begin in every county. K.S.A. 25-1122 states the mailed advance-ballot application period as 90 days before the general election through the Tuesday of the week preceding it, and states the default in-person application period as the Tuesday next preceding the election through 12:00 noon on the day before the election unless the county designates an earlier start. That statute does not print October 14 or October 27. K.S.A. 25-1132(b), effective January 1, 2026, states that the deadline for receipt by mail of an advance voting ballot is 7:00 p.m. on the date of the election. The advance-voting page says the statutory return deadline is the close of the polls on Election Day. That page also says a district court in Douglas County entered a statewide injunction requiring a ballot postmarked by election day to be counted if it arrives by the last postal delivery on the Friday after the election, and that a motion to stay that injunction for the general election was denied. K.S.A. 25-106 states poll hours separately for the central and mountain time zones. County hours vary, and dates can change. The Kansas Secretary of State publishes the current calendar.",
    facts: [
      {
        id: "ks-register",
        category: "registration",
        label: "Voter registration",
        text: "The Secretary of State’s important-election-dates page lists October 13, 2026 as the deadline to register to vote or to update a voter registration to change an address or a name for the 2026 general election. The general-election dates file linked from that page prints the same October 13 line. That page does not split the deadline into mail, online, and in-person cutoffs. The October 13, 2026 announcement says paper voter registration forms are due by the close of business at the county election office and that online voter registration is available until midnight that day. The voter-registration page says the registration books close 21 days before an election until the election is completed, and that registrations received in that period are processed after the election. K.S.A. 25-2311(a) states that county election officers provide for registration except on the 20 days preceding the day of a general election and on the day of the general election. Subsection (b) states that every day, including Sunday and legal holidays, is counted. Subsection (e)(1) states that county election officers accept and process applications received by voter registration agencies and the division of motor vehicles not later than the 21st day preceding the election, and mailed applications postmarked not later than the 21st day preceding the election. If the postmark is illegible or missing, that subsection states that a mailed application received in the mail not later than the ninth day preceding the election is accepted. The statute does not print October 13. Vote.gov says the online registration deadline is 21 days before Election Day, that a mail registration must be postmarked 21 days before Election Day, and that the in-person registration deadline is 21 days before Election Day. Vote.gov does not print October 13. The Vote.gov Kansas page says it was last updated November 18, 2024.",
        endsOn: "2026-10-13",
        sources: [
          {
            label: "Kansas Secretary of State — important election dates",
            href: "https://sos.ks.gov/elections/important-election-dates.html",
          },
          {
            label: "Kansas Secretary of State — 2026 general election dates (PDF)",
            href: "https://sos.ks.gov/Pubs/Elections/2026-General-Election-Dates-2.pdf",
          },
          {
            label: "Kansas Secretary of State — October 13, 2026 registration announcement",
            href: "https://www.sos.ks.gov/media/press-releases/2026/10-13-26-secretary-schwab-announces-voter-registration-closes-today.html",
          },
          {
            label: "Kansas Secretary of State — voter registration",
            href: "https://sos.ks.gov/elections/voter-registration.html",
          },
          {
            label: "K.S.A. 25-2311 — opening and closing of registration",
            href: "https://ksrevisor.gov/statutes/chapters/ch25/025_023_0011.html",
          },
          {
            label: "Vote.gov — register in Kansas",
            href: "https://vote.gov/register/kansas",
          },
        ],
      },
      {
        id: "ks-advance",
        category: "early",
        label: "Advance voting in person",
        text: "The important-election-dates page lists October 14 as the first day of advance voting. It says advance ballots by mail are transmitted that day and that in-person advance voting may begin that day. It does not print statewide hours and says the county election office has the times and locations. It lists October 27 as the day in-person advance voting must begin for all counties. The linked general-election dates file prints the same October 14 and October 27 lines. The advance-voting page says advance voting in person, at a county election office or satellite location, and by mail is available up to 20 days before an election. K.S.A. 25-1122(g)(1) states that, unless the county election office designates an earlier date, an application for an advance voting ballot transmitted to the voter in person is filed on the Tuesday next preceding the election and on each later business day until no later than 12:00 noon on the day preceding the election. That subsection states that the county election officer may also allow that in-person application to be filed on the Saturday preceding the election. The statute does not print October 14 or October 27. The important-dates page lists November 3 as the general election and does not print statewide in-person hours.",
        startsOn: "2026-10-14",
        sources: [
          {
            label: "Kansas Secretary of State — important election dates",
            href: "https://sos.ks.gov/elections/important-election-dates.html",
          },
          {
            label: "Kansas Secretary of State — 2026 general election dates (PDF)",
            href: "https://sos.ks.gov/Pubs/Elections/2026-General-Election-Dates-2.pdf",
          },
          {
            label: "Kansas Secretary of State — advance voting information",
            href: "https://sos.ks.gov/elections/advance-voting-information.html",
          },
          {
            label: "K.S.A. 25-1122 — advance voting applications",
            href: "https://ksrevisor.gov/statutes/chapters/ch25/025_011_0022.html",
          },
        ],
      },
      {
        id: "ks-request",
        category: "mail-request",
        label: "Mailed advance-ballot application",
        text: "K.S.A. 25-1122(f)(1)(B) states that an application for an advance voting ballot to be transmitted by mail, for the general election on the Tuesday following the first Monday in November, is filed between 90 days prior to the election and the Tuesday of the week preceding that general election. Subsection (f)(2) states that a county election officer may receive an application before that period, hold it until the period begins, and treat it as filed on that date. Subsection (g)(2) states that an application filed by a voter who has a temporary illness or disability or who is not proficient in reading the English language, or by a person rendering assistance to such a voter, may be filed during the regular advance-ballot application periods until the close of the polls on election day. The important-election-dates page lists the general election as November 3 and does not print a calendar date for the mailed-application deadline. The advance-voting page does not print that calendar date either.",
        sources: [
          {
            label: "K.S.A. 25-1122 — advance voting applications",
            href: "https://ksrevisor.gov/statutes/chapters/ch25/025_011_0022.html",
          },
          {
            label: "Kansas Secretary of State — important election dates",
            href: "https://sos.ks.gov/elections/important-election-dates.html",
          },
          {
            label: "Kansas Secretary of State — advance voting information",
            href: "https://sos.ks.gov/elections/advance-voting-information.html",
          },
        ],
      },
      {
        id: "ks-uocava",
        category: "mail-request",
        label: "UOCAVA ballot transmission",
        text: "The important-election-dates page lists September 19 as the deadline to transmit UOCAVA ballots. The linked general-election dates file prints the same September 19 line. The military and overseas citizens page says that, starting 45 days before an election, ballots are sent to voters with an active federal postcard application. That page says there is no statutory deadline for those applications and that an application is submitted with enough time to allow transmittal to and from the voter. That page cites K.S.A. 25-1216(a) for its statement that a voter who files the application before a primary election receives a ballot for the general election that year, and K.S.A. 25-1215 for its statement that it is not necessary for a qualifying individual to be registered in the county.",
        endsOn: "2026-09-19",
        sources: [
          {
            label: "Kansas Secretary of State — important election dates",
            href: "https://sos.ks.gov/elections/important-election-dates.html",
          },
          {
            label: "Kansas Secretary of State — 2026 general election dates (PDF)",
            href: "https://sos.ks.gov/Pubs/Elections/2026-General-Election-Dates-2.pdf",
          },
          {
            label: "Kansas Secretary of State — military and overseas citizens",
            href: "https://sos.ks.gov/elections/military-overseas-citizens.html",
          },
        ],
      },
      {
        id: "ks-return",
        category: "mail-return",
        label: "Advance ballot return",
        text: "K.S.A. 25-1132(b), in the text effective January 1, 2026, states that the deadline for the receipt by mail of advance voting ballots by the county election officer is 7:00 p.m. on the date of the election. Subsection (a) states that advance voting ballots received in the office of the county election officer or at any polling place in the county not later than the hour for closing the polls on that election are delivered to the special election board. The important-election-dates page lists the general election as November 3. The advance-voting page says that under Kansas statute the deadline to return a ballot is the close of the polls on Election Day. That page also says a district court in Douglas County entered a statewide injunction requiring a ballot postmarked by election day to be counted if it arrives by the last postal delivery on the Friday after the election. It says the Kansas Court of Appeals denied a motion to stay that injunction for the primary election, and that a renewed motion to stay the injunction for the general election was denied. The important-dates page and the linked dates file do not print the Friday receipt rule. K.S.A. 25-106(a) states that in counties in the central time zone the polls open at 7:00 a.m. and close at 7:00 p.m. unless the county election officer sets and announces different hours. Different hours under that subsection are at least 12 continuous hours, start no earlier than 6:00 a.m., end no later than 8:00 p.m., and end no earlier than 7:00 p.m. Subsection (b) states that in counties in the mountain time zone the polls open at 6:00 a.m. and close at 6:00 p.m. unless different hours are set. Different hours under that subsection are at least 12 continuous hours, start no earlier than 5:00 a.m., end no later than 7:00 p.m., and end no earlier than 6:00 p.m. The voter-information page states the 7:00 a.m. to 7:00 p.m. hours, states that counties may open as early as 6:00 a.m. and close as late as 8:00 p.m., and cites K.S.A. 25-106. That page does not restate the mountain-time hours.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "K.S.A. 25-1132 — advance voting ballot receipt",
            href: "https://ksrevisor.gov/statutes/chapters/ch25/025_011_0032.html",
          },
          {
            label: "K.S.A. 25-106 — hours of voting",
            href: "https://ksrevisor.gov/statutes/chapters/ch25/025_001_0006.html",
          },
          {
            label: "Kansas Secretary of State — advance voting information",
            href: "https://sos.ks.gov/elections/advance-voting-information.html",
          },
          {
            label: "Kansas Secretary of State — important election dates",
            href: "https://sos.ks.gov/elections/important-election-dates.html",
          },
          {
            label: "Kansas Secretary of State — voter information",
            href: "https://sos.ks.gov/elections/voter-information.html",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Registration at the polling place on Election Day",
        text: "K.S.A. 25-2311 states that registration is not provided on the 20 days preceding a general election or on election day. The voter-registration page says registrations received while the books are closed are processed after the election. The pages read for this update do not describe registration at the polling place on November 3, 2026. The Kansas Secretary of State is the official source.",
      },
      {
        category: "early",
        label: "Statewide in-person advance-voting hours",
        text: "The important-election-dates page does not print statewide hours. It says the county election office has the times and locations. The Kansas Secretary of State is the official source.",
      },
      {
        category: "mail-request",
        label: "Calendar date for a mailed advance-ballot application",
        text: "K.S.A. 25-1122(f)(1)(B) states the mailed-application period as 90 days before the general election through the Tuesday of the week preceding it. The important-election-dates page and the advance-voting page do not print a calendar date for that deadline. The Kansas Secretary of State and that statute are the official sources.",
      },
    ],
  },
];

const BY_CODE = new Map(ELECTION_DATES.map((entry) => [entry.code, entry]));

export function electionDatesFor(code: StateCode): StateElectionDates {
  const entry = BY_CODE.get(code);
  if (!entry) {
    throw new Error(`No election dates for ${code}`);
  }
  return entry;
}

export const DEADLINE_CATEGORY_LABEL: Record<DeadlineCategory, string> = {
  registration: "Voter registration",
  early: "Early or in-person absentee voting",
  "mail-request": "Mail or absentee ballot request",
  "mail-return": "Mail or absentee ballot return",
};

export const VOTING_DEADLINES_PATH = "/voting-deadlines";

/** True when this state stores a sourced fact in the category. Omitted rows do not count. */
export function hasSourcedDeadline(
  dates: StateElectionDates,
  category: DeadlineCategory,
): boolean {
  return dates.facts.some((fact) => fact.category === category);
}

/** Mail-ballot request or return facts. An omitted mail row is not sourced data. */
export function hasSourcedMailDeadline(dates: StateElectionDates): boolean {
  return hasSourcedDeadline(dates, "mail-request") || hasSourcedDeadline(dates, "mail-return");
}

/** Deep link to one state's row on the voting-deadlines page. Trailing slash matches GitHub Pages. */
export function votingDeadlinesStateHref(code: StateCode): string {
  return `${VOTING_DEADLINES_PATH}/#${code}`;
}

/** Deep link to the key-dates section on a state hub. */
export function stateKeyDatesHref(code: StateCode): string {
  return `/states/${code}/#key-dates`;
}
