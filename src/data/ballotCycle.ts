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

const CLASS_II: OfficialSource = {
  label: "U.S. Senate — Class II, terms expire in 2027",
  href: "https://www.senate.gov/senators/Class_II.htm",
};


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
  {
    code: "AZ",
    checkedOn: CHECKED,
    intro:
      "The Arizona Secretary of State’s 2026 election-information page sets the general election on November 3, 2026 and links a candidate listing for that election. That listing was not retrieved as text on October 18, 2026, so this page does not name candidate offices from it. The same office’s 2026 ballot-measures page, under 2026 ballot-measure arguments, lists Proposition 141 Taxation, Proposition 142 Prohibition of Preferential Treatment and Discrimination, Proposition 144 Election Requirements, Proposition 316 Municipal Transaction Privilege Tax, Proposition 317 Arizona Department of Homeland Security, Proposition 318 Student Athletics, Proposition 319 Photo Enforcement Systems, and Proposition 320 School District Budgets. Those proposition numbers are in the November 3, 2026 publicity pamphlet.",
    shortLead:
      "Arizona’s November 3, 2026 publicity pamphlet and ballot-measures page list eight propositions. The linked candidate listing was not retrieved as text on October 18, 2026.",
    federal: [],
    statewide: [],
    measures: [
      "Proposition 141, Taxation",
      "Proposition 142, Prohibition of Preferential Treatment and Discrimination",
      "Proposition 144, Election Requirements",
      "Proposition 316, Municipal Transaction Privilege Tax",
      "Proposition 317, Arizona Department of Homeland Security",
      "Proposition 318, Student Athletics",
      "Proposition 319, Photo Enforcement Systems",
      "Proposition 320, School District Budgets",
    ],
    measureNote:
      "Those eight names are the rows in the 2026 ballot-measure arguments table. The publicity pamphlet is titled for the November 3, 2026 general election and includes the same proposition numbers. Proposition 143 is not in that table or in the pamphlet table of contents read on October 18, 2026.",
    districtNote:
      "This page does not list federal or statewide candidate offices. The candidate listing linked from the 2026 election-information page was not retrieved as text on October 18, 2026.",
    sources: [
      {
        label: "Arizona Secretary of State — 2026 election information",
        href: "https://azsos.gov/elections/election-information/2026-election-info",
      },
      {
        label: "Arizona Secretary of State — ballot measures",
        href: "https://azsos.gov/elections/ballot-measures",
      },
      {
        label: "Arizona Secretary of State — 2026 general election publicity pamphlet",
        href: "https://apps.azsos.gov/election/BallotMeasures/2026/2026-AZ-Publicity-Pamphlet.pdf",
      },
    ],
  },
  {
    code: "NV",
    checkedOn: CHECKED,
    intro:
      "The Clark County Registrar of Voters’ notice of the November 3, 2026 general election lists these statewide partisan offices: Governor, Lieutenant Governor, Secretary of State, State Treasurer, State Controller, and Attorney General. Under nonpartisan offices, that notice lists Justice of the Supreme Court, Seat B and Seat D, each for a 6-year term. Representative in Congress is listed by district. The notice does not include a United States Senator heading.",
    shortLead:
      "Clark County’s November 3, 2026 candidate notice lists six statewide executive offices and two Nevada Supreme Court seats.",
    federal: ["Representative in Congress, by district"],
    statewide: [
      "Governor",
      "Lieutenant Governor",
      "Secretary of State",
      "State Treasurer",
      "State Controller",
      "Attorney General",
      "Justice of the Supreme Court, Seat B (6-year term)",
      "Justice of the Supreme Court, Seat D (6-year term)",
    ],
    measures: [],
    measureNote:
      "That Clark County notice is a list of candidates. It does not list a statewide ballot question.",
    districtNote:
      "The same notice lists State Senate and State Assembly by district, then county offices, district court departments, and local offices. Those contests are not statewide. The notice is the Clark County Registrar’s certification for that county’s ballot.",
    sources: [
      {
        label: "Clark County Registrar of Voters — notice of the November 3, 2026 general election",
        href: "https://www.clarkcountynv.gov/adobe/assets/urn:aaid:aem:46b035ca-1d1f-4a0a-b748-a0f42dd45794/original/as/notice-general-election-26g.pdf",
      },
    ],
  },
  {
    code: "WI",
    checkedOn: CHECKED,
    intro:
      "The Wisconsin Elections Commission’s candidates-on-ballot report for the 2026 general election on November 3, 2026, printed August 25, 2026, lists these offices without a district number: Governor, Attorney General, Secretary of State, and State Treasurer. Representative in Congress, State Senator, and Representative to the Assembly are listed by district. The report does not include a United States Senator heading.",
    shortLead:
      "Wisconsin’s August 25, 2026 candidates-on-ballot report lists governor, attorney general, secretary of state, and state treasurer for November 3, 2026.",
    federal: ["Representative in Congress, by district"],
    statewide: ["Governor", "Attorney General", "Secretary of State", "State Treasurer"],
    measures: [],
    measureNote: "That candidates-on-ballot report does not list a referendum or constitutional question.",
    districtNote:
      "Representative in Congress, State Senator, and Representative to the Assembly appear by district in the same report.",
    sources: [
      {
        label: "Wisconsin Elections Commission — candidates on the ballot, November 3, 2026 general election",
        href: "https://elections.wi.gov/sites/default/files/documents/Candidates%20on%20Ballot%20By%20Election_November%203%202026%20General%20Election.pdf",
      },
    ],
  },
  {
    code: "NH",
    checkedOn: CHECKED,
    intro:
      "The New Hampshire Secretary of State’s 2026 general-election candidate list names Governor and United States Senator before any district heading. Representative in Congress and Executive Councilor are listed by district. The U.S. Senate Class II page, read October 18, 2026, includes New Hampshire among seats whose terms expire in 2027.",
    shortLead:
      "New Hampshire’s 2026 general-election candidate list names governor and United States senator as the offices before the district headings.",
    federal: ["United States Senator", "Representative in Congress, by district"],
    statewide: ["Governor", "United States Senator (Class II, term expires in 2027)"],
    measures: [],
    measureNote: "That candidate list does not list a ballot question.",
    districtNote:
      "After the two statewide offices, the list names Representative in Congress and Executive Councilor by district, then State Senator and State Representative by district, then county offices.",
    sources: [
      {
        label: "New Hampshire Secretary of State — 2026 general election candidate list",
        href: "https://mm.nh.gov/files/uploads/sos/docs/2026-ge-candidate-list.pdf",
      },
      CLASS_II,
    ],
  },
  {
    code: "ME",
    checkedOn: CHECKED,
    intro:
      "The Maine Secretary of State’s 2026 general-election candidate spreadsheet uses the office code US for the U.S. Senate contest and GOV for the governor contest. The 2026 office-order guide defines US as US Senator and GV as Governor. Representative to Congress is the code CG in that guide and is listed apart from those two offices. The U.S. Senate Class II page, read October 18, 2026, includes Maine among seats whose terms expire in 2027.",
    shortLead:
      "Maine’s 2026 candidate list and office-order guide name U.S. senator and governor as the statewide offices.",
    federal: ["US Senator", "Representative to Congress, by district"],
    statewide: ["US Senator (Class II, term expires in 2027)", "Governor"],
    measures: [],
    measureNote:
      "The 2026 candidate spreadsheet and the 2026 office-order guide do not list a ballot question.",
    districtNote:
      "The office-order guide places State Senator, State Representative, and county offices after Governor. The spreadsheet’s other codes are those district and county offices.",
    sources: [
      {
        label: "Maine Secretary of State — 2026 general election candidate list",
        href: "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/2026%20General%20Candidate%20List%20-%20FINAL.xlsx",
      },
      {
        label: "Maine Secretary of State — 2026 office listing",
        href: "https://www.maine.gov/sos/sites/maine.gov.sos/files/inline-files/2026%20Candidate%20Office%20Order.pdf",
      },
      CLASS_II,
    ],
  },
  {
    code: "IA",
    checkedOn: CHECKED,
    intro:
      "The Iowa Secretary of State’s candidate list for the November 3, 2026 general election names these offices that are not followed by a district number: United States Senator, Governor, Lieutenant Governor, Secretary of State, Auditor of State, Treasurer of State, Secretary of Agriculture, and Attorney General. United States Representative is listed by district. The U.S. Senate Class II page, read October 18, 2026, includes Iowa among seats whose terms expire in 2027.",
    shortLead:
      "Iowa’s November 3, 2026 candidate list names a U.S. Senate seat and seven statewide executive offices.",
    federal: ["United States Senator", "United States Representative, by district"],
    statewide: [
      "United States Senator (Class II, term expires in 2027)",
      "Governor",
      "Lieutenant Governor",
      "Secretary of State",
      "Auditor of State",
      "Treasurer of State",
      "Secretary of Agriculture",
      "Attorney General",
    ],
    measures: [],
    measureNote: "That candidate list does not list a public measure or constitutional amendment.",
    districtNote:
      "The same list continues with State Senator and State Representative by district.",
    sources: [
      {
        label: "Iowa Secretary of State — candidate list, November 3, 2026 general election",
        href: "https://sos.iowa.gov/sites/default/files/2026-08/2026%20General%20-%20Candidate%20List%20Database%20-%20All%20Elections_1.pdf",
      },
      CLASS_II,
    ],
  },
  {
    code: "AK",
    checkedOn: CHECKED,
    intro:
      "The Alaska Division of Elections candidate list for the November 3, 2026 general election, page last updated September 25, 2026, heads these contests before any Senate district: Governor / Lieutenant Governor, United States Senator, United States Representative, and Supreme Court. The petitions page lists two measures with the status “Will appear on General Election ballot”: 25USCV, described there as an initiative to require that only United States citizens may be qualified voters in Alaska elections, and 24ESEG, described there as an initiative to repeal the open primary and ranked choice general elections. The U.S. Senate Class II page, read October 18, 2026, includes Alaska among seats whose terms expire in 2027.",
    shortLead:
      "Alaska’s November 3, 2026 candidate list includes governor and lieutenant governor, U.S. senator, U.S. representative, and a Supreme Court contest, plus two initiatives the petitions page says will appear.",
    federal: ["United States Senator", "United States Representative"],
    statewide: [
      "Governor / Lieutenant Governor",
      "United States Senator (Class II, term expires in 2027)",
      "United States Representative",
      "Supreme Court",
    ],
    measures: [
      "25USCV, an initiative to require that only United States citizens may be qualified voters in Alaska elections",
      "24ESEG, repeal the open primary and ranked choice general elections",
    ],
    measureNote:
      "Both of those petitions are marked “Will appear on General Election ballot.” The same page lists 25ANMA, an initiative to establish a regulated natural medicine program, as petition booklets circulating, with a booklet filing deadline of September 14, 2026. That status is not “Will appear on General Election ballot.” Older pamphlet links on the page are not marked as 2026 general-election measures.",
    districtNote:
      "After United States Representative, the candidate list names Senate districts and House districts, then State Superior Court and State District Court by number. Those court contests are not the statewide Supreme Court heading.",
    sources: [
      {
        label: "Alaska Division of Elections — 2026 general election candidate list",
        href: "https://www.elections.alaska.gov/candidates/?election=26genr",
      },
      {
        label: "Alaska Division of Elections — petitions and ballot measures",
        href: "https://www.elections.alaska.gov/petitions-and-ballot-measures/",
      },
      CLASS_II,
    ],
  },
  {
    code: "MN",
    checkedOn: CHECKED,
    intro:
      "The Minnesota Secretary of State candidate file cand.txt for the November 3, 2026 election includes these office titles that are not district, county, or local contests: U.S. Senator, Governor & Lt Governor, Secretary of State, State Auditor, Attorney General, Associate Justice - Supreme Court 1, Associate Justice - Supreme Court 4, and Judge - Court of Appeals seats 1, 7, 13, 15, and 18. The constitutional-amendments page says one proposed constitutional amendment is on the November 3, 2026 ballot, titled “Increasing funding to school districts.” The U.S. Senate Class II page, read October 18, 2026, includes Minnesota among seats whose terms expire in 2027.",
    shortLead:
      "Minnesota’s November 3, 2026 candidate file lists a U.S. Senate seat, statewide executive offices, Supreme Court and Court of Appeals seats, and one constitutional amendment.",
    federal: ["U.S. Senator", "U.S. Representative, by district"],
    statewide: [
      "U.S. Senator (Class II, term expires in 2027)",
      "Governor & Lt Governor",
      "Secretary of State",
      "State Auditor",
      "Attorney General",
      "Associate Justice - Supreme Court 1",
      "Associate Justice - Supreme Court 4",
      "Judge - Court of Appeals 1",
      "Judge - Court of Appeals 7",
      "Judge - Court of Appeals 13",
      "Judge - Court of Appeals 15",
      "Judge - Court of Appeals 18",
    ],
    measures: ["Increasing funding to school districts"],
    measureNote:
      "The Secretary of State prints this question for November 3, 2026: “Shall the Minnesota Constitution be amended to increase the funding going to all school districts from the permanent school fund, which is a fund that supports school districts without raising individual income or property taxes, effective July 1, 2027?” That page also states that failure to vote on a constitutional amendment will have the same effect as voting no on the amendment. The page says the amendment was authorized by 2026 Laws of Minnesota Chapter 114.",
    districtNote:
      "The same candidate file lists U.S. Representative, State Senator, and State Representative by district, plus county and local offices.",
    sources: [
      {
        label: "Minnesota Secretary of State — candidate file for November 3, 2026",
        href: "https://electionresultsfiles.sos.mn.gov/20261103/cand.txt",
      },
      {
        label: "Minnesota Secretary of State — constitutional amendments",
        href: "https://www.sos.mn.gov/elections-voting/whats-on-my-ballot/constitutional-amendments/",
      },
      CLASS_II,
    ],
  },
  {
    code: "VA",
    checkedOn: CHECKED,
    intro:
      "The Virginia Department of Elections candidate list for the November 3, 2026 general election, all offices, uses the office label “Member, United States Senate” with jurisdiction “Statewide.” “Member, House of Representatives” is the other federal office label on that list. The upcoming-elections page for November 3, 2026 also names a Virginia House of Delegates, District 20 special election, local offices, proposed constitutional amendments, and local referendums. That page does not name a governor contest. The U.S. Senate Class II page, read October 18, 2026, includes Virginia among seats whose terms expire in 2027.",
    shortLead:
      "Virginia’s November 3, 2026 candidate list marks United States Senate as statewide and lists U.S. House by office label.",
    federal: ["Member, United States Senate", "Member, House of Representatives"],
    statewide: ["Member, United States Senate (Class II, term expires in 2027)"],
    measures: [],
    measureNote:
      "The upcoming-elections page says proposed constitutional amendments are on the November 3, 2026 ballot and points to a separate amendments file. That page’s text does not print the amendment titles. A Department of Elections news release dated September 11, 2026 says three proposed amendments to the Constitution of Virginia are on the ballot and does not print their titles.",
    districtNote:
      "The all-offices candidate list also includes local offices such as town council, city council, school board, mayor, and Commonwealth’s Attorney. The upcoming-elections page names a House of Delegates District 20 special election. Those contests are not statewide.",
    sources: [
      {
        label: "Virginia Department of Elections — November 3, 2026 general election, all offices",
        href: "https://www.elections.virginia.gov/casting-a-ballot/candidate-list/november-3-2026-gen-elect-all-offices/",
      },
      {
        label: "Virginia Department of Elections — upcoming elections",
        href: "https://www.elections.virginia.gov/casting-a-ballot/calendars-schedules/upcoming-elections.html",
      },
      {
        label: "Virginia Department of Elections — early voting news release, September 11, 2026",
        href: "https://www.elections.virginia.gov/news-releases/name-34420-en.html",
      },
      CLASS_II,
    ],
  },
  {
    code: "NJ",
    checkedOn: CHECKED,
    intro:
      "The New Jersey Division of Elections 2026 election-information page’s visible general-election candidate section lists official general-election candidates for U.S. Senate and for U.S. House of Representatives. The U.S. Senate Class II page, read October 18, 2026, includes New Jersey among seats whose terms expire in 2027.",
    shortLead:
      "New Jersey’s 2026 election-information page lists official general-election candidates for U.S. Senate and U.S. House.",
    federal: ["U.S. Senate", "U.S. House of Representatives, by district"],
    statewide: ["U.S. Senate (Class II, term expires in 2027)"],
    measures: [],
    measureNote:
      "The visible general-election candidate section of that page does not list a public question.",
    districtNote:
      "U.S. House of Representatives is listed by congressional district on that page.",
    sources: [
      {
        label: "New Jersey Division of Elections — 2026 election information",
        href: "https://nj.gov/state/elections/election-information-2026.shtml",
      },
      CLASS_II,
    ],
  },
  {
    code: "MA",
    checkedOn: CHECKED,
    intro:
      "The Massachusetts Secretary of the Commonwealth’s 2026 state-election candidates page lists Senator in Congress, Governor & Lieutenant Governor, Attorney General, Secretary of State, Treasurer, and Auditor. Representative in Congress is listed by district. The U.S. Senate Class II page, read October 18, 2026, includes Massachusetts among seats whose terms expire in 2027.",
    shortLead:
      "Massachusetts’ 2026 state-election candidates page lists U.S. senator, governor and lieutenant governor, and four other statewide executive offices.",
    federal: ["Senator in Congress", "Representative in Congress, by district"],
    statewide: [
      "Senator in Congress (Class II, term expires in 2027)",
      "Governor & Lieutenant Governor",
      "Attorney General",
      "Secretary of State",
      "Treasurer",
      "Auditor",
    ],
    measures: [],
    measureNote: "That candidates page does not list a ballot question.",
    districtNote:
      "The same page also lists Councillor, Senator in General Court, Representative in General Court, District Attorney, and county offices. Those contests are not statewide.",
    sources: [
      {
        label: "Massachusetts Secretary of the Commonwealth — 2026 state election candidates",
        href: "https://www.sec.state.ma.us/divisions/elections/research-and-statistics/2026-state-election-candidates.htm",
      },
      CLASS_II,
    ],
  },
  {
    code: "WA",
    checkedOn: CHECKED,
    intro:
      "The Washington Secretary of State’s certification of candidates for the November 3, 2026 general election, dated August 21, 2026, and issued under RCW 29A.52.321, lists U.S. Representative by congressional district and state legislative offices by legislative district. The certification marks these Supreme Court contests statewide: Justice Position 2 (2-year unexpired term), Justice Position 3 (6-year term), Justice Position 4 (6-year term), Justice Position 5 (2-year unexpired term), and Justice Position 7 (6-year term). The certification does not include a United States Senator heading or a Governor heading.",
    shortLead:
      "Washington’s August 21, 2026 certification lists U.S. House by district and five Supreme Court contests marked statewide.",
    federal: ["U.S. Representative, by congressional district"],
    statewide: [
      "Supreme Court Justice Position 2 (2-year unexpired term)",
      "Supreme Court Justice Position 3 (6-year term)",
      "Supreme Court Justice Position 4 (6-year term)",
      "Supreme Court Justice Position 5 (2-year unexpired term)",
      "Supreme Court Justice Position 7 (6-year term)",
    ],
    measures: [],
    measureNote: "That certification of candidates does not list a statewide ballot measure.",
    districtNote:
      "State Senator and State Representative are listed by legislative district. Court of Appeals judges are listed by division and district. A superior-court contest on the certification is listed for a county.",
    sources: [
      {
        label: "Washington Secretary of State — certification of candidates, November 3, 2026 general election",
        href: "https://www.sos.wa.gov/sites/default/files/2026-08/2026%20Certification%20of%20Candidates%20to%20General%20Election.pdf",
      },
    ],
  },
  {
    code: "CO",
    checkedOn: CHECKED,
    intro:
      "The Colorado Secretary of State’s 2026 general-election official candidate list, certified to the counties on September 4, uses District “State” for US Senate, Governor, Lt. Governor, Secretary of State, State Treasurer, Attorney General, Colorado Supreme Court, and Colorado Court of Appeals. The amendments-and-propositions page says it is an official list of state certified ballot measures on the 2026 November general-election ballot. The U.S. Senate Class II page, read October 18, 2026, includes Colorado among seats whose terms expire in 2027.",
    shortLead:
      "Colorado’s September 4, 2026 candidate list marks a U.S. Senate seat, statewide executive offices, and statewide courts, and the state lists certified 2026 ballot measures.",
    federal: ["US Senate", "US House of Representatives, by district"],
    statewide: [
      "US Senate (Class II, term expires in 2027)",
      "Governor",
      "Lt. Governor",
      "Secretary of State",
      "State Treasurer",
      "Attorney General",
      "Colorado Supreme Court",
      "Colorado Court of Appeals",
    ],
    measures: [
      "Initiative #95, Law Enforcement Reporting Requirements to Federal Authorities",
      "Initiative #177, Right to Natural Gas",
      "Initiative #302, Constitutional Right to Hunt and Fish",
      "Initiative #362, Mail Ballot Voter Identification",
      "Initiative #234, Plain Language Ballot Questions",
      "Initiative #256, Congressional Redistricting",
      "Initiative #195, Graduated Income Tax",
      "Senate Bill 26-135, State Public K-12 Education Funding",
      "Initiative #85, Penalties for Fentanyl Crimes",
      "Initiative #108, Penalties for Human Trafficking of a Minor",
      "Initiative #109, Male and Female Participation in School Sports",
      "Initiative #110, Prohibit Certain Surgeries on Minors",
      "Initiative #232, Income Tax Rate Cap",
      "Initiative #308, Designate Sporting Goods Sales Tax Revenue for Conservation",
      "Senate Bill 26-172, Front Range Passenger Rail District",
    ],
    measureNote:
      "Those titles are the headings on the Secretary of State’s page of state certified ballot measures for the 2026 November general election.",
    districtNote:
      "On the candidate list, US House of Representatives, State Senate, State Board of Education, and University of Colorado Board of Regents are not marked District “State.” RTD Board of Directors contests on that list are not statewide.",
    sources: [
      {
        label: "Colorado Secretary of State — 2026 general election official candidate list",
        href: "https://www.coloradosos.gov/pubs/elections/vote/generalCandidates.html",
      },
      {
        label: "Colorado Secretary of State — amendments and propositions on the 2026 ballot",
        href: "https://www.coloradosos.gov/pubs/elections/Initiatives/ballot/contacts/2026.html",
      },
      CLASS_II,
    ],
  },
  {
    code: "TN",
    checkedOn: CHECKED,
    intro:
      "The Tennessee Secretary of State’s 2026 candidate-lists page publishes lists for Governor, United States Senate, United States House, Tennessee Senate, and Tennessee House. The proposed-constitutional-amendments page says three proposed amendments will appear on the November 2026 ballot. The U.S. Senate Class II page, read October 18, 2026, includes Tennessee among seats whose terms expire in 2027.",
    shortLead:
      "Tennessee’s 2026 candidate-lists page publishes governor and United States Senate lists, and three constitutional amendments are set for the November 2026 ballot.",
    federal: ["United States Senate", "United States House, by district"],
    statewide: ["Governor", "United States Senate (Class II, term expires in 2027)"],
    measures: [
      "Constitutional Amendment #1 (Senate Joint Resolution 919 of the 113th General Assembly and Senate Joint Resolution 25 of the 114th), on bail",
      "Constitutional Amendment #2 (House Joint Resolution 81 of the 113th General Assembly and Senate Joint Resolution 1 of the 114th), on a state property tax",
      "Constitutional Amendment #3 (House Joint Resolution 94 of the 113th General Assembly and Senate Joint Resolution 9 of the 114th), on crime victims’ rights",
    ],
    measureNote:
      "The Secretary of State says Constitutional Amendment #1 changes Article I, section 15 by allowing a court to hold a defendant without bail before trial for listed offenses and by requiring the court to state the reasons for granting or denying bail in those cases. Amendment #2 adds text to Article II, section 28 that prohibits the Legislature from imposing a state property tax on real, personal, or mixed property. Amendment #3 changes Article I, section 35 on crime victims’ rights. The same page lists three resolutions as proposed amendments for a November 2030 ballot, not for November 2026.",
    districtNote:
      "United States House, Tennessee Senate, and Tennessee House are separate lists on the candidate-lists page.",
    sources: [
      {
        label: "Tennessee Secretary of State — 2026 candidate lists",
        href: "https://sos.tn.gov/elections/2026-candidate-lists",
      },
      {
        label: "Tennessee Secretary of State — proposed constitutional amendments",
        href: "https://sos.tn.gov/elections/announcements/2026-proposed-constitutional-amendments",
      },
      CLASS_II,
    ],
  },
  {
    code: "IN",
    checkedOn: CHECKED,
    intro:
      "The Indiana Election Division’s abbreviated candidate list for the 2026 general election on November 3, 2026 uses these office categories that are not county, township, city, town, or school offices: Secretary of State, State Comptroller (Auditor of State), and Treasurer of State. US Representative, State Senator, and State Representative are separate categories. The file does not include a Governor category or a United States Senate category.",
    shortLead:
      "Indiana’s November 3, 2026 abbreviated candidate list names secretary of state, state comptroller, and treasurer of state.",
    federal: ["US Representative, by district"],
    statewide: [
      "Secretary of State",
      "State Comptroller (Auditor of State)",
      "Treasurer of State",
    ],
    measures: [],
    measureNote: "That abbreviated candidate list does not include a public-question category.",
    districtNote:
      "The same file’s other office categories are US Representative, the state legislature, judges, prosecuting attorney, and county, township, city, town, and school offices.",
    sources: [
      {
        label: "Indiana Election Division — abbreviated candidate list, 2026 general election",
        href: "https://www.in.gov/sos/elections/files/Candidate_List_Abbreviated_20260922_011251PM.xlsx",
      },
    ],
  },
  {
    code: "MO",
    checkedOn: CHECKED,
    intro:
      "The Missouri Secretary of State’s certification for the November 3, 2026 general election, dated August 25, 2026, certifies State Auditor for the Republican, Democratic, and Libertarian parties, and certifies U.S. Representative, State Senator, and State Representative by district. A separate judicial certificate in the same booklet lists a contest for the Missouri Supreme Court and Missouri Court of Appeals contests by district. The partisan certificate does not include a Governor heading or a U.S. Senator heading.",
    shortLead:
      "Missouri’s August 25, 2026 certification lists state auditor and a Missouri Supreme Court contest for the November 3, 2026 general election.",
    federal: ["U.S. Representative, by district"],
    statewide: ["State Auditor", "Missouri Supreme Court"],
    measures: [],
    measureNote:
      "That certification booklet certifies candidates and party emblems. It does not list a statewide ballot measure.",
    districtNote:
      "U.S. Representative, State Senator, State Representative, and circuit judge are certified by district. The judicial certificate lists Missouri Court of Appeals candidates for the Eastern, Southern, and Western districts, and associate circuit judges by circuit.",
    sources: [
      {
        label: "Missouri Secretary of State — certification of candidates, November 3, 2026 general election",
        href: "https://www.sos.mo.gov/CMSImages/ElectionCandidates/2026GeneralElectionCertifiedCandidates.pdf",
      },
    ],
  },
  {
    code: "MD",
    checkedOn: CHECKED,
    intro:
      "The Maryland State Board of Elections 2026 gubernatorial general candidate page, with the statewide CSV marked last updated October 16, 2026 at 6:00 p.m., groups these offices: Governor / Lt. Governor, Comptroller, Attorney General, and Judge, Appellate Court of Maryland At Large. Representative in Congress, State Senator, and House of Delegates are grouped by district. The page’s office groups do not include a United States Senate heading.",
    shortLead:
      "Maryland’s 2026 general candidate page lists governor and lieutenant governor, comptroller, attorney general, and an at-large appellate judgeship.",
    federal: ["Representative in Congress, by district"],
    statewide: [
      "Governor / Lt. Governor",
      "Comptroller",
      "Attorney General",
      "Judge, Appellate Court of Maryland At Large",
    ],
    measures: [],
    measureNote:
      "That statewide candidate-list page does not list a ballot question.",
    districtNote:
      "The same page groups Representative in Congress, State Senator, and House of Delegates by district, and it groups Judge of the Circuit Court and Appellate Circuit 4 separately from the at-large appellate court.",
    sources: [
      {
        label: "Maryland State Board of Elections — 2026 general election statewide candidate list",
        href: "https://elections.maryland.gov/elections/2026/general_candidates/2026_GG_statewide_candidatelist.html",
      },
    ],
  },
  {
    code: "SC",
    checkedOn: CHECKED,
    intro:
      "The South Carolina State Election Commission candidate search for the November 3, 2026 statewide general election, election 22596, lists these offices with no district: Governor and Lieutenant Governor, Secretary of State, State Treasurer, Attorney General, Comptroller General, State Superintendent of Education, Commissioner of Agriculture, and U.S. Senate. U.S. House of Representatives is listed for districts 1 through 7. The U.S. Senate Class II page, read October 18, 2026, includes South Carolina among seats whose terms expire in 2027.",
    shortLead:
      "South Carolina’s November 3, 2026 statewide general candidate search lists U.S. Senate and seven statewide executive offices.",
    federal: ["U.S. Senate", "U.S. House of Representatives, districts 1 through 7"],
    statewide: [
      "Governor and Lieutenant Governor",
      "Secretary of State",
      "State Treasurer",
      "Attorney General",
      "Comptroller General",
      "State Superintendent of Education",
      "Commissioner of Agriculture",
      "U.S. Senate (Class II, term expires in 2027)",
    ],
    measures: [],
    measureNote:
      "That candidate search for election 22596 does not list a ballot question.",
    districtNote:
      "U.S. House contests in that search are numbered districts 1 through 7.",
    sources: [
      {
        label: "South Carolina State Election Commission — candidate search, November 3, 2026 statewide general election",
        href: "https://vrems.scvotes.sc.gov/Candidate/CandidateSearch?electionId=22596",
      },
      CLASS_II,
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
