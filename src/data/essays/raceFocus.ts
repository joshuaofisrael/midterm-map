/**
 * Race-specific analysis for the most competitive statewide contests.
 * Every fact here is already stored on the race guide, the state hub, or the
 * candidate file (official lists and the cited rating outlets). No new numbers.
 */
export const RACE_FOCUS: Record<string, string> = {
  "mi-senate-2026":
    "This is an open seat: the Bureau of Elections listing does not include Gary Peters, so neither major-party nominee runs with an incumbent’s record on this office. Abdul El-Sayed and Mike Rogers lead a six-name list that also carries Libertarian, Green and other candidates, and in a race Cook labels a Tossup, the minor-party share can matter more than usual. The guide’s single stored survey is close, which is a reason to wait for the canvass, not a forecast. The same ballot has a separate governor’s race with a different rating, so a split result is possible.",
  "tx-senate-2026":
    "The Secretary of State’s certification does not include John Cornyn, so the seat is open. Ken Paxton, James Talarico and Libertarian Ted Brown are the three names. Cook’s stored label is Tossup, and the guide’s surveys sit near a tie, which in a state of 254 counties means early returns from the largest counties are not a sample of the whole state. The governor’s race on the same ballot carries a different rating, so reading one contest from the other is a mistake.",
  "ga-senate-2026":
    "Jon Ossoff is the incumbent on the Clerk’s nominee list. Mike Collins reached the November ballot through the June 16, 2026 Republican runoff certified by the Secretary of State. Five names are on the general-election list, and Georgia law can send a contest to a runoff when nobody wins a majority, so a plurality lead on election night may not settle the seat. Watch the majority line, not only who is ahead.",
  "nc-senate-2026":
    "The State Board’s general candidate list does not include Thom Tillis, so the seat is open. Roy Cooper and Michael Whatley are the major-party nominees, with Libertarian and Green candidates also listed. Cook’s stored label is Lean Democratic and the guide stores an Elon University poll. North Carolina has no governor’s race this year, so the Senate contest sits at the top of the ballot by itself, beside appellate courts and three constitutional amendments.",
  "oh-governor-2026":
    "The Franklin County candidate list does not include Mike DeWine, who is term-limited, so the office is open. Vivek Ramaswamy and Amy Acton lead a six-name list. Cook’s stored label is Tossup, and the guide carries a Bowling Green State University / YouGov survey. The same ballot carries an unexpired U.S. Senate term and Issue 3, three different questions that voters can answer differently.",
  "nv-governor-2026":
    "Joseph Lombardo, the sitting governor, faces Aaron D. Ford, the attorney general, with one other candidate on the list. Cook’s stored label is Tossup and the guide stores a close Emerson survey. Nevada mails a ballot to every active registered voter unless they opt out, so the election-night file is often an early slice of a count that continues under the state’s receipt rules.",
  "wi-governor-2026":
    "The Elections Commission records Tony Evers as having filed a notification of noncandidacy, so the office is open. David Crowley and Tom Tiffany are the only two names on the list, so there is no minor-party share to account for. Cook’s stored label is Tossup and the guide stores a Marquette Law School poll. Municipal clerks run in-person absentee voting, so reporting times differ from town to town.",
  "mi-governor-2026":
    "The Bureau of Elections listing does not include Gretchen Whitmer, who is term-limited, so the office is open. Jocelyn Benson and John James lead a five-name list. Cook’s stored label is Lean Democratic, unlike the Tossup label on the state’s Senate race, and the two guides store different surveys. Two statewide proposals on the same ballot are separate yes-or-no votes.",
  "az-governor-2026":
    "Katie Hobbs, the sitting governor, faces Andy Biggs, with Green and other candidates also listed. Cook Political Report and Sabato’s Crystal Ball have both published Lean Democratic labels, dated on the guide. There is no U.S. Senate race in Arizona this year, so the governor’s race shares the top of the ballot with eight propositions from the publicity pamphlet. Most of the state stays on standard time while the Navajo Nation observes daylight time, which affects when polls close there.",
};
