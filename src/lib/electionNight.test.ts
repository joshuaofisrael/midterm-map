import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { CONTACT_FORM_ACTION, FORMSUBMIT_ALIAS } from "../data/contact.ts";
import { RACES } from "../data/races.ts";
import { STARTER_STATES } from "../data/states.ts";
import { chamberCounts } from "./liveFeed.ts";
import { ballotOg, raceOg, stateHubOg } from "./ogCard.ts";

test("election updates form uses the FormSubmit alias, consent, and a honeypot", () => {
  const source = readFileSync(new URL("../components/EmailSignup.tsx", import.meta.url), "utf8");
  assert.match(source, /Get election-night updates/);
  assert.match(source, /CONTACT_FORM_ACTION/);
  assert.match(source, /name="_honey"/);
  assert.match(source, /name="consent"/);
  assert.match(source, /required/);
  assert.doesNotMatch(source, /defaultChecked|checked=\{true\}|\bchecked\b/);
  assert.doesNotMatch(source, /@gmail\.com/i);
  assert.equal(CONTACT_FORM_ACTION, `https://formsubmit.co/${FORMSUBMIT_ALIAS}`);
  assert.doesNotMatch(source, /formsubmit\.co\/[^"'`\s]*@/i);
});

test("privacy policy limits election emails to updates and removal on request", () => {
  const privacy = readFileSync(new URL("../app/(site)/privacy/page.tsx", import.meta.url), "utf8");
  assert.match(privacy, /only to send election updates/);
  assert.match(privacy, /can be removed on request/);
  assert.doesNotMatch(privacy, /occasional site updates/);
  assert.doesNotMatch(privacy, /app\.kit\.com/);
});

test("share links are plain anchors and the embed names the brand", () => {
  const share = readFileSync(new URL("../components/ShareBar.tsx", import.meta.url), "utf8");
  assert.match(share, /twitter\.com\/intent\/tweet/);
  assert.match(share, /facebook\.com\/sharer/);
  assert.match(share, /reddit\.com\/submit/);
  assert.doesNotMatch(share, /<script/);
  const embed = readFileSync(new URL("../app/embed/map/page.tsx", import.meta.url), "utf8");
  assert.match(embed, /Map the Midterms/);
  assert.match(embed, /target="_top"/);
});

test("Open Graph cards name the state, the date, and contests, not candidates", () => {
  const names = RACES.flatMap((race) => race.candidates.map((candidate) => candidate.name)).filter(
    (name) => name.length > 6,
  );
  for (const state of STARTER_STATES) {
    for (const card of [stateHubOg(state.code, state.name), ballotOg(state.code, state.name)]) {
      const text = `${card.alt} ${card.title} ${card.contests.join(" | ")}`;
      assert.match(text, new RegExp(state.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      assert.match(text, /Nov 3, 2026/);
      assert.match(text, /Map the Midterms/);
      assert.doesNotMatch(text, /tossup|lean [dr]|likely [dr]|solid [dr]|projected/i);
      for (const name of names) {
        assert.equal(text.includes(name), false, `${card.file} includes ${name}`);
      }
    }
  }
  const race = RACES[0];
  const card = raceOg(race, "Georgia");
  assert.equal(card.contests.length, 1);
  assert.doesNotMatch(card.alt, /tossup|projected/i);
});

test("chamber needles stay empty when the results file has no seat totals", () => {
  assert.equal(chamberCounts(undefined), null);
  assert.equal(chamberCounts({ dem: null, rep: null, other: null }), null);
  assert.deepEqual(chamberCounts({ dem: 10, rep: 12, other: 0 }), { dem: 10, rep: 12, other: 0 });
});
