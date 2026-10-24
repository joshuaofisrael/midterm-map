import assert from "node:assert/strict";
import test from "node:test";
import { districtNumber, sortContests } from "./contestOrder.ts";

test("district numbers match Census labels and at-large rows", () => {
  assert.equal(districtNumber("Congressional District 12"), "12");
  assert.equal(districtNumber("Congressional District (at Large)"), "0");
  assert.equal(
    districtNumber("1st District Representative in Congress 2 Year Term (1) Position"),
    "1",
  );
});

test("contests stay in stored list order within Senate, House, governor, statewide", () => {
  const sorted = sortContests([
    { office: "Governor", kind: "governor", district: null, candidates: [{ name: "A", party: "D" }] },
    { office: "House 2", kind: "house", district: "2", candidates: [{ name: "B", party: "R" }] },
    { office: "House 10", kind: "house", district: "10", candidates: [{ name: "C", party: "D" }] },
    { office: "Senate", kind: "senate", district: null, candidates: [{ name: "D", party: "D" }] },
    { office: "Attorney General", kind: "statewide", district: null, candidates: [{ name: "E", party: "D" }] },
    { office: "Secretary of State", kind: "statewide", district: null, candidates: [{ name: "F", party: "R" }] },
  ]);
  assert.deepEqual(
    sorted.map((contest) => contest.office),
    ["Senate", "House 2", "House 10", "Governor", "Attorney General", "Secretary of State"],
  );
});
