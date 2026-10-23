import assert from "node:assert/strict";
import test from "node:test";
import {
  citySeoHeading,
  misspellingsFor,
  normalizePlaceQuery,
  placeDisplayName,
  placeIsStandalone,
  placeTargetPath,
  readableAliases,
  redirectSlugTargets,
  scorePlaceQuery,
  searchKeys,
  variantSlugs,
} from "./placeNames.ts";

const farmington = {
  geoid: "2627440",
  slug: "farmington-hills-city",
  name: "Farmington Hills city",
  pop: 83986,
  counties: ["Oakland County"],
  districts: ["Congressional District 11"],
};

test("Farmington Hills display name and heading", () => {
  assert.equal(placeDisplayName(farmington.name), "Farmington Hills");
  assert.equal(citySeoHeading("MI", farmington, "unique"), "2026 Midterm Election Info for Farmington Hills, MI");
  assert.equal(
    citySeoHeading(
      "GA",
      { name: "Webster County unified government", counties: ["Webster County"] },
      "unique",
    ),
    "2026 Midterm Election Info for Webster County unified government, Webster County, GA",
  );
});

test("Farmington Hills search keys and redirect slugs", () => {
  const keys = searchKeys(farmington.name);
  assert.ok(keys.includes("farmington hills"));
  assert.ok(keys.includes("farmington hills city"));
  assert.ok(keys.includes("farmington hills township"));
  assert.ok(keys.includes("farmingtonhills"));
  const slugs = variantSlugs(farmington.name);
  assert.ok(slugs.includes("farmington-hills"));
  assert.ok(slugs.includes("farmington-hills-city"));
  assert.ok(slugs.includes("farmington-hills-township"));
  assert.ok(slugs.includes("farmingtonhills"));
  assert.ok(readableAliases(farmington.name).includes("Farmington Hills township"));
  assert.equal(readableAliases(farmington.name).includes("Farmington-Hills-city"), false);
  assert.ok(searchKeys(farmington.name).includes("farmington hills village"));
});

test("Saint, Mount, and Fort forms", () => {
  const saint = variantSlugs("St. Louis city");
  assert.ok(saint.includes("st-louis"));
  assert.ok(saint.includes("saint-louis"));
  assert.ok(saint.includes("saint-louis-city"));
  assert.equal(normalizePlaceQuery("St. Louis"), "st louis");
  assert.ok(searchKeys("St. Louis city").includes("saint louis"));
  assert.ok(!searchKeys("St. Louis city").some((key) => key.includes(".")));

  assert.ok(variantSlugs("Mount Vernon city").includes("mt-vernon"));
  assert.ok(searchKeys("Mount Vernon city").includes("mt vernon"));
  assert.ok(variantSlugs("Fort Worth city").includes("ft-worth"));
  assert.ok(searchKeys("Fort Worth city").includes("fort worth"));
});

test("hyphens, apostrophes, centre, and misspellings", () => {
  assert.ok(searchKeys("Winston-Salem city").includes("winston salem"));
  assert.ok(searchKeys("Winston-Salem city").includes("winstonsalem"));
  assert.ok(searchKeys("O'Fallon city").includes("ofallon"));
  assert.ok(searchKeys("O'Fallon city").includes("o fallon"));
  assert.ok(searchKeys("Centre Hall borough").includes("center hall"));
  assert.ok(misspellingsFor("Tucson city").includes("tuscon"));
  assert.equal(scorePlaceQuery("tuscon", "Tucson city"), 0);
  assert.equal(scorePlaceQuery("Farmington Hills", "Farmington Hills city"), 0);
});

test("shared names and thin places", () => {
  assert.equal(
    citySeoHeading("WI", { name: "Pewaukee city", counties: ["Waukesha County"] }, "class"),
    "2026 Midterm Election Info for Pewaukee city, Waukesha County, WI",
  );
  const thin = {
    geoid: "1",
    slug: "example-cdp",
    name: "Example CDP",
    pop: null,
    counties: ["Kent County"],
  };
  assert.equal(placeIsStandalone(thin), false);
  assert.equal(placeTargetPath("MI", thin), "/cities/MI/county/kent-county/#place-1");
  const redirects = redirectSlugTargets("MI", [thin, farmington]);
  assert.equal(redirects.get("example-cdp"), "/cities/MI/county/kent-county/#place-1");
  assert.equal(redirects.get("farmington-hills"), "/cities/MI/farmington-hills-city/");
  assert.equal(redirects.has("farmington-hills-city"), false);
});

test("ambiguous slugs are not redirects", () => {
  const places = [
    {
      geoid: "1",
      slug: "springfield-city",
      name: "Springfield city",
      pop: 100,
      counties: ["A County"],
      districts: ["Congressional District 1"],
    },
    {
      geoid: "2",
      slug: "springfield-township",
      name: "Springfield township",
      pop: 50,
      counties: ["B County"],
      districts: ["Congressional District 2"],
    },
  ];
  const redirects = redirectSlugTargets("IL", places);
  assert.equal(redirects.has("springfield"), false);
  assert.equal(redirects.get("springfield-city"), undefined);
});
