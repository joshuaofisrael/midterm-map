import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
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
  assert.equal(HOUSE_ADS.rankfootprint.label, "Sponsored by RankFootprint");
  assert.equal(HOUSE_ADS.namedscan.cta, "Try NamedScan");
  assert.equal(HOUSE_ADS.namedscan.headline, "See if ChatGPT names your business");
  assert.equal(
    HOUSE_ADS.namedscan.pitch,
    "See whether ChatGPT names your business when people ask which local business to hire. A free preview asks three of those questions with live web search, and the full PDF report is $5.",
  );
  assert.equal(HOUSE_ADS.rankfootprint.headline, "$1 Google Maps rank sample scan");
  assert.equal(HOUSE_ADS.rankfootprint.cta, "Get the $1 sample scan");
  assert.equal(
    HOUSE_ADS.rankfootprint.pitch,
    "$1 Google Maps rank sample scan. RankFootprint is not affiliated with Google.",
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
  assert.match(source, /ad\.id !== "rankfootprint"/);
  assert.match(source, /<script data-keep="1" defer src="\/rankfootprint-sample\.js" \/>/);
  assert.doesNotMatch(source, /free scan/i);
  assert.doesNotMatch(offers, /free scan/i);
  assert.equal(source.includes("<img"), false);
  assert.equal(source.includes("<Link"), false);
  assert.equal(source.includes("<button"), false);
  assert.equal(source.includes("Joshua"), false);
  assert.doesNotMatch(source, /taxdeedpack|Tax Deed/i);
  assert.doesNotMatch(source, /position\s*:\s*["']?(sticky|fixed)/i);
  assert.doesNotMatch(offers, /taxdeedpack|Tax Deed/i);
});

const SAMPLE_SCRIPT = readFileSync(path.join(root, "public/rankfootprint-sample.js"), "utf8");

function banner() {
  const nodes: Record<string, { textContent: string }> = {
    ".house-ad-b": { textContent: HOUSE_ADS.rankfootprint.pitch },
    ".house-ad-btn": { textContent: HOUSE_ADS.rankfootprint.cta },
    ".house-ad-sr": { textContent: `${HOUSE_ADS.rankfootprint.headline}. Opens in a new tab.` },
    ".house-ad-t": { textContent: "" },
  };
  return {
    querySelector(sel: string) {
      return nodes[sel] ?? null;
    },
    nodes,
  };
}

function runSampleScript(options: {
  ads?: ReturnType<typeof banner>[];
  payload?: unknown;
  ok?: boolean;
  fail?: boolean;
  hang?: boolean;
}) {
  const ads = options.ads ?? [banner()];
  const fetches: string[] = [];
  let abortTimer: (() => void) | undefined;
  const context = {
    document: {
      querySelectorAll(sel: string) {
        assert.equal(sel, '[data-house-ad="rankfootprint"]');
        return ads;
      },
    },
    AbortController,
    setTimeout(fn: () => void) {
      abortTimer = fn;
      return 1;
    },
    clearTimeout() {
      abortTimer = undefined;
    },
    fetch(url: string, init: { signal: AbortSignal }) {
      fetches.push(url);
      return new Promise((resolve, reject) => {
        const fail = (error: Error) => reject(error);
        if (init.signal.aborted) {
          fail(new Error("aborted"));
          return;
        }
        init.signal.addEventListener("abort", () => fail(new Error("aborted")));
        if (options.hang) return;
        if (options.fail) {
          fail(new Error("network"));
          return;
        }
        resolve({
          ok: options.ok !== false,
          json: async () => options.payload,
        });
      });
    },
  };
  vm.runInNewContext(SAMPLE_SCRIPT, context);
  return {
    ads,
    fetches,
    abort() {
      abortTimer?.();
    },
  };
}

async function settle() {
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setImmediate(resolve));
}

test("the sample script is deferred and swaps only when mode is free", async () => {
  assert.match(SAMPLE_SCRIPT, /https:\/\/rankfootprint-api\.joshofisrael\.workers\.dev\/api\/sample-status/);
  assert.match(SAMPLE_SCRIPT, /new AbortController/);
  assert.match(SAMPLE_SCRIPT, /4000/);
  assert.doesNotMatch(SAMPLE_SCRIPT, /XMLHttpRequest|document\.write/);
  assert.match(SAMPLE_SCRIPT, /A free scan of Google Maps rank/);
  assert.match(SAMPLE_SCRIPT, /Start a free grid scan/);

  const paid = runSampleScript({ payload: { mode: "paid", price_usd: 1 } });
  await settle();
  assert.deepEqual(paid.fetches, ["https://rankfootprint-api.joshofisrael.workers.dev/api/sample-status"]);
  assert.equal(paid.ads[0].nodes[".house-ad-b"].textContent, HOUSE_ADS.rankfootprint.pitch);
  assert.equal(paid.ads[0].nodes[".house-ad-btn"].textContent, "Get the $1 sample scan");

  const free = runSampleScript({ payload: { mode: "free" } });
  await settle();
  assert.equal(free.ads[0].nodes[".house-ad-b"].textContent, "A free scan of Google Maps rank. RankFootprint is not affiliated with Google.");
  assert.equal(free.ads[0].nodes[".house-ad-btn"].textContent, "Start a free grid scan");
  assert.equal(free.ads[0].nodes[".house-ad-sr"].textContent, "A free scan of Google Maps rank. Opens in a new tab.");
  assert.ok(
    Math.abs(free.ads[0].nodes[".house-ad-b"].textContent.length - HOUSE_ADS.rankfootprint.pitch.length) <= 1,
  );

  const broken = runSampleScript({ fail: true });
  await settle();
  assert.equal(broken.ads[0].nodes[".house-ad-btn"].textContent, "Get the $1 sample scan");

  const badStatus = runSampleScript({ ok: false, payload: { mode: "free" } });
  await settle();
  assert.equal(badStatus.ads[0].nodes[".house-ad-b"].textContent, HOUSE_ADS.rankfootprint.pitch);

  const odd = runSampleScript({ payload: { mode: "later" } });
  await settle();
  assert.equal(odd.ads[0].nodes[".house-ad-btn"].textContent, "Get the $1 sample scan");

  const hung = runSampleScript({ hang: true });
  hung.abort();
  await settle();
  assert.equal(hung.ads[0].nodes[".house-ad-b"].textContent, HOUSE_ADS.rankfootprint.pitch);
  assert.equal(hung.ads[0].nodes[".house-ad-btn"].textContent, "Get the $1 sample scan");

  const idle = runSampleScript({ ads: [] });
  await settle();
  assert.deepEqual(idle.fetches, []);
});
