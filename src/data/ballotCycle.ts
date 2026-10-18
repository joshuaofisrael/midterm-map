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
      "The upcoming-elections page says proposed constitutional amendments are on the November 3, 2026 ballot and points to a separate amendments file. That page’s text does not print the amendment titles.",
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

function categorySentences(
  dates: StateElectionDates,
  categories: Array<StateElectionDates["facts"][number]["category"]>,
): string {
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
