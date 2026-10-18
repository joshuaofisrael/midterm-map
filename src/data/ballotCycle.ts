import { electionDatesFor, type StateElectionDates } from "./electionDates";
import type { OfficialSource, RaceGuide, StateCode, StateProfile } from "./types";

/**
 * Offices and statewide measures for the November 3, 2026 ballot.
 * Each line was read from the cited official document on checkedOn.
 * District and local contests are named only to say they are not statewide.
 */
export interface BallotCycle {
  code: StateCode;
  checkedOn: string;
  /** Answer-first sentence block. Also the ballot-page lede and the first FAQ answer. */
  intro: string;
  /** One sentence for hub metadata. */
  shortLead: string;
  federal: string[];
  statewide: string[];
  measures: string[];
  /** What the official measure source says, including a limit on what it lists. */
  measureNote: string;
  districtNote: string;
  sources: OfficialSource[];
}

const CHECKED = "October 18, 2026";

export const BALLOT_CYCLES: BallotCycle[] = [
  {
    code: "CA",
    checkedOn: CHECKED,
    intro:
      "On the November 3, 2026 general-election ballot in California, the Secretary of State’s certified candidate list, certified August 27, 2026, does not include a U.S. Senate contest. That list places these offices before all 58 counties: Governor, Lieutenant Governor, Secretary of State, Controller, Treasurer, Attorney General, Insurance Commissioner, Superintendent of Public Instruction, and two Associate Justice of the Supreme Court contests for all 58 counties. U.S. House contests are listed by district.",
    shortLead:
      "California’s November 3, 2026 certified list has no U.S. Senate contest and lists eight statewide executive offices plus two Supreme Court contests.",
    federal: ["U.S. House, by district"],
    statewide: [
      "Governor",
      "Lieutenant Governor",
      "Secretary of State",
      "Controller",
      "Treasurer",
      "Attorney General",
      "Insurance Commissioner",
      "Superintendent of Public Instruction",
      "Associate Justice of the Supreme Court (two contests, all 58 counties)",
    ],
    measures: [
      "Proposition 1, Authorizes Bonds for Housing Affordability Programs (Legislative Statute)",
      "Proposition 2, Increases State’s Rainy Day Fund (Legislative Constitutional Amendment)",
      "Proposition 3, Provides Permanent Funding for Schools and Health Care by Extending Existing Tax on High Incomes (Initiative Constitutional Amendment)",
      "Proposition 4, Repeals Prohibition Against Public Funding of Election Campaigns (Legislative Statute)",
      "Proposition 5, Changes Recall Election Process for Statewide Officers (Legislative Constitutional Amendment)",
      "Proposition 37, Creates Loan Program for Middle-Income Buyers of Qualified New Homes (Initiative Statute)",
      "Proposition 38, Authorizes Bonds for Immunology Medical Research (Initiative Statute)",
      "Proposition 39, Prohibits Citizens from Voting Unless They Present Government-Issued Identification (Initiative Constitutional Amendment)",
      "Proposition 40, Imposes One-Time Tax on Certain Taxpayers (Initiative Constitutional Amendment and Statute)",
      "Proposition 41, Prohibits New State Taxes That Exclude Revenues from State Spending Limit. Requires Audits for New State Special Taxes (Initiative Constitutional Amendment)",
      "Proposition 42, Prohibits New State Personal Property Taxes and Certain Retroactive State Taxes (Initiative Constitutional Amendment)",
      "Proposition 43, Limits Voters’ Ability to Raise Revenues for Local Government Services (Legislative Constitutional Amendment)",
      "Proposition 44, Requires Community Health Clinics Spend 90% Of Revenue on Program Services (Initiative Statute)",
      "Proposition 45, Modifies Environmental Review for Certain Projects (Initiative Statute)",
    ],
    measureNote:
      "The Secretary of State’s qualified-ballot-measures page states that on June 25, 2026, ACA 13 (Res. Ch. 176, 2023) was removed from the November 3, 2026 ballot pursuant to ACA 21 (Res. Ch. 131, 2026).",
    districtNote:
      "The certified list also includes Board of Equalization districts, even-numbered State Senate districts, State Assembly districts, and Courts of Appeal contests. Those contests are not statewide.",
    sources: [
      {
        label: "California Secretary of State — certified list of candidates, November 3, 2026 general election",
        href: "https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf",
      },
      {
        label: "California Secretary of State — qualified ballot measures",
        href: "https://www.sos.ca.gov/elections/ballot-measures/qualified-ballot-measures",
      },
    ],
  },
  {
    code: "TX",
    checkedOn: CHECKED,
    intro:
      "The Texas Secretary of State’s ballot certification signed August 28, 2026 lists these offices in all 254 counties for the November 3, 2026 general election: U.S. Senator; Governor; Lieutenant Governor; Attorney General; Comptroller of Public Accounts; Commissioner of the General Land Office; Commissioner of Agriculture; Railroad Commissioner; Chief Justice, Supreme Court; Justice, Supreme Court, Place 2 (unexpired term); Justice, Supreme Court, Place 7; Justice, Supreme Court, Place 8; Judge, Court of Criminal Appeals, Places 3, 4, and 9; Chief Justice, 15th Court of Appeals District; and Justice, 15th Court of Appeals District, Places 2 and 3. U.S. House contests are certified by district.",
    shortLead:
      "Texas certifies a U.S. Senate seat, statewide executive offices, and statewide judicial offices for every county on the November 3, 2026 ballot.",
    federal: ["U.S. Senator", "U.S. House, by district"],
    statewide: [
      "U.S. Senator",
      "Governor",
      "Lieutenant Governor",
      "Attorney General",
      "Comptroller of Public Accounts",
      "Commissioner of the General Land Office",
      "Commissioner of Agriculture",
      "Railroad Commissioner",
      "Chief Justice, Supreme Court",
      "Justice, Supreme Court, Place 2 (unexpired term)",
      "Justice, Supreme Court, Place 7",
      "Justice, Supreme Court, Place 8",
      "Judge, Court of Criminal Appeals, Place 3",
      "Judge, Court of Criminal Appeals, Place 4",
      "Judge, Court of Criminal Appeals, Place 9",
      "Chief Justice, 15th Court of Appeals District",
      "Justice, 15th Court of Appeals District, Place 2",
      "Justice, 15th Court of Appeals District, Place 3",
    ],
    measures: [],
    measureNote:
      "The Secretary of State’s November 3, 2026 current-elections page lists the election proclamation, calendar, candidate filings, ballot certification, write-ins, a sample ballot, and special elections for Senate District 22 and House District 93. That page does not list a statewide constitutional-amendment proclamation.",
    districtNote:
      "U.S. House, the Legislature, other courts of appeals, and the State Board of Education are certified by district. The 15th Court of Appeals contests above are certified in all 254 counties. The certification also prints county offices, including county judge, in each county. The special elections for Senate District 22 and House District 93 on the current-elections page are district contests.",
    sources: [
      {
        label: "Texas Secretary of State — 2026 general election ballot certification",
        href: "https://www.sos.texas.gov/elections/forms/2026-ballot-cert.pdf",
      },
      {
        label: "Texas Secretary of State — November 3, 2026 general election",
        href: "https://www.sos.texas.gov/elections/laws/2026-november-general-election.shtml",
      },
    ],
  },
  {
    code: "FL",
    checkedOn: CHECKED,
    intro:
      "The Florida Division of Elections candidate listing for the November 3, 2026 general election includes these statewide contests: United States Senator, Governor, Attorney General, Chief Financial Officer, Commissioner of Agriculture, and Supreme Court Justice. United States Representative is listed by district. The listing names the Senate contest United States Senator.",
    shortLead:
      "Florida’s November 3, 2026 candidate listing includes United States Senator, statewide Cabinet offices, and a Supreme Court justice contest.",
    federal: ["United States Senator", "United States Representative, by district"],
    statewide: [
      "United States Senator",
      "Governor",
      "Attorney General",
      "Chief Financial Officer",
      "Commissioner of Agriculture",
      "Supreme Court Justice",
    ],
    measures: [
      "Amendment 1, BUDGET STABILIZATION FUND (HJR 5019; 06/17/2025 on the initiatives table)",
      "Amendment 2, EXEMPTION OF TANGIBLE PERSONAL PROPERTY ON AGRICULTURAL LAND FROM TAXATION (HJR 1215; 06/18/2025 on the initiatives table)",
      "Amendment 3, INCREASED HOMESTEAD EXEMPTION; LOWER CAP ON INCREASES IN NON-HOMESTEAD PROPERTY ASSESSMENTS (HJR 1F; 06/16/2026 on the initiatives table)",
    ],
    measureNote:
      "Those three titles are the 2026 general-election rows with ballot numbers on the Florida Division of Elections constitutional-initiatives table.",
    districtNote:
      "The same candidate listing includes State Attorney, Public Defender, State Senate, State House, District Courts of Appeal, circuit judges, and special districts. Those contests are not statewide.",
    sources: [
      {
        label: "Florida Division of Elections — candidate listing, 2026 general election",
        href: "https://dos.elections.myflorida.com/candidates/CanList.asp?elecid=20261103-GEN",
      },
      {
        label: "Florida Division of Elections — constitutional initiatives",
        href: "https://constitutionalinitiatives.dos.fl.gov/",
      },
    ],
  },
  {
    code: "NY",
    checkedOn: CHECKED,
    intro:
      "The New York State Board of Elections amended ballot certification dated October 7, 2026, issued under Election Law § 4-112, marks these offices District: Statewide for the November 3, 2026 general election: Governor and Lieutenant Governor, Comptroller, and Attorney General. Representative in Congress is listed by district in that certification.",
    shortLead:
      "New York’s October 7, 2026 ballot certification lists governor and lieutenant governor, comptroller, and attorney general as statewide offices.",
    federal: ["Representative in Congress, by district"],
    statewide: ["Governor and Lieutenant Governor", "Comptroller", "Attorney General"],
    measures: [],
    measureNote:
      "The October 7, 2026 document is a candidate certification. The certification text read on October 18, 2026 does not certify a statewide ballot proposal.",
    districtNote:
      "State Senator is listed by district in the certification text read on October 18, 2026.",
    sources: [
      {
        label: "New York State Board of Elections — amended 2026 general election ballot certification, October 7, 2026",
        href: "https://elections.ny.gov/system/files/documents/2026/10/accessible-2026-general-ballot-certification-10.7.2026.pdf",
      },
    ],
  },
  {
    code: "PA",
    checkedOn: CHECKED,
    intro:
      "The Pennsylvania Department of State voter-services candidate list for the November 3, 2026 general election, read October 18, 2026, includes two statewide offices: Governor and Lieutenant Governor. U.S. House contests on that list are by district.",
    shortLead:
      "Pennsylvania’s November 3, 2026 voter-services list includes governor and lieutenant governor as the statewide offices.",
    federal: ["U.S. House, by district"],
    statewide: ["Governor", "Lieutenant Governor"],
    measures: [],
    measureNote:
      "The Department of State voting-and-elections page read on October 18, 2026 does not print a statewide ballot question. The voter-services file read the same day is a candidate list and does not list a ballot question.",
    districtNote:
      "The same voter-services file also lists Representative in Congress, Senator in the General Assembly, Representative in the General Assembly, and members of the Democratic and Republican state committees. Those contests are not statewide offices.",
    sources: [
      {
        label: "Pennsylvania Department of State — PA Voter Services candidate list, 2026 general election",
        href: "https://www.pavoterservices.pa.gov/electioninfo/ElectionInfo.aspx",
      },
      {
        label: "Pennsylvania Department of State — voting and elections",
        href: "https://www.pa.gov/agencies/dos/programs/voting-and-elections",
      },
    ],
  },
  {
    code: "IL",
    checkedOn: CHECKED,
    intro:
      "The Illinois State Board of Elections candidate list for the November 3, 2026 general election includes these statewide offices: United States Senator, Governor and Lieutenant Governor, Attorney General, Secretary of State, Comptroller, and Treasurer. Representative in Congress is listed by district. The U.S. Senate Class II roster lists Richard J. Durbin of Illinois among senators whose terms expire in 2027.",
    shortLead:
      "The Illinois candidate list for November 3, 2026 includes United States Senator, governor and lieutenant governor, and four other statewide executive offices.",
    federal: ["United States Senator", "Representative in Congress, by district"],
    statewide: [
      "United States Senator",
      "Governor and Lieutenant Governor",
      "Attorney General",
      "Secretary of State",
      "Comptroller",
      "Treasurer",
    ],
    measures: [],
    measureNote:
      "The State Board of Elections candidate list for this election does not list a referendum.",
    districtNote:
      "Representative in Congress, odd-numbered State Senate districts, regional superintendents of schools, and appellate-court vacancies and retentions on that candidate list are not statewide offices.",
    sources: [
      {
        label: "Illinois State Board of Elections — candidate list, 2026 general election",
        href: "https://www.elections.il.gov/ElectionOperations/CandidateList.aspx?ElectionID=sejIrI%2BQmww%3D",
      },
      {
        label: "U.S. Senate — Class II, terms expire in 2027",
        href: "https://www.senate.gov/senators/Class_II.htm",
      },
    ],
  },
  {
    code: "OH",
    checkedOn: CHECKED,
    intro:
      "The Henry County, Ohio official general-election ballot for November 3, 2026 prints these statewide offices: Governor and Lieutenant Governor; Attorney General; Auditor of State; Secretary of State; Treasurer of State; Justice of the Supreme Court (full term commencing 1-1-2027); Justice of the Supreme Court (full term commencing 1-2-2027); and U.S. Senator (unexpired term ending 1-3-2029). The Secretary of State’s candidate list was not available for this reading. U.S. House contests on that county ballot are by district.",
    shortLead:
      "The Henry County official ballot for November 3, 2026 prints Ohio’s statewide executive offices, two Supreme Court terms, and a U.S. Senate unexpired term.",
    federal: ["U.S. Senator (unexpired term ending 1-3-2029)", "U.S. House, by district"],
    statewide: [
      "Governor and Lieutenant Governor",
      "Attorney General",
      "Auditor of State",
      "Secretary of State",
      "Treasurer of State",
      "Justice of the Supreme Court (full term commencing 1-1-2027)",
      "Justice of the Supreme Court (full term commencing 1-2-2027)",
      "U.S. Senator (unexpired term ending 1-3-2029)",
    ],
    measures: [
      "Issue 3, TO REQUIRE VOTERS TO PRESENT PHOTO IDENTIFICATION IN ORDER TO VOTE (proposed constitutional amendment; Senate Joint Resolution 10; Section 5 of Article V)",
    ],
    measureNote:
      "The Secretary of State’s certification signed August 3, 2026 places Issue 3 on the November 3, 2026 general-election ballot under that title. The Henry County official ballot prints that statewide amendment. The pages of that county ballot that were read do not print a statewide Issue 1 or Issue 2.",
    districtNote:
      "U.S. House, the General Assembly, and the court of appeals on the Henry County ballot are district contests. Local tax levies on that ballot are county or local questions.",
    sources: [
      {
        label: "Ohio Secretary of State — Issue 3 certification report, August 3, 2026",
        href: "https://www.ohiosos.gov/assets/2026-11-statewide-issue-3-report.pdf",
      },
      {
        label: "Henry County, Ohio — official general election ballot, November 3, 2026 (county source)",
        href: "https://henrycountyohio.gov/DocumentCenter/View/4380/November-3-2026-General",
      },
    ],
  },
  {
    code: "GA",
    checkedOn: CHECKED,
    intro:
      "The Georgia Secretary of State’s November 2026 federal and state candidate file, read October 18, 2026, lists these statewide offices: U.S. Senate, Governor, Lieutenant Governor, Secretary of State, Attorney General, Agriculture Commissioner, Insurance and Fire Safety Commissioner, State School Superintendent, and Labor Commissioner. U.S. House contests in that file are by district.",
    shortLead:
      "Georgia’s November 2026 federal and state candidate file lists U.S. Senate and statewide executive offices.",
    federal: ["U.S. Senate", "U.S. House, by district"],
    statewide: [
      "U.S. Senate",
      "Governor",
      "Lieutenant Governor",
      "Secretary of State",
      "Attorney General",
      "Agriculture Commissioner",
      "Insurance and Fire Safety Commissioner",
      "State School Superintendent",
      "Labor Commissioner",
    ],
    measures: [],
    measureNote:
      "That candidate file does not list a statewide ballot question. The Georgia.gov election guide read on October 18, 2026 does not print a statewide question title.",
    districtNote: "U.S. House contests in the candidate file are by district.",
    sources: [
      {
        label: "Georgia Secretary of State — November 2026 federal and state candidates",
        href: "https://sos.ga.gov/sites/default/files/2026-09/November%202026%20Federal%20and%20State%20Candidates%202026.zip",
      },
      {
        label: "Georgia.gov — election guide",
        href: "https://georgia.gov/georgia-election-guide",
      },
    ],
  },
  {
    code: "NC",
    checkedOn: CHECKED,
    intro:
      "The North Carolina State Board of Elections candidate list for the November 3, 2026 general election includes these statewide contests: U.S. Senate; North Carolina Supreme Court Associate Justice Seat 01; and North Carolina Court of Appeals Judge Seats 01, 02, and 03. U.S. House seats are listed by district. Governor is not an office on that list.",
    shortLead:
      "North Carolina’s November 3, 2026 candidate list includes U.S. Senate, one Supreme Court seat, and three Court of Appeals seats.",
    federal: ["U.S. Senate", "U.S. House, districts 1–14"],
    statewide: [
      "U.S. Senate",
      "North Carolina Supreme Court Associate Justice Seat 01",
      "North Carolina Court of Appeals Judge Seat 01",
      "North Carolina Court of Appeals Judge Seat 02",
      "North Carolina Court of Appeals Judge Seat 03",
    ],
    measures: [
      "CONSTITUTIONAL AMENDMENT - REQUIRE PHOTO ID FOR VOTING. Constitutional amendment to require all voters, not just those presenting to vote in person, to present photo identification before voting.",
      "CONSTITUTIONAL AMENDMENT - MAXIMUM INCOME TAX RATE OF 3.5%. Constitutional amendment to keep the State income tax rate from being raised higher than three and one-half percent (3.5%).",
      "CONSTITUTIONAL AMENDMENT - PROPERTY TAX LEVY LIMIT. Constitutional amendment requiring limits on property tax increases by local governments.",
    ],
    measureNote:
      "The State Board’s statewide referendum file for the November 3, 2026 election is dated September 2, 2026 and is limited to the state-only view for every county.",
    districtNote:
      "U.S. House districts 1 through 14, State Senate, State House, superior court, district court, and district attorney contests on the candidate list are not statewide.",
    sources: [
      {
        label: "North Carolina State Board of Elections — 2026 general candidate list, federal and state",
        href: "https://dl.ncsbe.gov/Elections/2026/Candidate%20Filing/2026_general_candidate_list_by_contest_federal_and_state.pdf",
      },
      {
        label: "North Carolina State Board of Elections — statewide referendums, November 3, 2026",
        href: "https://dl.ncsbe.gov/Elections/2026/Candidate%20Filing/statewide_referendums_20261103.pdf",
      },
    ],
  },
  {
    code: "MI",
    checkedOn: CHECKED,
    intro:
      "The Michigan Bureau of Elections public candidate report for the 2026 general election lists these statewide offices: Governor / Lt. Governor 4 Year Term (1) Position; Secretary of State 4 Year Term (1) Position; Attorney General 4 Year Term (1) Position; U.S. Senate 6 Year Term (1) Position; Member of the State Board of Education 8 Year Terms (2) Positions; Regent of the University of Michigan 8 Year Terms (2) Positions; Trustee of Michigan State University 8 Year Terms (2) Positions; Governor of Wayne State University 8 Year Terms (2) Positions; and Justice of Supreme Court 8 Year Terms (2) Positions. U.S. House contests on that report are by district.",
    shortLead:
      "Michigan’s 2026 general-election candidate report lists U.S. Senate, governor, other statewide executive offices, education and university boards, and two Supreme Court seats.",
    federal: ["U.S. Senate, 6-year term", "U.S. House, by district"],
    statewide: [
      "Governor / Lt. Governor 4 Year Term (1) Position",
      "Secretary of State 4 Year Term (1) Position",
      "Attorney General 4 Year Term (1) Position",
      "U.S. Senate 6 Year Term (1) Position",
      "Member of the State Board of Education 8 Year Terms (2) Positions",
      "Regent of the University of Michigan 8 Year Terms (2) Positions",
      "Trustee of Michigan State University 8 Year Terms (2) Positions",
      "Governor of Wayne State University 8 Year Terms (2) Positions",
      "Justice of Supreme Court 8 Year Terms (2) Positions",
    ],
    measures: [
      "Proposal 2026-1, dated July 24, 2026. A proposal to convene a constitutional convention for the purpose of drafting a general revision of the state constitution.",
      "Proposal 2026-2, dated August 17, 2026. A proposed initiated law to prohibit campaign contributions from certain regulated utilities and government contractors and apply campaign finance laws and regulations to additional types of political communications.",
    ],
    measureNote:
      "Those captions are the proposal titles on the Secretary of State’s November 2026 ballot-questions document.",
    districtNote:
      "U.S. House, the Legislature, and circuit, probate, and district court contests on the candidate report are not statewide.",
    sources: [
      {
        label: "Michigan Bureau of Elections — 2026 general candidate report",
        href: "https://mi-boe.entellitrak.com/etk-mi-boe-prod/page.request.do?electionType=GEN&electionYear=2026&page=page.miboePublicReport",
      },
      {
        label: "Michigan Secretary of State — November 2026 ballot questions",
        href: "https://www.michigan.gov/sos/-/media/Project/Websites/sos/Elections/Home/Documents/2026-November-ballot-questions.pdf",
      },
    ],
  },
];

const BY_CODE = new Map(BALLOT_CYCLES.map((cycle) => [cycle.code, cycle]));

export function ballotCycleFor(code: StateCode): BallotCycle | undefined {
  return BY_CODE.get(code);
}

export type BallotFaq = { question: string; answer: string };

function joinList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function categorySentences(dates: StateElectionDates, categories: Array<StateElectionDates["facts"][number]["category"]>): string {
  const facts = dates.facts.filter((fact) => categories.includes(fact.category)).map((fact) => fact.text);
  const omitted = dates.omitted.filter((row) => categories.includes(row.category)).map((row) => row.text);
  return [...facts, ...omitted].join(" ");
}

/**
 * Four to six ballot FAQs. The same strings are rendered and placed in FAQPage JSON-LD.
 */
export function ballotCycleFaqs(state: StateProfile, races: RaceGuide[]): BallotFaq[] {
  const cycle = ballotCycleFor(state.code);
  if (!cycle) return [];
  const dates = electionDatesFor(state.code);
  const measureList =
    cycle.measures.length > 0
      ? `The official source lists ${joinList(cycle.measures)}.`
      : "The official source used for this page does not list a statewide ballot measure title.";
  const raceSentence =
    races.length === 0
      ? `This site does not publish a separate race results page for a contest in ${state.name}.`
      : `This site’s race results pages for ${state.name} cover ${joinList(races.map((race) => race.title))}.`;

  const faqs: BallotFaq[] = [
    {
      question: `Which federal and statewide offices are on the November 3, 2026 ballot in ${state.name}?`,
      answer: cycle.intro,
    },
    {
      question: `Which statewide ballot measures does the official ${state.name} source list for November 3, 2026?`,
      answer: `${measureList} ${cycle.measureNote}`,
    },
    {
      question: `What voter-registration deadline does the official calendar list for ${state.name}?`,
      answer: categorySentences(dates, ["registration"]),
    },
    {
      question: `What early-voting dates does the official calendar list for ${state.name}?`,
      answer: categorySentences(dates, ["early"]),
    },
    {
      question: `What mail-ballot deadline does the official calendar list for ${state.name}?`,
      answer: categorySentences(dates, ["mail-request", "mail-return"]),
    },
    {
      question: `Where does this site list ${state.name} results?`,
      answer: `${state.name} results on this site are on the ${state.name} results page. ${raceSentence} The live results page links the official ${state.name} results site. Returns shown here stay unofficial until election officials certify them. This site does not certify outcomes.`,
    },
  ];
  for (const faq of faqs) {
    if (!faq.answer.trim()) {
      throw new Error(`Empty ballot FAQ for ${state.code}: ${faq.question}`);
    }
  }
  return faqs;
}
