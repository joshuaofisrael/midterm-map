import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  HOUSE_ADS,
  RANKFOOTPRINT_FREE_SCAN,
  RANKFOOTPRINT_SAMPLE_LINE,
  houseAdHash,
  normalizeHouseAdPath,
  pickHouseAd,
  type HouseAdId,
} from "./houseAd.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("labels, calls to action, and tracking links match the card spec", () => {
  assert.equal(HOUSE_ADS.namedscan.label, "Sponsored by NamedScan");
  assert.equal(HOUSE_ADS.rankfootprint.label, "Sponsored by RankFootprint");
  assert.equal(HOUSE_ADS.namedscan.cta, "Try NamedScan");
  assert.equal(HOUSE_ADS.namedscan.headline, "See if ChatGPT names your business");
  assert.equal(
    HOUSE_ADS.namedscan.pitch,
    "See whether ChatGPT names your business when people ask which local business to hire. A free preview asks three of those questions with live web search, and the full PDF report is $5.",
  );
  assert.equal(HOUSE_ADS.rankfootprint.headline, RANKFOOTPRINT_SAMPLE_LINE);
  assert.equal(RANKFOOTPRINT_SAMPLE_LINE, "$1 Google Maps rank sample scan");
  assert.equal(HOUSE_ADS.rankfootprint.cta, "Get the $1 sample scan");
  assert.equal(
    HOUSE_ADS.rankfootprint.pitch,
    `${RANKFOOTPRINT_SAMPLE_LINE}. RankFootprint is not affiliated with Google.`,
  );
  assert.match(HOUSE_ADS.namedscan.pitch, /\$5/);
  assert.match(HOUSE_ADS.rankfootprint.pitch, /not affiliated with Google/);
  assert.doesNotMatch(
    HOUSE_ADS.rankfootprint.pitch + HOUSE_ADS.rankfootprint.headline + HOUSE_ADS.rankfootprint.cta,
    /free scan/i,
  );
  assert.equal(Object.keys(HOUSE_ADS).join(","), "namedscan,rankfootprint");

  for (const ad of Object.values(HOUSE_ADS)) {
    assert.equal(ad.label, `Sponsored by ${ad.siteName}`);
    const sentences = ad.pitch.split(/(?<=[.!?])\s+/).filter(Boolean);
    assert.ok(sentences.length >= 1 && sentences.length <= 2, ad.id);
    const host = ad.id === "namedscan" ? "namedscan.com" : "rankfootprint.com";
    assert.equal(
      ad.href,
      `https://${host}/?utm_source=mapthemidterms&utm_medium=house_ad&utm_campaign=${ad.id}`,
    );
    assert.doesNotMatch(ad.pitch + ad.headline + ad.cta + ad.label + ad.href, /taxdeedpack|Tax Deed|Joshua|LLC|Ventures|gmail|guarantee|testimonial/i);
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

test("homepage is NamedScan and other paths are about 60/40", () => {
  assert.equal(pickHouseAd("/").id, "namedscan");
  assert.equal(pickHouseAd("/index.html").id, "namedscan");

  const counts: Record<HouseAdId, number> = { namedscan: 0, rankfootprint: 0 };
  const placesDir = path.join(root, "src/data/places");
  let n = 0;
  for (const file of readdirSync(placesDir)) {
    if (!/^[A-Z]{2}\.json$/.test(file)) continue;
    const code = file.slice(0, 2);
    const places = JSON.parse(readFileSync(path.join(placesDir, file), "utf8")) as { slug: string }[];
    for (const place of places) {
      const ad = pickHouseAd(`/cities/${code}/${place.slug}`);
      assert.notEqual(ad.id, "taxdeedpack");
      assert.doesNotMatch(ad.href, /taxdeedpack/i);
      counts[ad.id] += 1;
      n += 1;
    }
  }
  assert.ok(n > 1000, `expected many places, got ${n}`);
  const named = counts.namedscan / n;
  const rank = counts.rankfootprint / n;
  assert.ok(named > 0.55 && named < 0.65, `namedscan ${named}`);
  assert.ok(rank > 0.35 && rank < 0.45, `rankfootprint ${rank}`);
});

test("the banner is one anchor, with the button as a span", () => {
  const source = readFileSync(path.join(root, "src/components/HouseAd.tsx"), "utf8");
  const offers = readFileSync(path.join(root, "src/lib/houseAd.ts"), "utf8");
  assert.match(source, /rel="sponsored noopener"/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /<span className="house-ad-k">\{ad\.label\}<\/span>/);
  assert.match(source, /<span className="house-ad-b">\{ad\.pitch\}<\/span>/);
  assert.match(source, /<span className="house-ad-btn">\{ad\.cta\}<\/span>/);
  assert.match(source, /minHeight: 72/);
  assert.doesNotMatch(source, /rankfootprint-sample|sample-status|free scan/i);
  assert.doesNotMatch(offers, /rankfootprint-sample|sample-status/);
  assert.equal(source.includes("<img"), false);
  assert.equal(source.includes("<Link"), false);
  assert.equal(source.includes("<button"), false);
  assert.equal(source.includes("Joshua"), false);
  assert.doesNotMatch(source, /taxdeedpack|Tax Deed/i);
  assert.doesNotMatch(source, /position\s*:\s*["']?(sticky|fixed)/i);
  assert.doesNotMatch(offers, /taxdeedpack|Tax Deed/i);
});

test("RankFootprint stays on the $1 line with no free-scan wording", () => {
  const ad = HOUSE_ADS.rankfootprint;
  const copy = [ad.label, ad.headline, ad.pitch, ad.cta, ad.href].join("\n");
  assert.equal(RANKFOOTPRINT_FREE_SCAN.test(copy), false);
  assert.equal(RANKFOOTPRINT_FREE_SCAN.test("A free scan of Google Maps rank"), true);
  assert.equal(RANKFOOTPRINT_FREE_SCAN.test("Start a free grid scan"), true);
  assert.equal(RANKFOOTPRINT_FREE_SCAN.test("free-scan"), true);
  assert.equal(RANKFOOTPRINT_FREE_SCAN.test("freescan"), true);
  assert.equal(RANKFOOTPRINT_FREE_SCAN.test(HOUSE_ADS.namedscan.pitch), false);
  assert.equal(existsSync(path.join(root, "public/rankfootprint-sample.js")), false);
  const checker = readFileSync(path.join(root, "scripts/check-house-ads.ts"), "utf8");
  assert.match(checker, /RANKFOOTPRINT_FREE_SCAN\.test\(card\)/);
  assert.match(checker, /RankFootprint ad contains free-scan wording/);
  assert.doesNotMatch(checker, /rankfootprint-sample\.js" \/>/);
});
