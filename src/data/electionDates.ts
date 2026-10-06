import type { StateCode } from "./types";

/**
 * Key dates for the November 3, 2026 general election.
 * Every sentence is paraphrased from an official page fetched and read on October 6, 2026.
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
}

export interface OmittedDeadline {
  category: DeadlineCategory;
  label: string;
  text: string;
}

export interface StateElectionDates {
  code: StateCode;
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

export const ELECTION_DATES: StateElectionDates[] = [
  {
    code: "AZ",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Arizona Secretary of State lists 11:59 p.m. on October 5, 2026 as the last day to register for that election, October 7, 2026 as the day early voting begins and early ballots are mailed, and 7:00 p.m. on Election Day as the deadline to return a completed ballot-by-mail. A request to have a ballot mailed must reach the county by 5:00 p.m. on the 11th day before the election, which that office describes as two Fridays before Election Day. County hours vary, and dates can change. Confirm with the Arizona Secretary of State.",
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
        text: "Check with the Arizona Secretary of State. The calendar and early-voting pages read for this update do not describe same-day registration.",
      },
    ],
  },
  {
    code: "GA",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. Georgia.gov lists October 5, 2026 as the voter registration deadline, October 13–30 as the early voting period, October 23, 2026 as the day a county must receive an absentee application, and 7 p.m. on Election Day as the deadline to receive a returned absentee ballot. County hours vary, and dates can change. Confirm with the Georgia Secretary of State.",
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
        text: "Check with the Georgia Secretary of State. The Georgia.gov election guide read for this update does not describe same-day registration.",
      },
    ],
  },
  {
    code: "MI",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Michigan Secretary of State lists October 19, 2026 as the last day to register by mail or online, in-person registration with proof of residency from October 20 through Election Day, a constitutionally required early-voting period of October 24–November 1, and 8 p.m. on Election Day as the deadline for a local clerk to receive an absentee ballot. Online and mailed absentee applications must arrive by 5 p.m. the Friday before Election Day. County hours vary, and dates can change. Confirm with the Michigan Secretary of State.",
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
        text: "From October 20 through November 3, 2026, new registrations for this election must be done in person. Within 14 days of an election, and on Election Day, voters register at their local clerk’s office with proof of residency. A person in line at the clerk’s office by 8 p.m. on Election Day may register and cast an absentee ballot there.",
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
        text: "A voter already registered at their current address can apply in person at the clerk’s office until 4 p.m. the day before Election Day.",
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
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The North Carolina State Board of Elections lists 5 p.m. on October 9, 2026 as the regular registration deadline, in-person early voting from October 15 through 3 p.m. on October 31 with same-day registration at those sites, a 5 p.m. October 20 absentee-request deadline, and a 7:30 p.m. November 3 absentee-return deadline. A paper registration must be received by the county board or postmarked by October 9. County hours vary, and dates can change. Confirm with the State Board of Elections.",
    facts: [
      {
        id: "nc-register",
        category: "registration",
        label: "Regular voter registration",
        text: "The regular voter registration deadline is 5 p.m. on Friday, October 9, 2026. A paper application must be received by the county board of elections or postmarked by October 9. Voters with a North Carolina driver’s license or NCDMV ID can also submit an application online. Military and overseas deadlines differ.",
        endsOn: "2026-10-09",
        ifPassed:
          "The State Board says people who miss this deadline may still register and vote during early voting at an early-voting site in their county. It also says residents generally may not register on Election Day, except in cases it describes for a new citizen or someone whose voting rights were restored after the deadline.",
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
        text: "Same-day registration is available when in-person early voting begins on October 15, 2026. The State Board says these voters attest to eligibility, provide proof of residence, and show an acceptable photo ID.",
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
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Nevada Secretary of State’s 2026 Elections Procedures Manual lists October 6, 2026 for registration by mail or in person at the clerk, October 12, 2026 at a voter-registration agency such as the DMV, and November 3, 2026 for online registration. Same-day registration is available at vote centers during early voting and on Election Day. The Secretary of State’s FAQ lists early voting as October 17–30, 2026. Active registered voters are mailed a ballot unless they opt out. A mailed ballot must be postmarked by Election Day and received by 5 p.m. on the fourth day after the election, or returned in person before the polls close. County hours vary, and dates can change. Confirm with the Nevada Secretary of State.",
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
        text: "The manual lists November 3, 2026 as the general-election date for registration in NOVA, the state’s online system. A note on that table says voters who register online within 14 days of the election are not sent a mail ballot and must show ID and vote in person at a vote center.",
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
        text: "The Secretary of State’s elections FAQ says you can use same-day registration during early voting or on Election Day. It requires a Nevada driver’s license or Nevada ID card, or a tribal ID that meets the requirements on that page, and an in-person vote at a polling location. The procedures manual lists vote-center registration for the general election as October 17–30, 2026 and Election Day.",
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
        text: "A mail ballot returned in person must arrive before the polls close on Election Day. A ballot returned by mail must be postmarked on or before Election Day and received by the county elections office no later than 5 p.m. on the fourth day after the election.",
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
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Cuyahoga County Board of Elections, publishing deadlines for that statewide election, lists Monday, October 5, 2026 as the registration deadline (a mailed form must be postmarked by October 5), October 6 as the start of absentee and early in-person voting, 8:30 p.m. on October 27 as the vote-by-mail application deadline, and 7:30 p.m. on Election Day as the deadline for a voted absentee ballot to arrive. Its early-voting calendar runs through November 1. Those daily hours are the county’s; confirm your county’s hours. The Secretary of State’s own schedule page could not be read directly for this update. Dates can change. Confirm with the Ohio Secretary of State and your county board.",
    facts: [
      {
        id: "oh-register",
        category: "registration",
        label: "Voter registration",
        text: "The Cuyahoga County Board of Elections says the deadline to register for the November 3, 2026 general election is Monday, October 5. A mailed registration form must be postmarked by October 5. That board says its own office is open until 9 p.m. that day for in-person registration. The page does not state a separate online cutoff.",
        endsOn: "2026-10-05",
        sources: [
          {
            label: "Cuyahoga County Board of Elections — November 3, 2026 FAQs",
            href: "https://boe.cuyahogacounty.gov/voters/election-faqs",
          },
        ],
      },
      {
        id: "oh-early",
        category: "early",
        label: "Early in-person voting",
        text: "That board says absentee voting, including early in-person voting, begins Tuesday, October 6, 2026, and its early-voting calendar for this general election runs through Sunday, November 1. The hour-by-hour schedule on that calendar is Cuyahoga County’s. Other county boards publish their own hours.",
        startsOn: "2026-10-06",
        endsOn: "2026-11-01",
        sources: [
          {
            label: "Cuyahoga County Board of Elections — November 3, 2026 FAQs",
            href: "https://boe.cuyahogacounty.gov/voters/election-faqs",
          },
          {
            label: "Cuyahoga County Board of Elections — early in-person voting",
            href: "https://boe.cuyahogacounty.gov/voters/vote-early-in-person",
          },
        ],
      },
      {
        id: "oh-request",
        category: "mail-request",
        label: "Vote-by-mail application",
        text: "Vote-by-mail applications are accepted until 8:30 p.m. on Tuesday, October 27, 2026. A voter must request a ballot; the board says the Secretary of State also mails an application that still has to be completed and returned.",
        endsOn: "2026-10-27",
        sources: [
          {
            label: "Cuyahoga County Board of Elections — November 3, 2026 FAQs",
            href: "https://boe.cuyahogacounty.gov/voters/election-faqs",
          },
        ],
      },
      {
        id: "oh-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "A voted absentee ballot must arrive at the board of elections by 7:30 p.m. on Election Day. Polls that day are open from 6:30 a.m. to 7:30 p.m.",
        endsOn: "2026-11-03",
        sources: [
          {
            label: "Cuyahoga County Board of Elections — November 3, 2026 FAQs",
            href: "https://boe.cuyahogacounty.gov/voters/election-faqs",
          },
        ],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Check with the Ohio Secretary of State. The county FAQ read for this update does not describe Election Day registration. The Secretary of State site blocked a direct read from this update.",
      },
    ],
  },
  {
    code: "PA",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Pennsylvania Department of State lists October 19, 2026 as the last day to register before the November election, October 27, 2026 as the last day to apply for a mail-in or civilian absentee ballot, and 8:00 p.m. on November 3, 2026 as the deadline for a county election office to receive those completed ballots. That calendar does not list a statewide early-voting window. Dates can change. Confirm with the Pennsylvania Department of State and your county election office.",
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
        text: "Check with the Pennsylvania Department of State and your county election office. The 2026 upcoming-elections page does not list a statewide early-voting window.",
      },
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Check with the Pennsylvania Department of State. The upcoming-elections calendar read for this update does not describe same-day registration.",
      },
    ],
  },
  {
    code: "WI",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Wisconsin Elections Commission calendar lists October 14, 2026 as the deadline to register by mail or online (mail postmarked by then; online closes at 11:59 p.m.), in-person registration at the municipal clerk through 5 p.m. on October 30, and registration at the polling place after mail and online registration close. In-person absentee voting may begin October 20; municipalities set the hours and may end as late as November 1. Regular absentee requests by mail, online, email, or fax are due by 5 p.m. on October 29. Absentee ballots must be delivered by 8 p.m. on Election Day. Dates can change. Confirm with the Wisconsin Elections Commission and your municipal clerk.",
    facts: [
      {
        id: "wi-register-mail",
        category: "registration",
        label: "Registration by mail or online",
        text: "October 14, 2026 is the deadline to register by mail or online for the general election. A mail form must be postmarked no later than the third Wednesday before the election. Online registration closes at 11:59 p.m. After that date, voters register in person at the municipal clerk’s office or at the polling place.",
        endsOn: "2026-10-14",
        ifPassed:
          "The Elections Commission calendar says that after this deadline, electors register in person in the municipal clerk’s office or at the polling place.",
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
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Texas Secretary of State lists Monday, October 5, 2026 as the last day to register, early voting by personal appearance from October 19 through October 30, Friday, October 23 as the last day for a ballot-by-mail application to be received (not merely postmarked), and a receipt rule of 7:00 p.m. on Election Day if the carrier envelope is not postmarked, or 5:00 p.m. on November 4 if it was postmarked by 7:00 p.m. on Election Day. County hours vary, and dates can change. Confirm with the Texas Secretary of State.",
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
        text: "Check with the Texas Secretary of State. The important-dates page read for this update does not describe same-day registration.",
      },
    ],
  },
  {
    code: "FL",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Florida Division of Elections lists October 5, 2026 as the registration deadline, October 22, 2026 as the deadline to request that a ballot be mailed, a mandatory early-voting period of October 24–31, and 7:00 p.m. local time on Election Day as the deadline for a voted vote-by-mail ballot to be received, regardless of postmark. Overseas voters have a 10-day extension on this general election if the ballot is postmarked or dated by Election Day. County hours vary, and dates can change. Confirm with the Florida Division of Elections and your county supervisor of elections.",
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
        text: "Check with the Florida Division of Elections. The election-dates page read for this update does not describe same-day registration.",
      },
    ],
  },
  {
    code: "CA",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The California Secretary of State lists October 19, 2026 as the last day to register, conditional same-day registration from October 20 through November 3, early-voting sites opening October 5, and vote-by-mail ballots mailed to each registered voter no later than October 5. A vote-by-mail ballot returned by mail must be postmarked on or before Election Day and received by the county by November 10, 2026. That key-dates page does not list a separate application deadline. County hours vary, and dates can change. Confirm with the California Secretary of State.",
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
        text: "Same-day registration is available October 20–November 3, 2026. The Secretary of State says voters can conditionally register and vote a provisional ballot during that period.",
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
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The New York State Board of Elections says a mail or in-person registration application must be received by October 24, 2026. Early voting is October 24–November 1, and county hours vary. An application for an early-mail or absentee ballot to be sent by mail must be received no later than ten days before the election; an in-person application must be received no later than the day before the election. A ballot mailed back must be postmarked by November 3 and received by the county board by November 10, or it can be returned in person by 9 p.m. on November 3. Dates can change. Confirm with the New York State Board of Elections.",
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
        text: "Check with the New York State Board of Elections. The registration-deadlines page read for this update states October 24, 2026 for mail and in-person applications and does not print a separate online-portal date.",
      },
      {
        category: "registration",
        label: "Same-day or Election Day registration",
        text: "Check with the New York State Board of Elections. The pages read for this update do not describe same-day registration.",
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
