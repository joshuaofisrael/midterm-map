import type { StateCode } from "@/data/types";

/**
 * Opening analysis that only fits this state. Office lists, ratings, and the
 * canvass method are added by the shared briefing, which cites the hub’s sources.
 */
export const STATE_FOCUS: Record<StateCode, string[]> = {
  AZ: [
    "Arizona’s 2026 ballot is an executive election plus a pamphlet of propositions, not a U.S. Senate year. The publicity pamphlet’s eight propositions sit beside the governor’s race, so a voter can care about a measure and treat the top of the ticket as secondary, or the reverse. The governor’s guide names Katie Hobbs and Andy Biggs among the tickets. Cook Political Report and Sabato’s Crystal Ball have both published Lean Democratic labels, dated on that guide. Those labels do not describe the propositions. Most of the state stays on standard time while the Navajo Nation observes daylight time, so a national “polls closed” chyron is the wrong clock. County recorders, not a state mail room, handle ballot requests.",
  ],
  GA: [
    "Georgia is one of the few states where both a Class 2 Senate seat and the governorship are on the same November card, and where state law can send a contest to a runoff if nobody reaches a majority. The Senate guide cites the Clerk’s nominee list for Jon Ossoff and Mike Collins, and it cites the Secretary of State’s June 16, 2026 Republican runoff canvass for the primary that nominated Collins. That runoff is already over. It is not a template for November. The hub’s candidate file does not list a statewide ballot question. Readers watching returns should separate a primary runoff margin from a general-election count, and they should not treat a plurality on election night as the last word if the statute requires a majority.",
  ],
  MI: [
    "Michigan’s card is wide: a Senate seat, a governor and lieutenant governor, two statewide proposals, university boards, and two Supreme Court seats. The Senate guide’s cited survey is a single Emerson College / Nexstar poll that the guide stores as a close result between Abdul El-Sayed and Mike Rogers. Cook’s stored label on that race is Tossup. The governor guide stores a different survey and a Lean Democratic Cook label for Jocelyn Benson and John James. Those are two contests. A voter can split them, and a proposal can pass while either ticket loses. Early voting is local. A statewide percentage that ignores Detroit’s timing relative to smaller counties will move for ordinary reporting reasons.",
  ],
  NC: [
    "North Carolina’s November list is a Senate race, appellate courts, and three constitutional amendments. The governor is not on that list, which is the fact that keeps this state from being read as a full executive midterm. The Senate guide cites Roy Cooper and Michael Whatley and stores an Elon University poll and a Lean Democratic Cook label. Court seats are elected on their own lines. An amendment does not carry a party label. One-stop early voting is a county-board product, so hours are not uniform. A reader who imports a “governor year” story from another state is using the wrong ballot.",
  ],
  NV: [
    "Nevada’s notice, as the hub cites it from Clark County, is six statewide executive offices and two Supreme Court seats, with the governorship at the top. The governor guide stores a Tossup label from Cook and a close Emerson survey between Aaron D. Ford and Joseph Lombardo. Active registered voters are mailed a ballot unless they opt out, which means the election-night file is often an early slice of a count that continues under the state’s receipt rules. The Senate is not on this cycle. A House district such as the 3rd, which has its own guide, can diverge from the governor’s margin because the district is not the state.",
  ],
  OH: [
    "Ohio’s oddity is the Senate line: an unexpired term ending January 3, 2029, printed on official county ballots beside a full governor’s race, not a regular Class 2 term ending in 2027. The governor guide names Vivek Ramaswamy and Amy Acton and stores a Tossup Cook label and a Bowling Green State University / YouGov survey. The Secretary of State certified Issue 3 for the same election. Issue 3 is a question, not a running mate. County boards run early in-person voting, so the first counties to report are not a sample designed to match the state.",
  ],
  PA: [
    "Pennsylvania’s statewide executive ballot, on the list this hub cites, is governor and lieutenant governor. There is no Senate line on that list. The governor guide stores a Solid Democratic Cook label and a Franklin & Marshall survey showing a wide gap between Josh Shapiro and Stacy Garrity. A Solid label is still the outlet’s label. It is not this site’s call, and it says nothing about U.S. House districts. The 7th District has its own guide precisely because a district can be competitive while a statewide race is not. Mail and civilian absentee timelines are statutory and county-administered.",
  ],
  WI: [
    "Wisconsin elects a governor, an attorney general, a secretary of state, and a treasurer in 2026, and it does not elect a senator. The governor guide names David Crowley and Tom Tiffany, with a Tossup Cook label and a Marquette Law School poll stored on the page. Municipal clerks set in-person absentee hours, which means Milwaukee and a small town are not on the same reporting clock even when state law is the same. Down-ballot row offices can finish differently from the governor. The 3rd Congressional District guide is a reminder that the House map is not the statewide electorate.",
  ],
  TX: [
    "Texas puts a Senate seat, a governor, and a long judicial ballot in front of voters in all 254 counties, and the hub’s reading of the current-elections page did not find a statewide constitutional-amendment proclamation. The Senate guide stores a Tossup Cook label and several surveys of Ken Paxton and James Talarico that sit near a tie. The governor guide stores a Likely Republican Cook label and an Emerson survey on Greg Abbott and Gina Hinojosa. Same state, two different ratings. Early voting is a county choice of locations and weekend hours. A 254-county canvass does not finish when the first large county does.",
  ],
  FL: [
    "Florida’s candidate listing includes a U.S. Senate seat even though the race guide on this site is the governor’s race, plus attorney general, chief financial officer, agriculture commissioner, and Supreme Court justice. Three constitutional amendments are on the initiatives table the hub cites. The governor guide names Byron Donalds and David Jolly and stores a Likely Republican Cook label plus two surveys that do not agree with each other. Disagreement between surveys is a reason to read the dates and the sponsors, not a reason to average them here. Supervisors of elections, county by county, set early-voting sites inside the state’s window.",
  ],
  CA: [
    "California’s certified list has no U.S. Senate contest. It has eight statewide executive offices, two Supreme Court retention contests, and a long list of qualified propositions. Retention is a yes-or-no vote on a justice, not a race between two candidates. The governor guide stores a Solid Democratic Cook label and a Public Policy Institute of California survey of Xavier Becerra and Steve Hilton. The 13th District guide exists because a single Central Valley seat can be closer than the statewide executive races. Vote-by-mail is the ordinary ballot for most Californians. Election-night percentages are the ballots counties have tabulated, not the propositions’ final yes-or-no.",
  ],
  NY: [
    "New York’s amended October 7, 2026 certification lists governor and lieutenant governor, comptroller, and attorney general. Representative in Congress is by district. The governor guide stores a Solid Democratic Cook label and a Siena survey of Kathy C. Hochul and Bruce A. Blakeman. The 22nd District has a separate guide. A statewide Solid label does not rate that district. County boards designate early-voting sites. Absentee and early-mail deadlines are on the voting-deadlines page because the State Board printed them, not because a national calendar did.",
  ],
  MN: [
    "Minnesota combines a Class 2 Senate seat, a governor and lieutenant governor, other executive offices, appellate courts, and one constitutional amendment. The Senate guide’s names include Peggy Flanagan and Michele Tafoya. The governor guide pairs Amy Klobuchar and Ben Schierer on the Democratic line and Lisa Demuth and Ryan Wilson on the Republican line, because the candidate file lists the ticket that way. No national rating is stored on those guides. The absence is not a Tossup. The amendment is a separate yes-or-no. In-person absentee hours on the Secretary of State’s calendar still vary by locality.",
  ],
  ME: [
    "Maine’s statewide offices on the cited list are U.S. senator and governor, a short ballot by national standards. The Senate guide names Susan M. Collins and Troy D. Jackson. The governor guide names Rick Bennett, running as an independent, Robert B. Charles, and Hannah M. Pingree. An independent line changes how a plurality works if the state does not require a majority. Ranked-choice rules, where the Secretary of State applies them, are office-specific. Do not assume the governor’s contest uses the same tabulation as a federal contest unless that office’s page says so. Municipal clerks run the absentee window.",
  ],
  IA: [
    "Iowa’s list is a Class 2 Senate seat and seven statewide executive offices, a full executive slate plus the Senate. The Senate guide names Ashley Hinson, Josh Turek, and Thomas Laehn. The governor guide pairs Zach Lahn with Derek Wulf and Rob Sand with Dave Muhlbauer, because the candidate list prints the lieutenant governor with the governor. No stored rating plays the role a Cook label plays on other hubs. County auditors administer in-person absentee voting, so hours are local even when the request deadline is statewide.",
  ],
  AK: [
    "Alaska’s November list includes governor and lieutenant governor, a Class 2 Senate seat, the state’s single U.S. representative, a Supreme Court contest, and two initiatives the petitions page says will appear. The Division of Elections says the Senate and governor contests are conducted by ranked-choice voting. First-choice totals on election night are not the final round. The Senate guide includes Mary Peltola and Dan S. Sullivan among several candidates, including write-in filings. The governor guide lists five tickets. A ranked-choice round can reorder those tickets without any new ballots being cast. The initiatives are yes-or-no questions beside that tabulation, not extra ranks.",
  ],
  KS: [
    "Kansas pairs a Class 2 Senate seat with a governor and lieutenant governor, four other executive offices, judicial retentions, and one constitutional amendment. The Senate guide names Adam Hamilton and Roger Marshall. The governor guide names Cindy Holscher and Ty Masterson, each with a running mate. Retentions are yes-or-no votes on judges, easy to skip and easy to confuse with the amendment. Advance voting is a county operation. No national rating is stored on the guides. Readers should not fill that blank with a national generic-ballot number.",
  ],
  IL: [
    "Illinois lists a Class 2 Senate seat, governor and lieutenant governor, attorney general, secretary of state, comptroller, and treasurer. This hub does not yet add a race guide for those offices. The missing guide is not a rating. The Senate class is the same six-year calendar other Class 2 states use. Vote-by-mail application dates are on the voting-deadlines page. The pages read for that update did not print a return deadline, so this briefing does not invent one. Election-authority hours for early voting vary. A statewide total will not arrive as one Chicago number.",
  ],
  NH: [
    "New Hampshire’s general-election candidate list puts governor and U.S. senator before the district headings. That is a short statewide card: one executive and one Class 2 senator, then the House districts. Towns administer much of New Hampshire’s election day. A small town that reports early is not a sample of Manchester or Nashua. This hub has no race guide yet, so it does not store a poll or a rating. The candidate list remains the election office’s, and it can change when the office updates it.",
  ],
  VA: [
    "Virginia’s November 3, 2026 candidate list marks United States Senate as the statewide office. Governor is not on that ballot. Virginia elects its governor in odd years, so a reader who expects a governor’s race in a midterm is in the wrong cycle. The Senate contest is Class 2. U.S. House seats are by district. The mailed-ballot return rule this site stores, noon on November 6, 2026, is a reason the Tuesday-night total is not the last accepted ballot. That date is a deadline, not a prediction about which ballots will arrive.",
  ],
  NJ: [
    "New Jersey’s 2026 election-information page lists U.S. Senate and U.S. House. It does not list a governor. The governor was elected on a different cycle. The Senate contest is Class 2. House districts in a state this size can point in different directions on the same night. In-person early voting and mail-in ballot dates on the voting-deadlines page come from the voter information portal. This hub does not add a race guide, a poll, or a rating on top of that list.",
  ],
  MA: [
    "Massachusetts lists a Class 2 Senate seat, governor and lieutenant governor, and four other statewide executive offices. The candidates page the hub read did not print registration, early-voting, or mail deadlines, so those dates are not repeated here. The Elections Division’s calendar is the place to read them. A six-office executive ballot plus a Senate seat is a long state card even without a guide on this site. Judicial or local questions, if a city adds them, will not appear in the statewide candidate list.",
  ],
  WA: [
    "Washington’s August 21, 2026 certification is a House-by-district election plus five statewide Supreme Court contests, some of them unexpired terms. There is no U.S. Senate contest and no governor on that certification. A court race for a two-year unexpired term is not the same as a six-year term beside it. Position numbers are the way to tell them apart. Washington’s mail-ballot practice means election-night “precincts” are a poor description of a count that is mostly envelopes. The certification the hub read did not print registration or return deadlines. Those stay on the Secretary of State’s calendar.",
  ],
  CO: [
    "Colorado’s September 4, 2026 candidate list marks a Class 2 Senate seat, the statewide executive offices, and statewide courts, and the state lists certified 2026 ballot measures. Colorado mails ballots. A measure and a Senate race share a ballot and not a constituency of opinion. Voters split them. The candidate list the hub read did not print the registration deadline. The Secretary of State’s calendar does that work. Judicial races on the same list are easy to overlook under a Senate headline and still count in the canvass.",
  ],
  TN: [
    "Tennessee publishes separate candidate lists for governor and for U.S. Senate, and it has three constitutional amendments set for November 2026. The Senate seat is Class 2. Amendments are yes-or-no questions with their own passage rules. They are not a third candidate in the governor’s race. The candidate-lists page the hub read did not print registration or early-voting deadlines. This briefing does not supply them from memory. County election commissions run the sites.",
  ],
  IN: [
    "Indiana’s November 3, 2026 abbreviated candidate list names secretary of state, state comptroller, and treasurer of state. It is not a governor’s year and not a Senate year on that list. Row offices can be close or not without any national rating attached, and this hub does not invent one. The abbreviated list also did not print registration or mail deadlines. The Election Division’s calendar is the source. A reader who came for a Senate race is on the wrong cycle for Indiana.",
  ],
  MO: [
    "Missouri’s August 25, 2026 certification lists state auditor and a Missouri Supreme Court contest. That is the statewide candidate story for November 3, not a governor and not a senator. An auditor’s race and a court race draw different voters and different information. The certification the hub read did not print a registration deadline. The Secretary of State’s calendar does. Local and legislative lines fill the rest of a county’s ballot and can be the reason someone turns out.",
  ],
  MD: [
    "Maryland lists governor and lieutenant governor, comptroller, attorney general, and an at-large appellate judgeship. The office groups the hub read do not include a U.S. Senate heading. The appellate judgeship is not a second governor. It is a judicial line with its own electorate of everyone in the state and its own, usually quieter, campaign. The statewide candidate page did not print registration or mail deadlines when it was read. The State Board’s calendar is the authority. A governor’s race without a Senate race is still a full executive election.",
  ],
  SC: [
    "South Carolina’s statewide search lists a Class 2 Senate seat and seven executive offices, including governor and lieutenant governor. That is a long top of the ballot. The go-to guide this site uses for deadlines prints registration and early voting and does not print an absentee return deadline, so none is stated here. The Election Commission’s absentee guide is the place for that rule. Seven executive offices can finish in different directions. The Senate result does not appoint the agriculture commissioner.",
  ],
  AL: [
    "A Walker County sample of Alabama’s November 3, 2026 ballot prints the Class 2 Senate seat, the statewide executive offices, and statewide appellate offices, and the Secretary of State certified four amendments. Amendments are statewide even when a reader meets them on one county’s sample. The sample is an illustration of the state card, not a finding that only Walker County votes. The pages read for deadlines did not print a registration date. The Secretary of State’s calendar does. Appellate offices are yes-or-no or candidate races according to that sample’s headings, and they should be read as printed.",
  ],
  AR: [
    "Arkansas’s Secretary of State lists four measures referred to the November 3, 2026 ballot, and the candidate list names U.S. Senate, four U.S. House districts, governor, and the other executive offices on the hub. Measures and candidates share a ballot. They do not share a passage rule. The election calendar supplied the registration date this site stores and did not print an early-voting period in the lines that were read. A missing line is not a claim that early voting does not exist. It is a claim that this page will not invent the hours.",
  ],
  CT: [
    "Andover’s official state-election ballot is the document the hub uses to show Connecticut’s statewide card: governor and four other executive offices, with U.S. representative by district. There is no Senate contest on that reading. A small town’s sample can still be the right picture of the state offices, because those offices are the same in every town. The voter guide printed a registration date and absentee return dates. It did not print an early-voting period in the pages that were read. Town clerks are the local half of the absentee process.",
  ],
  DE: [
    "Delaware’s filed-candidate list marks U.S. senator, representative in Congress, attorney general, auditor of accounts, and state treasurer as statewide. No governor contest appears. The Senate seat is Class 2. Auditor and treasurer are easy to treat as afterthoughts and are still statewide elections with their own certificates. The general-election page supplied registration and absentee dates and did not print an early-voting period in the lines that were read. The Department of Elections’ calendar is where a later early-voting announcement would land.",
  ],
  DC: [
    "The District’s November 3, 2026 calendar lists a delegate to the U.S. House, the mayor, council-wide offices, the attorney general, the Board’s United States Senator and United States Representative contests, and Initiative Measure No. 86. The senator and representative contests on the Board’s ballot are not seats in Congress with a vote on the floor. The delegate race is the federal office. Confusing those labels is the characteristic mistake on this ballot. Initiative 86 is a local question with a local passage rule. Registration and mailed-ballot dates are on the Board’s revised calendar. The District does not decide a Senate class.",
  ],
  HI: [
    "Hawaii’s proclamation and general-election proofs list U.S. House by district, governor and lieutenant governor, Office of Hawaiian Affairs trustees, and two constitutional questions. There is no Senate contest on that reading. The at-large trustee vote — not more than three — is a different kind of plurality from a single-winner governor’s race. Two constitutional questions have their own texts. The time zone puts Hawaii’s close earlier than a mainland reader’s evening. The proclamation printed a paper-registration date and a 7 p.m. receipt rule for ballots. It did not print a separate early-voting range in the lines that were read.",
  ],
  ID: [
    "Idaho’s voter pamphlet prints two constitutional amendments, Proposition One, and a non-binding advisory question, and the candidate list names U.S. Senate, two U.S. House districts, and the executive offices. An advisory question does not change statute by itself. An amendment can. Proposition One should be read from the pamphlet, not from a headline that collapses all three into “the ballot measures.” The general-election page printed a pre-registration date and an absentee-request deadline and did not print a return deadline in the lines that were read. This page leaves that blank.",
  ],
  KY: [
    "Kentucky’s officer guide lists a Class 2 U.S. Senate seat, U.S. House by district, and constitutional amendments for all voters, and it does not print the amendment titles. Untitled on the guide does not mean untitled on the ballot. It means this site will not guess the titles. Governor is not the office on that guide. The State Board homepage supplied a registration date and in-person absentee dates. A mail-return deadline was not printed there, so it is not printed here. Amendment campaigns and the Senate campaign are different decisions on one card.",
  ],
  LA: [
    "Louisiana’s November 3, 2026 quick facts, as the hub cites them, list a U.S. Senate general election, a U.S. House open primary, and ten constitutional amendments. The Senate line and the House line are not the same election system. An open primary can produce a later runoff. A general election might not. Ten amendments are ten texts. They will not all pass or fail together as a matter of law, even if campaigns treat them as a package. The elections page supplied registration dates. It did not print an early-voting period in the lines that were read.",
  ],
  MS: [
    "Mississippi’s qualifying list associates a Class 2 U.S. Senate contest and U.S. House districts with the November 3, 2026 general election, and it says qualifying is not itself ballot placement. That sentence matters. A name that qualified is not automatically a name on the November ballot. This hub does not promote a qualifying list into a certified general-election roster. The pages read for deadlines did not print registration or mail dates. The Secretary of State’s calendar remains the source. No governor is on that Senate-and-House reading.",
  ],
  MT: [
    "Montana’s Secretary of State says the 2026 cycle elects one U.S. senator and both U.S. representatives, and three ballot issues are marked qualified for the general election. Two House seats means each voter has one of them, not both. The Senate seat is Class 2. Three issues are three questions. The election calendar supplied registration dates and an absentee mailing date and did not print an early-voting period or a return deadline in the lines that were read. Those blanks stay blank here.",
  ],
  NE: [
    "Nebraska’s September 11, 2026 candidate list names a Class 2 Senate seat and five statewide executive offices, including governor and lieutenant governor, and the elections page lists three initiatives and LR19CA. Nebraska’s legislature is unicameral and nonpartisan in its own elections. That fact does not make the federal Senate race nonpartisan. The initiatives and the constitutional amendment are yes-or-no. The candidate list the hub read did not print registration or mail deadlines. The Secretary of State’s calendar is the source, and this page does not convert a statute’s “days before” into a date the office did not print.",
  ],
  NM: [
    "New Mexico’s January 26, 2026 proclamation calls a Class 2 Senate seat, the statewide executive offices, and one Court of Appeals position. The voter guide lists constitutional amendments and bond questions. Bonds are permission to borrow. They are not candidates and not amendments. The proclamation did not print a registration deadline. The voter guide did print an early-voting start, which is why that date, and not a guessed mail deadline, is what this site repeats. A single Court of Appeals position should not be folded into the governor’s total.",
  ],
  ND: [
    "North Dakota’s general contest list has no U.S. Senate race. It lists representative in Congress, statewide executive offices, Supreme Court contests, and two constitutional measures. The House seat is at large. A statewide House vote in North Dakota is the House race, which is the exception that proves the usual rule that a statewide House total elects nobody. The two measures have their own texts. Absentee dates are on the current-elections page this site cites. A separate early-voting period was not printed there.",
  ],
  OK: [
    "Oklahoma’s July 24, 2026 election notice lists a Class 2 Senate seat, five U.S. House offices, and the statewide executive offices, and two state questions are qualified for November 3. Five House offices means five districts, not five votes for one voter. The state questions are yes-or-no. The State Election Board homepage supplied a registration date and an absentee-request deadline and did not print a return deadline in the lines that were read. A Senate headline will not describe the questions.",
  ],
  OR: [
    "Oregon’s upcoming-elections page says every November 3, 2026 ballot includes governor and U.S. senator, and that there is no statewide ballot measure. The absence of a measure is a fact about this ballot, not a claim that Oregon never uses them. Both offices are statewide and can still diverge. Oregon votes by mail. Ballot mailing and return dates are on that page and repeated on the voting-deadlines page. A separate early-voting period was not printed in the lines that were read. Election-night totals in a vote-by-mail state are a progress report on envelopes.",
  ],
  RI: [
    "Rhode Island’s candidate guide lists a Class 2 senator and the statewide general offices, and the voter handbook lists five state bond questions. Bonds are borrowing questions. They can pass while a candidate loses, and they can fail while a candidate wins. The Board’s date table prints some 2026 dates under an asterisk the page also uses for an unofficial proposed schedule. This site does not promote those asterisked dates to confirmed deadlines. Mail-ballot application and return dates in the handbook are the dates that were firm enough to repeat.",
  ],
  SD: [
    "South Dakota’s general candidate list names a Class 2 Senate seat and the statewide executive offices, and the ballot-question pamphlet prints four constitutional amendments. Four amendments are four texts, not a slate with one outcome. The Senate campaign does not decide them. The election-information page printed a registration deadline and an absentee-voting start and did not print an absentee return deadline. That omission stays an omission. County auditors run the absentee process under whatever return rule the Secretary of State actually publishes.",
  ],
  UT: [
    "Utah’s September 21, 2026 certification lists U.S. House by district, Supreme Court and Court of Appeals retention elections, and two constitutional amendments. It does not list a U.S. Senate or governor contest. A retention election is a yes-or-no on a judge. Two amendments are two texts. Utah’s ballot practice is heavily by-mail. The voter-information pamphlet’s mailing and return dates are the ones this site repeats. A statewide executive story borrowed from a neighboring state does not describe this certification.",
  ],
  VT: [
    "Vermont’s offices list names U.S. representative, governor, and five other statewide executive offices. No U.S. Senate contest is on that list. Two constitutional amendments were announced without titles. Untitled in the announcement means this site does not supply titles. The voter-registration FAQ is the source for the registration rule this site stores. Statewide early-voting hours were not printed on the pages that were read. Early and absentee request and return dates that were printed are on the voting-deadlines page. A single at-large U.S. representative is the whole House delegation.",
  ],
  WV: [
    "West Virginia sample ballots for November 3, 2026 print U.S. senator and U.S. House by district, and the Secretary of State noticed one constitutional amendment. Governor is not on those samples. The Senate seat is Class 2. One amendment is one text, easy to miss under a Senate headline and still part of the canvass. GoVoteWV printed registration, early-voting, and absentee dates, which is why this state’s deadline block is fuller than states whose pages did not. Sample ballots from counties should match on the statewide offices and can differ on local lines.",
  ],
  WY: [
    "Wyoming’s voter guide lists a Class 2 Senate seat, the state’s one U.S. representative, statewide executive offices, judicial retentions, and Proposed Initiative Proposition Number One. The House race is at large, so it is statewide in a way most House races are not. Retentions are yes-or-no. The initiative is a separate yes-or-no with its own text. The key-dates sheet printed registration and absentee request dates. A separate early-voting period was not printed on that sheet. The return line this site stores comes from the voter guide, not from a guessed statute.",
  ],
};
