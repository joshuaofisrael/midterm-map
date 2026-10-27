import { ESSAY_UPDATED, rich, type Inline } from "@/data/essays/text";

export type LearnArticle = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  paragraphs: Inline[][];
  faqs: { question: string; answer: string }[];
  related: string[];
  sources: { name: string; url: string }[];
};

const UPDATED = ESSAY_UPDATED;

function body(paragraphs: string[]): Inline[][] {
  return paragraphs.map((paragraph) => rich(paragraph));
}

const CONSTITUTION = {
  name: "National Archives, the Constitution of the United States: a transcription",
  url: "https://www.archives.gov/founding-docs/constitution-transcript",
};
const HOUSE = {
  name: "U.S. House of Representatives, The House Explained",
  url: "https://www.house.gov/the-house-explained",
};
const SENATE_TERMS = {
  name: "U.S. Senate, Qualifications & Terms of Service",
  url: "https://www.senate.gov/senators/qualifications_termsofservice.htm",
};
const USC_2A = {
  name: "2 U.S.C. § 2a, reapportionment of representatives (Legal Information Institute)",
  url: "https://www.law.cornell.edu/uscode/text/2/2a",
};
const USC_3_15 = {
  name: "3 U.S.C. § 15, counting electoral votes (Legal Information Institute)",
  url: "https://www.law.cornell.edu/uscode/text/3/15",
};
const ECRA = {
  name: "Congress.gov, Electoral Count Reform and Presidential Transition Improvement Act of 2022 (S. 4573, 117th Congress)",
  url: "https://www.congress.gov/bill/117th-congress/senate-bill/4573",
};
const HAVA_PROVISIONAL = {
  name: "52 U.S.C. § 21082, provisional voting (Legal Information Institute)",
  url: "https://www.law.cornell.edu/uscode/text/52/21082",
};
const NCSL_MAIL = {
  name: "National Conference of State Legislatures, receipt and postmark deadlines for absentee and mail ballots",
  url: "https://www.ncsl.org/elections-and-campaigns/table-11-receipt-and-postmark-deadlines-for-absentee-mail-ballots",
};
const NCSL_ELECTIONS = {
  name: "National Conference of State Legislatures, elections and campaigns",
  url: "https://www.ncsl.org/elections-and-campaigns",
};
const CENSUS = {
  name: "U.S. Census Bureau, voting and registration",
  url: "https://www.census.gov/topics/public-sector/voting.html",
};
const EAC = {
  name: "U.S. Election Assistance Commission, election results, canvass, and certification",
  url: "https://www.eac.gov/election-officials/election-results-canvass-and-certification",
};
const VOTE_GOV = {
  name: "Vote.gov",
  url: "https://www.vote.gov/",
};
const FEC = {
  name: "Federal Election Commission, election results and voting information",
  url: "https://www.fec.gov/introduction-campaign-finance/election-results-and-voting-information/",
};

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "house-majority",
    title: "How the House majority works",
    description:
      "What 218 means, what vacancies change, and why the national popular vote does not choose the U.S. House majority.",
    updated: UPDATED,
    paragraphs: body([
      "A majority in the U.S. House is a count of seats, not a share of the national popular vote. Voters in each district elect one representative. The majority is whichever party, or coalition of members, holds more of those seats when the House organizes. The Constitution apportions representatives among the states by population and guarantees every state at least one. It does not fix the modern total of 435. That number comes from statute, in 2 U.S.C. § 2a, after each census. Apportionment is a separate act from the election on November 3, 2026.",
      "If all 435 voting seats are filled, 218 is a bare majority. That is why a graphic says “218.” It is not a constitutional charm. A vacant seat is not a vote. When seats are empty, a majority of the members who have been sworn can be smaller than 218. The Clerk of the House and the House itself are the authorities on who has taken the oath. A chart that still prints 218 after resignations is describing the full House, not necessarily the votes required on a given day.",
      "The House also seats delegates from the District of Columbia and the territories. Their floor rights are set by House rules. They are not part of the 435, and a delegate race is not an extra vote for Speaker under the statute that fixes the voting membership. The District’s own ballot can include a delegate contest and local offices. Those elections are real. They do not become a 436th vote in the apportionment statute.",
      "Organizing the House is the first job of a new Congress. Members elect a Speaker. A party can hold more seats than the other party and still fail to elect a Speaker on the first ballot if its members do not vote together. That is a description of how the Speaker ballot works. It is not a prediction about 2027. This site does not forecast which party will organize the House.",
      "Every voting seat is on the November 3, 2026 ballot because a House term is two years. A state can prefer one party for senator or governor and still split its House seats, because a district is not the statewide electorate. Committee gavels and the floor agenda follow the majority the House actually organizes. They do not follow a national generic-ballot percentage. When this site prints a generic-ballot survey, it is one poll with a pollster and dates, not a model that awards seats. Unofficial election-night totals are not the organization of the House. States canvass on their own calendars, and a television projection is not a certificate.",
    ]),
    faqs: [
      {
        question: "Is 218 always enough to control the House?",
        answer:
          "218 is a majority of 435 voting seats if every seat is filled. Vacancies can change how many votes are needed for a majority of members who have been sworn. The Clerk of the House is the authority on membership.",
      },
      {
        question: "Does the national popular vote pick the House majority?",
        answer:
          "No. Each district elects its own representative. One party can receive more votes nationwide and still win fewer seats, or the reverse. This site does not convert a national poll into a seat count.",
      },
    ],
    related: ["house-districts", "senate-majority", "certification", "results-shift"],
    sources: [CONSTITUTION, HOUSE, USC_2A, FEC],
  },
  {
    slug: "senate-majority",
    title: "How the Senate majority works",
    description:
      "Why a Senate majority is a count of 100 seats, what a tie means, and why ending debate is a different vote.",
    updated: UPDATED,
    paragraphs: body([
      "The Senate has 100 seats, two from each state, without regard to population. A majority of that body is 51 if every seat is filled. The practical meaning of “majority” depends on the question. Organizing the chamber, confirming a nominee, and cutting off debate are not the same vote. The Constitution gives the Vice President a vote when the Senate is equally divided. A 50–50 Senate can therefore organize and pass measures with the Vice President’s vote. That is a rule about ties. It is not a forecast of the 2026 elections.",
      "Ending debate is harder than passing a bill, because the Senate’s standing rules let a minority slow the floor. The often-cited 60-vote threshold is a cloture number under those rules, not a sentence in the Constitution. The Senate can change its rules. A news story that treats 60 as permanent is describing current practice, not a constitutional command. This page does not predict whether the rules will be the same in 2027. It only separates the constitutional majority from the cloture practice readers see in headlines.",
      "Only about one-third of the seats are on a regular November ballot, because senators serve six-year terms and the chamber is divided into three classes. The class on the 2026 ballot is Class 2, the class elected in 2020, whose terms expire in January 2027. A few states also fill an unexpired term at the same election. Ohio’s 2026 ballot, for example, includes a Senate contest for a term ending January 3, 2029. That special or unexpired contest is not a second Class 2 seat. The state hub is the place to see whether a state has a Class 2 race, an unexpired term, or neither.",
      "Control of the Senate in 2027 is the sum of seats not on the ballot and seats that are. A party can lose a seat it holds and still keep a majority, or gain a seat and still be short, depending on the rest of the map. Analysts publish ratings of individual races. When this site repeats a rating, the outlet’s name and date stay on the label. The rating is that outlet’s judgment. It is not a Map the Midterms projection, and several Toss-up labels do not add up to a seat total this site is willing to print.",
      "Election night does not swear in senators. A state certifies its canvass, and the new Congress is seated in January. A runoff, where state law requires one, can move a state’s final word weeks past November 3. Ranked-choice tabulation, where a state uses it, can also mean the first-choice totals on election night are not the last count. Those procedures are state law. They are not a national delay.",
    ]),
    faqs: [
      {
        question: "Does the Vice President always vote in the Senate?",
        answer:
          "No. The Constitution gives the Vice President a vote only when the Senate is equally divided. If the chamber is not tied, the Vice President does not cast a deciding vote.",
      },
      {
        question: "Are 60 votes required to pass a bill?",
        answer:
          "A simple majority can pass many questions if debate has ended. The 60-vote figure readers see is the Senate’s cloture practice for ending debate under its rules. It is not written into the Constitution as the price of every bill.",
      },
    ],
    related: ["senate-classes", "house-majority", "runoffs", "certification"],
    sources: [CONSTITUTION, SENATE_TERMS, HOUSE],
  },
  {
    slug: "senate-classes",
    title: "Senate classes, and why only one-third of the seats are up",
    description:
      "How the three Senate classes work, why Class 2 is on the 2026 ballot, and how an unexpired term differs.",
    updated: UPDATED,
    paragraphs: body([
      "The Constitution requires the Senate to be divided into three classes so that the whole chamber is never on the ballot at once. Senators serve six years. Every two years, one class — about a third of the seats — faces the voters. The Senate’s own terms-of-service page states that rule in plain language. The point is continuity: two classes remain in office while one class is elected.",
      "Class 2 is the class on the regular 2026 ballot. Those senators were last elected in 2020, and their terms expire in January 2027. Class 1 was on the 2024 ballot. Class 3 comes up in 2028. A state hub on this site says whether that state has a Class 2 seat in 2026. Several states do not. Their voters still elect a House delegation, and many elect governors or other statewide offices, but they are not choosing a senator for a new six-year term.",
      "An unexpired term is a different contest. If a senator leaves early, state law decides whether a temporary appointee serves and when voters fill the remainder. The remainder might end in 2027, 2029, or another January, depending on which class the seat belongs to. Ohio’s official ballots for November 3, 2026 include a Senate contest for an unexpired term ending January 3, 2029. That date is the clue that the seat is not the ordinary Class 2 term. Read the term date on the state’s candidate list before treating two Senate lines as the same office.",
      "Winning a Class 2 seat in November 2026 does not by itself decide which party organizes the Senate. Seats in the other two classes stay put. A party that already holds most of those seats can lose a Class 2 race and remain in the majority, or win one and still be short. Ratings of single races, including any Cook Political Report label this site cites on a guide, describe that race only. Adding the labels into a national total would be a model. This site does not build one.",
      "The class system also explains why Senate turnout patterns and House turnout patterns are not interchangeable. A voter in a state with no Senate race still has a House ballot. A voter in a state with a Senate race is choosing a six-year office and, separately, a two-year House seat. Past margins for the last Class 2 election are the 2020 canvass in that state, published by the state and compiled for federal offices by the Federal Election Commission. A 2020 margin is a record of that canvass. It is not a prediction for 2026, and this library does not paste a percentage it has not taken from the canvass it cites.",
    ]),
    faqs: [
      {
        question: "Which Senate class is on the ballot in 2026?",
        answer:
          "Class 2. Those terms expire in January 2027. The Senate’s terms-of-service page describes the three-class system. A state hub on this site says whether that state has a Class 2 contest.",
      },
      {
        question: "Why would a state show a Senate race that is not Class 2?",
        answer:
          "Some ballots fill an unexpired term. The end date on the official candidate list identifies the term. It can differ from the January 2027 date on a regular Class 2 seat.",
      },
    ],
    related: ["senate-majority", "what-is-a-midterm", "turnout", "reading-polls"],
    sources: [SENATE_TERMS, CONSTITUTION, FEC],
  },
  {
    slug: "runoffs",
    title: "Runoffs, open primaries, and ranked-choice finals",
    description:
      "When a November plurality is not the last count: majority runoffs, Louisiana’s open primary, and ranked-choice tabulation.",
    updated: UPDATED,
    paragraphs: body([
      "Most states award a general-election office to the candidate with the most votes, even if that total is under 50 percent. A few states do not stop there. The rule is in state law, and it can differ by office inside the same state. A national results page that treats every contest as “final on election night” will misread those ballots. This site does not call a winner in either case.",
      "Georgia can require a runoff when no candidate reaches a majority. The Secretary of State publishes the calendar if a runoff is ordered. The June 16, 2026 Republican primary runoff for U.S. Senate, which the Secretary’s official results report on the Georgia race guide, is a primary runoff, not a model of what November will do. A general-election runoff, if one is required, is a later election with its own deadlines. Readers should use the Secretary’s calendar rather than assume the primary dates repeat.",
      "Louisiana’s secretary of state distinguishes an open primary from a general election, and the distinction is by office. This site’s Louisiana hub, citing the state’s 2026 quick facts, says the U.S. Senate contest is a general election and U.S. House contests are an open primary. In an open primary, a candidate who does not reach the share state law requires can face a later runoff. Do not apply the House rule to the Senate line, or the reverse, without reading the office heading.",
      "Ranked-choice tabulation is a different mechanism. Voters mark candidates in order. If no one has a majority of continuing ballots, the last-place candidate is eliminated and those ballots move to the next choice. Alaska’s Division of Elections says ranked-choice voting applies to the 2026 U.S. Senate and governor contests cited on this site’s Alaska guides. First-choice totals on election night can therefore change when the division runs the later rounds. Maine publishes which of its offices use ranked-choice voting. Do not assume a Maine state office uses the same rule as a federal office unless the Secretary of State says so.",
      "A runoff or a later ranked-choice round is not evidence that the first count was illegitimate. It is the counting rule the state adopted. Certification waits on that process where the statute says it must. The pages on mail ballots and on shifts after election night describe other reasons a total moves. Those reasons can stack: a state might still be accepting timely mail ballots while it also prepares a runoff calendar. Each fact needs its own source.",
    ]),
    faqs: [
      {
        question: "Does every close race go to a runoff?",
        answer:
          "No. A runoff happens only when that state’s law requires one for that office. Many states elect by plurality, so a candidate can win with less than half the vote and there is no second election.",
      },
      {
        question: "Is ranked-choice voting the same as a runoff?",
        answer:
          "No. A runoff is a later election day. Ranked-choice tabulation reassigns ballots already cast, in rounds, under the state’s rules. Alaska and Maine publish which offices use that method.",
      },
    ],
    related: ["mail-ballots", "results-shift", "certification", "recounts"],
    sources: [
      { name: "Georgia Secretary of State, elections", url: "https://sos.ga.gov/elections" },
      { name: "Louisiana Secretary of State, elections and voting", url: "https://www.sos.la.gov/ElectionsAndVoting/Pages/default.aspx" },
      { name: "Alaska Division of Elections", url: "https://www.elections.alaska.gov/" },
      { name: "Maine Secretary of State, elections", url: "https://www.maine.gov/sos/cec/elec/" },
    ],
  },
  {
    slug: "mail-ballots",
    title: "How mail ballots are counted",
    description:
      "Why mail-ballot rules differ by state, what a postmark deadline is, and why those ballots can be counted after election night.",
    updated: UPDATED,
    paragraphs: body([
      "A mail ballot is a ballot the voter returns by mail or drop box instead of feeding it into a scanner at a polling place on Election Day. States do not use one national form or one national deadline. Some mail a ballot to every active registered voter. Others require an application, and they limit who may apply. Vote.gov points to the state election office. That office, not this website, accepts or rejects the application.",
      "The deadline is the rule that causes the most confusion on election night. In some states the ballot must be received by the close of polls. In others it must be postmarked by Election Day and received within a set number of days. The National Conference of State Legislatures keeps a table of receipt and postmark rules because the table is long. A ballot that is legal under one state’s rule would be late under another’s. This site’s voting-deadlines page repeats a date only when an official page for that state printed it.",
      "Counting is not the same as receiving. Election workers check the envelope, the signature or identification the state requires, and the voter’s eligibility before the ballot is added to the tally. A state may allow that processing before Election Day and still forbid release of the totals until polls close. Another state may not start processing until Election Day. Either choice is administration. Neither choice is a comment on which party uses mail ballots.",
      "Ballots that arrive on time after election night, where state law allows them, are added when they are accepted. The public total can rise, and the margin can narrow or widen, without any “late” ballot in the ordinary sense. “Late” means late under that state’s statute. A postmarked-by-Election-Day ballot received on the day the statute names is on time. The page on why results shift describes this alongside provisional ballots and curing, which is the chance some states give a voter to fix a missing signature.",
      "Military and overseas voters often have a distinct window under federal and state law. A state page that prints one deadline for domestic mail ballots and another for uniformed and overseas voters is not contradicting itself. Copy the line that matches the voter. This site does not request ballots, cure signatures, or tell a voter which envelope to use. Those steps belong to the election office printed on the state hub.",
    ]),
    faqs: [
      {
        question: "Are mail ballots counted only if they arrive by election night?",
        answer:
          "It depends on the state. Some require receipt by the close of polls. Others accept a ballot postmarked by Election Day if it arrives within a set number of days. The state’s election office publishes the rule that applies.",
      },
      {
        question: "Does this site request a mail ballot?",
        answer:
          "No. Applications go to the state or local election office. Vote.gov links to that office. A form on this website is not a ballot request.",
      },
    ],
    related: ["results-shift", "provisional-ballots", "certification", "election-officials"],
    sources: [NCSL_MAIL, VOTE_GOV, EAC],
  },
  {
    slug: "results-shift",
    title: "Why results shift after election night",
    description:
      "How mail ballots, provisional ballots, and later tabulation rounds move a total without changing the election.",
    updated: UPDATED,
    paragraphs: body([
      "An election-night total is a progress report. It is the ballots election officials have tabulated and published so far. The U.S. Election Assistance Commission says results reported on election night are not the final certified results, even when a display reads that every precinct has reported. “Precincts reporting” usually describes polling-place scanners. It often does not describe every mail ballot, every provisional ballot, or every curing envelope still in process.",
      "The order of counting is a local choice constrained by state law. One county might report small precincts first. Another might report early-vote centers first. A third might hold a large city until late. If the places that report first are not a miniature of the state, the leader can change as the rest of the ballots are added. That pattern is arithmetic. It is not, by itself, evidence that a file was altered. A real discrepancy is a question for the canvass, the audit, and the courts, which compare ballots, logs, and voter lists. A lead change is not that comparison.",
      "Three ordinary additions move totals in the days after Election Day. Timely mail ballots are accepted on the schedule the state printed. Provisional ballots are accepted or rejected one by one after workers check eligibility. Ranked-choice rounds, in states that use them, reassign ballots already cast. A runoff, where the law requires one, is a new election rather than an addition to the first count. Each of those has its own explainer in this library. They can happen in the same week.",
      "News organizations project winners from partial counts and from their own models. A projection can be right and still not be a certificate. This site does not project. The live results page copies figures from state election-office files after polls close, and it labels a winner only when that official file does. If the file later updates, the figures on the page update. The earlier snapshot was not a promise.",
      "Readers comparing two screenshots should check three lines: the time of the file, whether the file says the results are unofficial, and which ballots the state says are still out. A percentage with a small number of ballots counted will jump more than a percentage with most ballots counted. That is how percentages work. It is not a reason to treat the first percentage as the state’s final word.",
    ]),
    faqs: [
      {
        question: "Does a lead change mean the count was changed illegally?",
        answer:
          "Not by itself. Totals move when accepted ballots are added. A legal challenge is about ballots, eligibility, or procedure, and it is decided by election officials and courts, not by a lead change on a website.",
      },
      {
        question: "Does “100 percent of precincts” mean every ballot is counted?",
        answer:
          "Usually it means precinct scanners have reported. Mail, provisional, and cured ballots can still be outstanding. The Election Assistance Commission treats election-night figures as unofficial until certification.",
      },
    ],
    related: ["mail-ballots", "provisional-ballots", "certification", "runoffs"],
    sources: [EAC, NCSL_MAIL],
  },
  {
    slug: "recounts",
    title: "How recounts work",
    description:
      "What a recount is, who can ask for one, and why a recount is not the same thing as certification or a court contest.",
    updated: UPDATED,
    paragraphs: body([
      "A recount is another count of ballots that were already cast, to check whether the first tabulation read them correctly. It is not a new election, and it is not a license to add ballots that missed the deadline. The Election Assistance Commission describes the usual triggers: a candidate asks, a voter asks, the margin falls inside a number written in state law, or a court orders it. Which of those paths exists, what it costs, and how fast it must finish are state statutes. There is no single federal recount deadline for every office.",
      "Automatic recounts are the ones people confuse with “close.” Some states recount if the margin is inside a percentage or a raw-vote number. Others never recount unless someone asks and, often, pays. A race can be very close and produce no recount, or it can be recounted because a candidate asked even though the margin was outside the automatic band. The National Conference of State Legislatures tracks those differences because they are not intuitive. This page does not reprint all 50 statutes.",
      "The method varies. A recount might re-run paper ballots through scanners. It might be a hand inspection of every ballot. It might be a sample. The order of operations with audits also varies. An audit checks that the equipment behaved, often on a sample of ballots. A recount retabulates a contest. A state can do one, both, or neither, on the calendar its law sets. Neither process certifies a winner by itself. Certification is the official attestation that the canvass is complete.",
      "Recount totals can differ from election-night totals by a small number of ballots and still confirm the same leader. They can also change a leader when the first margin was smaller than the corrections. Both outcomes have happened in American elections. The existence of a recount is not evidence that the first count was dishonest. It is evidence that the state has a procedure for a second look. A candidate who wants a court to throw ballots out is in a contest or an election challenge, which is a lawsuit, not a recount.",
      "Federal offices still depend on the state canvass. The House and Senate are the judges of the elections and returns of their own members, under the Constitution, but the ordinary path is the certificate the state sends. A reader waiting on a close House or Senate race should watch the state election office’s recount page and its certification deadline, not a national color map. This site will not label a recount as a win for either candidate.",
    ]),
    faqs: [
      {
        question: "Does every close race get a recount?",
        answer:
          "No. Some states recount automatically inside a set margin. Others recount only if a candidate or voter asks, and they may charge for it. State law is the list of triggers, not the size of the margin alone.",
      },
      {
        question: "Is a recount the same as certification?",
        answer:
          "No. A recount retabulates ballots. Certification is the official statement that the results are the canvass. A state may delay certification until a recount window closes. The election office publishes that order.",
      },
    ],
    related: ["certification", "results-shift", "electoral-count-act", "election-officials"],
    sources: [EAC, NCSL_ELECTIONS, CONSTITUTION],
  },
  {
    slug: "certification",
    title: "Canvass and certification",
    description:
      "What election officials do between unofficial election-night totals and a certified result, in the words of the process rather than a projection.",
    updated: UPDATED,
    paragraphs: body([
      "Certification is the step where election officials attest that the results are a true accounting of the votes cast in that election. The U.S. Election Assistance Commission uses that definition and draws a bright line under it: results on election night are unofficial, even if a newsroom has already called the race. Only the officials the state names can certify. This website is not one of them.",
      "The canvass is the work before that signature. Officials add every valid ballot — polling place, early, mail, military and overseas, and provisional — and they reconcile the number of ballots with the number of voters who participated. The reconciliation is how a county explains a gap between check-ins and counted ballots. A gap can be lawful, for example a voter who checked in and did not cast a ballot, or it can be a problem the canvass is designed to find. The canvass document is the place that explanation lives.",
      "Who signs depends on the state and sometimes on the office. A county board, a single elected clerk, a secretary of state, a governor, or a legislature may have a role. Local certification and state certification are often two steps. A statewide total is not final merely because one county has finished. The state hub links the office that publishes that state’s calendar. Dates differ by weeks. A federal law does not set one certification day for every governor, senator, and representative.",
      "Audits sit beside the canvass in most states. They check that the voting equipment counted a set of ballots the way a person would. The timing and the sample are statutory. An audit is not a recount, and a recount is not a court case. All three can affect the calendar. The Commission notes, for example, that some states will not issue the state certificate until the recount window has closed. That is a deadline rule, not a hint about who is ahead.",
      "After certification, the certificate is what other institutions use. The House and Senate receive returns for their members. Presidential electors are a separate track, with deadlines in federal law described on the Electoral Count Reform Act page. A midterm has no electoral college, but the same canvass habit matters, because the officials who certify a governor certify a presidential canvass two years later. Readers should treat a certified PDF from the election office as the result, and treat every earlier number — including numbers this site copies from an unofficial file — as provisional.",
    ]),
    faqs: [
      {
        question: "Who certifies a state’s results?",
        answer:
          "The officials named in that state’s law. It may be a county board, a clerk, a secretary of state, a governor, or a board. Local and state certification are often separate steps. The state election office publishes the calendar.",
      },
      {
        question: "Is a news projection the same as certification?",
        answer:
          "No. A projection is a news judgment. Certification is an attestation by election officials after the canvass. This site does not project winners.",
      },
    ],
    related: ["results-shift", "recounts", "electoral-count-act", "election-officials"],
    sources: [EAC, CONSTITUTION],
  },
  {
    slug: "electoral-count-act",
    title: "Electoral Count Reform Act basics",
    description:
      "What the 2022 law changed about counting electoral votes, and why a midterm still has no electoral college.",
    updated: UPDATED,
    paragraphs: body([
      "The 2026 midterms do not choose a president. There is no electoral college on November 3, 2026. The Electoral Count Reform Act still belongs in a midterm library, because the officials and the habits that certify a midterm are the ones that will certify presidential electors in 2028, and because readers meet the phrase in arguments about any close election.",
      "Congress counts the electoral votes in January after a presidential election. The statute that governs that session is 3 U.S.C. § 15. In 2022, Congress rewrote key parts of the old Electoral Count Act of 1887. The vehicle was the Electoral Count Reform and Presidential Transition Improvement Act, a title of a larger bill enacted that December. The reform is often called the Electoral Count Reform Act, or ECRA. The U.S. Code section is the text to read. A commentary is not a substitute.",
      "The reform was aimed at ambiguity. It identifies the governor, unless a state constitution or statute names another official, as the person who issues the certificate of ascertainment naming the electors. It sets a deadline for that certificate. It raises the number of members of Congress who must object before an objection is heard. It says the vice president’s role in the joint session is ministerial. Those are structural rules about papers and about the January session. They do not decide which slate of electors a state sends. Voters and state law decide the slate. The certificate reports it.",
      "Nothing in that statute turns a midterm race into a presidential race. A senator elected in 2026 may be in office for the January 2029 count of 2028 electoral votes. That is a calendar fact about six-year terms. It is not a reason to read a 2026 Senate poll as a forecast of the next presidential election. This site does not make that leap.",
      "Readers who want the mechanics should open the Code and the enrolled bill, then the state’s own certificate process on the secretary of state’s site. The canvass and certification page in this library describes the state step that comes first. The Reform Act assumes that step has a responsible official and a date. It does not replace the state canvass, and it does not authorize a private website to announce electors.",
    ]),
    faqs: [
      {
        question: "Does the Electoral Count Reform Act apply to the 2026 midterms?",
        answer:
          "The Act governs the counting of presidential electoral votes. There is no electoral college in a midterm. The law still matters as the federal rule for the next presidential election, and senators elected in 2026 can be in office for a later count.",
      },
      {
        question: "Does the Vice President choose the winner?",
        answer:
          "No. The reform describes the vice president’s role in the joint session as ministerial. The state’s certificate of ascertainment names the electors. This page is not legal advice. The statute is 3 U.S.C. § 15.",
      },
    ],
    related: ["certification", "senate-classes", "what-is-a-midterm", "election-officials"],
    sources: [USC_3_15, ECRA, EAC],
  },
  {
    slug: "ballot-measures",
    title: "How to read a ballot measure",
    description:
      "What initiatives, referendums, amendments, and bonds are, and why a measure’s title is not the whole legal text.",
    updated: UPDATED,
    paragraphs: body([
      "A ballot measure is a question put to voters that is not a candidate. States use different names for different tools. An initiative is a proposal that reached the ballot by petition. A referendum asks voters to approve or reject an act the legislature already passed. A constitutional amendment changes the state constitution and usually needs a higher bar than an ordinary statute, either to reach the ballot or to pass. A bond question asks permission to borrow. The National Conference of State Legislatures surveys these processes because almost nothing about them is national.",
      "The short title on the ballot is a summary. The legal change is the text filed with the state. A campaign for or against a measure writes its own slogan. The slogan is not the text. When this site’s state hub says a publicity pamphlet lists eight propositions, or that a state certified four amendments, that sentence is about the official list. It is not an argument for or against any of them. Where the official page did not print the titles, the hub says the titles were not on the page we read. It does not invent them.",
      "Passage rules differ. Some measures pass with a majority of votes cast on the question. Some need a majority of everyone who voted in the election, so blank votes on the question count as no. Some constitutional changes need 60 percent. A measure can “win” a plurality of the people who marked it and still fail the rule. The state constitution or the election statute states the rule. A social-media tally of yes and no does not.",
      "Measures also interact with candidate races without being the same decision. A high-profile proposition can bring voters to the polls who might have skipped a lower office, or the reverse. That is a turnout story. It is not evidence that a yes vote on a measure is a vote for a party’s nominee. Voters split those choices all the time. This site does not assign a party to a yes or a no unless the official ballot itself prints a party label, which measures almost never do.",
      "Local measures — school levies, city charters, county sales taxes — appear on some ballots and not others inside the same state. A statewide pamphlet will not list them. The county election office’s sample ballot is the list for an address. The sample-ballot sketch on this site is a structure, not that official ballot. For the wording of a statewide question, use the secretary of state’s pamphlet or the certificate that placed the question on the ballot.",
    ]),
    faqs: [
      {
        question: "Is a ballot measure the same as a candidate race?",
        answer:
          "No. A measure asks a question about law, the constitution, or borrowing. A race elects a person. They can appear on the same ballot and follow different rules for what counts as passage.",
      },
      {
        question: "Where is the official text?",
        answer:
          "The state election office publishes statewide measures, often in a voter pamphlet or a certification. Local measures come from the county or city. The short title on the ballot is a summary of that text.",
      },
    ],
    related: ["election-officials", "turnout", "what-is-a-midterm", "certification"],
    sources: [NCSL_ELECTIONS, VOTE_GOV],
  },
  {
    slug: "what-is-a-midterm",
    title: "What a midterm election is",
    description:
      "What voters are choosing on November 3, 2026, and what a midterm does not decide.",
    updated: UPDATED,
    paragraphs: body([
      "A midterm is the general election in the middle of a presidential term. Election Day for the 2026 U.S. midterms is Tuesday, November 3, 2026. The date is set by federal law for the election of members of Congress: the Tuesday after the first Monday in November. States use that day for many of their own offices. They do not have to. A state can hold a gubernatorial election in an odd year. Most do not. The state hub says what that state actually placed on the November 3 ballot.",
      "Voters are choosing a new U.S. House. All 435 voting seats have two-year terms, so all of them are up. They are choosing about one-third of the U.S. Senate, Class 2, plus any unexpired Senate terms a state scheduled for the same day. They are not choosing a president or vice president. There is no national popular vote for “the midterms.” There are thousands of separate contests, each with its own rules and its own certificate.",
      "State offices on the same ballot vary. Many states elect governors in midterm years. Some elect them in presidential years. A few elect almost no statewide executive in 2026 and still elect a legislature, judges, or a single row officer. Ballot measures, retention elections for judges, and local offices fill the rest of the card. Treating “the midterm” as one horse race — a single number for control of Washington — hides those choices. Control of the House and control of the Senate are themselves two different counts, explained in the majority pages.",
      "The word “midterm” sometimes carries a theory about turnout: that the president’s party loses seats, or that fewer people vote than in a presidential year. Those are descriptions of some past elections, not a law. The Census Bureau measures reported turnout in a survey. States measure ballots in a canvass. Both can show a gap between presidential-year and midterm-year participation, and both can show exceptions. This site does not turn that history into a 2026 seat forecast.",
      "What a reader can do with a midterm page is narrower and more useful. Find the offices on the state ballot. Read the candidate list the election office published. Read any poll this site has cited as one survey. Use the state’s calendar for registration and mail ballots. Ignore any sentence, including a sentence on social media, that announces a winner before the canvass. This site will not be the one that announces it.",
    ]),
    faqs: [
      {
        question: "Is a president on the 2026 ballot?",
        answer:
          "No. November 3, 2026 is a midterm. Voters elect the U.S. House, about one-third of the Senate, and the state and local offices on their ballots. The next presidential election is a later cycle.",
      },
      {
        question: "Do all states elect a governor in 2026?",
        answer:
          "No. Many do. Some elect governors in presidential years or in odd years. The state hub lists the statewide offices that state’s election office placed on the November 3, 2026 ballot.",
      },
    ],
    related: ["house-majority", "senate-classes", "turnout", "ballot-measures"],
    sources: [CONSTITUTION, HOUSE, SENATE_TERMS, CENSUS],
  },
  {
    slug: "reading-polls",
    title: "How to read a poll without treating it as a forecast",
    description:
      "What a poll’s dates, sample, and margin of error mean, and what this site refuses to do with them.",
    updated: UPDATED,
    paragraphs: body([
      "A poll is a set of interviews, taken on stated dates, of a stated group of people, summarized by a pollster. It is not the election. On this site a poll row appears only when the page can name the pollster, the dates, the sample, and a link to the release or to the page that printed the figures. If those fields are missing, the row is not added. An empty table is not a hint. It means this site does not have a survey it is willing to cite.",
      "The margin of error is a statistical statement about a random sample of a given size, usually at a confidence level the pollster names. It is not a promise that the result sits inside that band. It does not cover every way a poll can be off: a low response rate, a sample that misses a group, a question asked in a way that pushes an answer, or a likely-voter screen that guesses wrong about who will vote. Two polls a week apart can differ by more than either margin of error because the samples and the screens differ, not because the electorate rewrote itself overnight.",
      "Read the population line before the horse-race line. “Adults,” “registered voters,” and “likely voters” are different groups. A lead among adults is not a lead among people who will cast a ballot. Also read who sponsored the poll. A campaign, a party committee, an advocacy group, a university, and a news organization can all field a competent survey, and all of them choose when to publish. This site labels the sponsor when the source names one. The label is disclosure, not a seal of approval.",
      "Averages and models are another product. Some outlets average polls. Some forecast seats. When this site mentions such a product, it names the outlet. It does not recompute the average, and it does not publish its own. A Cook Political Report rating such as Toss-up, Lean, Likely, or Solid is that outlet’s category, dated on the race guide. It can change. Quoting it is not an endorsement of the category and not a statement that the race will finish there.",
      "The honest use of a poll in October is modest. It shows how a named pollster’s sample answered a question on those dates. The election is the canvass after November 3, 2026. Voters who want the candidates’ own words should use the candidates’ sites and the news pages that quote them, not a horse-race number. Voters who want the ballot should use the election office. A poll is not a ballot.",
    ]),
    faqs: [
      {
        question: "Does Map the Midterms average polls?",
        answer:
          "No. Each row is one published survey with a source. An average or a forecast, if mentioned, stays attributed to the outlet that made it. This site does not produce either.",
      },
      {
        question: "What does the margin of error not cover?",
        answer:
          "It does not fix a biased sample, a misleading question, or a wrong guess about who will vote. It is a statistical range for a random sample, on the assumptions the pollster states.",
      },
    ],
    related: ["turnout", "senate-majority", "house-majority", "what-is-a-midterm"],
    sources: [
      {
        name: "American Association for Public Opinion Research, polling resources",
        url: "https://aapor.org/standards-and-ethics/",
      },
      FEC,
    ],
  },
  {
    slug: "provisional-ballots",
    title: "Provisional ballots",
    description:
      "What a provisional ballot is under federal law, and why it may be counted or rejected days after Election Day.",
    updated: UPDATED,
    paragraphs: body([
      "A provisional ballot is a ballot cast when poll workers cannot confirm, in the moment, that the person is eligible to vote a regular ballot. Federal law, in 52 U.S.C. § 21082, requires states to offer one in elections for federal office when a voter’s name is not on the list or an eligibility question comes up, with exceptions the statute spells out for states that have election-day registration at the polls. The voter marks a ballot. Officials decide later, using their records, whether it counts.",
      "The later decision is why provisional ballots move totals after election night. They are not dumped in a pile and added. Each one is accepted or rejected. A rejection can be lawful: the person was not registered, voted in the wrong jurisdiction and the state does not count a partial ballot, or did not complete the identification the state requires. An acceptance can be equally lawful: the registration was valid and the list at the precinct was stale. The notice the voter receives is supposed to explain how to learn which happened. That notice comes from the election office, not from this site.",
      "States differ on how much of a wrong-precinct provisional ballot can count. Some count the contests the voter was eligible to vote. Some reject the whole ballot. That choice changes close local races more often than it changes a statewide race, but it can change either. It is a reason to be careful with a small margin and a large number of provisional ballots still pending. It is not a reason to assume the pending ballots favor one party. The ballots are secret. The public record is the number accepted and the number rejected, which the canvass should report.",
      "Same-day registration, where a state offers it, reduces the need for some provisional ballots and creates its own paperwork. A voter who registers and votes on the same day may still cast a ballot that is checked before it is added. The state hub and the voting-deadlines page say whether this site has a sourced line for that option. If they do not, the election office’s page is the authority. Do not infer same-day registration from the existence of provisional ballots. The federal provisional rule exists partly because not every state registers voters at the polls.",
      "Provisional ballots are one stream into the canvass, alongside mail ballots and cured envelopes. The certification page describes how those streams are reconciled. A candidate can watch the count. A voter can check the status the office offers. A website that declares the provisional ballots “found” or “missing” without the canvass report is guessing. This site will quote a number of provisional ballots only when an official file states it.",
    ]),
    faqs: [
      {
        question: "Does a provisional ballot always count?",
        answer:
          "No. Officials check eligibility afterward. The ballot counts only if it meets that state’s rules. Federal law requires that voters be told whether it counted and, if it did not, why.",
      },
      {
        question: "Are provisional ballots the same as mail ballots?",
        answer:
          "No. A mail ballot is issued to a voter to return by mail or drop box. A provisional ballot is cast when eligibility could not be confirmed at the polls. Both can be added after election night, under different rules.",
      },
    ],
    related: ["mail-ballots", "results-shift", "certification", "election-officials"],
    sources: [HAVA_PROVISIONAL, EAC, VOTE_GOV],
  },
  {
    slug: "house-districts",
    title: "Why a House district is not the statewide vote",
    description:
      "How district lines, not the statewide popular vote, decide U.S. House seats, and what that means on a state hub.",
    updated: UPDATED,
    paragraphs: body([
      "Each voter lives in one U.S. House district, drawn under a map. The vote in that district elects one representative for a two-year term. The statewide total of House votes is a sum of those districts. It does not elect anyone. A party can win most of the votes cast for representative in a state and win fewer than half the seats, if its voters are concentrated in fewer districts. The reverse happens too. That is a feature of single-member districts, not a tabulation error.",
      "Who draws the map is a state choice constrained by federal law. Some states use a legislature. Some use a commission. Some use courts when the political branches deadlock. The Voting Rights Act and the Constitution’s equal-population rule are federal limits. They are not a single national mapmaker. A new map can be in court close to an election. When it is, the official map the election office uses for ballots is the map that matters for casting a vote. A map published by a campaign is not.",
      "Finding a district from a ZIP code is imprecise. ZIP codes cross district lines, and they cross county lines. This site’s ZIP tool maps a prefix to a state sample-ballot sketch. It does not assign a congressional district. The House’s “find your representative” tool and the state election office’s address search are the lookups that use a street address. A reader who guesses a district from a city name can easily open the wrong race guide.",
      "Competition is a district fact. A state can have one Toss-up district and a dozen seats that rating outlets call Solid. The state hub may discuss the competitive district because that is the race with a guide. It should not be read as a claim that the whole delegation is competitive. Where this site has no House guide, it still links the state’s candidate list, which is organized by district. The absence of a guide is not a rating.",
      "On election night, a statewide “House vote” ticker is the wrong unit. Watch the district. Mail ballots and provisional ballots are often counted by county, and a district can cover several counties or part of one. A county that finishes early may be only a slice of the district. The shift-after-election-night page applies inside the district, not just to senators and governors. Certification is still the state’s, issued for that contest.",
    ]),
    faqs: [
      {
        question: "Can a party win the statewide U.S. House vote and lose most seats?",
        answer:
          "Yes. Seats are won district by district. Where the votes sit inside the map can produce a delegation that does not match the statewide total. That total does not elect a representative.",
      },
      {
        question: "Does a ZIP code identify a congressional district?",
        answer:
          "Not reliably. ZIP codes cross district boundaries. Use a street address on the House finder or the state election office’s lookup. This site’s ZIP tool does not assign a district.",
      },
    ],
    related: ["house-majority", "results-shift", "election-officials", "reading-polls"],
    sources: [
      HOUSE,
      USC_2A,
      {
        name: "U.S. House of Representatives, Find Your Representative",
        url: "https://www.house.gov/representatives/find-your-representative",
      },
    ],
  },
  {
    slug: "election-officials",
    title: "Who runs an election",
    description:
      "How secretaries of state, election boards, and local clerks divide the work, and why a private site is not one of them.",
    updated: UPDATED,
    paragraphs: body([
      "Elections in the United States are run by the states and by their counties and cities, not by a federal election bureau that prints every ballot. The U.S. Election Assistance Commission sets voluntary guidance and sends some federal money. It does not register voters or count a state’s ballots. Vote.gov, a federal portal, sends readers to the state page. It does not take a registration itself on behalf of this website or any campaign.",
      "The state chief election officer is often a secretary of state. In some states it is a board, a lieutenant governor, or an appointed director. That office usually certifies statewide candidates, publishes the calendar, and totals county canvasses for state and federal offices. It does not always run the polling places. Local officials — county clerks, supervisors of elections, municipal clerks, or county boards — maintain the voter list, design the local ballot, staff the sites, and conduct the first canvass. A question about a polling place is almost always a local question.",
      "Titles mislead people who move between states. A “recorder” in one state handles voter registration and maps. In another, a recorder handles deeds and the clerk handles elections. A “supervisor of elections” is a Florida county officer. A “board of elections” is the local body in Ohio and New York. The state hub on this site names the office it linked and uses that office’s title. It does not translate the title into a different state’s vocabulary.",
      "Campaigns, parties, and private websites, including this one, do not decide eligibility, issue a ballot, or certify a result. They may publish guides. A guide can be careful and still be wrong about a deadline that changed after it was checked. The “last updated” line on a page is the latest date stored for the facts on that page. It is an invitation to check the official page, not a claim that the official page has been frozen.",
      "If two pages disagree, use the election office. If this site disagrees with the election office, the election office is the authority and the contact form is how to tell us. That order is the editorial rule. It is also the practical rule on Election Day, when only the official list of sites, the official sample ballot, and the official returns file have a legal role. Everything else, including a well-sourced explainer, is reading material.",
    ]),
    faqs: [
      {
        question: "Does the federal government run polling places?",
        answer:
          "No. States and local election offices run voter registration, ballots, and polling places. Federal agencies such as the Election Assistance Commission publish guidance and Vote.gov points to state sites.",
      },
      {
        question: "What if this site disagrees with the election office?",
        answer:
          "Use the election office. Then tell us through the contact form. A page on this site is not a registration, a ballot, or a certified result.",
      },
    ],
    related: ["certification", "mail-ballots", "ballot-measures", "what-is-a-midterm"],
    sources: [EAC, VOTE_GOV],
  },
  {
    slug: "turnout",
    title: "Turnout, registration, and what a margin measures",
    description:
      "Why a turnout rate depends on the denominator, and why a past margin is a record rather than a forecast.",
    updated: UPDATED,
    paragraphs: body([
      "Turnout is a ratio. The numerator is a count of people who voted, or of ballots counted. The denominator is whatever group the author chose: the voting-age population, the citizen voting-age population, registered voters, or active registered voters. Change the denominator and the percentage changes, even when the ballots do not. The Census Bureau’s voting and registration figures come from a household survey. Respondents say whether they voted. Some people say they voted when they did not. A state canvass counts ballots and, separately, may report how many people were registered. Those are different instruments. Quoting one and comparing it with the other, without saying so, is a common way to invent a trend.",
      "A margin is simpler and still easy to abuse. It is the gap between two candidates, in votes or in percentage points, in one contest, in one election. A two-point margin in a governor’s race says nothing automatic about a House district inside that state. A presidential margin from 2024 says nothing automatic about a Senate race in 2026. The people who turn out are not a fixed list. Campaigns spend money to change it. Weather, a ballot measure, and a competitive race at the top of the ticket change it too. The past margin is still worth reading, because it is the record of what happened. It is not a prior that this site plugs into a model.",
      "Where a past figure appears on a race preview, it is tied to a canvass or to a compilation such as the Federal Election Commission’s election-results series. If this site has not copied the figure from that source, the preview says so and links the office that publishes the canvass. Leaving a number out is a choice against invention. It is not a claim that the election was unremarkable.",
      "Registration is not turnout. A state can add registered voters and see a lower share of them vote, or the reverse. Deadlines, automatic registration, and same-day registration change the denominator close to the election. Comparing a registration total from September with a turnout percentage from November without reading the definitions is how two honest charts start an argument. The voting-deadlines page is about dates. It is not a registration total.",
      "On election night, “percent reporting” is not turnout. It is a statement about how much of the count is in, and the statement is only as good as the definition on the official file. High turnout does not pick a winner. It changes how many ballots the canvass must include. The pages on mail ballots, provisional ballots, and certification describe that work. The winner is the candidate the certificate names, after that work, under the rules for that office.",
    ]),
    faqs: [
      {
        question: "Why do two turnout percentages for the same election disagree?",
        answer:
          "They often use different denominators, such as voting-age population versus registered voters, or a survey versus a canvass. The ballots can be the same while the percentages are not.",
      },
      {
        question: "Does a past margin predict the 2026 winner?",
        answer:
          "No. A margin describes one contest in one year. This site cites past margins as history and does not turn them into a forecast.",
      },
    ],
    related: ["reading-polls", "results-shift", "what-is-a-midterm", "house-districts"],
    sources: [CENSUS, FEC, EAC],
  },
];

export function getLearnArticle(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find((article) => article.slug === slug);
}

export function learnPath(slug: string): string {
  return `/learn/${slug}`;
}
