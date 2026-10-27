import { pollsForRace } from "@/data/polls";
import { RACES, racesForState } from "@/data/races";
import { getState, STARTER_STATES } from "@/data/states";
import type { RaceGuide, StateCode, StateProfile } from "@/data/types";
import { ESSAY_UPDATED, rich, type Essay, type EssaySource } from "@/data/essays/text";
import { STATE_FOCUS } from "@/data/essays/stateFocus";

const CENSUS: EssaySource = {
  name: "U.S. Census Bureau, voting and registration",
  url: "https://www.census.gov/topics/public-sector/voting.html",
};
const FEC: EssaySource = {
  name: "Federal Election Commission, election results and voting information",
  url: "https://www.fec.gov/introduction-campaign-finance/election-results-and-voting-information/",
};
const CONSTITUTION: EssaySource = {
  name: "National Archives, Constitution of the United States",
  url: "https://www.archives.gov/founding-docs/constitution-transcript",
};
const SENATE: EssaySource = {
  name: "U.S. Senate, Qualifications & Terms of Service",
  url: "https://www.senate.gov/senators/qualifications_termsofservice.htm",
};
const HOUSE: EssaySource = {
  name: "U.S. House of Representatives, The House Explained",
  url: "https://www.house.gov/the-house-explained",
};
const EAC: EssaySource = {
  name: "U.S. Election Assistance Commission, canvass and certification",
  url: "https://www.eac.gov/election-officials/election-results-canvass-and-certification",
};

function learn(slug: string, label: string) {
  return { href: `/learn/${slug}`, label };
}

function officeSource(state: StateProfile): EssaySource {
  return { name: state.officialElectionOffice.label, url: state.officialElectionOffice.href };
}

function voteSource(state: StateProfile): EssaySource {
  return { name: state.voteGov.label, url: state.voteGov.href };
}

/** Major-party and independent tickets. Write-ins stay on the candidate cards. */
function principalCandidates(race: RaceGuide) {
  const major = race.candidates.filter((candidate) =>
    candidate.party === "DEM" || candidate.party === "REP" || candidate.party === "IND",
  );
  return major.length > 0 ? major : race.candidates.slice(0, 4);
}

function candidateClause(race: RaceGuide): string {
  const people = principalCandidates(race);
  if (people.length === 0) return "The guide does not yet store a candidate from an election-office list.";
  const bits = people.slice(0, 5).map((candidate) => {
    const role = candidate.incumbent ? ", marked incumbent on the cited list" : "";
    return `${candidate.name} (${candidate.partyLabel}${role})`;
  });
  const extra = people.length > 5 ? `, plus ${people.length - 5} more names on the cards` : "";
  return bits.join("; ") + extra;
}

function ratingClause(race: RaceGuide): string {
  if (race.ratings.length === 0) {
    return "No named-outlet rating is stored on this guide. An empty rating line is not a Toss-up and not a forecast.";
  }
  const bits = race.ratings.map(
    (rating) => `${rating.outlet} published ${rating.tier} as of ${rating.asOf}`,
  );
  return `${bits.join("; ")}. Those labels belong to the outlets. This site does not average them and does not treat them as a prediction of the canvass.`;
}

function pollClause(race: RaceGuide): string {
  const row = pollsForRace(race.slug)[0];
  if (!row || row.dem == null || row.rep == null) {
    return "This guide does not store an individual survey with both major figures filled in. The absence is not a forecast. Aggregator links on the page point at outlets that may publish later surveys.";
  }
  const dem = row.demLabel ?? "one candidate";
  const rep = row.repLabel ?? "the other candidate";
  return `One survey stored here is ${row.pollster}, ${row.dates}: ${dem} ${row.dem}, ${rep} ${row.rep} (${row.spread}). The sample line is “${row.sample}.” The figures are that release, linked on the poll table. They are not an average, not a model, and not a forecast.`;
}

function recordClause(race: RaceGuide): string {
  const cited = principalCandidates(race)
    .slice(0, 4)
    .map((candidate) => {
      const source = candidate.sources[0];
      return source ? `${candidate.name} is cited to ${source.name}` : candidate.name;
    });
  return cited.length
    ? `${cited.join(". ")}. Each of those sentences identifies a listing. It does not quote a speech. A campaign site is the candidate’s own words. This preview does not paste one unless a sentence above names that page, and these sentences name the election-office or Clerk list instead.`
    : "Candidate cards cite the list that placed the name on the ballot.";
}

export function racePreview(race: RaceGuide): Essay {
  const state = getState(race.state);
  const stateName = state?.name ?? race.state;
  const district =
    race.chamber === "house" && race.district ? `district ${race.district}` : "";
  const stake =
    race.chamber === "governor"
      ? "what is at stake is the state’s chief executive: the budget the office proposes and the bills it is asked to sign or veto under the state constitution"
      : race.chamber === "senate"
        ? "what is at stake is one six-year vote in a 100-seat Senate, including votes on legislation and on confirmations"
        : "what is at stake is one two-year vote in the House, including the votes that organize the chamber";
  const officeLearn =
    race.chamber === "senate"
      ? "A senator serves six years. Class 2, the class on the regular 2026 ballot, is the class whose terms expire in January 2027."
      : race.chamber === "house"
        ? "A representative serves two years. The district, not the statewide popular vote, elects the member."
        : "A governor is the state’s chief executive. Term length and term limits are in that state’s constitution, not in a national statute.";
  const history =
    race.chamber === "senate"
      ? `The last regular election for a Class 2 seat was 2020. The Federal Election Commission compiles the certified federal canvass after the states report it. This preview does not copy a 2020 or 2024 percentage it has not taken from that compilation or from ${stateName}’s own canvass. A prior margin is a record of that year’s ballots.`
      : race.chamber === "house"
        ? `The current representative’s term ends in January 2027 because the term is two years. The 2024 canvass for this district is a record of that map and that year. It is not a 2026 projection. District lines can put a seat in a different political place than the statewide vote. The House finder and the state election office, not a ZIP code, assign the district.`
        : `Voters comparing 2026 with the last gubernatorial canvass should open ${stateName}’s certified results. This preview does not insert a prior percentage it has not copied from that canvass. A close prior race explains why county reporting order will be watched. It does not decide this one.`;

  const contestLabel = district ? `${stateName} ${race.office}, ${district}` : `${stateName} ${race.office}`;
  const paragraphs = [
    `${contestLabel} is on the November 3, 2026 ballot. ${officeLearn} In plain terms, ${stake}. It is not a national scoreboard. Control of a chamber, where the office sits in one, depends on every other seat as well. This page is one contest.`,
    `The principal names on the guide are ${candidateClause(race)}. ${race.incumbentNote ? `The guide also carries this listing note: ${race.incumbentNote} ` : ""}${recordClause(race)}`,
    `${ratingClause(race)} ${pollClause(race)}`,
    history,
    `${stateName} counts this ballot under its own calendar. Registration, early voting, and mail-ballot deadlines that this site has checked sit on the voting-deadlines page and on the state hub, each tied to an official page. ${race.countingNote ? race.countingNote + " " : ""}Totals on election night are unofficial. Mail ballots, provisional ballots, and any later round the state requires can move them. Turnout is a ratio that changes with the denominator — voting-age population, registered voters, or ballots counted — and the Census Bureau’s survey is not the same instrument as the canvass. Nothing here is a call.`,
  ];

  const sources: EssaySource[] = [
    ...(state ? [officeSource(state), voteSource(state)] : []),
    ...race.sources.slice(0, 3).map((source) => ({ name: source.name, url: source.url })),
    ...(race.ratings[0] ? [{ name: race.ratings[0].outlet, url: race.ratings[0].url }] : []),
    CENSUS,
    FEC,
  ];

  const related = [
    race.chamber === "senate" ? learn("senate-classes", "Senate classes") : learn("house-majority", "House majority"),
    race.chamber === "governor" ? learn("election-officials", "Who runs an election") : learn("house-districts", "House districts"),
    learn("reading-polls", "How to read a poll"),
    learn("results-shift", "Why results shift"),
    learn("turnout", "Turnout and margins"),
  ];
  if (race.chamber === "senate") related[1] = learn("senate-majority", "Senate majority");

  return {
    path: `/races/${race.slug}`,
    kicker: "Race preview",
    title: `What is at stake in the ${stateName}${district} ${race.chamber === "house" ? "House" : race.chamber === "senate" ? "Senate" : "governor"} contest`,
    updated: ESSAY_UPDATED,
    paragraphs: paragraphs.map((paragraph) => rich(paragraph)),
    related,
    sources: dedupe(sources),
  };
}

function dedupe(sources: EssaySource[]): EssaySource[] {
  const seen = new Set<string>();
  return sources.filter((source) => {
    if (seen.has(source.url)) return false;
    seen.add(source.url);
    return true;
  });
}

function measureLine(summary: string): string {
  if (/amendment|proposition|measure|initiative|question|bond/i.test(summary)) {
    return "The hub’s summary of the official list includes at least one statewide question. A measure is not a candidate. Its passage rule is in state law, and the legal text is the pamphlet or the certificate, not a campaign slogan.";
  }
  return "The pages read for this hub did not become a statewide-question essay. If the election office adds a measure after the date on the hub, the office’s list controls.";
}

export function statePreview(state: StateProfile): Essay {
  const races = racesForState(state.code);
  const focus = STATE_FOCUS[state.code];
  const offices = state.statewideOffices2026;
  const shown = offices.slice(0, 5);
  const rest = offices.length - shown.length;
  const officeSentence =
    offices.length === 0
      ? `${state.name}’s profile does not store a statewide office line for this cycle.`
      : `${state.name}’s sourced statewide list includes ${shown.join("; ")}${rest > 0 ? `, and ${rest} more line${rest === 1 ? "" : "s"} on the hub above` : ""}.`;
  const raceSentence =
    races.length === 0
      ? `This hub does not yet carry a full race guide. That is a coverage limit, not a rating of the contests the election office listed.`
      : `Race guides linked from this hub: ${races
          .map((race) => {
            const rating = race.ratings[0];
            return rating ? `${race.shortTitle} (${rating.outlet}: ${rating.tier}, ${rating.asOf})` : race.shortTitle;
          })
          .join("; ")}. A rating in that list is the outlet’s label. It is not a Map the Midterms call, and a guide with no rating is not secretly a Toss-up.`;
  const classSentence = state.hasSenateClass2
    ? `A Class 2 U.S. Senate seat, last elected in 2020, is on this state’s regular 2026 ballot. The term is six years and expires in January 2027.`
    : `This state’s regular Class 2 Senate seat is not on the November 3, 2026 ballot. Voters may still have an unexpired Senate term, a House ballot, or state offices. The office list above is the check.`;
  const governorSentence = state.hasGovernor2026
    ? `A governor’s race is on the cycle. The winner becomes the state’s chief executive under the state constitution. This page does not predict who that will be.`
    : `A full-term governor is not listed as on this cycle. Executive offices, if any, are the ones named in the sourced list, not a generic midterm slate.`;

  const paragraphs = [
    ...focus,
    `${officeSentence} ${classSentence} ${governorSentence} ${measureLine(state.summary)} The list is not a sample ballot for a street address. Counties add local offices, and a ZIP sketch on this site is not the official card.`,
    `${raceSentence} Candidate names on a guide come from an election-office list, a certified ballot, or the Clerk of the House nominee list. The short bio restates that listing. It is not a speech. Where a card links a verified Ballotpedia profile, the profile collects public reporting. This briefing does not copy it.`,
    `Past margins for president, Senate, governor, or a House district are the canvass ${state.officialElectionOffice.label} certified, and for federal offices the compilation the Federal Election Commission publishes from those state reports. This briefing does not drop in a percentage it has not copied from one of those documents. A close prior canvass is a reason to watch how ${state.name} reports mail and provisional ballots. It is not a 2026 result. Turnout rates disagree when one chart uses the Census Bureau’s survey and another uses registered voters or ballots counted. ${state.capital} is the capital. ${state.timezoneNote} Poll-close comparisons with other states have to respect that clock. Certification is the state’s work, on the state’s calendar, after election night.`,
  ];

  const related = [
    learn("what-is-a-midterm", "What a midterm is"),
    learn("turnout", "Turnout and margins"),
    learn("results-shift", "Why results shift"),
    learn("mail-ballots", "Mail ballots"),
    state.hasSenateClass2 ? learn("senate-classes", "Senate classes") : learn("house-districts", "House districts"),
    /amendment|proposition|measure|initiative|question|bond/i.test(state.summary)
      ? learn("ballot-measures", "Ballot measures")
      : learn("election-officials", "Who runs an election"),
  ];

  return {
    path: `/states/${state.code}`,
    kicker: "State briefing",
    title: `What ${state.name} voters are deciding in 2026`,
    updated: ESSAY_UPDATED,
    paragraphs: paragraphs.map((paragraph) => rich(paragraph)),
    related,
    sources: dedupe([
      officeSource(state),
      voteSource(state),
      ...(state.cycleSources ?? []).slice(0, 2).map((source) => ({ name: source.label, url: source.href })),
      CENSUS,
      FEC,
      SENATE,
    ]),
  };
}

const HOME_PARAGRAPHS = [
  `Election Day for the 2026 U.S. midterms is Tuesday, November 3, 2026. Voters are choosing every voting seat in the U.S. House, because those terms are two years, and about one-third of the Senate, Class 2, because those terms are six years and expire in January 2027. They are not choosing a president. There is no national popular vote for “the midterms.” There are thousands of contests, each certified by a state or a county. A single color on a national map is a summary someone else drew. It is not the ballot.`,
  `What is at stake in Washington is organizational. If every House seat is filled, 218 is a majority of 435. Vacancies change the arithmetic of members sworn. In the Senate, 51 is a majority of 100 when every seat is filled, and the Vice President votes when the Senate is tied. Ending debate is a separate practice under Senate rules, often discussed as 60 votes. That figure is not in the Constitution. None of these counts is a forecast. They are the rules the next Congress will use if the rules are still the rules. This site does not predict which party will organize either chamber.`,
  `States put their own offices on the same day or they do not. Many elect governors. Some do not. Many ask voters to decide constitutional amendments, statutes, or bonds. A measure is not a candidate, and a yes vote is not a party endorsement unless the official ballot says so, which it almost never does. The state hubs on this site list the statewide offices taken from each election office’s own pages. A hub that does not list a Senate race is reporting that list, not forgetting the Senate.`,
  `Ratings and polls are other people’s work, and this site treats them that way. A Cook Political Report label, or a label from Inside Elections, Sabato’s Crystal Ball, or Decision Desk HQ, appears on a race guide only with the outlet’s name and date. A poll row appears only with a pollster, dates, a sample, and a link. One survey is not a forecast. An empty poll table is not a hint. Readers who want a model should open the outlet that builds one and read its methods. Readers who want the candidates’ own words should use the candidates’ sites. A bio on a race guide restates an election-office listing. It is not a speech, and this page will not invent one.`,
  `Past margins are canvasses. The Federal Election Commission compiles certified federal results after the states report them. A 2020 Senate margin or a 2024 presidential margin describes those ballots. It does not decide 2026, because the people who vote are not a fixed list. Turnout percentages also depend on the denominator. The Census Bureau asks a sample whether they voted. A state counts ballots. Those charts can both be honest and still disagree. On election night the first percentages are unofficial. Mail ballots, provisional ballots, ranked-choice rounds, and runoff calendars move totals for reasons that are statutory, not suspicious by default. The live page copies state files after polls close. It does not call a winner unless that file does.`,
];

const LIVE_PARAGRAPHS = [
  `This page is a display of unofficial figures that state election offices publish in files this site can read, plus links where a state does not offer such a file. It starts showing a state only after that state’s polls have closed. It does not project a winner. A winner label appears only when the official file marks a candidate. The U.S. Election Assistance Commission’s plain statement of the process is the right frame: election-night results are not the certified results, even when a screen says every precinct has reported.`,
  `“Precincts reporting” usually describes polling-place scanners. It often leaves out mail ballots still being processed, provisional ballots still being checked one by one, and envelopes a voter was allowed to cure. States do not share one deadline. Some require a mail ballot to arrive by the close of polls. Others accept a ballot postmarked by Election Day if it arrives within a set number of days. A total that rises on Wednesday can be on time under the second rule and late under the first. The voting-deadlines page repeats a date only when an official page printed it.`,
  `The order of counties is not a neutral sample of the state. A county that reports first may be rural, urban, heavily early-vote, or still waiting on a central scanner. If that county is not a miniature of the state, the leader can change as other counties report. The change is arithmetic. It is not, by itself, evidence that a file was altered. A real discrepancy is a question for the canvass, which reconciles ballots with voters, and for any audit or recount the state requires. This page keeps the last file that loaded, with its time, if a later check fails. The earlier snapshot was not a promise.`,
  `Ranked-choice tabulation and runoff law are separate from this delay. Alaska’s guides cite the Division of Elections when a contest is conducted by ranked-choice voting, so first-choice totals are not the last round. Georgia law can require a runoff when no candidate reaches a majority. Louisiana distinguishes an open primary from a general election by office. Those rules are linked from the race guides and from the runoff explainer. They are not a national pause button, and they are not applied to states that elect by plurality.`,
  `What a reader should compare is the official file, not two screenshots with different definitions. Check the timestamp, whether the file says the results are unofficial, and which ballots the state says are still out. Percentages swing more when few ballots are counted. Turnout is not “percent reporting.” Turnout is ballots cast against a chosen denominator, and it will not be a settled rate until the canvass. Certification is a later signature by the officials the state names. This website is not one of them. A television projection is not one of them either.`,
];

const RESULTS_PARAGRAPHS = [
  `The results hub is the index of contests this site is ready to follow on November 3, 2026, and of the unofficial figures that may appear after polls close. Before those files exist, the tables stay in awaiting-returns mode. They do not contain invented vote totals. A key-race list is an editorial selection of Senate, governor, and House contests with guides. It is not a statement that other contests are uncompetitive, and it is not a prediction of which ones will decide a chamber.`,
  `Chamber control is a count of seats after certificates, not a count of unofficial percentages on election night. The House majority page explains why 218 assumes a full House of 435. The Senate majority page explains why a tie brings in the Vice President and why cloture is a different vote. Seats not on the 2026 ballot stay in place. A party can lose a listed race and still organize a chamber, or win one and still fall short. This page will not add rating-outlet labels into a seat total. Where a guide cites Cook Political Report or another outlet, that label stays on the guide, dated, and attributed.`,
  `Each key race has its own history. Class 2 Senate seats were last elected in 2020. House terms are two years, so the relevant prior canvass is the last election under the current map. Governors follow state constitutions. The certified numbers live at the state election office and, for federal offices, in the Federal Election Commission’s compilation of state reports. This hub does not paste a prior margin it has not copied from one of those sources. Readers who want the margin should open the canvass. A close prior race is context for why a late county might matter. It is not the 2026 outcome.`,
  `Candidate names under a key race are the names on that race’s guide, which cites an election-office list or the Clerk of the House. The line identifies who is on the ballot in that source. It does not quote what the candidate has said about taxes, courts, or any other issue. Those statements, when a reader wants them, are on the candidate’s site or in a news report that quotes the candidate. Copying them here without that citation would break the rule this site uses everywhere else: no invented speech.`,
  `After polls close, read the live page and the state file it names. Expect the leader in some states to change as timely mail ballots and accepted provisional ballots are added. Expect a few states to remain unfinished because of a runoff or a ranked-choice round. Expect news organizations to project. Those projections can be accurate and still not be certification. The canvass reconciles ballots. The certificate is the result. Turnout rates published the next morning will mix survey estimates and partial counts. Neither is the last word, and neither picks a winner.`,
];

function hubEssay(path: string, kicker: string, title: string, paragraphs: string[], related: Essay["related"]): Essay {
  return {
    path,
    kicker,
    title,
    updated: ESSAY_UPDATED,
    paragraphs: paragraphs.map((paragraph) => rich(paragraph)),
    related,
    sources: [CONSTITUTION, HOUSE, SENATE, FEC, CENSUS, EAC],
  };
}

export function homePreview(): Essay {
  return hubEssay(
    "/",
    "Midterm briefing",
    "What the 2026 midterms decide, and what they do not",
    HOME_PARAGRAPHS,
    [
      learn("what-is-a-midterm", "What a midterm is"),
      learn("house-majority", "House majority"),
      learn("senate-classes", "Senate classes"),
      learn("reading-polls", "How to read a poll"),
      learn("turnout", "Turnout and margins"),
    ],
  );
}

export function livePreview(): Essay {
  return hubEssay(
    "/live",
    "How to read election night",
    "Why the first numbers are not the certificate",
    LIVE_PARAGRAPHS,
    [
      learn("results-shift", "Why results shift"),
      learn("mail-ballots", "Mail ballots"),
      learn("provisional-ballots", "Provisional ballots"),
      learn("runoffs", "Runoffs and ranked-choice finals"),
      learn("certification", "Certification"),
    ],
  );
}

export function resultsPreview(): Essay {
  return hubEssay(
    "/results",
    "Results briefing",
    "How to read the key-race list without treating it as a call",
    RESULTS_PARAGRAPHS,
    [
      learn("house-majority", "House majority"),
      learn("senate-majority", "Senate majority"),
      learn("certification", "Certification"),
      learn("recounts", "Recounts"),
      learn("turnout", "Turnout and margins"),
    ],
  );
}

const RACE_PREVIEWS = new Map(RACES.map((race) => [race.slug, racePreview(race)]));
const STATE_PREVIEWS = new Map(STARTER_STATES.map((state) => [state.code, statePreview(state)]));

export function essayForPath(path: string): Essay | undefined {
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/") return homePreview();
  if (clean === "/live") return livePreview();
  if (clean === "/results") return resultsPreview();
  const state = /^\/states\/([A-Za-z]{2})$/.exec(clean);
  if (state) return STATE_PREVIEWS.get(state[1].toUpperCase() as StateCode);
  const race = /^\/races\/([^/]+)$/.exec(clean);
  if (race) return RACE_PREVIEWS.get(race[1]);
  return undefined;
}

export function allPreviews(): Essay[] {
  return [homePreview(), livePreview(), resultsPreview(), ...STATE_PREVIEWS.values(), ...RACE_PREVIEWS.values()];
}
