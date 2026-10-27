import assert from "node:assert/strict";
import test from "node:test";
import { RACES } from "../races.ts";
import { STARTER_STATES } from "../states.ts";
import { allPreviews, essayForPath } from "./previews.ts";
import { essayWordCount } from "./text.ts";

const BANNED = [/will win/i, /we predict/i, /projected winner/i, /Joshua Israel/, /placeholder/i];

test("sampled pages each have one original preview of 300 to 600 words", () => {
  const previews = allPreviews();
  const paths = new Set(previews.map((essay) => essay.path));
  assert.ok(paths.has("/"));
  assert.ok(paths.has("/live"));
  assert.ok(paths.has("/results"));
  for (const state of STARTER_STATES) assert.ok(paths.has(`/states/${state.code}`), state.code);
  for (const race of RACES) assert.ok(paths.has(`/races/${race.slug}`), race.slug);
  assert.equal(previews.length, 3 + STARTER_STATES.length + RACES.length);
  for (const essay of previews) {
    const words = essayWordCount(essay);
    assert.ok(words >= 300 && words <= 600, `${essay.path} is ${words} words`);
    assert.equal(essay.updated, "October 27, 2026");
    assert.ok(essay.sources.length >= 2, essay.path);
    const plain = essay.paragraphs.flat().map((part) => (typeof part === "string" ? part : part.t)).join(" ");
    for (const pattern of BANNED) assert.equal(pattern.test(plain), false, `${essay.path} ${pattern}`);
    assert.equal(essayForPath(essay.path)?.title, essay.title);
  }
});
