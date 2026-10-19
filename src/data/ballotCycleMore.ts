import type { BallotCycle } from "./ballotCycle";
import type { OfficialSource } from "./types";

/**
 * November 3, 2026 ballot facts for the states not covered in the first two
 * batches, plus the District of Columbia. Kansas already had a hub; its
 * ballot block was read from the same candidate-information page.
 * Each line was read from the cited official page on CHECKED.
 */
const CHECKED = "October 19, 2026";

const CLASS_II: OfficialSource = {
  label: "U.S. Senate — Class II, terms expire in 2027",
  href: "https://www.senate.gov/senators/Class_II.htm",
};

export const MORE_BALLOT_CYCLES: BallotCycle[] = [
  {
    code: "KS",
    checkedOn: CHECKED,
    intro:
      "The Kansas Secretary of State’s candidate-information page, under “Offices to be Elected or Retained in 2026,” lists 1 U.S. Senator, Governor/Lt. Governor, Secretary of State, Attorney General, State Treasurer, Commissioner of Insurance, 1 Kansas Supreme Court justice, and 6 Kansas Court of Appeals judges. The judicial lines are marked “as of July 1, 2025.” The same page lists all 4 U.S. Representatives. The proposed-constitutional-amendments page says one constitutional amendment will be voted on at the November 3, 2026 general election. The U.S. Senate Class II page, read October 19, 2026, includes Kansas among seats whose terms expire in 2027.",
    shortLead:
      "Kansas’s candidate-information page lists a U.S. Senate seat, governor and lieutenant governor, four other statewide executive offices, and statewide judicial retentions, plus one constitutional amendment.",
    federal: ["1 U.S. Senator", "All 4 U.S. Representatives"],
    statewide: [
      "1 U.S. Senator (Class II, term expires in 2027)",
      "Governor/Lt. Governor",
      "Secretary of State",
      "Attorney General",
      "State Treasurer",
      "Commissioner of Insurance",
      "1 Kansas Supreme Court Justice (as of July 1, 2025)",
      "6 Kansas Court of Appeals Judges (as of July 1, 2025)",
    ],
    measures: [
      "A constitutional amendment on qualifications of electors. The page’s explanatory statement says the amendment would clarify that only a person who is a citizen of the United States is eligible to vote in this state.",
    ],
    measureNote:
      "The proposed-constitutional-amendments page does not print a short title. It says the amendment will be voted on during the November 3, 2026 general election, prints the explanatory statement quoted above, and says the ballot question begins “Shall the following be adopted?” followed by “§ 1. Qualifications of electors.” The candidate-list page at elections_upcoming_candidate.aspx returned 403 on October 19, 2026, so no office heading was taken from it.",
    districtNote:
      "The same offices list includes Senate District 24, all 125 State Representatives, State Board of Education seats 1, 3, 5, 7, and 9, and district court and district magistrate judges. Those judicial counts are marked as of July 1, 2025.",
    sources: [
      {
        label: "Kansas Secretary of State — offices to be elected or retained in 2026",
        href: "https://sos.ks.gov/elections/candidate-information.html",
      },
      {
        label: "Kansas Secretary of State — proposed constitutional amendments",
        href: "https://www.sos.ks.gov/elections/proposed-constitutional-amendments.html",
      },
      CLASS_II,
    ],
  },
  {
    code: "AL",
    checkedOn: CHECKED,
    intro:
      "The Walker County official ballot for the November 3, 2026 general and constitutional amendment election prints these statewide offices: United States Senator, Governor, Lieutenant Governor, Attorney General, Secretary of State, State Treasurer, State Auditor, Commissioner of Agriculture and Industries, Public Service Commission Places No. 1 and No. 2, Associate Justice of the Supreme Court Places 7 and 8, Court of Civil Appeals Judge Places 4 and 5, and Court of Criminal Appeals Judge Places 4 and 5. United States Representative is printed by congressional district. The Secretary of State’s August 26, 2026 certification prescribes four statewide constitutional amendments for that election. The U.S. Senate Class II page, read October 19, 2026, includes Alabama among seats whose terms expire in 2027.",
    shortLead:
      "The Walker County November 3, 2026 ballot prints Alabama’s U.S. Senate seat, statewide executive offices, and statewide appellate offices, and the Secretary of State certified four statewide amendments.",
    federal: ["United States Senator", "United States Representative, by congressional district"],
    statewide: [
      "United States Senator (Class II, term expires in 2027)",
      "Governor",
      "Lieutenant Governor",
      "Attorney General",
      "Secretary of State",
      "State Treasurer",
      "State Auditor",
      "Commissioner of Agriculture and Industries",
      "Public Service Commission, Place No. 1",
      "Public Service Commission, Place No. 2",
      "Associate Justice of the Supreme Court, Place 7",
      "Associate Justice of the Supreme Court, Place 8",
      "Court of Civil Appeals Judge, Place 4",
      "Court of Civil Appeals Judge, Place 5",
      "Court of Criminal Appeals Judge, Place 4",
      "Court of Criminal Appeals Judge, Place 5",
    ],
    measures: [
      "Statewide Amendment 1 (Act 2026-341), on election of a lieutenant governor if the office becomes vacant during the first two years of a term, the salary of the lieutenant governor and legislative officers, and approval of legislative travel expenditures",
      "Statewide Amendment 2 (Act 2026-378), on a process for creating a consolidated county school system",
      "Statewide Amendment 3 (Act 2026-379), on a daily Pledge of Allegiance and student-initiated, student-led prayer in public K-12 schools",
      "Statewide Amendment 4 (Act 2026-424), on broadcasting or sanctioning the first stanza of The Star-Spangled Banner at least once per week in public K-12 schools",
    ],
    measureNote:
      "The August 26, 2026 certification says the attached language is the prescribed language for the proposed constitutional amendments on the November 3, 2026 general-election ballot. The Fair Ballot Commission statements use the same question text and say each will be listed as Statewide Amendment 1 through Statewide Amendment 4. The full question text is on that certification.",
    districtNote:
      "The Walker County ballot also prints a United States Representative district, state senate and state house districts, circuit and district judges, county offices, and proposed amendments of local application. State Board of Education seats on the August 28, 2026 party certification are by district.",
    sources: [
      {
        label: "Alabama Secretary of State — Walker County sample ballot, November 3, 2026",
        href: "https://www.sos.alabama.gov/sites/default/files/sample-ballots/2026/gen/Walker-Sample.pdf",
      },
      {
        label: "Alabama Secretary of State — certification of constitutional amendments, August 26, 2026",
        href: "https://www.sos.alabama.gov/sites/default/files/election-2026/2026GeneralElectionStateCertificationofConstitutionalAmendments.pdf",
      },
      {
        label: "Alabama Secretary of State — Fair Ballot Commission statewide amendment statements",
        href: "https://www.sos.alabama.gov/alabama-votes/voter/ballot-measures/statewide",
      },
      CLASS_II,
    ],
  },
  {
    code: "AR",
    checkedOn: CHECKED,
    intro:
      "The Arkansas Secretary of State’s initiatives-and-referenda page, under proposed initiatives certified by the General Assembly, lists Issue No. 1, Issue No. 2, Issue No. 3, and Issue No. 4. Each issue file says the General Assembly refers it to a vote of the people on November 3, 2026. A candidate or office list for that general election was not retrieved as text on October 19, 2026, so this page does not name candidate offices.",
    shortLead:
      "Arkansas’s Secretary of State lists four measures referred to the November 3, 2026 ballot. A general-election candidate list was not retrieved as text on October 19, 2026.",
    federal: [],
    statewide: [],
    measures: [
      "Issue No. 1, popular name “The Citizens Only Voting Amendment,” providing that only a citizen of the United States meeting the qualifications of an elector may vote in an election in this state",
      "Issue No. 2, popular name on the right to keep and bear arms, amending Arkansas Constitution Article 2, § 5",
      "Issue No. 3, popular name on economic development, authorizing the General Assembly to provide for economic development districts",
      "Issue No. 4, the Arkansas Water, Waste Disposal, and Pollution Abatement Facilities Financing Act of 2025, on general obligation bonds in a total principal amount not to exceed $500,000,000",
    ],
    measureNote:
      "The initiatives page says “None for the 2026 General Election” under proposed initiatives certified by the Attorney General, and it says posting is not confirmation of circulation or of ballot placement. The four issues above are the General Assembly referrals, and each issue file says it will appear on the November 3, 2026 ballot.",
    districtNote:
      "This page does not list federal or statewide candidate offices. The candidate search at candidates.arkansas.gov did not return a readable office list on October 19, 2026. The 2026 election calendar describes November 3 as the general election, nonpartisan runoff election, and annual school runoff election.",
    sources: [
      {
        label: "Arkansas Secretary of State — initiatives and referenda",
        href: "https://www.sos.arkansas.gov/elections/initiatives-and-referenda",
      },
      {
        label: "Arkansas Secretary of State — Issue No. 1",
        href: "https://www.sos.arkansas.gov/uploads/elections/Issue_No._1_HJR_1018_of_2026_.pdf_.pdf",
      },
      {
        label: "Arkansas Secretary of State — Issue No. 2",
        href: "https://www.sos.arkansas.gov/uploads/elections/Issue_No._2_SJR_11_of_2026_.pdf",
      },
      {
        label: "Arkansas Secretary of State — Issue No. 3",
        href: "https://www.sos.arkansas.gov/uploads/elections/Issue_No._3_SJR_15_of_2026_.pdf",
      },
      {
        label: "Arkansas Secretary of State — Issue No. 4",
        href: "https://www.sos.arkansas.gov/uploads/elections/Issue_No._4_Act_578_of_2026_.pdf",
      },
    ],
  },
  {
    code: "CT",
    checkedOn: CHECKED,
    intro:
      "The Andover, Connecticut official ballot for the November 3, 2026 state election prints Governor, Secretary of the State, Treasurer, Comptroller, and Attorney General, each “Vote for One.” Representative in Congress is printed on that ballot for Congressional District 2. The Secretary of the State’s 2026 certificate-of-endorsement index lists United States Congress as congressional districts 1 through 5 and does not list a United States Senate heading. No United States Senate column appears on the Andover ballot. The Democratic statewide endorsement file linked from that index does not print a U.S. Senate office.",
    shortLead:
      "Andover’s official November 3, 2026 state-election ballot prints governor and four other statewide executive offices, and Representative in Congress by district.",
    federal: ["Representative in Congress, by congressional district"],
    statewide: ["Governor", "Secretary of the State", "Treasurer", "Comptroller", "Attorney General"],
    measures: [],
    measureNote:
      "The Andover official ballot is one sheet and prints no ballot question. The Secretary of the State’s questions-on-the-ballot page lists November 6, 2018 ballot questions and does not list a November 3, 2026 question. That page does not say there is no 2026 statewide question.",
    districtNote:
      "The Andover ballot also prints State Senator, State Representative, and Judge of Probate for the districts named on that ballot. The Democratic statewide endorsement file prints “Lt. Governor” as its own office name beside Governor. Only the Andover town ballot was read in full. The Republican statewide endorsement file was not re-read on October 19, 2026.",
    sources: [
      {
        label: "Connecticut Secretary of the State — Andover official ballot, November 3, 2026 state election",
        href: "https://portal.ct.gov/-/media/sots/electionservices/town_ballots/2026/nov-ada-2026/andover_sample_ada.pdf",
      },
      {
        label: "Connecticut Secretary of the State — November 3, 2026 state election sample town ballots",
        href: "https://portal.ct.gov/sots/election-services/town-ballots/2026-november-town-election-ballots",
      },
      {
        label: "Connecticut Secretary of the State — questions on the ballot",
        href: "https://portal.ct.gov/sots/election-services/ballotquestions/questions-on-the-ballot",
      },
      {
        label: "Connecticut Secretary of the State — 2026 certificates of endorsement",
        href: "https://portal.ct.gov/sots/election-services/certificate-of-endorsement/2026-certificate-of-endorsements",
      },
    ],
  },
  {
    code: "DE",
    checkedOn: CHECKED,
    intro:
      "The Delaware Department of Elections filed-candidate list for the November 3, 2026 statewide general election, last updated October 15, 2026, marks these offices Statewide: U.S. Senator, Representative in Congress, Attorney General, Auditor of Accounts, and State Treasurer. The Election District 10-05 official ballot for that election prints the same five offices. No governor contest appears on that list or that ballot. The U.S. Senate Class II page, read October 19, 2026, includes Delaware among seats whose terms expire in 2027.",
    shortLead:
      "Delaware’s November 3, 2026 candidate list marks U.S. Senator, Representative in Congress, attorney general, auditor of accounts, and state treasurer as statewide.",
    federal: [
      "U.S. Senator",
      "Representative in Congress (the candidate list marks this office Statewide and does not number a district)",
    ],
    statewide: [
      "U.S. Senator (Class II, term expires in 2027)",
      "Attorney General",
      "Auditor of Accounts",
      "State Treasurer",
    ],
    measures: [],
    measureNote:
      "The filed-candidate list does not mention a ballot measure. The Election District 10-05 sample does not include a question. No Department of Elections page read on October 19, 2026 catalogs 2026 statewide ballot measures.",
    districtNote:
      "The same candidate list and the 10-05 sample include state senate and state representative districts and New Castle County offices. The candidate list also includes Kent and Sussex county offices. Representative in Congress is not divided into numbered districts on that list.",
    sources: [
      {
        label: "Delaware Department of Elections — filed candidates, November 3, 2026 statewide general",
        href: "https://elections.delaware.gov/candidates/candidatelist/genl_fcddt_2026.html",
      },
      {
        label: "Delaware Department of Elections — Election District 10-05 official ballot, November 3, 2026",
        href: "https://elections.delaware.gov/elections/general/sampleballots/GE2026/10-05.html",
      },
      CLASS_II,
    ],
  },
  {
    code: "DC",
    checkedOn: CHECKED,
    intro:
      "The District of Columbia Board of Elections November 3, 2026 general-election calendar, revised October 1, 2026, lists Delegate to the United States House of Representatives, Mayor, Chairman of the Council, At-large Member of the Council, Attorney General, United States Senator, and United States Representative. The Ward 1 official ballot prints those contests. The voter guide says Initiative Measure No. 86, Prohibiting Force-Feeding of Birds Act of 2026, will appear on that ballot. The District’s calendar does not list a constitutional U.S. Senate seat.",
    shortLead:
      "The D.C. Board of Elections November 3, 2026 calendar lists Delegate to the U.S. House, mayor, council-wide offices, attorney general, and the Board’s United States Senator and United States Representative contests, plus Initiative Measure No. 86.",
    federal: ["Delegate to the United States House of Representatives"],
    statewide: [
      "Mayor of the District of Columbia",
      "Chairman of the Council of the District of Columbia",
      "At-large Member of the Council of the District of Columbia",
      "Attorney General for the District of Columbia",
      "United States Senator",
      "United States Representative",
    ],
    measures: ["Initiative Measure No. 86, Prohibiting Force-Feeding of Birds Act of 2026"],
    measureNote:
      "The voter guide says that initiative will appear on the November 3, 2026 general-election ballot. The Ward 1 ballot prints the short statement and the choices “Yes, to approve” and “No, to reject.” The Board’s current-measures page lists other proposal titles, including withdrawn items, and does not say those other titles are on this ballot.",
    districtNote:
      "The calendar also lists Ward Member of the Council for Wards 1, 3, 5, and 6, State Board of Education members for those wards, and Advisory Neighborhood Commissioner. The “United States Senator” and “United States Representative” lines are the labels the Board prints; they are not a constitutional U.S. Senate contest.",
    sources: [
      {
        label: "D.C. Board of Elections — November 3, 2026 general election calendar, revised October 1, 2026",
        href: "https://www.dcboe.org/getContentAsset/4d04f4a1-fb2a-4f8a-809f-d3f708f232df/5ebbd046-860b-4ee1-81c8-43d0e3bc446e/2026-General-Election-Calendar-Version-09292026.pdf",
      },
      {
        label: "D.C. Board of Elections — Ward 1 official ballot, November 3, 2026",
        href: "https://www.dcboe.org/getContentAsset/bf78fba0-50f2-40c4-ad32-0f78255d725a/5ebbd046-860b-4ee1-81c8-43d0e3bc446e/Ward1C.pdf",
      },
      {
        label: "D.C. Board of Elections — November 3, 2026 voter guide",
        href: "https://www.dcboe.org/getContentAsset/5a9ceeda-114c-4171-810d-1317c9e06b0e/5ebbd046-860b-4ee1-81c8-43d0e3bc446e/_-DCBOE-Voter-Guide-Web-Smaller-File.pdf",
      },
    ],
  },
  {
    code: "HI",
    checkedOn: CHECKED,
    intro:
      "The Hawaii Office of Elections proclamation signed May 11, 2026 calls the November 3, 2026 general election for two Representatives to serve in the Congress of the United States, one Governor and one Lieutenant Governor, five members of the Board of Trustees of the Office of Hawaiian Affairs, and constitutional amendments, if any. The 2026 general ballot proofs print U.S. Representative District I and District II, one combined Governor and Lieutenant Governor contest, Office of Hawaiian Affairs trustee contests, and two constitutional questions. No U.S. Senate contest appears in the proclamation or those proofs.",
    shortLead:
      "Hawaii’s May 11, 2026 proclamation and the general-election ballot proofs list U.S. House by district, governor and lieutenant governor, Office of Hawaiian Affairs trustees, and two constitutional questions.",
    federal: ["U.S. Representative, District I", "U.S. Representative, District II"],
    statewide: [
      "Governor and Lieutenant Governor",
      "Office of Hawaiian Affairs At-Large Trustee (vote for not more than three)",
    ],
    measures: [
      "Question #1, Increasing the Timeframe for the Hawaii Senate to Consider and Act on Judicial Appointments",
      "Question #2, Directing the Hawaii State Legislature to Establish Procedures for Counties to Issue RISE Bonds, Exempt from County Debt Limits",
    ],
    measureNote:
      "Those short titles are on the 2026 general voter guide. The ballot proofs head the questions “Amendments to the State Constitution Proposed by the Thirty-Third Legislature” and print the full questions. The voter guide says the statements were provided by the Department of the Attorney General.",
    districtNote:
      "The proclamation also calls for thirteen state senators, fifty-one state representatives, and county mayors and councilmembers. The ballot proofs print Office of Hawaiian Affairs Maui Resident Trustee and Oahu Resident Trustee contests and county charter questions. Those trustee and charter items are not the statewide at-large trustee contest.",
    sources: [
      {
        label: "Hawaii Office of Elections — 2026 proclamation",
        href: "https://elections.hawaii.gov/2026-proclamation/",
      },
      {
        label: "Hawaii Office of Elections — 2026 general ballot proofs",
        href: "https://elections.hawaii.gov/wp-content/uploads/2026-General-Ballot-Proofs.pdf",
      },
      {
        label: "Hawaii Office of Elections — 2026 general voter guide",
        href: "https://elections.hawaii.gov/wp-content/uploads/VoterGuide_2026_General_English.pdf",
      },
    ],
  },
  {
    code: "ID",
    checkedOn: CHECKED,
    intro:
      "The Idaho Secretary of State’s voter pamphlet for the Tuesday, November 3, 2026 general election, and the 2026 general-election page, print two constitutional amendments, Proposition One, and one advisory question. A certified list of candidate offices for that election was not retrieved as text on October 19, 2026, so this page does not name candidate offices.",
    shortLead:
      "Idaho’s November 3, 2026 voter pamphlet prints two constitutional amendments, Proposition One, and a non-binding advisory question. A certified candidate-office list was not retrieved.",
    federal: [],
    statewide: [],
    measures: [
      "Amendment to Idaho Constitution - House Joint Resolution 4, on legislative authority over marijuana, narcotics, and other psychoactive substances",
      "Amendment to Idaho Constitution - House Joint Resolution 6, on English as the official language of the state",
      "Proposition One: Reproductive Freedom & Privacy Act",
      "Advisory question, House Bill 932, on which gun should be designated as the state gun of Idaho",
    ],
    measureNote:
      "The initiatives page says the Reproductive Freedom and Privacy Act has met the statutory requirements to appear on the November 3, 2026 general-election ballot. The pamphlet says the House Bill 932 question is non-binding. The same initiatives page says the Idaho Medical Cannabis Act and the Decriminalize Cannabis Now Initiative did not qualify for the November ballot.",
    districtNote:
      "This page does not list federal or statewide candidate offices. An independent-candidate petition form names U.S. Senate and U.S. Representative, District 1 or 2, as offices that form can be used for, and it is not a certified office list. The 2026 legislative-candidates page names State Senator and State Representative seats and does not display the candidate roster.",
    sources: [
      {
        label: "Idaho Secretary of State — 2026 general election voter pamphlet",
        href: "https://archive.voteidaho.gov/download/2026_Voter_Pamphlet.pdf",
      },
      {
        label: "Idaho Secretary of State — 2026 Idaho general election",
        href: "https://voteidaho.gov/idaho-general-election/",
      },
      {
        label: "Idaho Secretary of State — initiatives and amendments",
        href: "https://voteidaho.gov/initiatives-amendments/",
      },
    ],
  },
  {
    code: "KY",
    checkedOn: CHECKED,
    intro:
      "The Kentucky State Board of Elections 2026 general-election officer guide, under what a voter will be deciding, lists Constitutional Amendments for all voters, U.S. Senate for all voters, and U.S. Congress for the district where the voter lives. The Board’s 2026–2036 election schedule does not mark state executive officers in the 2026 column. The officer guide does not print constitutional-amendment titles. The U.S. Senate Class II page, read October 19, 2026, includes Kentucky among seats whose terms expire in 2027.",
    shortLead:
      "Kentucky’s 2026 general-election officer guide lists U.S. Senate, U.S. House by district, and constitutional amendments for all voters, and it does not print the amendment titles.",
    federal: ["U.S. Senate", "U.S. Congress, by district"],
    statewide: ["U.S. Senate (Class II, term expires in 2027)"],
    measures: [],
    measureNote:
      "The officer guide says “Constitutional Amendments (All Voters)” and does not print amendment numbers, titles, or question text. No State Board page read on October 19, 2026 printed the 2026 amendment wording.",
    districtNote:
      "The officer guide also lists Kentucky Senate and House members by district, county offices, city offices, school board offices, and local questions. The election schedule’s 2026 column marks Justice of the Supreme Court District 3 and district judge. The officer guide’s all-voter list does not name those judicial contests.",
    sources: [
      {
        label: "Kentucky State Board of Elections — 2026 general election officer guide",
        href: "https://elect.ky.gov/Voters/Documents/2026%20General%20Election%20Officer%20Guide%20Final%20Version%20Color.pdf",
      },
      {
        label: "Kentucky State Board of Elections — election schedule 2026–2036",
        href: "https://elect.ky.gov/Resources/Documents/Election%20Schedule%202026-2036.pdf",
      },
      CLASS_II,
    ],
  },
  {
    code: "LA",
    checkedOn: CHECKED,
    intro:
      "The Louisiana Secretary of State’s election quick facts for November 3, 2026 say every parish has the general election for the U.S. Senate race, open primary elections for U.S. House races, and referenda on amendments to the Louisiana Constitution. The Secretary of State’s statements of proposed constitutional amendments list ten questions for that election, in ballot order. The types-of-elections page says U.S. Representatives run in an open primary on November 3, 2026 and, if necessary, an open general election on December 12, 2026. The U.S. Senate Class II page, read October 19, 2026, includes Louisiana among seats whose terms expire in 2027.",
    shortLead:
      "Louisiana’s November 3, 2026 quick facts list a U.S. Senate general election, a U.S. House open primary, and ten constitutional amendments.",
    federal: ["U.S. Senator", "U.S. Representative, open primary, by district"],
    statewide: ["U.S. Senator (Class II, term expires in 2027)"],
    measures: [
      "Amendment 1, on a one-time transfer of a surviving spouse’s additional veteran property-tax exemption (Act 39, 2026 Regular Session)",
      "Amendment 2, on a local taxing authority continuing a lower millage rate (Act 273, 2026 Regular Session)",
      "Amendment 3, on post-conviction bail after conviction of an aggravated offense against a minor child (Act 271, 2026 Regular Session)",
      "Amendment 4, on a person who has served more than one and one-half terms as governor (Act 414, 2026 Regular Session)",
      "Amendment 5, on applying nonrecurring state monies to a state retirement system’s unfunded accrued liability (Act 606, 2026 Regular Session)",
      "Amendment 6, on an additional property-tax exemption for a person at least sixty-five who qualifies for the special assessment level (Act 274, 2026 Regular Session)",
      "Amendment 7, on public funds for identifying or replacing certain drinking-water service lines (Act 607, 2026 Regular Session)",
      "Amendment 8, on expropriation by a foreign adversary or an agent of a foreign adversary (Act 277, 2026 Regular Session)",
      "Amendment 9, on the maximum income for the special assessment level (Act 220, 2025 Regular Session)",
      "Amendment 10, on property-tax exemptions for rehabilitated blighted or derelict property (Act 272, 2026 Regular Session)",
    ],
    measureNote:
      "The summaries file says those statements appear in the order in which they will appear on the November 3, 2026 ballot. Each statement begins “Do you support an amendment.” The short descriptions above name the subject; the full question is in that file.",
    districtNote:
      "The quick facts say some parishes have additional general elections for Board of Elementary and Secondary Education and Public Service Commission contests from the spring closed primaries, plus other primaries for state or local offices and local propositions. The candidate-inquiry page did not render an office checklist on October 19, 2026, so those other offices are not named here. The quick facts do not name a governor contest for this date.",
    sources: [
      {
        label: "Louisiana Secretary of State — November 3, 2026 election quick facts",
        href: "https://www.sos.la.gov/media/x2jfrc1e/louisiana-election-quick-facts.pdf",
      },
      {
        label: "Louisiana Secretary of State — proposed constitutional amendments, November 3, 2026",
        href: "https://www.sos.la.gov/media/j2fjvpye/proposed-constitutional-amendments-2026-nov-summaries.pdf",
      },
      {
        label: "Louisiana Secretary of State — types of elections",
        href: "https://www.sos.la.gov/elections-voting/types-of-elections",
      },
      CLASS_II,
    ],
  },
  {
    code: "MS",
    checkedOn: CHECKED,
    intro:
      "The Mississippi Secretary of State’s candidate qualifying list includes “Candidates for United States Senate,” with the lines “Primary Election: March 10, 2026” and “General Election: November 3, 2026,” and “Candidates for United States House of Representatives” with a district column. That page says the list reflects qualifying papers and that the State Board of Election Commissioners determines whether each candidate meets the qualifications before the name is placed on the general-election ballot. No governor heading appears on the list read October 19, 2026. The U.S. Senate Class II page, read the same day, includes Mississippi among seats whose terms expire in 2027.",
    shortLead:
      "Mississippi’s qualifying list associates a U.S. Senate contest and U.S. House districts with the November 3, 2026 general election, and it says qualifying is not itself ballot placement.",
    federal: ["United States Senate", "United States House of Representatives, by district"],
    statewide: ["United States Senate (Class II, term expires in 2027)"],
    measures: [],
    measureNote:
      "The qualifying list does not mention a ballot measure. The initiatives catalog does not say that any measure has qualified for the November 3, 2026 ballot. It lists initiative 78, Early Voting, as “Status Active” with “Initiative Petition: N/A,” which is not a statement that the measure is on this ballot.",
    districtNote:
      "The same qualifying list, marked for the November 3, 2026 election, includes the Mississippi Court of Appeals by district and place, chancery and circuit court judges, State House special elections in Districts 70 and 77, and a district attorney special election. Court of Appeals contests are not marked statewide.",
    sources: [
      {
        label: "Mississippi Secretary of State — candidate qualifying list",
        href: "https://sos.ms.gov/content/CandidateQualifying/default.aspx",
      },
      {
        label: "Mississippi Secretary of State — initiatives",
        href: "https://www.sos.ms.gov/elections-voting/initiatives",
      },
      CLASS_II,
    ],
  },
  {
    code: "MT",
    checkedOn: CHECKED,
    intro:
      "A Montana Secretary of State notice on the opening of 2026 candidate filing says that during the 2026 election cycle Montanans will elect one U.S. Senator, both U.S. Representatives, 25 state senators, all 100 members of the Montana House, and other offices including Supreme Court Justice and Public Service Commission. The proposed-2026-ballot-issues page lists CI-132, CI-133, and I-194 as qualified for the 2026 general-election ballot. The U.S. Senate Class II page, read October 19, 2026, includes Montana among seats whose terms expire in 2027.",
    shortLead:
      "Montana’s Secretary of State says the 2026 cycle elects one U.S. Senator and both U.S. Representatives, and three ballot issues are marked qualified for the 2026 general election.",
    federal: ["United States Senator", "United States Representative, Districts 1 and 2"],
    statewide: ["United States Senator (Class II, term expires in 2027)"],
    measures: [
      "CI-132 (Ballot Issue #5), qualified for the 2026 general election ballot on August 17, 2026",
      "CI-133 (Ballot Issue #8), qualified for the 2026 general election ballot on August 17, 2026",
      "I-194 (Ballot Issue #10), qualified for the 2026 general election ballot on August 17, 2026",
    ],
    measureNote:
      "The ballot-issues page says the subject of a ballot issue may be paraphrased and that the statement appearing on the ballot is on a linked page. Those ballot-statement texts were not retrieved on October 19, 2026, so this page does not print a ballot title for CI-132, CI-133, or I-194. Other issues on that page are still gathering signatures, submitted, or not qualified, and they are not listed here.",
    districtNote:
      "The filing page lists United States Representative districts 1 and 2, Public Service Commissioner districts 1 and 5, Supreme Court Justice as District 4, State Senator districts, State Representative districts 1–100, and district court judges. The filing notice names Supreme Court Justice without a district number. This page does not treat that seat as a separate statewide office beyond the notice’s wording.",
    sources: [
      {
        label: "Montana Secretary of State — 2026 candidate filing notice",
        href: "https://sosmt.gov/best-of-luck-to-all-secretary-christi-jacobsen-opens-2026-candidate-filing-period/",
      },
      {
        label: "Montana Secretary of State — offices on the ballot",
        href: "https://sosmt.gov/elections/filing/",
      },
      {
        label: "Montana Secretary of State — proposed 2026 ballot issues",
        href: "https://sosmt.gov/elections/ballot_issues/proposed-2026-ballot-issues/",
      },
      CLASS_II,
    ],
  },
  {
    code: "NE",
    checkedOn: CHECKED,
    intro:
      "The Nebraska Secretary of State’s statewide general candidate filing list dated September 11, 2026 names, with no district, United States Senator, Governor and Lt. Governor, Secretary of State, State Treasurer, Attorney General, and Auditor of Public Accounts. Representative in Congress is listed in Districts 01, 02, and 03. The elections page lists three initiatives and legislative constitutional amendment LR19CA for the November 3, 2026 general election. The U.S. Senate Class II page, read October 19, 2026, includes Nebraska among seats whose terms expire in 2027.",
    shortLead:
      "Nebraska’s September 11, 2026 candidate list names a U.S. Senate seat and five statewide executive offices, and the elections page lists three initiatives and LR19CA.",
    federal: ["United States Senator", "Representative in Congress, Districts 01, 02, and 03"],
    statewide: [
      "United States Senator (Class II, term expires in 2027)",
      "Governor and Lt. Governor",
      "Secretary of State",
      "State Treasurer",
      "Attorney General",
      "Auditor of Public Accounts",
      "Judge of the Nebraska Workers' Compensation Court (retention; the retention list marks this court Statewide)",
    ],
    measures: [
      "Initiative Measure 440, Online Sports Wagering Authorization",
      "Initiative Measure 441, Online Sports Wagering Regulation",
      "Initiative Measure 442, Fairness for Girls",
      "LR19CA, a legislative constitutional amendment on legislative term limits",
    ],
    measureNote:
      "The elections page names those three initiatives and LR19CA for the 2026 general election. The informational pamphlet prints the initiative ballot language. The Executive Board’s June 10, 2026 statement says a vote for LR19CA amends the constitution to increase the term limit for state legislators from two consecutive four-year terms to three, and a vote against leaves the two-term limit in effect. The pamphlet covers initiative measures and does not include LR19CA.",
    districtNote:
      "The same candidate list includes Public Service Commissioner District 02, Member of the Legislature in the districts that have rows, State Board of Education districts, University of Nebraska Board of Regents districts, and local boards. The retention list marks Judge of the Appeals Court as District 2, not statewide. Absence of a legislative district row on the extract is not a finding that the district is off the ballot.",
    sources: [
      {
        label: "Nebraska Secretary of State — 2026 elections",
        href: "https://sos.nebraska.gov/elections",
      },
      {
        label: "Nebraska Secretary of State — statewide general candidate filing list, September 11, 2026",
        href: "https://sos.nebraska.gov/sites/default/files/doc/elections/2026/Final_Statewide_General_Candidate_Filing_List_9.11.26.pdf",
      },
      {
        label: "Nebraska Secretary of State — judges who filed for retention, November 3, 2026",
        href: "https://sos.nebraska.gov/sites/default/files/doc/elections/2026/Final_List_of_Judges_Who_Filed_for_Retention_List_8.3.26.pdf",
      },
      {
        label: "Nebraska Secretary of State — 2026 ballot measures pamphlet",
        href: "https://sos.nebraska.gov/sites/default/files/doc/elections/2026/2026%20Ballot%20Measures%20Pamphlet.pdf",
      },
      {
        label: "Nebraska Legislature Executive Board — LR19CA ballot statement, June 10, 2026",
        href: "https://sos.nebraska.gov/sites/default/files/doc/elections/2026/LR19CA_Approved_Ballot_Statement_Language.pdf",
      },
      CLASS_II,
    ],
  },
  {
    code: "NM",
    checkedOn: CHECKED,
    intro:
      "The New Mexico Secretary of State’s general-election proclamation, certified January 26, 2026, calls the November 3, 2026 general election for one United States Senator, three United States Representatives by district, Governor, Lieutenant Governor, Secretary of State, Attorney General, State Auditor, State Treasurer, Commissioner of Public Lands, and one Judge of the Court of Appeals, Position 1. The 2026 general-election voter guide says four constitutional amendments and three bond questions will appear on all ballots for that election. The U.S. Senate Class II page, read October 19, 2026, includes New Mexico among seats whose terms expire in 2027.",
    shortLead:
      "New Mexico’s January 26, 2026 proclamation calls a U.S. Senate seat, statewide executive offices, and one Court of Appeals position for November 3, 2026, and the voter guide lists constitutional amendments and bond questions.",
    federal: ["United States Senator", "United States Representative, Districts 1, 2, and 3"],
    statewide: [
      "United States Senator (Class II, term expires in 2027)",
      "Governor",
      "Lieutenant Governor",
      "Secretary of State",
      "Attorney General",
      "State Auditor",
      "State Treasurer",
      "Commissioner of Public Lands",
      "Judge of the Court of Appeals, Position 1",
    ],
    measures: [
      "Constitutional Amendment 1, on veto messages and bills the governor does not act on",
      "Constitutional Amendment 2, on removing the requirement that school elections be separate from partisan elections",
      "Constitutional Amendment 3, on nominating committees for boards of regents",
      "Bond Question 1, Senior Citizen Facility Improvement, Construction and Equipment, not to exceed $21,582,213",
      "Bond Question 2, Library Acquisitions, not to exceed $19,324,188",
      "Bond Question 3, Higher Education, not to exceed $352,225,379",
    ],
    measureNote:
      "The voter guide says the capital-letter title is the only language that will appear on the ballot and says four constitutional amendments and three bond questions will appear on all November 3, 2026 ballots. The resolution text printed inside that guide for Constitutional Amendment 4 says the amendment shall be submitted at the 2028 general election. Because those two statements do not agree, Constitutional Amendment 4 is not listed here. The proclamation is a January 26, 2026 call for the election, not a post-primary certified candidate roster.",
    districtNote:
      "The proclamation also lists seventy members of the State House, one State Senate seat in District 33 for the remaining two years of a term, Public Education Commission districts, judicial district judges, Bernalillo County Metropolitan Court judges, and county offices.",
    sources: [
      {
        label: "New Mexico Secretary of State — general election proclamation, January 26, 2026",
        href: "https://www.sos.nm.gov/wp-content/uploads/2026/04/2026-General-Election-Proclamation-English.pdf",
      },
      {
        label: "New Mexico Secretary of State — 2026 general election voter guide",
        href: "https://www.sos.nm.gov/wp-content/uploads/2026/09/2026-Voter-Guide-English.pdf",
      },
      CLASS_II,
    ],
  },
  {
    code: "ND",
    checkedOn: CHECKED,
    intro:
      "The North Dakota Secretary of State’s 2026 general-election contest list, statewide filter, prints Representative in Congress, Agriculture Commissioner, Attorney General, Justice of the Supreme Court, Public Service Commissioner, Secretary of State, Superintendent of Public Instruction, and Tax Commissioner. That filter has no U.S. Senate contest. A Cass County sample ballot adds term lines for one Public Service Commissioner unexpired 2-year term, Superintendent of Public Instruction unexpired 2-year term, and one Justice of the Supreme Court unexpired 8-year term. The statewide measure guide for November 3, 2026 prints Constitutional Measure No. 1 and Initiated Constitutional Measure No. 2.",
    shortLead:
      "North Dakota’s 2026 general contest list has no U.S. Senate contest and lists Representative in Congress, statewide executive offices, Supreme Court contests, and two constitutional measures.",
    federal: ["Representative in Congress"],
    statewide: [
      "Agriculture Commissioner",
      "Attorney General",
      "Secretary of State",
      "Tax Commissioner",
      "Public Service Commissioner",
      "Public Service Commissioner, unexpired 2-year term",
      "Superintendent of Public Instruction, unexpired 2-year term",
      "Justice of the Supreme Court",
      "Justice of the Supreme Court, unexpired 8-year term",
    ],
    measures: [
      "Constitutional Measure No. 1 (House Concurrent Resolution No. 3003, 2025 Session Laws, Ch. 614), on a sixty-percent vote for constitutional amendments",
      "Initiated Constitutional Measure No. 2, on public-school breakfast and lunch at no cost to the student, parent, or guardians",
    ],
    measureNote:
      "The measures page says these are approved measures that will appear on the 2026 general-election ballot. The November 3, 2026 measure guide prints the ballot language. The term lines above are the lines on one Cass County sample ballot; the statewide contest filter prints the office names without those term phrases.",
    districtNote:
      "The contest list also includes State Senator, State Representative, district court judges, and county and district offices. Representative in Congress is not printed with a district number.",
    sources: [
      {
        label: "North Dakota Secretary of State — 2026 general election contest and candidate list",
        href: "https://vip.sos.nd.gov/candidatelist.aspx?eid=348",
      },
      {
        label: "North Dakota Secretary of State — Cass County sample general election ballot",
        href: "https://vip.sos.nd.gov/BallotViewer.aspx?docID=101351",
      },
      {
        label: "North Dakota Secretary of State — 2026 general election statewide measure guide",
        href: "https://www.sos.nd.gov/sites/default/files/documents/elections/2026-general-measure-guide.pdf",
      },
    ],
  },
  {
    code: "OK",
    checkedOn: CHECKED,
    intro:
      "The Oklahoma State Election Board’s July 24, 2026 notice for the November 3, 2026 statewide general election lists U.S. Senator (1 office), U.S. Representative (5 offices), Governor, Lieutenant Governor, Attorney General, State Treasurer, Superintendent of Public Instruction, State Auditor and Inspector, Commissioner of Labor, Insurance Commissioner, and Corporation Commissioner. The State Questions page says State Question 845 and State Question 847 have qualified for the November 3, 2026 election. The U.S. Senate Class II page, read October 19, 2026, includes Oklahoma among seats whose terms expire in 2027.",
    shortLead:
      "Oklahoma’s July 24, 2026 election notice lists a U.S. Senate seat, five U.S. House offices, and statewide executive offices, and two state questions are qualified for November 3, 2026.",
    federal: ["U.S. Senator (1 office)", "U.S. Representative (5 offices)"],
    statewide: [
      "U.S. Senator (Class II, term expires in 2027)",
      "Governor",
      "Lieutenant Governor",
      "Attorney General",
      "State Treasurer",
      "Superintendent of Public Instruction",
      "State Auditor and Inspector",
      "Commissioner of Labor",
      "Insurance Commissioner",
      "Corporation Commissioner",
    ],
    measures: [
      "State Question 845, Legislative Referendum 379. The final ballot title begins: “This measure amends article 7-B, section 3 of the Oklahoma Constitution, changing the Judicial Nominating Commission’s structure.”",
      "State Question 847, Legislative Referendum 381. The final ballot title begins: “This measure amends article 10, sections 8B and 8C of the Oklahoma Constitution.” The file’s subject line is “Real property valuation.”",
    ],
    measureNote:
      "The State Questions page says both have qualified for the November 3, 2026 election. The July 24 notice also says State Question 845 and State Question 847 will appear on the June 16 election ballot. The sentences quoted above are the openings of the final ballot titles, not a shortened title written for this page.",
    districtNote:
      "The same notice lists district attorney offices in Districts 14, 18, 20, and 23, State Senator, State Representative, a State Senate District 17 special election, district and associate district judges, and county treasurer, assessor, and commissioner offices in most counties. It does not print U.S. House district numbers.",
    sources: [
      {
        label: "Oklahoma State Election Board — 2026 general election notice, July 24, 2026",
        href: "https://oklahoma.gov/elections/voters/military-overseas-voters/2026-election-notice-general-election.html",
      },
      {
        label: "Oklahoma State Election Board — state questions",
        href: "https://oklahoma.gov/elections/elections-results/state-question-info.html",
      },
      {
        label: "Oklahoma Secretary of State — State Question 845 final ballot title",
        href: "https://oklahoma.gov/content/dam/ok/en/elections/state-questions/sq2026/sq845-final-ballot-title-accessible.pdf",
      },
      {
        label: "Oklahoma Secretary of State — State Question 847 final ballot title",
        href: "https://www.sos.ok.gov/documents/questions/847.pdf",
      },
      CLASS_II,
    ],
  },
  {
    code: "OR",
    checkedOn: CHECKED,
    intro:
      "The Oregon Secretary of State’s upcoming-elections page says the November 3, 2026 statewide general election places statewide races on every ballot, including Governor and U.S. Senator, and says there are no statewide ballot measures on the ballot this election. The offices-open list for that general election also prints U.S. Senator, Governor, and U.S. Representative for the 1st through 6th districts. The U.S. Senate Class II page, read October 19, 2026, includes Oregon among seats whose terms expire in 2027.",
    shortLead:
      "Oregon’s upcoming-elections page says every November 3, 2026 ballot includes governor and U.S. senator, and that there is no statewide ballot measure.",
    federal: ["U.S. Senator", "U.S. Representative, 1st through 6th districts"],
    statewide: ["U.S. Senator (Class II, term expires in 2027)", "Governor"],
    measures: [],
    measureNote:
      "The upcoming-elections page says there are no statewide ballot measures on this election. The offices-open document is a filing list and does not mention measures.",
    districtNote:
      "The offices-open list also names specified State Senate and State Representative districts and listed circuit-court and district-attorney vacancies. It says each vacated office would not normally be printed on the 2026 ballot. That list does not include Secretary of State, State Treasurer, Attorney General, or a statewide judicial office for this filing window.",
    sources: [
      {
        label: "Oregon Secretary of State — upcoming elections, November 3, 2026 general",
        href: "https://sos.oregon.gov/elections/pages/current-election.aspx",
      },
      {
        label: "Oregon Secretary of State — offices open, November 3, 2026 general election",
        href: "https://sos.oregon.gov/elections/Documents/open-offices-general-election.pdf",
      },
      CLASS_II,
    ],
  },
  {
    code: "RI",
    checkedOn: CHECKED,
    intro:
      "The Rhode Island Secretary of State’s 2026 run-for-office guide, for the general election on November 3, 2026, lists these general offices: Governor, Lt. Governor, Secretary of State, Attorney General, and General Treasurer. Its filing section prints Senator in Congress and Representative in Congress. Candidate-search pages for that election that rendered on October 19, 2026 are headed Candidates for Governor, Candidates for Attorney General, and Candidates for Lieutenant Governor, each with district Statewide. The voter-information handbook for that general election lists five state bond referenda. The U.S. Senate Class II page, read October 19, 2026, includes Rhode Island among seats whose terms expire in 2027.",
    shortLead:
      "Rhode Island’s 2026 candidate guide lists U.S. senator, statewide general offices, and the voter handbook lists five state bond questions for November 3, 2026.",
    federal: ["Senator in Congress", "Representative in Congress"],
    statewide: [
      "Senator in Congress (Class II, term expires in 2027)",
      "Governor",
      "Lt. Governor",
      "Secretary of State",
      "Attorney General",
      "General Treasurer",
    ],
    measures: [
      "Question 1, Higher Education Facilities, $275,000,000",
      "Question 2, Housing and Homeownership, $120,000,000",
      "Question 3, Economic Development, $100,000,000",
      "Question 4, Cultural Economy, $50,000,000",
      "Question 5, Green Economy Bonds, $55,000,000",
    ],
    measureNote:
      "The handbook says these are the state questions on the November ballot and cites Chapter 084 of the Public Laws of 2026. It says many communities will have local ballot questions and that those questions are not printed in the handbook.",
    districtNote:
      "The candidate guide also lists State Senator, State Representative, and local offices. The candidate-search office menu did not render, so Secretary of State, General Treasurer, U.S. Senator, and U.S. Representative were not opened as separate search-result pages. The guide does not number congressional districts on the lines read.",
    sources: [
      {
        label: "Rhode Island Secretary of State — run for office guide 2026",
        href: "https://vote.sos.ri.gov/Forms/Elections/Guides/2026RunforOffice.pdf",
      },
      {
        label: "Rhode Island Secretary of State — voter information handbook, general election November 3, 2026",
        href: "https://vote.sos.ri.gov/Forms/Elections/Guides/VoterRef26.pdf",
      },
      {
        label: "Rhode Island Secretary of State — candidate search, governor, election 18239",
        href: "https://vote.sos.ri.gov/Candidates/CandidateSearchSummary?Election=18239&OfficeType=549",
      },
      CLASS_II,
    ],
  },
  {
    code: "SD",
    checkedOn: CHECKED,
    intro:
      "The South Dakota Secretary of State’s 2026 general-election candidate list uses these contest labels with no district: United States Senator, Governor and Lieutenant Governor, Secretary of State, Attorney General, State Auditor, State Treasurer, Commissioner of School and Public Lands, and Public Utilities Commissioner. United States Representative is a contest label without a district number. The Secretary of State’s 2026 ballot-question pamphlet prints Constitutional Amendments I, J, K, and L. The U.S. Senate Class II page, read October 19, 2026, includes South Dakota among seats whose terms expire in 2027.",
    shortLead:
      "South Dakota’s 2026 general candidate list names a U.S. Senate seat and statewide executive offices, and the ballot-question pamphlet prints four constitutional amendments.",
    federal: ["United States Senator", "United States Representative"],
    statewide: [
      "United States Senator (Class II, term expires in 2027)",
      "Governor and Lieutenant Governor",
      "Secretary of State",
      "Attorney General",
      "State Auditor",
      "State Treasurer",
      "Commissioner of School and Public Lands",
      "Public Utilities Commissioner",
    ],
    measures: [
      "Constitutional Amendment I, an amendment that repeals expanded Medicaid coverage if federal funding for the program drops below 90 percent",
      "Constitutional Amendment J, an amendment clarifying that an individual must be a citizen of the United States to be eligible to vote",
      "Constitutional Amendment K, an amendment establishing the Trust for Unclaimed Property Fund",
      "Constitutional Amendment L, an amendment requiring that a proposed constitutional amendment or revision receive an affirmative vote of sixty percent of the votes cast",
    ],
    measureNote:
      "Those titles are the titles in the Secretary of State’s 2026 ballot-question pamphlet. The pamphlet says the title, explanation, and effect of a vote were provided by the Attorney General. The potential-ballot-questions page prints different title lines for the same letters. A separate Division of Elections page places the Medicaid item at Letter J. This page follows the pamphlet’s letters and titles.",
    districtNote:
      "The candidate list also uses contest labels for State Senator, State Representative, and county, city, and district offices. The page says an unopposed county candidate after the primary will not be on the general-election ballot. No judicial contest label appears among the contest names in the list read on October 19, 2026.",
    sources: [
      {
        label: "South Dakota Secretary of State — 2026 general election candidate list",
        href: "https://vip.sdsos.gov/candidatelist.aspx?eid=774",
      },
      {
        label: "South Dakota Secretary of State — 2026 ballot question pamphlet",
        href: "https://sdsos.gov/elections-voting/upcoming-elections/general-information/2026%20Election%20Information/2026%20Election%20Assets/Election%20Information/FINALAPPROVEDBallot%20Questions%20Handout%20Print.pdf",
      },
      CLASS_II,
    ],
  },
  {
    code: "UT",
    checkedOn: CHECKED,
    intro:
      "The Utah Lieutenant Governor’s amended 2026 general-election certification, signed September 21, 2026, lists U.S. House of Representatives Districts 1, 2, 3, and 4 and does not list a U.S. Senate contest or a governor contest. It says no statewide ballot propositions have qualified, and it places Constitutional Amendment A and Constitutional Amendment B on the ballot. Under nonpartisan judicial retention elections, it says the Supreme Court and the Court of Appeals serve all counties.",
    shortLead:
      "Utah’s September 21, 2026 certification lists U.S. House by district, Supreme Court and Court of Appeals retentions, and two constitutional amendments, and it does not list a U.S. Senate or governor contest.",
    federal: ["U.S. House of Representatives, Districts 1, 2, 3, and 4"],
    statewide: [
      "Supreme Court retention elections (the certificate says the Supreme Court serves all counties)",
      "Court of Appeals retention elections (the certificate says the Court of Appeals serves all counties)",
    ],
    measures: [
      "Constitutional Amendment A, on how proposed constitutional amendments are published",
      "Constitutional Amendment B, on a 60 percent vote for citizen-proposed laws that increase taxes compared with existing law",
    ],
    measureNote:
      "The certificate says no statewide ballot propositions have qualified for the 2026 general-election ballot and then prints the two amendments. Amendment A’s question asks whether the Utah Constitution shall be amended to change publication of proposed amendments from newspapers to a manner established by state law for 60 days immediately before the general election. Amendment B’s question asks whether citizen-proposed laws that increase taxes compared with existing law shall require at least 60 percent of voters instead of a simple majority.",
    districtNote:
      "The certificate also lists numbered Utah Senate, Utah House, and State Board of Education districts, and district, juvenile, and justice-court retention questions. Named retention questions include Jill M. Pohlman for Justice of the Supreme Court and Michele M. Christiansen Forster for Judge of the Court of Appeals. The certificate prints additional retention names that are not repeated here.",
    sources: [
      {
        label: "Utah Lieutenant Governor — amended 2026 general election certification, September 21, 2026",
        href: "https://vote.utah.gov/wp-content/uploads/2026/09/2026-General-Election-Certification-Amended-09-21.pdf",
      },
      {
        label: "Utah Lieutenant Governor — 2026 general election voter information pamphlet",
        href: "https://vote.utah.gov/wp-content/uploads/2026/09/2026-Voter-Information-Pamphlet.pdf",
      },
    ],
  },
  {
    code: "VT",
    checkedOn: CHECKED,
    intro:
      "The Vermont Secretary of State’s general-election candidates page says the offices to be elected in 2026 include U.S. Representative, Governor, Lieutenant Governor, Treasurer, Secretary of State, Auditor of Accounts, and Attorney General, and it sets the general election on Tuesday, November 3, 2026. The qualified-candidate workbook last updated September 23, 2026 uses the contest label Representative to Congress with district name “N/A,” and the same “N/A” district for those executive offices. No U.S. Senate contest is on that list. An October 16, 2026 Secretary of State release says two constitutional amendments are on the general-election ballot and does not print their titles.",
    shortLead:
      "Vermont’s 2026 offices list names U.S. representative, governor, and five other statewide executive offices. Two constitutional amendments are announced without titles.",
    federal: ["Representative to Congress"],
    statewide: [
      "Governor",
      "Lieutenant Governor",
      "Treasurer",
      "Secretary of State",
      "Auditor of Accounts",
      "Attorney General",
    ],
    measures: [],
    measureNote:
      "The October 16, 2026 elections release says two constitutional amendments are on the general-election ballot and does not print titles. The offices list and the candidate workbook do not mention measures. Exact ballot titles were not printed on an elections page read on October 19, 2026.",
    districtNote:
      "The candidates page also lists all 30 State Senate seats, all 150 State Representative seats, Probate Judge, Assistant Judges, State's Attorney, Sheriff, High Bailiff, and Justices of the Peace. Representative to Congress is not listed by congressional district.",
    sources: [
      {
        label: "Vermont Secretary of State — general election candidates",
        href: "https://sos.vermont.gov/elections/election-info-resources/candidates/",
      },
      {
        label: "Vermont Secretary of State — 2026 general election qualified candidates",
        href: "https://outside.vermont.gov/dept/sos/Elections_Division/election_info_resources/candidates/2026_general_election_qualified_candidates.xlsx",
      },
      {
        label: "Vermont Secretary of State — October 16, 2026 voter guide release",
        href: "https://sos.vermont.gov/commentary-press/2026-vermont-voter-guide",
      },
    ],
  },
  {
    code: "WV",
    checkedOn: CHECKED,
    intro:
      "The Lewis County, West Virginia official ballot for the November 3, 2026 general election prints, on the national ticket, U.S. Senator and U.S. House of Representatives for the 2nd Congressional District. A Kanawha County sample prints the U.S. House contest for the 1st Congressional District. Those ballots do not print a governor contest. The Secretary of State’s July 23, 2026 public notice says Amendment No. 1, Citizenship Requirement to Vote in West Virginia Elections Amendment, will appear on that ballot. The U.S. Senate Class II page, read October 19, 2026, includes West Virginia among seats whose terms expire in 2027.",
    shortLead:
      "West Virginia sample ballots for November 3, 2026 print U.S. Senator and U.S. House by district, and the Secretary of State noticed one constitutional amendment.",
    federal: ["U.S. Senator", "U.S. House of Representatives, by congressional district"],
    statewide: ["U.S. Senator (Class II, term expires in 2027)"],
    measures: [
      "Amendment No. 1: Citizenship Requirement to Vote in West Virginia Elections Amendment. The summary of purpose says that in all elections held in West Virginia only citizens of the United States who are citizens of this state are qualified to vote.",
    ],
    measureNote:
      "The July 23, 2026 public notice prints that title and summary and says the amendment will appear on the November 3 general-election ballot. The Lewis County ballot prints the same title and summary. An October 1, 2026 Secretary of State article says voters will consider one proposed amendment.",
    districtNote:
      "The Lewis County ballot also prints a state senate district, a House of Delegates district, and county offices. Other county samples add local levies. The 2026 candidate-listing application at candidates.wvsos.gov returned 403 on October 19, 2026.",
    sources: [
      {
        label: "West Virginia Secretary of State — Lewis County official ballot, November 3, 2026",
        href: "https://apps.sos.wv.gov/elections/2026GeneralSampleBallots/SAMPLE%20-%20WV%20Lewis%20261103%20General%20-%2014inch.pdf",
      },
      {
        label: "West Virginia Secretary of State — Kanawha County sample ballot, November 3, 2026",
        href: "https://apps.sos.wv.gov/elections/2026GeneralSampleBallots/SAMPLE%20-%20WV%20Kanawha%20261103%20General%20-%2017inch.pdf",
      },
      {
        label: "West Virginia Secretary of State — public notice of Amendment No. 1, July 23, 2026",
        href: "https://sos.wv.gov/article/secretary-warner-issues-public-notice-proposed-amendment-west-virginia-constitution-will",
      },
      CLASS_II,
    ],
  },
  {
    code: "WY",
    checkedOn: CHECKED,
    intro:
      "The Wyoming Secretary of State’s 2026 voter guide lists U.S. Senator, U.S. Representative, Governor, Secretary of State, State Auditor, State Treasurer, Superintendent of Public Instruction, and judicial retentions as offices up for election, and it prints Proposed Initiative Proposition Number One. The general-election candidate roster dated September 9, 2026 uses the headings United States Senator and United States Representative. The House contest is not labeled by district. The U.S. Senate Class II page, read October 19, 2026, includes Wyoming among seats whose terms expire in 2027.",
    shortLead:
      "Wyoming’s 2026 voter guide lists a U.S. Senate seat, U.S. representative, statewide executive offices, judicial retentions, and Proposed Initiative Proposition Number One.",
    federal: ["U.S. Senator", "U.S. Representative"],
    statewide: [
      "U.S. Senator (Class II, term expires in 2027)",
      "U.S. Representative",
      "Governor",
      "Secretary of State",
      "State Auditor",
      "State Treasurer",
      "Superintendent of Public Instruction",
      "Judicial retentions",
    ],
    measures: [
      "Proposed Initiative Proposition Number One. The voter guide’s question begins by asking whether a law shall be enacted establishing a property tax exemption for qualified homeowners’ primary residence in the amount of fifty percent of the assessed value of the dwelling, and defining “homeowner” and “primary residence.”",
    ],
    measureNote:
      "The voter guide says statewide ballot propositions appear on the general-election ballot and must be approved by a majority of those voting. It prints the choices FOR and AGAINST. The question continues after the clauses quoted above. The candidate roster does not mention measures.",
    districtNote:
      "The voter guide also lists the Wyoming State Senate for odd-numbered districts, with an election in the Sixth Senate District for the remainder of an unexpired term, the State House for all districts, and county, municipal, school board, and community college offices. The roster lists district and circuit judges by name and district.",
    sources: [
      {
        label: "Wyoming Secretary of State — 2026 voter guide",
        href: "https://sos.wyo.gov/Elections/Docs/2026/2026_Voter_Guide.pdf",
      },
      {
        label: "Wyoming Secretary of State — 2026 offices up for election",
        href: "https://sos.wyo.gov/Elections/Docs/2026/2026_Offices_Up_for_Election.pdf",
      },
      {
        label: "Wyoming Secretary of State — 2026 general election candidates",
        href: "https://sos.wyo.gov/Elections/Docs/2026/2026_WY_General_Election_Candidates.pdf",
      },
      CLASS_II,
    ],
  },
];
