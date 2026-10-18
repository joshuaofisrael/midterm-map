import assert from "node:assert/strict";
import test from "node:test";
import {
  calendarDate,
  classifyContest,
  isGeneralElectionName,
  ncsbeProportionToPercent,
  parseClarityCsv,
  parseFloridaTsv,
  parseCaliforniaJson,
  parseMinnesotaMedia,
  parseNcsbe,
  parseScytlBallotItems,
  parseStateResultsCsv,
  parseTexasRaces,
  parseWashingtonCsv,
} from "./parse.mjs";

test("North Carolina proportion becomes the percent the file encodes", () => {
  assert.equal(ncsbeProportionToPercent("0.5086"), "50.86");
  assert.equal(ncsbeProportionToPercent("0.0000"), "0");
  assert.equal(ncsbeProportionToPercent("1.0000"), "100");
});

test("North Carolina parser keeps official votes and does not invent a winner", () => {
  const races = parseNcsbe(
    JSON.stringify([
      {
        cnm: "US SENATE (VOTE FOR 1)",
        vfr: "1",
        bnm: "Ada Example",
        pty: "DEM",
        vct: "10",
        pct: "0.2000",
        prt: "1",
        ptl: "4",
      },
      {
        cnm: "US SENATE (VOTE FOR 1)",
        vfr: "1",
        bnm: "Ben Example",
        pty: "REP",
        vct: "40",
        pct: "0.8000",
        prt: "1",
        ptl: "4",
      },
      {
        cnm: "NC STATE SENATE DISTRICT 01 (VOTE FOR 1)",
        vfr: "1",
        bnm: "Local",
        pty: "DEM",
        vct: "5",
        pct: "1.0000",
        prt: "1",
        ptl: "1",
      },
    ]),
  );
  assert.equal(races.length, 1);
  assert.equal(races[0].siteSlug, "nc-senate-2026");
  assert.equal(races[0].candidates[1].votes, 40);
  assert.equal(races[0].candidates[1].percentText, "80");
  assert.equal(races[0].candidates[1].winner, false);
  assert.equal(races[0].precinctsReporting, 1);
  assert.equal(races[0].precinctsTotal, 4);
});

test("Georgia-style JSON uses isWinner and omits a calculated percent", () => {
  const races = parseScytlBallotItems(
    {
      data: [
        {
          name: [{ languageId: "en", text: "US Senate" }],
          voteFor: 1,
          reportingStatus: { reportingUnits: 10, totalUnits: 159 },
          summaryResults: {
            ballotOptions: [
              { name: [{ languageId: "en", text: "Ada Example" }], voteCount: 10, party: { abbreviation: "DEM" }, isWinner: null },
              { name: [{ languageId: "en", text: "Ben Example" }], voteCount: 90, party: { abbreviation: "REP" }, isWinner: true },
            ],
          },
        },
        {
          name: [{ languageId: "en", text: "US Senate - Rep" }],
          summaryResults: { ballotOptions: [{ name: [{ text: "Skip" }], voteCount: 1, isWinner: true }] },
        },
      ],
    },
    "GA",
    { certified: false },
  );
  assert.equal(races.length, 1);
  assert.equal(races[0].candidates[0].percentText, null);
  assert.equal(races[0].candidates[1].winner, true);
  assert.equal(races[0].certified, false);
  assert.equal(races[0].precinctsReporting, 10);
});

test("Clarity CSV keeps the published percent and winner list", () => {
  const csv = [
    "contest name,choice name,party name,total votes,percent of votes,registered voters,ballots cast,num Area total,num Area rptg,over votes,under votes",
    '"United States Senator (Vote For 1)","Ada Example","DEM",10,20.00,100,50,99,40,0,0',
    '"United States Senator (Vote For 1)","Ben Example","REP",40,80.00,100,50,99,40,0,0',
  ].join("\n");
  const races = parseClarityCsv(csv, "IA", {
    reportingLabel: "areas",
    settings: { settings: { winners: { 1000: { winnerlist: "2|Ben Example" } } } },
  });
  assert.equal(races[0].candidates[1].percentText, "80.00");
  assert.equal(races[0].candidates[1].winner, true);
  assert.equal(races[0].candidates[0].winner, false);
  assert.equal(races[0].reportingLabel, "areas");
  assert.equal(races[0].precinctsReporting, 40);
});

test("Florida file sums county votes and does not invent a percent or winner", () => {
  const text = [
    "ElectionDate\tPartyCode\tPartyName\tRaceCode\tRaceName\tCountyCode\tCountyName\tJuris1num\tJuris2num\tPrecincts\tPrecinctsReporting\tCanNameLast\tCanNameFirst\tCanNameMiddle\tCanVotes",
    "11/03/2026\tDEM\tDemocratic Party\tUSS\tUnited States Senator\tALA\tAlachua\t\t\t10\t4\tExample\tAda\t\t5",
    "11/03/2026\tDEM\tDemocratic Party\tUSS\tUnited States Senator\tBAY\tBay\t\t\t8\t8\tExample\tAda\t\t7",
    "11/03/2026\tREP\tRepublican Party\tUSS\tUnited States Senator\tALA\tAlachua\t\t\t10\t4\tExample\tBen\t\t9",
    "11/03/2026\tREP\tRepublican Party\tUSS\tUnited States Senator\tBAY\tBay\t\t\t8\t8\tExample\tBen\t\t3",
  ].join("\n");
  const races = parseFloridaTsv(text);
  assert.equal(races.length, 1);
  assert.equal(races[0].candidates.find((c) => c.name === "Ada Example").votes, 12);
  assert.equal(races[0].candidates.find((c) => c.name === "Ben Example").votes, 12);
  assert.equal(races[0].candidates.every((c) => c.percentText == null && c.winner === false), true);
  assert.equal(races[0].precinctsTotal, 18);
  assert.equal(races[0].precinctsReporting, 12);
});

test("Texas and Washington parsers copy reported percents and never mark a winner", () => {
  const texas = parseTexasRaces([
    {
      Races: [
        {
          N: "U.S. SENATOR",
          Candidates: [
            { N: "ADA EXAMPLE", P: "DEM", V: 10, PE: 20 },
            { N: "BEN EXAMPLE", P: "REP", V: 40, PE: 80 },
          ],
        },
      ],
    },
  ]);
  assert.equal(texas[0].siteSlug, "tx-senate-2026");
  assert.equal(texas[0].candidates[1].percentText, "80");
  assert.equal(texas[0].candidates[1].winner, false);

  const washington = parseWashingtonCsv(
    [
      "Race,Candidate,Party,Votes,PercentageOfTotalVotes,JurisdictionName",
      "Congressional District 3,Ada Example,Democratic Party Nominees,10,25.5,Congressional District 3",
      "Congressional District 3,Ben Example,Republican Party Nominees,30,74.5,Congressional District 3",
    ].join("\n"),
  );
  assert.equal(washington[0].siteSlug, "wa-03-house-2026");
  assert.equal(washington[0].candidates[1].percentText, "74.5");
  assert.equal(washington[0].candidates[1].winner, false);
});

test("party primary contests are not treated as the general election", () => {
  assert.equal(classifyContest("United States Senator - Rep.").partyPrimary, true);
  assert.equal(classifyContest("Governor").office, "governor");
  assert.equal(classifyContest("Lieutenant Governor").office, null);
  assert.equal(classifyContest("Governor & Lt Governor").office, "governor");
  assert.equal(classifyContest("For Governor and Lt. Governor").office, "governor");
  assert.equal(classifyContest("US HOUSE OF REPRESENTATIVES DISTRICT 01 (VOTE FOR 1)").district, "01");
});

test("Minnesota media file copies the published percent and skips county rows", () => {
  const races = parseMinnesotaMedia(
    [
      "MN;;;0102;U.S. Senator;;1001;Ada Example;;;DFL;10;100;40;40.00;100",
      "MN;;;0102;U.S. Senator;;0302;Ben Example;;;R;10;100;60;60.00;100",
      "MN;01;;0102;U.S. Senator;;1001;Ada Example;;;DFL;1;2;9;50.00;18",
      "MN;;;0331;Governor & Lt Governor;;0402;Ada Example and Cam Example;;;DFL;10;100;55;55.00;100",
      "MN;;;0104;U.S. Representative District 1;1;0401;Ada Example;;;DFL;4;20;8;40.00;20",
    ].join("\n"),
  );
  assert.equal(races.length, 3);
  assert.equal(races[0].siteSlug, "mn-senate-2026");
  assert.equal(races[0].candidates.length, 2);
  assert.equal(races[0].candidates[1].percentText, "60.00");
  assert.equal(races[0].candidates[1].winner, false);
  assert.equal(races[0].precinctsReporting, 10);
  assert.equal(races[1].siteSlug, "mn-governor-2026");
  assert.equal(races[2].siteSlug, "mn-01-house-2026");
});

test("California JSON uses the statewide row and the published percent", () => {
  const races = parseCaliforniaJson([
    {
      raceTitle: "Governor - Statewide Results",
      Reporting: "3.7% (887 of 23,860) precincts reporting",
      candidates: [
        { Name: "Ada Example", Party: "Dem", Votes: "10", Percent: "62.6", incumbent: false },
        { Name: "Ben Example", Party: "Rep", Votes: "6", Percent: "37.4", incumbent: true },
      ],
    },
    {
      raceTitle: "Governor - Alameda County Results",
      Reporting: "0% (0 of 627) precincts reporting",
      candidates: [{ Name: "Ada Example", Party: "Dem", Votes: "1", Percent: "100.0", incumbent: false }],
    },
    {
      raceTitle: "United States Representative District 1 - Districtwide Results",
      Reporting: "0% (0 of 788) precincts reporting",
      candidates: [{ Name: "Cam Example", Party: "Dem", Votes: "0", Percent: "0.0", incumbent: false }],
    },
  ]);
  assert.equal(races.length, 2);
  assert.equal(races[0].siteSlug, "ca-governor-2026");
  assert.equal(races[0].candidates[0].percentText, "62.6");
  assert.equal(races[0].candidates[1].winner, false);
  assert.equal(races[0].precinctsReporting, 887);
  assert.equal(races[0].precinctsTotal, 23860);
  assert.equal(races[1].siteSlug, "ca-01-house-2026");
});

test("state results CSV keeps the published percent and drops county rows", () => {
  const header = "RaceID,RaceName,PartyCode,AreaType,AreaNum,OfficeSeqNo,BallotOrder,CandidateID,CandidateName,CurrentDateTime,VoteFor,CandidateVotes,CandidatePercentage,PrecinctsReporting";
  const races = parseStateResultsCsv(
    [
      header,
      '1,"United States Senator","REP","SW","",110,,1,"Ada  Example ",10/18/2026 9:33:43 AM,1,4,40,="1/10"',
      '1,"United States Senator","DEM","SW","",110,,2,"Ben Example",10/18/2026 9:33:43 AM,1,6,60,="1/10"',
      '1,"United States Senator","DEM","CTY","Adams",110,,2,"Ben Example",10/18/2026 9:33:43 AM,1,99,99,="1/1"',
      '2,"For Representative in Congress - 2  Year Term","REP","CG","District 01",120,,3,"Cam Example",10/18/2026 9:33:43 AM,1,0,0,="0/8"',
      '3,"United States Representative","DEM","","",120,,4,"Dee Example",10/18/2026 9:33:43 AM,1,3,100,="2/2"',
    ].join("\n"),
    "NE",
  );
  assert.equal(races.length, 3);
  assert.equal(races[0].siteSlug, "ne-senate-2026");
  assert.equal(races[0].candidates[0].name, "Ada Example");
  assert.equal(races[0].candidates[0].votes, 4);
  assert.equal(races[0].candidates[1].percentText, "60");
  assert.equal(races[0].candidates[1].winner, false);
  assert.equal(races[0].precinctsReporting, 1);
  assert.equal(races[0].precinctsTotal, 10);
  assert.equal(races[1].siteSlug, "ne-01-house-2026");
  assert.equal(races[2].siteSlug, "ne-al-house-2026");
});

test("only the November 3, 2026 general election is accepted", () => {
  assert.equal(isGeneralElectionName("2026 General Primary", "5/19/2026"), false);
  assert.equal(isGeneralElectionName("2026 Primary Election", "6/2/2026 12:00:00 AM"), false);
  assert.equal(isGeneralElectionName("2026 General Election", "6/2/2026 12:00:00 AM"), false);
  assert.equal(isGeneralElectionName("2026 General Election", "11/3/2026 12:00:00 AM"), true);
  assert.equal(isGeneralElectionName("November General Election", "2026-11-03"), true);
  assert.equal(isGeneralElectionName("2024 General Election", "11/5/2024"), false);
  assert.equal(isGeneralElectionName("2026 General Election", ""), false);
});

test("calendarDate reads official timestamps", () => {
  assert.equal(calendarDate("October 16, 2026, 4:08 p.m."), "2026-10-16");
  assert.equal(calendarDate("Wed, 04 Nov 2026 03:10:00 GMT"), "2026-11-04");
  assert.equal(calendarDate("11/3/2026 9:40:27 PM"), "2026-11-03");
  assert.equal(calendarDate("2026-11-04T02:00:00Z"), "2026-11-04");
  assert.equal(calendarDate(null), null);
});
