import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  HOUSE_ADS,
  houseAdHash,
  normalizeHouseAdPath,
  pickHouseAd,
  type HouseAdId,
} from "./houseAd.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("labels, calls to action, and tracking links match the card spec", () => {
  assert.equal(HOUSE_ADS.namedscan.label, "Sponsored by NamedScan");
  assert.equal(HOUSE_ADS.taxdeedpack.label, "Sponsored by Tax Deed Pack");
  assert.equal(HOUSE_ADS.rankfootprint.label, "Sponsored by RankFootprint");
  assert.equal(HOUSE_ADS.namedscan.cta, "Try NamedScan");
  assert.equal(HOUSE_ADS.taxdeedpack.cta, "Get the $149 pack");
  assert.equal(HOUSE_ADS.rankfootprint.cta, "Start a free grid scan");
  assert.match(HOUSE_ADS.namedscan.pitch, /\$5/);
  assert.match(HOUSE_ADS.taxdeedpack.pitch, /\$149/);
  assert.match(HOUSE_ADS.rankfootprint.pitch, /3×3/);
  assert.match(HOUSE_ADS.rankfootprint.pitch, /not affiliated with Google/);

  for (const ad of Object.values(HOUSE_ADS)) {
    assert.equal(ad.label, `Sponsored by ${ad.siteName}`);
    const sentences = ad.pitch.split(/(?<=[.!?])\s+/).filter(Boolean);
    assert.ok(sentences.length >= 1 && sentences.length <= 2, ad.id);
    assert.equal(
      ad.href,
      `https://${ad.id === "namedscan" ? "namedscan.com" : ad.id === "taxdeedpack" ? "taxdeedpack.com" : "rankfootprint.com"}/?utm_source=mapthemidterms&utm_medium=house_ad&utm_campaign=${ad.id}`,
    );
    assert.doesNotMatch(ad.pitch + ad.headline + ad.cta + ad.label, /Joshua|LLC|Ventures|gmail|guarantee|testimonial/i);
  }
});

test("path normalization ignores trailing slashes, index.html, and queries", () => {
  assert.equal(normalizeHouseAdPath("/"), "/");
  assert.equal(normalizeHouseAdPath("/index.html"), "/");
  assert.equal(normalizeHouseAdPath("/about/"), "/about");
  assert.equal(normalizeHouseAdPath("/about/index.html?x=1"), "/about");
  assert.equal(normalizeHouseAdPath("states/AZ"), "/states/AZ");
  assert.equal(normalizeHouseAdPath("/404.html"), "/404");
  assert.equal(pickHouseAd("/about/").id, pickHouseAd("/about").id);
  assert.equal(houseAdHash("/cities/MI/a"), houseAdHash("/cities/MI/a/"));
});

test("about three fifths of real place paths pick NamedScan", () => {
  const counts: Record<HouseAdId, number> = { namedscan: 0, taxdeedpack: 0, rankfootprint: 0 };
  const placesDir = path.join(root, "src/data/places");
  let n = 0;
  for (const file of readdirSync(placesDir)) {
    if (!/^[A-Z]{2}\.json$/.test(file)) continue;
    const code = file.slice(0, 2);
    const places = JSON.parse(readFileSync(path.join(placesDir, file), "utf8")) as { slug: string }[];
    for (const place of places) {
      counts[pickHouseAd(`/cities/${code}/${place.slug}`).id] += 1;
      n += 1;
    }
  }
  assert.ok(n > 1000, `expected many places, got ${n}`);
  const named = counts.namedscan / n;
  const tax = counts.taxdeedpack / n;
  const rank = counts.rankfootprint / n;
  assert.ok(named > 0.55 && named < 0.65, `namedscan ${named}`);
  assert.ok(tax > 0.15 && tax < 0.25, `taxdeedpack ${tax}`);
  assert.ok(rank > 0.15 && rank < 0.25, `rankfootprint ${rank}`);
});

test("the card component is one anchor, with the button as a span", () => {
  const source = readFileSync(path.join(root, "src/components/HouseAd.tsx"), "utf8");
  assert.match(source, /rel="sponsored noopener"/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /<span className="house-ad-btn">\{ad\.cta\}<\/span>/);
  assert.equal(source.includes("<img"), false);
  assert.equal(source.includes("<Link"), false);
  assert.equal(source.includes("<button"), false);
  assert.equal(source.includes("Joshua"), false);
});
