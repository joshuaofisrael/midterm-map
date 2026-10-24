import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyBallotpediaOffice,
  houseDistrict,
  isTicket,
  jurisdictionFollows,
  matchNames,
  officeNumbers,
  rowsForContest,
  samePerson,
} from "./ballotpedia-lib.mjs";

test("same person ignores initials, suffixes, and quoted nicknames", () => {
  assert.equal(samePerson("Susan M. Collins", "Susan Collins"), true);
  assert.equal(samePerson("Collins, Susan M.", "Susan Collins"), true);
  assert.equal(samePerson('Kreiss-Tomkins, Jonathan S. “JKT”', "Jonathan Kreiss-Tomkins"), true);
  assert.equal(samePerson('Thomas "Jay" Feely IV', "Thomas Feely"), true);
  assert.equal(samePerson("Dan S. Sullivan", "Daniel J. Sullivan Jr."), false);
  assert.equal(samePerson("Mike Collins", "Michael Collins"), false);
  assert.equal(samePerson("Jon Ossoff", "Jon"), false);
});

test("joint tickets are not a single profile", () => {
  assert.equal(isTicket("Donalds, Byron / Avila, Bryan"), true);
  assert.equal(isTicket("Taylor, Treg/ English, Candi"), true);
  assert.equal(isTicket("Jon Ossoff"), false);
});

test("house districts and office classes", () => {
  assert.equal(houseDistrict("1"), "1");
  assert.equal(houseDistrict("At Large"), "0");
  assert.equal(classifyBallotpediaOffice("U.S. House Georgia District 14").kind, "house");
  assert.equal(classifyBallotpediaOffice("U.S. House Georgia District 14").district, "14");
  assert.equal(classifyBallotpediaOffice("U.S. Senate Georgia").kind, "senate");
  assert.equal(classifyBallotpediaOffice("Governor of Georgia").kind, "governor");
  assert.equal(classifyBallotpediaOffice("Lieutenant Governor of Georgia").kind, "statewide");
  assert.equal(classifyBallotpediaOffice("Georgia House of Representatives District 45").kind, "legislature");
});

test("jurisdiction phrase does not swallow a longer place name", () => {
  assert.equal(jurisdictionFollows("Baldwin Park City Clerk", "Baldwin Park"), true);
  assert.equal(jurisdictionFollows("Miami Beach City Council", "Miami"), false);
  assert.equal(jurisdictionFollows("Miami Beach City Council", "Miami Beach"), true);
  assert.equal(jurisdictionFollows("Harris County Judge", "Harris"), true);
});

test("office numbers keep place numbers and drop year-terms", () => {
  assert.deepEqual(officeNumbers("Justice of the Supreme Court Unexpired 8-Year Term"), []);
  assert.deepEqual(officeNumbers("FOR ASSOCIATE JUSTICE OF THE SUPREME COURT, PLACE 7"), ["7"]);
  assert.deepEqual(officeNumbers("Circuit Judge, Third Judicial Circuit: Groups 4 and 6").sort(), ["3", "4", "6"]);
});

test("general-election rows match a statewide office and not a different one", () => {
  const rows = [
    { name: "Jon Ossoff", url: "https://ballotpedia.org/Jon_Ossoff", office: "U.S. Senate Georgia", status: "On the Ballot General", party: "Democratic" },
    { name: "Mike Collins", url: "https://ballotpedia.org/Mike_Collins_(Georgia)", office: "U.S. Senate Georgia", status: "On the Ballot General", party: "Republican" },
    { name: "Someone Else", url: "https://ballotpedia.org/Someone_Else", office: "Governor of Georgia", status: "On the Ballot General", party: "Democratic" },
    { name: "Primary Loser", url: "https://ballotpedia.org/Primary_Loser", office: "U.S. Senate Georgia", status: "Lost Primary", party: "Republican" },
  ];
  const matched = matchNames(
    [{ name: "Jon Ossoff" }, { name: "Primary Loser" }],
    rowsForContest({ kind: "senate", office: "U.S. Senate", district: null }, rows, "Georgia"),
  );
  assert.equal(matched[0].url, "https://ballotpedia.org/Jon_Ossoff");
  assert.equal(matched[1].url, null);
});
