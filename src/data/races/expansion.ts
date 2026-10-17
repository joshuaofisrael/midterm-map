import type { Candidate, OfficialSource, RaceGuide } from "../types";
import { cite } from "../sources";
import {
  governorOfficeExplainer,
  person,
  senateOfficeExplainer,
  standardFaqs,
} from "./helpers";

const ACCESSED = "October 15, 2026";

const MN_CANDIDATE_FILE = "https://electionresultsfiles.sos.mn.gov/20261103/cand.txt";
const MN_SAMPLE =
  "https://myballotmn.sos.mn.gov/results?id=239074";
const MN_RESULTS = "https://electionresults.sos.mn.gov/";
const MN_RESULTS_INDEX = "https://www.sos.mn.gov/elections-voting/election-results/";
const MN_WHATS_ON = "https://www.sos.mn.gov/elections-voting/whats-on-my-ballot/";
const CLASS_II = "https://www.senate.gov/senators/Class_II.htm";

const ME_LIST =
  "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/2026%20General%20Candidate%20List%20-%20FINAL.xlsx";
const ME_WITHDRAWALS =
  "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/2026%20Post%20Primary%20Withdrawals%20%26%20Replacement%20Candidates%20-%20Updated%209.22.26_0.pdf";
const ME_WRITEINS =
  "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/Nov26%20Declared%20Write%20in%20List.pdf";
const ME_SAMPLE = "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/sample%202.pdf";
const ME_UPCOMING = "https://www.maine.gov/sos/elections-voting/upcoming-elections";
const ME_RESULTS = "https://www.maine.gov/sos/elections-voting/election-results-data";
const ME_RCV_NEWS =
  "https://www.maine.gov/sos/news/general-election-two-months-away-secretary-states-office-provides-update-maine-election-1";
const ME_GUIDE =
  "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/2026%20Candidates%20Guide%20to%20Ballot%20Access%20Final.pdf";

const IA_LIST =
  "https://sos.iowa.gov/sites/default/files/2026-08/2026%20General%20-%20Candidate%20List%20Database%20-%20All%20Elections_1.pdf";
const IA_GENERAL = "https://sos.iowa.gov/general-election";
const IA_RESULTS = "https://electionresults.iowa.gov/IA/";

const AK_LIST = "https://www.elections.alaska.gov/candidates/?election=26genr";
const AK_RESULTS = "https://www.elections.alaska.gov/election-results/";
const AK_INFO = "https://www.elections.alaska.gov/election-information/";

const KS_ACCESSED = "October 17, 2026";
const KS_LIST = "https://sos.ks.gov/elections/elections_upcoming_candidate.aspx";
const KS_OFFICES = "https://sos.ks.gov/elections/candidate-information.html";
const KS_RESULTS = "https://sos.ks.gov/elections/election-results.html";

const mnFile = cite(
  "Minnesota Secretary of State, candidate file for the November 3, 2026 election (cand.txt)",
  MN_CANDIDATE_FILE,
  ACCESSED,
);
const mnSample = cite(
  "Minnesota Voting Information Portal, sample ballot for the November 3, 2026 state general election",
  MN_SAMPLE,
  ACCESSED,
);
const classIi = cite(
  "U.S. Senate, Class II — terms expiring in 2027",
  CLASS_II,
  ACCESSED,
);
const meList = cite(
  "Maine Secretary of State, 2026 general election candidate list (Excel, posted July 27, 2026, 5:00 p.m.)",
  ME_LIST,
  ACCESSED,
  "July 27, 2026",
);
const meWithdrawals = cite(
  "Maine Secretary of State, candidate withdrawals and replacement nominations, updated September 22, 2026",
  ME_WITHDRAWALS,
  ACCESSED,
  "September 22, 2026",
);
const meUpcoming = cite(
  "Maine Secretary of State, upcoming elections",
  ME_UPCOMING,
  ACCESSED,
);
const meSample = cite(
  "Maine Secretary of State, official sample ballot, general election, November 3, 2026",
  ME_SAMPLE,
  ACCESSED,
);
const meGuide = cite(
  "Maine Secretary of State, 2026 candidate’s guide to ballot access",
  ME_GUIDE,
  ACCESSED,
);
const meNews = cite(
  "Maine Secretary of State, general-election process update",
  ME_RCV_NEWS,
  ACCESSED,
);
const iaList = cite(
  "Iowa Secretary of State, candidate list, November 3, 2026 general election (PDF linked from the general-election page; last updated August 19, 2026, 1:36 p.m.)",
  IA_LIST,
  ACCESSED,
  "August 19, 2026",
);
const iaGeneral = cite(
  "Iowa Secretary of State, November 3, 2026 general election",
  IA_GENERAL,
  ACCESSED,
);
const akList = cite(
  "Alaska Division of Elections, 2026 general election candidate list (page last updated September 25, 2026)",
  AK_LIST,
  ACCESSED,
  "September 25, 2026",
);
const akInfo = cite(
  "Alaska Division of Elections, election information, including ranked-choice voting",
  AK_INFO,
  ACCESSED,
);
const ksList = cite(
  "Kansas Secretary of State, candidate list, 2026 General selection (national and state offices)",
  KS_LIST,
  KS_ACCESSED,
);
const ksOffices = cite(
  "Kansas Secretary of State, offices to be elected or retained in 2026",
  KS_OFFICES,
  KS_ACCESSED,
);
const ksResults = cite(
  "Kansas Secretary of State, election results",
  KS_RESULTS,
  KS_ACCESSED,
);
const ksClassIi = cite(
  "U.S. Senate, Class II — terms expiring in 2027",
  CLASS_II,
  KS_ACCESSED,
);

const candidatesIntro =
  "Names below are the candidates on the official general-election list cited on this page, in that list’s order. Party labels are the labels on that list. This is not an endorsement, not a vote total, and not a call of the race.";

const linkBoxTitle = "Official candidate list and results";

function listed(
  input: Omit<Candidate, "links" | "sources"> & { links?: Candidate["links"]; sources?: Candidate["sources"] },
): Candidate {
  return person(input);
}

function shellFields(
  officialResults: OfficialSource,
  countingNote: string,
  countingSource: OfficialSource,
): Pick<RaceGuide, "officialResults" | "countingNote" | "countingSource" | "resultsShellLinked" | "linkBoxTitle" | "candidatesIntro"> {
  return {
    officialResults,
    countingNote,
    countingSource,
    resultsShellLinked: true,
    linkBoxTitle,
    candidatesIntro,
  };
}

const noCallFaq = {
  question: "Does this page call a winner?",
  answer:
    "No. Map the Midterms does not call races and does not show vote totals on this page. Any later returns are unofficial until the election authority certifies the contest.",
};

export const EXPANSION_SENATE_RACES: RaceGuide[] = [
  {
    slug: "mn-senate-2026",
    state: "MN",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Minnesota U.S. Senate — 2026 (Class 2)",
    shortTitle: "MN Senate",
    featured: false,
    incumbentNote:
      "The U.S. Senate Class II page lists Tina Smith (D-MN) as a senator whose term expires in 2027. That name is not in the Secretary of State candidate file for U.S. Senator at the November 3, 2026 election.",
    overview:
      "Minnesota’s Class 2 U.S. Senate seat is on the November 3, 2026 ballot. The Secretary of State candidate file for that election lists four candidates. This page does not show vote totals and does not call the race.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "The Class II page places this seat among terms that expire in 2027. Names below are the names in the state’s November 3, 2026 candidate file. Minnesota election authorities certify the contest. This site does not.",
    howToRead:
      "Order follows the candidate file. Party words are the words printed for those same names on a Minnesota Voting Information Portal sample ballot for the November 3, 2026 state general election. A write-in line on that sample ballot is not listed here as a named candidate. The file order is not a ranking.",
    candidates: [
      listed({
        name: "Marisa Simonetti",
        party: "IND",
        partyLabel: "Independent",
        bio: "The November 3, 2026 candidate file lists Marisa Simonetti for U.S. Senator with party code IND. The Voting Information Portal sample ballot prints that party as Independent.",
        links: [{ label: "Candidate file", href: MN_CANDIDATE_FILE }],
        sources: [mnFile, mnSample],
      }),
      listed({
        name: "Rebecca Whiting",
        party: "LIB",
        partyLabel: "Libertarian",
        bio: "The November 3, 2026 candidate file lists Rebecca Whiting for U.S. Senator with party code LIB. The Voting Information Portal sample ballot prints that party as Libertarian.",
        links: [{ label: "Candidate file", href: MN_CANDIDATE_FILE }],
        sources: [mnFile, mnSample],
      }),
      listed({
        name: "Peggy Flanagan",
        party: "DEM",
        partyLabel: "Democratic-Farmer-Labor",
        bio: "The November 3, 2026 candidate file lists Peggy Flanagan for U.S. Senator with party code DFL. The Voting Information Portal sample ballot prints that party as Democratic-Farmer-Labor.",
        links: [{ label: "Candidate file", href: MN_CANDIDATE_FILE }],
        sources: [mnFile, mnSample],
      }),
      listed({
        name: "Michele Tafoya",
        party: "REP",
        partyLabel: "Republican",
        bio: "The November 3, 2026 candidate file lists Michele Tafoya for U.S. Senator with party code R. The Voting Information Portal sample ballot prints that party as Republican.",
        links: [{ label: "Candidate file", href: MN_CANDIDATE_FILE }],
        sources: [mnFile, mnSample],
      }),
    ],
    ratings: [],
    sources: [
      mnFile,
      mnSample,
      classIi,
      cite("Minnesota Secretary of State, election results", MN_RESULTS, ACCESSED),
      cite("Minnesota Secretary of State, election results index", MN_RESULTS_INDEX, ACCESSED),
    ],
    aggregatorLinks: [
      { label: "Candidate file for November 3, 2026", href: MN_CANDIDATE_FILE },
      { label: "Election results", href: MN_RESULTS },
      { label: "Election results index", href: MN_RESULTS_INDEX },
    ],
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    ballotNomineeNote:
      "Names on the MN Senate race guide are the U.S. Senator rows in the Secretary of State candidate file for the November 3, 2026 election. That file is not a vote total. The official sample ballot for an address is the ballot.",
    faqs: [
      ...standardFaqs("this Senate race", "the Minnesota Secretary of State"),
      noCallFaq,
    ],
    ...shellFields(
      { label: "Minnesota Secretary of State — election results", href: MN_RESULTS },
      "The Secretary of State election-results system is the official returns site. This page does not call the race. Any numbers that appear later are unofficial until Minnesota election authorities certify the contest.",
      { label: "Minnesota Secretary of State — election results", href: MN_RESULTS },
    ),
  },
  {
    slug: "me-senate-2026",
    state: "ME",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Maine U.S. Senate — 2026 (Class 2)",
    shortTitle: "ME Senate",
    featured: false,
    incumbentNote:
      "The U.S. Senate Class II page lists Collins, Susan M. (R-ME), as a senator whose term expires in 2027. The general-election candidate list names Susan M. Collins.",
    overview:
      "Maine’s Class 2 U.S. Senate seat is on the November 3, 2026 ballot. The Secretary of State’s general-election candidate list names Susan M. Collins and Troy D. Jackson. The upcoming-elections page says ranked-choice voting is used in the general election for federal offices only.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "The Class II page places this seat among terms that expire in 2027. A Secretary of State update says this U.S. Senate race will be conducted by ranked choice because declared write-in candidates filed. This site does not tabulate rankings and does not call the race.",
    howToRead:
      "Printed names and order follow the general-election candidate list posted July 27, 2026. Party words Republican and Democratic are the words on the Secretary of State’s official sample ballot for this contest. The September 22, 2026 withdrawals list records Graham C. Platner as withdrawn from this office and Troy D. Jackson as the replacement; the general-election list names Jackson, not Platner. A separate declared write-in list is posted by the Secretary of State. Those write-in names are not repeated here. The official sample ballot shows a write-in line.",
    candidates: [
      listed({
        name: "Susan M. Collins",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "The general-election candidate list names Susan M. Collins for U.S. Senator with party code R. The official sample ballot prints Republican. The Class II page lists Collins, Susan M. (R-ME).",
        links: [{ label: "General-election candidate list", href: ME_LIST }],
        sources: [meList, meSample, classIi],
      }),
      listed({
        name: "Troy D. Jackson",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote:
          "The September 22, 2026 withdrawals list records Graham C. Platner as withdrawn and Troy D. Jackson as the replacement candidate.",
        bio: "The general-election candidate list names Troy D. Jackson for U.S. Senator with party code D. The official sample ballot prints Democratic.",
        links: [
          { label: "General-election candidate list", href: ME_LIST },
          { label: "Withdrawals and replacements", href: ME_WITHDRAWALS },
        ],
        sources: [meList, meWithdrawals, meSample],
      }),
    ],
    ratings: [],
    sources: [
      meList,
      meWithdrawals,
      meSample,
      meUpcoming,
      meNews,
      cite("Maine Secretary of State, declared write-in candidates, November 3, 2026", ME_WRITEINS, ACCESSED, "August 25, 2026"),
      classIi,
      cite("Maine Secretary of State, election results and data", ME_RESULTS, ACCESSED),
    ],
    aggregatorLinks: [
      { label: "2026 general election candidate list", href: ME_LIST },
      { label: "Withdrawals and replacement nominations", href: ME_WITHDRAWALS },
      { label: "Declared write-in candidates", href: ME_WRITEINS },
      { label: "Election results and ranked-choice tabulations", href: ME_RESULTS },
      { label: "Upcoming elections, including the ranked-choice note", href: ME_UPCOMING },
    ],
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    ballotNomineeNote:
      "Names on the ME Senate race guide are the U.S. Senator rows on the Secretary of State’s general-election candidate list. Declared write-in names are on a separate Secretary of State list and are not repeated on that guide. The list is not a vote total.",
    faqs: [
      ...standardFaqs("this Senate race", "the Maine Secretary of State"),
      {
        question: "Is this contest counted by ranked-choice voting?",
        answer:
          "The Secretary of State’s upcoming-elections page says ranked-choice voting is used in the general election for federal offices only. A Secretary of State update says the U.S. Senate race will be conducted by ranked choice because declared write-in candidates filed. Tabulations, when the office posts them, are on the election-results page. This site does not run that count.",
      },
      noCallFaq,
    ],
    ...shellFields(
      { label: "Maine Secretary of State — election results and data", href: ME_RESULTS },
      "The upcoming-elections page says ranked-choice voting is used in the general election for federal offices only. A Secretary of State update says this U.S. Senate race will be conducted by ranked choice because declared write-in candidates filed. Ranked-choice tabulations, when posted, are on the election-results page. This page does not call the race.",
      { label: "Maine Secretary of State — upcoming elections", href: ME_UPCOMING },
    ),
  },
  {
    slug: "ia-senate-2026",
    state: "IA",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Iowa U.S. Senate — 2026 (Class 2)",
    shortTitle: "IA Senate",
    featured: false,
    incumbentNote:
      "The U.S. Senate Class II page lists Ernst, Joni (R-IA), as a senator whose term expires in 2027. That name is not on the Secretary of State general-election candidate list for United States Senator.",
    overview:
      "Iowa’s Class 2 U.S. Senate seat is on the November 3, 2026 ballot. The Secretary of State general-election candidate list, last updated August 19, 2026, names three candidates for United States Senator. This page does not show vote totals and does not call the race.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "The Secretary of State’s general-election page lists U.S. Senator among the offices on the November 3, 2026 ballot. The Class II page places this seat among terms that expire in 2027. Iowa election authorities certify the contest. This site does not.",
    howToRead:
      "Names, parties, and order follow the candidate-list PDF linked from the Secretary of State’s general-election page. That PDF says it was last updated August 19, 2026, at 1:36 p.m., the same deadline the PDF gives for filling ballot vacancies after the primary. This page does not reprint addresses, phone numbers, or email addresses from the list.",
    candidates: [
      listed({
        name: "Ashley Hinson",
        party: "REP",
        partyLabel: "Republican",
        bio: "The general-election candidate list names Ashley Hinson for United States Senator with the party Republican.",
        links: [{ label: "General-election candidate list", href: IA_LIST }],
        sources: [iaList],
      }),
      listed({
        name: "Josh Turek",
        party: "DEM",
        partyLabel: "Democratic",
        bio: "The general-election candidate list names Josh Turek for United States Senator with the party Democratic.",
        links: [{ label: "General-election candidate list", href: IA_LIST }],
        sources: [iaList],
      }),
      listed({
        name: "Thomas Laehn",
        party: "LIB",
        partyLabel: "Libertarian",
        bio: "The general-election candidate list names Thomas Laehn for United States Senator with the party Libertarian.",
        links: [{ label: "General-election candidate list", href: IA_LIST }],
        sources: [iaList],
      }),
    ],
    ratings: [],
    sources: [
      iaList,
      iaGeneral,
      classIi,
      cite("Iowa Secretary of State, election results", IA_RESULTS, ACCESSED),
    ],
    aggregatorLinks: [
      { label: "November 3, 2026 general-election candidate list", href: IA_LIST },
      { label: "General election page", href: IA_GENERAL },
      { label: "Election results", href: IA_RESULTS },
    ],
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    ballotNomineeNote:
      "Names on the IA Senate race guide are the United States Senator rows on the Secretary of State general-election candidate list last updated August 19, 2026. That list is not a vote total.",
    faqs: [
      ...standardFaqs("this Senate race", "the Iowa Secretary of State"),
      noCallFaq,
    ],
    ...shellFields(
      { label: "Iowa Secretary of State — election results", href: IA_RESULTS },
      "The general-election page links the state’s election-results site. This page does not call the race. Returns, when shown anywhere later, stay unofficial until Iowa election authorities certify the contest.",
      { label: "Iowa Secretary of State — November 3, 2026 general election", href: IA_GENERAL },
    ),
  },
  {
    slug: "ak-senate-2026",
    state: "AK",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Alaska U.S. Senate — 2026 (Class 2)",
    shortTitle: "AK Senate",
    featured: false,
    incumbentNote:
      "The Division of Elections candidate list marks Dan S. Sullivan Incumbent. The same list also names Daniel J. Sullivan Jr. as a separate certified candidate. The Class II page lists Sullivan, Dan (R-AK).",
    overview:
      "Alaska’s Class 2 U.S. Senate seat is on the November 3, 2026 ballot. The Division of Elections general-election candidate list, page last updated September 25, 2026, names six certified candidates, including filings marked Certified Write-In. The Division says this office is conducted by ranked-choice voting.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "The Class II page places this seat among terms that expire in 2027. The Division says results are unofficial until the State Review Board certifies the election. This site does not run a ranked-choice count and does not call the race.",
    howToRead:
      "Names and order follow the general-election candidate list. Party labels are the registration words on that list. Filings the list marks Certified Write-In are included and labeled that way. The list’s order is not a ranking. The page says updates are posted as they are processed, and it lists a candidate withdrawal deadline of 5:00 p.m. Monday, August 31, 2026.",
    candidates: [
      listed({
        name: "Gerald L. Heikes",
        party: "REP",
        partyLabel: "Registered Republican",
        bio: "The general-election candidate list names Gerald L. Heikes for United States Senator, Registered Republican, and marks the filing Certified.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
      listed({
        name: "Sidney “Sid” Hill",
        party: "OTH",
        partyLabel: "Undeclared",
        statusNote: "The candidate list marks this filing Certified Write-In.",
        bio: "The general-election candidate list names Sidney “Sid” Hill for United States Senator, Undeclared, and marks the filing Certified Write-In.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
      listed({
        name: "Heather McElwain",
        party: "LIB",
        partyLabel: "Registered Libertarian",
        statusNote: "The candidate list marks this filing Certified Write-In.",
        bio: "The general-election candidate list names Heather McElwain for United States Senator, Registered Libertarian, and marks the filing Certified Write-In.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
      listed({
        name: "Mary Peltola",
        party: "DEM",
        partyLabel: "Registered Democrat",
        bio: "The general-election candidate list names Mary Peltola for United States Senator, Registered Democrat, and marks the filing Certified.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
      listed({
        name: "Dan S. Sullivan",
        party: "REP",
        partyLabel: "Registered Republican",
        incumbent: true,
        statusNote: "The candidate list marks this row Incumbent. It is a different row from Daniel J. Sullivan Jr.",
        bio: "The general-election candidate list names Dan S. Sullivan for United States Senator, Registered Republican, and marks the filing Certified and Incumbent.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList, classIi],
      }),
      listed({
        name: "Daniel J. Sullivan Jr.",
        party: "REP",
        partyLabel: "Registered Republican",
        statusNote: "A separate row from Dan S. Sullivan, whom the same list marks Incumbent.",
        bio: "The general-election candidate list names Daniel J. Sullivan Jr. for United States Senator, Registered Republican, and marks the filing Certified.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
    ],
    ratings: [],
    sources: [
      akList,
      akInfo,
      classIi,
      cite("Alaska Division of Elections, election results", AK_RESULTS, ACCESSED),
    ],
    aggregatorLinks: [
      { label: "2026 general election candidate list", href: AK_LIST },
      { label: "Election information, including ranked-choice voting", href: AK_INFO },
      { label: "Election results", href: AK_RESULTS },
    ],
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    ballotNomineeNote:
      "Names on the AK Senate race guide are the United States Senator rows on the Division of Elections general-election candidate list, including filings that list marks Certified Write-In. That list is not a vote total.",
    faqs: [
      ...standardFaqs("this Senate race", "the Alaska Division of Elections"),
      {
        question: "Is this contest counted by ranked-choice voting?",
        answer:
          "The Division of Elections says general elections for U.S. Senator are conducted by ranked-choice voting, and that results are unofficial until the State Review Board certifies the election. Tabulation reports are posted on the Division’s election-results page. This site does not run that count and does not give voting instructions.",
      },
      noCallFaq,
    ],
    ...shellFields(
      { label: "Alaska Division of Elections — election results", href: AK_RESULTS },
      "The Division of Elections says general elections for U.S. Senator are conducted by ranked-choice voting. It says results are unofficial until the State Review Board certifies the election. Ranked-choice tabulation reports are posted on the Division’s election-results page. This page does not call the race.",
      { label: "Alaska Division of Elections — election information", href: AK_INFO },
    ),
  },
  {
    slug: "ks-senate-2026",
    state: "KS",
    chamber: "senate",
    office: "U.S. Senate",
    title: "Kansas U.S. Senate — 2026 (Class 2)",
    shortTitle: "KS Senate",
    featured: false,
    incumbentNote:
      "The U.S. Senate Class II page lists Marshall, Roger (R-KS), as a senator whose term expires in 2027. The Secretary of State 2026 General candidate list names Roger Marshall for United States Senate.",
    overview:
      "Kansas’s Class 2 U.S. Senate seat is on the November 3, 2026 ballot. The Secretary of State candidate list, 2026 General selection, names Adam Hamilton, Roger Marshall, and David C Graham for United States Senate. This page does not show vote totals and does not call the race.",
    officeExplainer: senateOfficeExplainer,
    whyItMatters:
      "The Secretary of State’s candidate-information page lists 1 U.S. Senator among the offices to be elected or retained in 2026. The Class II page places this seat among terms that expire in 2027. Kansas election authorities certify the contest. This site does not.",
    howToRead:
      "Names, parties, and order follow the 2026 General table on the Secretary of State candidate-list page. That page says the table is updated automatically as each candidate files a valid petition or declaration of intention. This page does not reprint addresses, phone numbers, email addresses, or cities from the table. The table order is not a ranking.",
    candidates: [
      listed({
        name: "Adam Hamilton",
        party: "DEM",
        partyLabel: "Democratic",
        bio: "The 2026 General candidate list names Adam Hamilton for United States Senate with the party Democratic.",
        links: [{ label: "Candidate list, 2026 General", href: KS_LIST }],
        sources: [ksList],
      }),
      listed({
        name: "Roger Marshall",
        party: "REP",
        partyLabel: "Republican",
        incumbent: true,
        bio: "The 2026 General candidate list names Roger Marshall for United States Senate with the party Republican. The Class II page lists Marshall, Roger (R-KS).",
        links: [{ label: "Candidate list, 2026 General", href: KS_LIST }],
        sources: [ksList, ksClassIi],
      }),
      listed({
        name: "David C Graham",
        party: "LIB",
        partyLabel: "Libertarian",
        bio: "The 2026 General candidate list names David C Graham for United States Senate with the party Libertarian.",
        links: [{ label: "Candidate list, 2026 General", href: KS_LIST }],
        sources: [ksList],
      }),
    ],
    ratings: [],
    sources: [ksList, ksOffices, ksClassIi, ksResults],
    aggregatorLinks: [
      { label: "Candidate list, 2026 General", href: KS_LIST },
      { label: "Offices to be elected or retained in 2026", href: KS_OFFICES },
      { label: "Election results", href: KS_RESULTS },
    ],
    relatedPollSlugs: [],
    ballotSections: ["federal"],
    ballotNomineeNote:
      "Names on the KS Senate race guide are the United States Senate rows on the Secretary of State candidate list, 2026 General selection, read October 17, 2026. That list is not a vote total.",
    faqs: [
      ...standardFaqs("this Senate race", "the Kansas Secretary of State"),
      noCallFaq,
    ],
    ...shellFields(
      { label: "Kansas Secretary of State — election results", href: KS_RESULTS },
      "The Secretary of State election-results page is the official results page. This page does not call the race. Returns, when shown anywhere later, stay unofficial until Kansas election authorities certify the contest.",
      { label: "Kansas Secretary of State — election results", href: KS_RESULTS },
    ),
  },
];

export const EXPANSION_GOVERNOR_RACES: RaceGuide[] = [
  {
    slug: "mn-governor-2026",
    state: "MN",
    chamber: "governor",
    office: "Governor",
    title: "Minnesota Governor — 2026",
    shortTitle: "MN Governor",
    featured: false,
    overview:
      "Minnesota elects a governor and lieutenant governor on November 3, 2026. The Secretary of State candidate file for that election lists three joint tickets under Governor & Lt Governor. This page does not show vote totals and does not call the race.",
    officeExplainer: `${governorOfficeExplainer} The candidate file prints each ticket as one Governor & Lt Governor row.`,
    whyItMatters:
      "The Secretary of State’s “What’s on my ballot” page lists Governor & Lt. Governor on the 2026 general-election ballot for all voters. Names below are the joint tickets in the November 3, 2026 candidate file. Minnesota election authorities certify the contest. This site does not.",
    howToRead:
      "Each name is the full Governor & Lt Governor string in the candidate file, in that file’s order. Party words are the words printed for those same rows on a Minnesota Voting Information Portal sample ballot. A write-in line on that sample ballot is not listed here as a named ticket. The file order is not a ranking.",
    candidates: [
      listed({
        name: "Steven Young and Jane Kirby",
        party: "GRN",
        partyLabel: "Green",
        bio: "The November 3, 2026 candidate file lists “Steven Young and Jane Kirby” for Governor & Lt Governor with party code GP. The Voting Information Portal sample ballot prints that party as Green.",
        links: [{ label: "Candidate file", href: MN_CANDIDATE_FILE }],
        sources: [mnFile, mnSample],
      }),
      listed({
        name: "Amy Klobuchar and Ben Schierer",
        party: "DEM",
        partyLabel: "Democratic-Farmer-Labor",
        bio: "The November 3, 2026 candidate file lists “Amy Klobuchar and Ben Schierer” for Governor & Lt Governor with party code DFL. The Voting Information Portal sample ballot prints that party as Democratic-Farmer-Labor.",
        links: [{ label: "Candidate file", href: MN_CANDIDATE_FILE }],
        sources: [mnFile, mnSample],
      }),
      listed({
        name: "Lisa Demuth and Ryan Wilson",
        party: "REP",
        partyLabel: "Republican",
        bio: "The November 3, 2026 candidate file lists “Lisa Demuth and Ryan Wilson” for Governor & Lt Governor with party code R. The Voting Information Portal sample ballot prints that party as Republican.",
        links: [{ label: "Candidate file", href: MN_CANDIDATE_FILE }],
        sources: [mnFile, mnSample],
      }),
    ],
    ratings: [],
    sources: [
      mnFile,
      mnSample,
      cite("Minnesota Secretary of State, What’s on my ballot", MN_WHATS_ON, ACCESSED),
      cite("Minnesota Secretary of State, election results", MN_RESULTS, ACCESSED),
    ],
    aggregatorLinks: [
      { label: "Candidate file for November 3, 2026", href: MN_CANDIDATE_FILE },
      { label: "What’s on my ballot", href: MN_WHATS_ON },
      { label: "Election results", href: MN_RESULTS },
    ],
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    ballotNomineeNote:
      "Names on the MN Governor race guide are the Governor & Lt Governor rows in the Secretary of State candidate file for the November 3, 2026 election. That file is not a vote total.",
    faqs: [
      ...standardFaqs("this governor’s race", "the Minnesota Secretary of State"),
      noCallFaq,
    ],
    ...shellFields(
      { label: "Minnesota Secretary of State — election results", href: MN_RESULTS },
      "The Secretary of State election-results system is the official returns site. This page does not call the race. Any numbers that appear later are unofficial until Minnesota election authorities certify the contest.",
      { label: "Minnesota Secretary of State — election results", href: MN_RESULTS },
    ),
  },
  {
    slug: "me-governor-2026",
    state: "ME",
    chamber: "governor",
    office: "Governor",
    title: "Maine Governor — 2026",
    shortTitle: "ME Governor",
    featured: false,
    overview:
      "Maine elects a governor on November 3, 2026. The Secretary of State’s general-election candidate list names Rick Bennett, Robert B. Charles, and Hannah M. Pingree. The candidate guide says the general election for governor is decided by plurality.",
    officeExplainer: `${governorOfficeExplainer} The 2026 candidate guide says the November 3, 2026 general election for governor is decided by plurality, and that ranked-choice voting in that general election applies to U.S. Senate and U.S. Congress when the statutory conditions are met.`,
    whyItMatters:
      "The general-election candidate list is the Secretary of State’s list of candidates for this office. The candidate guide states the plurality rule for the governor’s general election. This site does not call the race.",
    howToRead:
      "Names and order follow the general-election candidate list posted July 27, 2026. The list’s party column says Independent, R, and D. Republican and Democratic are the party words used on the Secretary of State’s sample ballots for partisan federal contests. A separate declared write-in list includes governor filings. Those write-in names are not repeated here. This page does not reprint residence municipalities from the candidate list.",
    candidates: [
      listed({
        name: "Rick Bennett",
        party: "IND",
        partyLabel: "Independent",
        statusNote:
          "The candidate list’s party column says Independent. The upcoming-elections page says Maine has no Independent party, and that some unenrolled candidates designate themselves as Independent.",
        bio: "The general-election candidate list names Rick Bennett for governor and records the party as Independent.",
        links: [{ label: "General-election candidate list", href: ME_LIST }],
        sources: [meList, meUpcoming],
      }),
      listed({
        name: "Robert B. Charles",
        party: "REP",
        partyLabel: "Republican",
        bio: "The general-election candidate list names Robert B. Charles for governor with party code R.",
        links: [{ label: "General-election candidate list", href: ME_LIST }],
        sources: [meList],
      }),
      listed({
        name: "Hannah M. Pingree",
        party: "DEM",
        partyLabel: "Democratic",
        bio: "The general-election candidate list names Hannah M. Pingree for governor with party code D.",
        links: [{ label: "General-election candidate list", href: ME_LIST }],
        sources: [meList],
      }),
    ],
    ratings: [],
    sources: [
      meList,
      meGuide,
      meUpcoming,
      cite("Maine Secretary of State, declared write-in candidates, November 3, 2026", ME_WRITEINS, ACCESSED, "August 25, 2026"),
      cite("Maine Secretary of State, election results and data", ME_RESULTS, ACCESSED),
    ],
    aggregatorLinks: [
      { label: "2026 general election candidate list", href: ME_LIST },
      { label: "2026 candidate’s guide to ballot access", href: ME_GUIDE },
      { label: "Declared write-in candidates", href: ME_WRITEINS },
      { label: "Election results", href: ME_RESULTS },
    ],
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    ballotNomineeNote:
      "Names on the ME Governor race guide are the governor rows on the Secretary of State’s general-election candidate list. Declared write-in names are on a separate list and are not repeated on that guide. The list is not a vote total.",
    faqs: [
      ...standardFaqs("this governor’s race", "the Maine Secretary of State"),
      {
        question: "Is this contest counted by ranked-choice voting?",
        answer:
          "The 2026 candidate guide says the November 3, 2026 general election for governor is decided by plurality. The upcoming-elections page says ranked-choice voting is used in the general election for federal offices only. This site does not call the race.",
      },
      noCallFaq,
    ],
    ...shellFields(
      { label: "Maine Secretary of State — election results and data", href: ME_RESULTS },
      "The 2026 candidate guide says the November 3, 2026 general election for governor is decided by plurality. The upcoming-elections page says ranked-choice voting is used in the general election for federal offices only. This page does not call the race.",
      { label: "Maine Secretary of State — 2026 candidate’s guide to ballot access", href: ME_GUIDE },
    ),
  },
  {
    slug: "ia-governor-2026",
    state: "IA",
    chamber: "governor",
    office: "Governor",
    title: "Iowa Governor — 2026",
    shortTitle: "IA Governor",
    featured: false,
    overview:
      "Iowa elects a governor and lieutenant governor on November 3, 2026. The Secretary of State general-election candidate list, last updated August 19, 2026, names Zach Lahn and Rob Sand for governor, and names a lieutenant governor with each party. This page does not show vote totals and does not call the race.",
    officeExplainer: `${governorOfficeExplainer} The candidate list prints governor and lieutenant governor on separate rows.`,
    whyItMatters:
      "The Secretary of State’s general-election page lists Governor/Lt. Governor among the offices on the November 3, 2026 ballot. Iowa election authorities certify the contest. This site does not.",
    howToRead:
      "Each line pairs the governor and lieutenant governor of one party, in the order the candidate list prints the governor rows. The list itself uses separate rows: Zach Lahn (Republican) and Derek Wulf (Republican); Rob Sand (Democratic) and Dave Muhlbauer (Democratic). This page does not reprint addresses, phone numbers, or email addresses from the list.",
    candidates: [
      listed({
        name: "Zach Lahn and Derek Wulf",
        party: "REP",
        partyLabel: "Republican",
        statusNote:
          "The candidate list names Zach Lahn for governor and Derek Wulf for lieutenant governor, both Republican.",
        bio: "The general-election candidate list names Zach Lahn, Republican, for governor and Derek Wulf, Republican, for lieutenant governor.",
        links: [{ label: "General-election candidate list", href: IA_LIST }],
        sources: [iaList],
      }),
      listed({
        name: "Rob Sand and Dave Muhlbauer",
        party: "DEM",
        partyLabel: "Democratic",
        statusNote:
          "The candidate list names Rob Sand for governor and Dave Muhlbauer for lieutenant governor, both Democratic.",
        bio: "The general-election candidate list names Rob Sand, Democratic, for governor and Dave Muhlbauer, Democratic, for lieutenant governor.",
        links: [{ label: "General-election candidate list", href: IA_LIST }],
        sources: [iaList],
      }),
    ],
    ratings: [],
    sources: [
      iaList,
      iaGeneral,
      cite("Iowa Secretary of State, election results", IA_RESULTS, ACCESSED),
    ],
    aggregatorLinks: [
      { label: "November 3, 2026 general-election candidate list", href: IA_LIST },
      { label: "General election page", href: IA_GENERAL },
      { label: "Election results", href: IA_RESULTS },
    ],
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    ballotNomineeNote:
      "Names on the IA Governor race guide pair each governor and lieutenant governor named on the Secretary of State general-election candidate list last updated August 19, 2026. That list prints the two offices on separate rows. The list is not a vote total.",
    faqs: [
      ...standardFaqs("this governor’s race", "the Iowa Secretary of State"),
      noCallFaq,
    ],
    ...shellFields(
      { label: "Iowa Secretary of State — election results", href: IA_RESULTS },
      "The general-election page links the state’s election-results site. This page does not call the race. Returns, when shown anywhere later, stay unofficial until Iowa election authorities certify the contest.",
      { label: "Iowa Secretary of State — November 3, 2026 general election", href: IA_GENERAL },
    ),
  },
  {
    slug: "ak-governor-2026",
    state: "AK",
    chamber: "governor",
    office: "Governor",
    title: "Alaska Governor — 2026",
    shortTitle: "AK Governor",
    featured: false,
    overview:
      "Alaska elects a governor and lieutenant governor on November 3, 2026. The Division of Elections general-election candidate list, page last updated September 25, 2026, names five certified tickets, including one marked Certified Write-In. The Division says this office is conducted by ranked-choice voting.",
    officeExplainer: `${governorOfficeExplainer} The candidate list prints each ticket as governor / lieutenant governor.`,
    whyItMatters:
      "The Division’s candidate list is the list of certified tickets for this office. The Division says results are unofficial until the State Review Board certifies the election. This site does not run a ranked-choice count and does not call the race.",
    howToRead:
      "Each name follows the candidate list’s governor / lieutenant governor form, in that list’s order. Party labels are the registration words on that list. The filing marked Certified Write-In is included and labeled that way. The list’s order is not a ranking. The page says updates are posted as they are processed, and it lists a candidate withdrawal deadline of 5:00 p.m. Monday, August 31, 2026.",
    candidates: [
      listed({
        name: "Dave Bronson / Josh Church",
        party: "REP",
        partyLabel: "Registered Republican",
        bio: "The general-election candidate list names Dave Bronson / Josh Church for governor / lieutenant governor, Registered Republican, and marks the filing Certified.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
      listed({
        name: "Jonathan S. “JKT” Kreiss-Tomkins / Zac Johnson",
        party: "DEM",
        partyLabel: "Registered Democrat / Nonpartisan",
        bio: "The general-election candidate list names Jonathan S. “JKT” Kreiss-Tomkins / Zac Johnson for governor / lieutenant governor, Registered Democrat / Nonpartisan, and marks the filing Certified.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
      listed({
        name: "James W. “JP4” Parkin / Ramadhani “Ram” Greer",
        party: "REP",
        partyLabel: "Registered Republican / Registered Democrat",
        statusNote: "The candidate list marks this filing Certified Write-In.",
        bio: "The general-election candidate list names James W. “JP4” Parkin / Ramadhani “Ram” Greer for governor / lieutenant governor, Registered Republican / Registered Democrat, and marks the filing Certified Write-In.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
      listed({
        name: "Treg Taylor / Candi English",
        party: "REP",
        partyLabel: "Registered Republican",
        bio: "The general-election candidate list names Treg Taylor / Candi English for governor / lieutenant governor, Registered Republican, and marks the filing Certified.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
      listed({
        name: "Bernadette M. Wilson / Michael K. Shower",
        party: "REP",
        partyLabel: "Registered Republican",
        bio: "The general-election candidate list names Bernadette M. Wilson / Michael K. Shower for governor / lieutenant governor, Registered Republican, and marks the filing Certified.",
        links: [{ label: "2026 general election candidate list", href: AK_LIST }],
        sources: [akList],
      }),
    ],
    ratings: [],
    sources: [
      akList,
      akInfo,
      cite("Alaska Division of Elections, election results", AK_RESULTS, ACCESSED),
    ],
    aggregatorLinks: [
      { label: "2026 general election candidate list", href: AK_LIST },
      { label: "Election information, including ranked-choice voting", href: AK_INFO },
      { label: "Election results", href: AK_RESULTS },
    ],
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    ballotNomineeNote:
      "Names on the AK Governor race guide are the governor / lieutenant governor rows on the Division of Elections general-election candidate list, including the filing that list marks Certified Write-In. That list is not a vote total.",
    faqs: [
      ...standardFaqs("this governor’s race", "the Alaska Division of Elections"),
      {
        question: "Is this contest counted by ranked-choice voting?",
        answer:
          "The Division of Elections says general elections for Governor/Lieutenant Governor are conducted by ranked-choice voting, and that results are unofficial until the State Review Board certifies the election. Tabulation reports are posted on the Division’s election-results page. This site does not run that count and does not give voting instructions.",
      },
      noCallFaq,
    ],
    ...shellFields(
      { label: "Alaska Division of Elections — election results", href: AK_RESULTS },
      "The Division of Elections says general elections for Governor/Lieutenant Governor are conducted by ranked-choice voting. It says results are unofficial until the State Review Board certifies the election. Ranked-choice tabulation reports are posted on the Division’s election-results page. This page does not call the race.",
      { label: "Alaska Division of Elections — election information", href: AK_INFO },
    ),
  },
  {
    slug: "ks-governor-2026",
    state: "KS",
    chamber: "governor",
    office: "Governor",
    title: "Kansas Governor — 2026",
    shortTitle: "KS Governor",
    featured: false,
    overview:
      "Kansas elects a governor and lieutenant governor on November 3, 2026. The Secretary of State candidate list, 2026 General selection, names two Governor / Lt. Governor rows. This page does not show vote totals and does not call the race.",
    officeExplainer: `${governorOfficeExplainer} The candidate list prints each Governor / Lt. Governor row as one ticket.`,
    whyItMatters:
      "The Secretary of State’s candidate-information page lists Governor/Lt. Governor among the offices to be elected or retained in 2026. Kansas election authorities certify the contest. This site does not.",
    howToRead:
      "Each name is the Candidate column for a Governor / Lt. Governor row, in that table’s order. The list prints Cindy Holscher / KC Ohaebosim, Democratic, and Ty Masterson / Jeffrey Klemp, Republican. This page does not reprint addresses, phone numbers, email addresses, or cities from the table. The table order is not a ranking. The candidate-list page says the table is updated automatically as each candidate files a valid petition or declaration of intention.",
    candidates: [
      listed({
        name: "Cindy Holscher / KC Ohaebosim",
        party: "DEM",
        partyLabel: "Democratic",
        bio: "The 2026 General candidate list names Cindy Holscher / KC Ohaebosim for Governor / Lt. Governor with the party Democratic.",
        links: [{ label: "Candidate list, 2026 General", href: KS_LIST }],
        sources: [ksList],
      }),
      listed({
        name: "Ty Masterson / Jeffrey Klemp",
        party: "REP",
        partyLabel: "Republican",
        bio: "The 2026 General candidate list names Ty Masterson / Jeffrey Klemp for Governor / Lt. Governor with the party Republican.",
        links: [{ label: "Candidate list, 2026 General", href: KS_LIST }],
        sources: [ksList],
      }),
    ],
    ratings: [],
    sources: [ksList, ksOffices, ksResults],
    aggregatorLinks: [
      { label: "Candidate list, 2026 General", href: KS_LIST },
      { label: "Offices to be elected or retained in 2026", href: KS_OFFICES },
      { label: "Election results", href: KS_RESULTS },
    ],
    relatedPollSlugs: [],
    ballotSections: ["statewide"],
    ballotNomineeNote:
      "Names on the KS Governor race guide are the Governor / Lt. Governor rows on the Secretary of State candidate list, 2026 General selection, read October 17, 2026. That list prints each ticket as one row. The list is not a vote total.",
    faqs: [
      ...standardFaqs("this governor’s race", "the Kansas Secretary of State"),
      noCallFaq,
    ],
    ...shellFields(
      { label: "Kansas Secretary of State — election results", href: KS_RESULTS },
      "The Secretary of State election-results page is the official results page. This page does not call the race. Returns, when shown anywhere later, stay unofficial until Kansas election authorities certify the contest.",
      { label: "Kansas Secretary of State — election results", href: KS_RESULTS },
    ),
  },
];
