import type { DeadlineSource, OmittedDeadline, StateElectionDates } from "./electionDates";
import type { StateCode } from "./types";

const CHECKED = "October 19, 2026";

function gap(code: StateCode, source: string, office: string): StateElectionDates {
  const line = `${source} read on ${CHECKED} does not print this deadline. ${office} publishes the calendar.`;
  const omitted: OmittedDeadline[] = [
    { category: "registration", label: "Voter registration", text: line },
    { category: "early", label: "Early voting", text: line },
    { category: "mail-request", label: "Mail-ballot request", text: line },
    { category: "mail-return", label: "Mail-ballot return", text: line },
  ];
  return {
    code,
    checkedOn: CHECKED,
    faqAnswer: `The 2026 U.S. midterm general election is Tuesday, November 3, 2026. ${source} read on ${CHECKED} does not print registration, early-voting, or mail-ballot deadlines. ${office} publishes the current calendar.`,
    facts: [],
    omitted,
  };
}

function src(label: string, href: string): DeadlineSource {
  return { label, href };
}

const AR_CAL: DeadlineSource = src(
  "Arkansas Secretary of State — 2026 election dates (Rev. July 2026)",
  "https://www.sos.arkansas.gov/uploads/elections/2026_Election_Calendar_Rev._7-2026_.pdf",
);
const CT_GUIDE: DeadlineSource = src(
  "Connecticut Secretary of the State — 2026 voter guide",
  "https://portal.ct.gov/-/media/sots/early-voting/2026-voting-guide/2026_voter_guide-2-final-combined.pdf",
);
const DE_GEN: DeadlineSource = src(
  "Delaware Department of Elections — general election",
  "https://elections.delaware.gov/elections/general/general.html",
);
const DC_CAL: DeadlineSource = src(
  "D.C. Board of Elections — November 3, 2026 general election calendar, revised October 1, 2026",
  "https://www.dcboe.org/getContentAsset/4d04f4a1-fb2a-4f8a-809f-d3f708f232df/5ebbd046-860b-4ee1-81c8-43d0e3bc446e/2026-General-Election-Calendar-Version-09292026.pdf",
);
const HI_PROC: DeadlineSource = src(
  "Hawaii Office of Elections — 2026 proclamation",
  "https://elections.hawaii.gov/2026-proclamation/",
);
const ID_GEN: DeadlineSource = src(
  "Idaho Secretary of State — 2026 Idaho general election",
  "https://voteidaho.gov/idaho-general-election/",
);
const ID_PAMPHLET: DeadlineSource = src(
  "Idaho Secretary of State — 2026 general election voter pamphlet",
  "https://archive.voteidaho.gov/download/2026_Voter_Pamphlet.pdf",
);
const KY_HOME: DeadlineSource = src(
  "Kentucky State Board of Elections",
  "https://elect.ky.gov/Pages/default.aspx",
);
const LA_HOME: DeadlineSource = src(
  "Louisiana Secretary of State — elections and voting",
  "https://www.sos.la.gov/elections-voting",
);
const LA_FACTS: DeadlineSource = src(
  "Louisiana Secretary of State — November 3, 2026 election quick facts",
  "https://www.sos.la.gov/media/x2jfrc1e/louisiana-election-quick-facts.pdf",
);
const MT_CAL: DeadlineSource = src(
  "Montana Secretary of State — 2026 primary and general election calendar",
  "https://sosmt.gov/wp-content/uploads/wpfd/preview_files/2026-Federal-Election-Calendar(6fec86338c652319befedd4fd798de5b).pdf",
);
const NM_GUIDE: DeadlineSource = src(
  "New Mexico Secretary of State — 2026 general election voter guide",
  "https://www.sos.nm.gov/wp-content/uploads/2026/09/2026-Voter-Guide-English.pdf",
);
const ND_DATES: DeadlineSource = src(
  "North Dakota Secretary of State — current and past elections",
  "https://www.sos.nd.gov/elections/voter/elections-currentpast",
);
const OK_HOME: DeadlineSource = src(
  "Oklahoma State Election Board",
  "https://oklahoma.gov/elections.html",
);
const OK_NOTICE: DeadlineSource = src(
  "Oklahoma State Election Board — 2026 general election notice, July 24, 2026",
  "https://oklahoma.gov/elections/voters/military-overseas-voters/2026-election-notice-general-election.html",
);
const OR_PAGE: DeadlineSource = src(
  "Oregon Secretary of State — upcoming elections",
  "https://sos.oregon.gov/elections/pages/current-election.aspx",
);
const OR_HOME: DeadlineSource = src(
  "Oregon Secretary of State — elections",
  "https://sos.oregon.gov/elections/",
);
const RI_HANDBOOK: DeadlineSource = src(
  "Rhode Island Secretary of State — voter information handbook, general election November 3, 2026",
  "https://vote.sos.ri.gov/Forms/Elections/Guides/VoterRef26.pdf",
);
const SD_INFO: DeadlineSource = src(
  "South Dakota Secretary of State — 2026 election information",
  "https://sdsos.gov/elections-voting/upcoming-elections/general-information/2026%20Election%20Information/default.aspx",
);
const UT_PAGE: DeadlineSource = src(
  "Utah Lieutenant Governor — current election information",
  "https://vote.utah.gov/current-election-information/",
);
const UT_PAMPHLET: DeadlineSource = src(
  "Utah Lieutenant Governor — 2026 general election voter information pamphlet",
  "https://vote.utah.gov/wp-content/uploads/2026/09/2026-Voter-Information-Pamphlet.pdf",
);
const VT_FAQ: DeadlineSource = src(
  "Vermont Secretary of State — voter registration FAQs",
  "https://sos.vermont.gov/elections/voters/voter-faqs/voter-registration-faqs",
);
const VT_EARLY: DeadlineSource = src(
  "Vermont Secretary of State — early and absentee voting",
  "https://sos.vermont.gov/elections/voters/early-absentee-voting",
);
const VT_CAL: DeadlineSource = src(
  "Vermont Secretary of State — 2026 elections calendar",
  "https://outside.vermont.gov/dept/sos/Elections_Division/town_clerks_local_elections/election_procedure/elections_calendar.pdf",
);
const WV_DATES: DeadlineSource = src(
  "West Virginia Secretary of State — GoVoteWV",
  "https://sos.wv.gov/govotewv",
);
const WY_DATES: DeadlineSource = src(
  "Wyoming Secretary of State — 2026 key election dates",
  "https://sos.wyo.gov/Elections/Docs/2026/2026_Key_Election_Dates.pdf",
);
const WY_GUIDE: DeadlineSource = src(
  "Wyoming Secretary of State — 2026 voter guide",
  "https://sos.wyo.gov/Elections/Docs/2026/2026_Voter_Guide.pdf",
);

export const MORE_ELECTION_DATES: StateElectionDates[] = [
  gap(
    "AL",
    "The Walker County sample ballot and the August 26, 2026 amendment certification",
    "The Alabama Secretary of State",
  ),
  {
    code: "AR",
    checkedOn: "October 23, 2026",
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Arkansas Secretary of State’s 2026 election calendar (Rev. July 2026) prints October 4, 2026 as a Sunday registration deadline and states the actual deadline is Monday, October 5, 2026. It prints early voting from October 19 through 5:00 p.m. on November 2, an October 27 absentee-application deadline, and a 7:30 p.m. Election Day deadline for the county clerk to receive absentee ballots by mail, excluding military and overseas ballots. Dates can change. The Arkansas Secretary of State publishes the calendar.",
    facts: [
      {
        id: "ar-register",
        category: "registration",
        label: "Voter registration",
        text: "The calendar prints “October 4, 2026 – Sunday” as “30 DAYS PRIOR TO THE GENERAL ELECTION” and “Deadline to apply to register to vote in the General Election.” The same calendar states the actual deadline is Monday, October 5, 2026, because a deadline that falls on a Saturday, Sunday, or legal holiday advances to the next business day under Ark. Code § 7-1-108.",
        endsOn: "2026-10-05",
        sources: [AR_CAL],
      },
      {
        id: "ar-early",
        category: "early",
        label: "Early voting",
        text: "The calendar prints October 19, 2026 as the day early voting begins for the general election, between 8:00 a.m. and 6:00 p.m. Monday through Friday and 10:00 a.m. to 4:00 p.m. on Saturday. It prints that early voting ends at 5:00 p.m. on the Monday prior to the election. November 2, 2026 is printed as the last day to participate in early voting, and it says early voting closes at 5:00 p.m. that Monday.",
        startsOn: "2026-10-19",
        endsOn: "2026-11-02",
        sources: [AR_CAL],
      },
      {
        id: "ar-request",
        category: "mail-request",
        label: "Absentee application",
        text: "The calendar prints October 27, 2026 as “7 DAYS PRIOR TO THE GENERAL ELECTION” and “Deadline for county clerk to receive absentee ballot applications by mail, fax, or electronic mail for the General Election.”",
        endsOn: "2026-10-27",
        sources: [AR_CAL],
      },
      {
        id: "ar-return",
        category: "mail-return",
        label: "Absentee return",
        text: "The calendar prints 7:30 p.m. on November 3, 2026 as the deadline for the county clerk to receive absentee ballots by mail, excluding military and overseas ballots, or by physical delivery of the authorized agent of a voter who is medically unable to vote at the regular polling site. It prints a separate receipt rule for qualified electors outside the United States and active-duty uniformed personnel.",
        endsOn: "2026-11-03",
        sources: [AR_CAL],
      },
    ],
    omitted: [],
  },
  {
    code: "CT",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Connecticut Secretary of the State’s 2026 voter guide lists Friday, October 16, 2026 as the last day to register to vote online, by mail, in person, or at the Department of Motor Vehicles and vote in the general election. It lists Monday, November 2, 2026 as the final day to personally return an absentee ballot in person to the town clerk, and 8 p.m. on Election Day as the deadline for an absentee ballot submitted in a drop box or by mail.",
    facts: [
      {
        id: "ct-register",
        category: "registration",
        label: "Voter registration",
        text: "The 2026 voter guide prints Friday, October 16, 2026 as the last day for eligible individuals to register to vote online, by mail, in person, or at the Department of Motor Vehicles and vote in the general election.",
        endsOn: "2026-10-16",
        sources: [CT_GUIDE],
      },
      {
        id: "ct-return",
        category: "mail-return",
        label: "Absentee ballot return",
        text: "The guide prints Monday, November 2, 2026 as the final day to personally return an absentee ballot in person to the town clerk. For Election Day it prints that an absentee ballot must be submitted in a drop box or by mail by 8 p.m.",
        endsOn: "2026-11-03",
        sources: [CT_GUIDE],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The 2026 voter guide pages read on October 19, 2026 do not print an early-voting period. The Connecticut Secretary of the State publishes the calendar.",
      },
      {
        category: "mail-request",
        label: "Absentee application",
        text: "The 2026 voter guide pages read on October 19, 2026 do not print an absentee-application deadline. The Connecticut Secretary of the State publishes the calendar.",
      },
    ],
  },
  {
    code: "DE",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Delaware Department of Elections general-election page lists Saturday, October 10, 2026 as the deadline to register to vote if not yet registered. It lists Friday, October 30, 2026 as the last day to submit a request for a general-election absentee ballot in order for the ballot to be mailed, and 8 p.m. on Election Day, Tuesday, November 3, 2026, as the deadline for the Department of Elections to receive an absentee ballot.",
    facts: [
      {
        id: "de-register",
        category: "registration",
        label: "Voter registration",
        text: "The general-election page says the deadline to register to vote if you are not yet registered is Saturday, October 10, 2026.",
        endsOn: "2026-10-10",
        sources: [DE_GEN],
      },
      {
        id: "de-request",
        category: "mail-request",
        label: "Absentee request",
        text: "The page says the last day to submit a request for a general-election absentee ballot in order for the absentee ballot to be mailed is Friday, October 30, 2026.",
        endsOn: "2026-10-30",
        sources: [DE_GEN],
      },
      {
        id: "de-return",
        category: "mail-return",
        label: "Absentee return",
        text: "The page says absentee ballots must be received by the Department of Elections by Election Day, Tuesday, November 3, 2026, by the close of polls at 8 p.m., in order to count.",
        endsOn: "2026-11-03",
        sources: [DE_GEN],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The general-election page read on October 19, 2026 does not print an early-voting period. The Delaware Department of Elections publishes the calendar.",
      },
    ],
  },
  {
    code: "DC",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The D.C. Board of Elections calendar, revised October 1, 2026, lists Tuesday, October 13, 2026 as the deadline for receipt of voter registration applications and updates, except those submitted in person at the Board or at voter registration agencies. It lists in-person registration at Vote Centers on Election Day from 7:00 a.m. to 8:00 p.m. It lists Monday, October 19, 2026 as the deadline for receipt of ballot requests from non-UOCAVA voters, and Friday, November 13, 2026 as the deadline for receipt of mailed ballots that are postmarked on or before Election Day.",
    facts: [
      {
        id: "dc-register",
        category: "registration",
        label: "Voter registration",
        text: "The calendar prints Tuesday, October 13, 2026 as the deadline for receipt of all voter registration applications, including federal postcard applications and federal write-in absentee ballots, and updates, except those submitted in person at the Board or at voter registration agencies. It prints Election Day registration for in-person voting at Vote Centers from 7:00 a.m. to 8:00 p.m.",
        endsOn: "2026-11-03",
        sources: [DC_CAL],
      },
      {
        id: "dc-request",
        category: "mail-request",
        label: "Ballot request",
        text: "The calendar prints Monday, October 19, 2026 as the deadline for receipt of ballot requests from non-UOCAVA voters.",
        endsOn: "2026-10-19",
        sources: [DC_CAL],
      },
      {
        id: "dc-return",
        category: "mail-return",
        label: "Mailed ballot return",
        text: "The calendar prints Friday, November 13, 2026 as the deadline for receipt of all mailed ballots, and it says those ballots must be postmarked on or before Election Day.",
        endsOn: "2026-11-13",
        sources: [DC_CAL],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The revised October 1, 2026 calendar lines read on October 19, 2026 do not print a separate early-voting date range. The D.C. Board of Elections publishes the calendar.",
      },
    ],
  },
  {
    code: "HI",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Hawaii Office of Elections proclamation page lists October 26, 2026 as the date a paper voter-registration application must be submitted to the county elections division for the general election, October 27, 2026 as the deadline to request that a ballot be sent to an alternate address, and 7:00 p.m. on November 3, 2026 as the time a ballot must be received by the county elections division.",
    facts: [
      {
        id: "hi-register",
        category: "registration",
        label: "Paper voter registration",
        text: "The proclamation page says paper voter-registration applications must be submitted to the county elections division by October 26, 2026 for the general election.",
        endsOn: "2026-10-26",
        sources: [HI_PROC],
      },
      {
        id: "hi-request",
        category: "mail-request",
        label: "Alternate-address ballot request",
        text: "The proclamation page says the deadline to request that a ballot be sent to an alternate address is October 27, 2026 for the general election.",
        endsOn: "2026-10-27",
        sources: [HI_PROC],
      },
      {
        id: "hi-return",
        category: "mail-return",
        label: "Ballot return",
        text: "The proclamation page says ballots must be received by the county elections division by the close of voting, 7:00 p.m., on November 3, 2026 for the general election.",
        endsOn: "2026-11-03",
        sources: [HI_PROC],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The proclamation page lines read on October 19, 2026 do not print a separate early-voting period. The Hawaii Office of Elections publishes the calendar.",
      },
    ],
  },
  {
    code: "ID",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Idaho Secretary of State’s general-election page says voter pre-registration ends on October 23 and that a request for an absentee ballot is due by 5:00 p.m. local time on October 23. The voter pamphlet prints that absentee request deadline as Friday, October 23. Those pages do not print an absentee-ballot return deadline.",
    facts: [
      {
        id: "id-register",
        category: "registration",
        label: "Voter pre-registration",
        text: "The general-election page says voter pre-registration ends on October 23. It does not print a year next to that day. The page is the 2026 Idaho general-election page.",
        endsOn: "2026-10-23",
        sources: [ID_GEN],
      },
      {
        id: "id-request",
        category: "mail-request",
        label: "Absentee request",
        text: "The general-election page says to request an absentee ballot by 5:00 p.m. local time on October 23. The voter pamphlet says to request an absentee ballot by 5:00 p.m. local time on the deadline of Friday, October 23.",
        endsOn: "2026-10-23",
        sources: [ID_GEN, ID_PAMPHLET],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The general-election page and the voter pamphlet read on October 19, 2026 do not print an early-voting period. The Idaho Secretary of State publishes the calendar.",
      },
      {
        category: "mail-return",
        label: "Absentee return",
        text: "The general-election page and the voter pamphlet read on October 19, 2026 do not print an absentee-ballot return deadline. The Idaho Secretary of State publishes the calendar.",
      },
    ],
  },
  {
    code: "KY",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Kentucky State Board of Elections homepage lists October 5, 2026 as the last day to register to vote for the general election. It lists September 19, 2026 as the day the mail-in absentee ballot request portal opens and October 20, 2026 as the day that portal closes. It lists excused in-person absentee voting on October 21–23 and October 26–28, 2026, and in-person no-excuse absentee voting on October 29–31, 2026.",
    facts: [
      {
        id: "ky-register",
        category: "registration",
        label: "Voter registration",
        text: "The State Board of Elections homepage prints “October 5, 2026 - Last Day to Register to Vote for the General.”",
        endsOn: "2026-10-05",
        sources: [KY_HOME],
      },
      {
        id: "ky-request",
        category: "mail-request",
        label: "Mail-in absentee request portal",
        text: "The homepage prints “September 19, 2026 - Mail-in Absentee Ballot Request Portal Opens” and “October 20, 2026 - Mail-in Absentee Ballot Request Portal Closes.”",
        startsOn: "2026-09-19",
        endsOn: "2026-10-20",
        sources: [KY_HOME],
      },
      {
        id: "ky-early",
        category: "early",
        label: "In-person absentee voting",
        text: "The homepage prints October 21–23, 2026 as the start of excused in-person absentee voting, October 26–28, 2026 as the days that excused in-person absentee voting continues, and October 29–31, 2026 as in-person no-excuse absentee voting.",
        startsOn: "2026-10-21",
        endsOn: "2026-10-31",
        sources: [KY_HOME],
      },
    ],
    omitted: [
      {
        category: "mail-return",
        label: "Absentee return",
        text: "The homepage lines read on October 19, 2026 do not print a statutory absentee-ballot return deadline. The Kentucky State Board of Elections publishes the calendar.",
      },
    ],
  },
  {
    code: "LA",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Louisiana Secretary of State’s elections page lists an in-person and by-mail registration deadline of October 5, 2026 and an online registration deadline of October 13, 2026 for the November 3, 2026 election. The election quick facts list October 30 as the last day to request an absentee ballot other than for military and overseas voters, and November 2 as the last day for absentee ballots to be received by 4:30 p.m.",
    facts: [
      {
        id: "la-register",
        category: "registration",
        label: "Voter registration",
        text: "The elections page prints “In person / by mail deadline: October 5, 2026” and “Online deadline: October 13, 2026” for the November 3, 2026 election.",
        endsOn: "2026-10-13",
        sources: [LA_HOME],
      },
      {
        id: "la-request",
        category: "mail-request",
        label: "Absentee request",
        text: "The quick facts print October 30 as the last day to request an absentee ballot other than for military and overseas voters.",
        endsOn: "2026-10-30",
        sources: [LA_FACTS],
      },
      {
        id: "la-return",
        category: "mail-return",
        label: "Absentee return",
        text: "The quick facts print November 2 as the last day for absentee ballots to be received, by 4:30 p.m. They print November 3 as the last day for military, overseas, and hospitalized absentee ballots.",
        endsOn: "2026-11-03",
        sources: [LA_FACTS],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The elections page and the quick facts read on October 19, 2026 do not print an early-voting period. The Louisiana Secretary of State publishes the calendar.",
      },
    ],
  },
  gap(
    "MS",
    "The candidate qualifying list and the initiatives page",
    "The Mississippi Secretary of State",
  ),
  {
    code: "MT",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Montana Secretary of State’s 2026 election calendar prints Monday, October 5, with an asterisk, beside the close of regular voter registration, and the legend says an asterisk indicates postponement. It prints Thursday, October 8 for registration forms postmarked by October 5 and received by that date. It describes late registration through the Friday before the election, the Saturday before the election, or before noon on election day, and it does not convert those relative lines into other calendar dates. It prints Friday, October 9 as the date by which ballots are mailed to electors on the absentee list.",
    facts: [
      {
        id: "mt-register",
        category: "registration",
        label: "Voter registration",
        text: "The calendar prints “Monday, October 5*” beside “Close of regular voter registration.” The legend says an asterisk indicates postponement. It prints “Registration forms postmarked by October 5 and received by this date are accepted for regular registration” on Thursday, October 8. It says late registration for the general election runs until 5:00 p.m. on the Friday before the election, the Saturday before the election, or before noon on election day. This page does not convert those relative lines into calendar dates.",
        endsOn: "2026-10-05",
        sources: [MT_CAL],
      },
      {
        id: "mt-request",
        category: "mail-request",
        label: "Absentee ballot",
        text: "The calendar prints Friday, October 9 as the date by which ballots are mailed to electors on the absentee list. A separate line says polling-place voters wishing to obtain a one-time absentee ballot must apply before noon on the day before the election. That line does not print a calendar date.",
        sources: [MT_CAL],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The 2026 election calendar read on October 19, 2026 does not print a separate early-voting period. The Montana Secretary of State publishes the calendar.",
      },
      {
        category: "mail-return",
        label: "Absentee return",
        text: "The 2026 election calendar read on October 19, 2026 does not print an absentee-ballot return deadline. The Montana Secretary of State publishes the calendar.",
      },
    ],
  },
  gap(
    "NE",
    "The September 11, 2026 candidate list, the retention list, and the ballot-measures pamphlet",
    "The Nebraska Secretary of State",
  ),
  {
    code: "NM",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The New Mexico Secretary of State’s 2026 general-election voter guide prints “Early Voting begins Oct. 6, 2026” and “Election Day is Nov. 3, 2026.” That guide does not print a voter-registration deadline or a mail-ballot request or return deadline.",
    facts: [
      {
        id: "nm-early",
        category: "early",
        label: "Early voting",
        text: "The voter guide prints “Early Voting begins Oct. 6, 2026” and “Election Day is Nov. 3, 2026.”",
        startsOn: "2026-10-06",
        endsOn: "2026-11-03",
        sources: [NM_GUIDE],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Voter registration",
        text: "The voter guide and the January 26, 2026 proclamation read on October 19, 2026 do not print a voter-registration deadline. The New Mexico Secretary of State publishes the calendar.",
      },
      {
        category: "mail-request",
        label: "Mail-ballot request",
        text: "The voter guide and the January 26, 2026 proclamation read on October 19, 2026 do not print a mail-ballot request deadline. The New Mexico Secretary of State publishes the calendar.",
      },
      {
        category: "mail-return",
        label: "Mail-ballot return",
        text: "The voter guide and the January 26, 2026 proclamation read on October 19, 2026 do not print a mail-ballot return deadline. The New Mexico Secretary of State publishes the calendar.",
      },
    ],
  },
  {
    code: "ND",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The North Dakota Secretary of State’s current-and-past elections page lists September 24, 2026 as the day absentee voting begins, November 2, 2026 as the absentee application submission deadline, and November 3, 2026 as the day absentee ballots must be returned by the close of polls. That page does not print a voter-registration deadline.",
    facts: [
      {
        id: "nd-request",
        category: "mail-request",
        label: "Absentee application",
        text: "The page prints “September 24, 2026 - Absentee Begins” and “November 2, 2026 - Absentee Application Submission Deadline.”",
        startsOn: "2026-09-24",
        endsOn: "2026-11-02",
        sources: [ND_DATES],
      },
      {
        id: "nd-return",
        category: "mail-return",
        label: "Absentee return",
        text: "The page prints “November 3, 2026 - Absentee Ballots Must Be Returned by Close of Polls.”",
        endsOn: "2026-11-03",
        sources: [ND_DATES],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Voter registration",
        text: "The current-and-past elections page read on October 19, 2026 does not print a voter-registration deadline. The North Dakota Secretary of State publishes the calendar.",
      },
      {
        category: "early",
        label: "Early voting",
        text: "The current-and-past elections page read on October 19, 2026 does not print a separate early-voting period. It prints September 24, 2026 as the day absentee voting begins. The North Dakota Secretary of State publishes the calendar.",
      },
    ],
  },
  {
    code: "OK",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Oklahoma State Election Board homepage lists October 9, 2026 as the voter-registration deadline for the November 3 election and 5 p.m. Monday, October 19, 2026 as the absentee-ballot request deadline. The July 24, 2026 election notice prints the same two dates. Those pages do not print an absentee-ballot return deadline.",
    facts: [
      {
        id: "ok-register",
        category: "registration",
        label: "Voter registration",
        text: "The homepage lists “November 3 Elections - October 9, 2026” under voter-registration deadlines. The July 24 notice prints “Voter registration deadline: October 9, 2026.”",
        endsOn: "2026-10-09",
        sources: [OK_HOME, OK_NOTICE],
      },
      {
        id: "ok-request",
        category: "mail-request",
        label: "Absentee request",
        text: "The homepage prints “Deadline for November Elections 5 p.m. Monday October 19, 2026” under the absentee-ballot request deadline. The July 24 notice prints “Absentee ballot request deadline: 5 p.m. (CST), October 19, 2026.”",
        endsOn: "2026-10-19",
        sources: [OK_HOME, OK_NOTICE],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The homepage and the July 24 notice read on October 19, 2026 do not print an early-voting period. The Oklahoma State Election Board publishes the calendar.",
      },
      {
        category: "mail-return",
        label: "Absentee return",
        text: "The homepage and the July 24 notice read on October 19, 2026 do not print an absentee-ballot return deadline. The Oklahoma State Election Board publishes the calendar.",
      },
    ],
  },
  {
    code: "OR",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Oregon Secretary of State lists October 13, 2026 as the last day to register to vote in the general election and October 14, 2026 as the first day ballots are mailed. The upcoming-elections page says the last day to return a ballot using a drop box is November 3 at 8 p.m., and that a ballot mailed with an Election Day postmark can be received up to 7 days after Election Day and be counted.",
    facts: [
      {
        id: "or-register",
        category: "registration",
        label: "Voter registration",
        text: "The elections page prints October 13, 2026 as the last day to register to vote in the general election. The upcoming-elections page prints “Voter registration deadline: October 13.”",
        endsOn: "2026-10-13",
        sources: [OR_HOME, OR_PAGE],
      },
      {
        id: "or-mail",
        category: "mail-request",
        label: "Ballots mailed",
        text: "The elections page prints October 14, 2026 as the first day ballots are mailed to voters. The upcoming-elections page says counties begin mailing ballots to active voters in Oregon on October 14. That page does not print a separate request deadline.",
        startsOn: "2026-10-14",
        sources: [OR_HOME, OR_PAGE],
      },
      {
        id: "or-return",
        category: "mail-return",
        label: "Ballot return",
        text: "The elections page prints November 3, 2026 as the general election and the last day for voters to return ballots. The upcoming-elections page says the last day to return a ballot using a drop box is November 3 at 8 p.m. It says a ballot that is mailed must be postmarked by Election Day and can be received by the local elections office up to 7 days after Election Day and be counted.",
        endsOn: "2026-11-03",
        sources: [OR_HOME, OR_PAGE],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The elections page and the upcoming-elections page read on October 19, 2026 do not print a separate early-voting period. The Oregon Secretary of State publishes the calendar.",
      },
    ],
  },
  {
    code: "RI",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Rhode Island voter-information handbook says a mail-ballot application is due by Tuesday, October 13, must be postmarked by October 13 at 4 p.m., and must be received within three days of that deadline. It says a mail ballot must be received by the State Board of Elections or deposited in a secure mail-ballot drop box by 8 p.m. on Election Day, November 3. The Board’s date table marks a registration deadline of 10/4/26 with an asterisk the page also uses for an unofficial proposed schedule, so that registration date is not listed as a confirmed deadline.",
    facts: [
      {
        id: "ri-request",
        category: "mail-request",
        label: "Mail-ballot application",
        text: "The handbook says a mail-ballot application is due by Tuesday, October 13. It says applications must be postmarked by October 13 at 4 p.m. and received within three days of that deadline.",
        endsOn: "2026-10-13",
        sources: [RI_HANDBOOK],
      },
      {
        id: "ri-return",
        category: "mail-return",
        label: "Mail-ballot return",
        text: "The handbook says a mail ballot must be received by the State Board of Elections or deposited in a secure mail-ballot drop box by 8 p.m. on Election Day, November 3.",
        endsOn: "2026-11-03",
        sources: [RI_HANDBOOK],
      },
    ],
    omitted: [
      {
        category: "registration",
        label: "Voter registration",
        text: "The Board of Elections date table prints 10/4/26 and attaches an asterisk. The same page uses an asterisk for “unofficial proposed schedule” and for a different emergency-ballot footnote. Because those footnotes do not identify which date is unofficial, the October 4 date is not listed as a confirmed deadline. The Rhode Island Board of Elections and the Secretary of State publish the calendar.",
      },
      {
        category: "early",
        label: "Early voting",
        text: "The Board’s date table prints an early-voting start of 10/14/26 under the same asterisk. That date is not listed as a confirmed early-voting period. The Rhode Island Board of Elections publishes the calendar.",
      },
    ],
  },
  {
    code: "SD",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The South Dakota Secretary of State’s 2026 election-information page lists the voter-registration deadline as October 19, 2026 and the start of absentee voting as September 18, 2026. That page does not print an absentee request deadline or a return deadline.",
    facts: [
      {
        id: "sd-register",
        category: "registration",
        label: "Voter registration",
        text: "The 2026 election-information page prints “Voter Registration Deadline: October 19, 2026.”",
        endsOn: "2026-10-19",
        sources: [SD_INFO],
      },
      {
        id: "sd-absentee",
        category: "early",
        label: "Absentee voting begins",
        text: "The 2026 election-information page prints “Absentee Voting Begins: September 18, 2026.” It does not print statewide hours.",
        startsOn: "2026-09-18",
        sources: [SD_INFO],
      },
    ],
    omitted: [
      {
        category: "mail-request",
        label: "Absentee request",
        text: "The 2026 election-information page read on October 19, 2026 does not print an absentee-ballot request deadline. The South Dakota Secretary of State publishes the calendar.",
      },
      {
        category: "mail-return",
        label: "Absentee return",
        text: "The 2026 election-information page read on October 19, 2026 does not print an absentee-ballot return deadline. The South Dakota Secretary of State publishes the calendar.",
      },
    ],
  },
  {
    code: "UT",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Utah voter-information pamphlet lists registration by mail received by 5:00 p.m. October 23, online registration by 5:00 p.m. October 23, and in-person registration by 8:00 p.m. November 3. It says ballots begin being mailed October 13 and that a ballot is counted only if it is received by November 3. The current-election page prints a ballot-request deadline of October 27, 2026 by 5 p.m.",
    facts: [
      {
        id: "ut-register",
        category: "registration",
        label: "Voter registration",
        text: "The pamphlet prints “Register by mail, received by: 5:00 p.m. October 23,” “Register online by: 5:00 p.m. October 23,” and “Register in person by: 8:00 p.m. November 3.” The current-election page prints “Registration Deadline October 23, 2026 by 5pm.”",
        endsOn: "2026-11-03",
        sources: [UT_PAMPHLET, UT_PAGE],
      },
      {
        id: "ut-request",
        category: "mail-request",
        label: "Ballot request",
        text: "The pamphlet prints “Ballots begin being mailed: October 13.” The current-election page prints “Ballots Mailed October 13, 2026” and “Request Ballot By October 27, 2026 by 5pm.”",
        endsOn: "2026-10-27",
        sources: [UT_PAMPHLET, UT_PAGE],
      },
      {
        id: "ut-return",
        category: "mail-return",
        label: "Ballot return",
        text: "The pamphlet says a ballot will be counted only if it is received by November 3, and that ballots received after November 3 will not be counted, regardless of when they are postmarked. It also says all ballots must be received by 8:00 p.m. on Election Day.",
        endsOn: "2026-11-03",
        sources: [UT_PAMPHLET],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The pamphlet and the current-election page read on October 19, 2026 do not print a separate early-voting period. The Utah Lieutenant Governor publishes the calendar.",
      },
    ],
  },
  {
    code: "VT",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Vermont Secretary of State’s registration FAQ says eligible persons may register to vote on any day up to and including the day of the election. The 2026 elections calendar prints November 2 as the last day to request an early or absentee ballot, until 5:00 p.m. or the closing of the town clerk’s office. The early-voting page says a ballot may be returned to the town clerk before the office closes on the day before the election, or brought to the polling place before 7 p.m. on Election Day.",
    facts: [
      {
        id: "vt-register",
        category: "registration",
        label: "Voter registration",
        text: "The registration FAQ says that, beginning January 1, 2017, eligible persons may register to vote on any day up to and including the day of the election. It does not print a calendar cutoff before November 3, 2026.",
        endsOn: "2026-11-03",
        sources: [VT_FAQ],
      },
      {
        id: "vt-request",
        category: "mail-request",
        label: "Early or absentee request",
        text: "The elections calendar prints November 2 as the last day to request an early or absentee ballot, until 5:00 p.m. or the closing of the town clerk’s office. The early-voting page says all requests for absentee ballots must be submitted by 5 p.m. or by the close of the town clerk’s office on the day before the election. The elections-information page says Vermont automatically mails ballots to all qualified voters by October 1 of each even-numbered year, and the calendar says that mailing must be completed by October 1.",
        endsOn: "2026-11-02",
        sources: [VT_CAL, VT_EARLY],
      },
      {
        id: "vt-return",
        category: "mail-return",
        label: "Ballot return",
        text: "The early-voting page says to return a ballot to the town clerk’s office before the office closes on the day before the election, or to bring it to the polling place before 7 p.m. on Election Day. The elections calendar prints November 3 as general election day and says polls close at 7:00 p.m.",
        endsOn: "2026-11-03",
        sources: [VT_EARLY, VT_CAL],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Statewide early-voting hours",
        text: "The early-voting page and the elections calendar read on October 19, 2026 do not print one set of statewide early-voting hours. The Vermont Secretary of State publishes the calendar.",
      },
    ],
  },
  {
    code: "WV",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. GoVoteWV lists October 13, 2026 as the voter-registration deadline, October 21 through October 31, 2026 as early voting in person, and August 11 through October 28, 2026 as the absentee application period. It lists October 28, 2026 as the deadline for absentee ballot applications, October 27 through noon on November 3, 2026 as emergency absentee voting, November 2, 2026 as the deadline to hand-deliver an absentee ballot to the clerk’s office, November 4, 2026 as the day absentee ballots without a postmark are accepted, and November 9, 2026 as the day absentee ballots postmarked by Election Day are accepted.",
    facts: [
      {
        id: "wv-register",
        category: "registration",
        label: "Voter registration",
        text: "GoVoteWV prints “October 13, 2026 — Voter Registration Deadline.”",
        endsOn: "2026-10-13",
        sources: [WV_DATES],
      },
      {
        id: "wv-request",
        category: "mail-request",
        label: "Absentee application",
        text: "GoVoteWV prints “August 11 – October 28, 2026 — Absentee Application Period,” “September 18, 2026 — County Clerks begin mailing absentee ballots,” “October 28, 2026 — Deadline for Absentee Ballot Applications,” and “October 27 – Noon, November 3, 2026 — Emergency Absentee Voting.”",
        startsOn: "2026-08-11",
        endsOn: "2026-10-28",
        sources: [WV_DATES],
      },
      {
        id: "wv-return",
        category: "mail-return",
        label: "Absentee return",
        text: "GoVoteWV prints “November 2, 2026 — Deadline to Hand-Deliver Absentee Ballot to the Clerk's Office,” “November 4, 2026 — Absentee Ballots without Postmark Accepted,” and “November 9, 2026 — Absentee Ballots Postmarked by Election Day Accepted.”",
        endsOn: "2026-11-09",
        sources: [WV_DATES],
      },
      {
        id: "wv-early",
        category: "early",
        label: "Early voting",
        text: "GoVoteWV prints “October 21 – October 31, 2026 — Early Voting in Person” and “October 31, 2026 — Deadline for Early Voting in Person.” It also prints that early voting must be conducted between 9 a.m. and 5 p.m. on the last 2 Saturdays before the general election.",
        startsOn: "2026-10-21",
        endsOn: "2026-10-31",
        sources: [WV_DATES],
      },
    ],
    omitted: [],
  },
  {
    code: "WY",
    checkedOn: CHECKED,
    faqAnswer:
      "The 2026 U.S. midterm general election is Tuesday, November 3, 2026. The Wyoming Secretary of State’s 2026 key-election-dates sheet lists October 19, 2026 as the day voter registration closes for the general election, and October 20 through November 2, 2026 as days a voter may still register in person and cast an absentee ballot. It lists October 6 through November 2, 2026 for general-election absentee voting. The voter guide says a ballot is returned to the county clerk’s office by 7 p.m. on Election Day.",
    facts: [
      {
        id: "wy-register",
        category: "registration",
        label: "Voter registration",
        text: "The key-dates sheet prints “Voter Registration Closes: General … October 19, 2026.” It also prints that voters may still register in person and cast an absentee ballot October 20 through November 2, 2026.",
        endsOn: "2026-11-02",
        sources: [WY_DATES],
      },
      {
        id: "wy-request",
        category: "mail-request",
        label: "Absentee request",
        text: "The key-dates sheet prints general-election absentee voting as October 6 through November 2, 2026, and UOCAVA absentee voting as September 18 through November 2, 2026. It says absentee ballots may be requested at any time in 2026 prior to the day of an election.",
        startsOn: "2026-10-06",
        endsOn: "2026-11-02",
        sources: [WY_DATES],
      },
      {
        id: "wy-return",
        category: "mail-return",
        label: "Absentee return",
        text: "The voter guide says a ballot is returned to the county clerk’s office by 7 p.m. on Election Day.",
        endsOn: "2026-11-03",
        sources: [WY_GUIDE],
      },
    ],
    omitted: [
      {
        category: "early",
        label: "Early voting",
        text: "The key-dates sheet and the voter guide read on October 19, 2026 do not print a separate early-voting period apart from the absentee dates above. The Wyoming Secretary of State publishes the calendar.",
      },
    ],
  },
];
