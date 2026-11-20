import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { localFile } from "../data/local/load.ts";
import { countiesForState, countyBySlug, placeBySlug, placeStates, placesForState } from "../data/places/load.ts";
import visited from "../data/places/visited-2026-10-28-to-11-09.json";
import { absoluteUrl } from "../data/site.ts";
import { placeIsStandalone } from "./placeNames.ts";
import { isPrunedCity, isPrunedCounty } from "./prunedPlaces.ts";
import {
  cityHasOwnContests,
  cityIsThin,
  collectIndexablePlacePaths,
  collectNoindexPaths,
  contestHasSubstance,
  countyHasOwnContests,
  countyIsThin,
} from "./cityThin.ts";

const NOINDEX_FILE = path.join(process.cwd(), "src/data/places/noindex-urls.txt");

function absoluteLines(paths: string[]): string {
  return paths.map((item) => absoluteUrl(item)).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join("\n") + "\n";
}

test("a contest needs an office line, a name, or an incumbent line", () => {
  assert.equal(contestHasSubstance({ office: "Mayor", key: null, candidates: [] }), true);
  assert.equal(
    contestHasSubstance({ office: " ", key: null, candidates: [{ name: "Ada Lovelace", party: "" }] }),
    true,
  );
  assert.equal(contestHasSubstance({ office: " ", key: null, incumbentLine: "Ada Lovelace", candidates: [] }), true);
  assert.equal(contestHasSubstance({ office: " ", key: null, candidates: [{ name: " ", party: "" }] }), false);
});

test("place and county pages stay indexed only for a contest stored on that jurisdiction", () => {
  const columbus = placesForState("OH").find((place) => place.geoid === "3918000");
  assert.ok(columbus);
  assert.equal(cityHasOwnContests("OH", columbus), true);
  assert.equal(cityIsThin("OH", columbus), false);

  const creek = placeBySlug("FL", "coconut-creek-city");
  assert.ok(creek);
  assert.ok(localFile("FL")?.localPlace?.[creek.geoid]?.note);
  assert.equal((localFile("FL")?.local?.[creek.geoid] ?? []).length, 0);
  assert.equal(cityIsThin("FL", creek), true);

  const anderson = countyBySlug("TX", "anderson-county");
  assert.ok(anderson);
  assert.equal(countyHasOwnContests("TX", anderson.name), true);
  assert.equal(countyIsThin("TX", anderson.name), false);

  assert.equal(localFile("AL"), undefined);
  const alabamaCounty = countiesForState("AL")[0];
  assert.ok(alabamaCounty);
  assert.equal(countyIsThin("AL", alabamaCounty.name), true);
  const alabamaPlace = placesForState("AL").find(placeIsStandalone);
  assert.ok(alabamaPlace);
  assert.equal(cityIsThin("AL", alabamaPlace), true);
});

test("a visited place with no stored contest is noindex", () => {
  const seen = new Set(visited as string[]);
  let found = false;
  for (const state of placeStates()) {
    for (const place of placesForState(state.code)) {
      if (!placeIsStandalone(place) || isPrunedCity(state.code, place.slug)) continue;
      if (!seen.has(`${state.code}/${place.slug}`)) continue;
      if (cityHasOwnContests(state.code, place)) continue;
      assert.equal(cityIsThin(state.code, place), true);
      found = true;
      break;
    }
    if (found) break;
  }
  assert.equal(found, true);
});

test("live page counts and the noindex URL file match the substance rule", () => {
  let liveCities = 0;
  let indexedCities = 0;
  let liveCounties = 0;
  let indexedCounties = 0;
  let prunedCitiesWithContests = 0;
  let prunedCountiesWithContests = 0;
  for (const state of placeStates()) {
    for (const county of countiesForState(state.code)) {
      const has = countyHasOwnContests(state.code, county.name);
      if (isPrunedCounty(state.code, county.slug)) {
        if (has) prunedCountiesWithContests += 1;
        continue;
      }
      liveCounties += 1;
      if (has) indexedCounties += 1;
    }
    for (const place of placesForState(state.code)) {
      if (!placeIsStandalone(place)) continue;
      const has = cityHasOwnContests(state.code, place);
      if (isPrunedCity(state.code, place.slug)) {
        if (has) prunedCitiesWithContests += 1;
        continue;
      }
      liveCities += 1;
      if (has) indexedCities += 1;
    }
  }
  assert.equal(liveCities, 30929);
  assert.equal(indexedCities, 242);
  assert.equal(liveCities - indexedCities, 30687);
  assert.equal(liveCounties, 1068);
  assert.equal(indexedCounties, 298);
  assert.equal(liveCounties - indexedCounties, 770);
  assert.equal(prunedCitiesWithContests, 28);
  assert.equal(prunedCountiesWithContests, 342);

  const noindex = collectNoindexPaths();
  const indexable = collectIndexablePlacePaths();
  assert.equal(noindex.length, 30687 + 770);
  assert.equal(indexable.length, 242 + 298);
  const noindexSet = new Set(noindex);
  for (const item of indexable) assert.equal(noindexSet.has(item), false);
  const listed = readFileSync(NOINDEX_FILE, "utf8");
  assert.equal(listed, absoluteLines(noindex));
  for (const line of listed.trim().split("\n")) {
    assert.match(line, /^https:\/\/mapthemidterms\.com\/cities\/[A-Z]{2}\//);
    assert.equal(line.endsWith("/"), true);
  }
});
