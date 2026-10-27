/**
 * Fail the build unless every real HTML page has exactly one house-ad banner
 * for the offer selected from that page's path, placed under the header and
 * above the main heading. Redirect stubs stay ad-free.
 * NamedScan is about 60% and RankFootprint about 40%. Tax Deed Pack is absent.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { htmlHead, isRedirectStub } from "../src/lib/adsense.ts";
import { HOUSE_ADS, normalizeHouseAdPath, pickHouseAd, type HouseAdId } from "../src/lib/houseAd.ts";

const OUT = path.join(process.cwd(), "out");
const errors: string[] = [];
const counts: Record<HouseAdId, number> = { namedscan: 0, rankfootprint: 0 };
const examples: Partial<Record<HouseAdId, string>> = {};
let pages = 0;
let redirects = 0;

function routeFor(rel: string): string {
  return normalizeHouseAdPath("/" + rel.split(path.sep).join("/"));
}

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const html = readFileSync(full, "utf8");
    if (htmlHead(html) === null) continue;
    const rel = path.relative(OUT, full);
    if (/taxdeedpack|Tax Deed Pack/i.test(html)) {
      errors.push(`${rel}: still mentions Tax Deed Pack`);
    }
    if (/free scan/i.test(html)) errors.push(`${rel}: static HTML says "free scan"`);
    if (isRedirectStub(html)) {
      redirects += 1;
      if (html.includes("data-house-ad")) errors.push(`${rel}: redirect stub has a house ad`);
      continue;
    }
    pages += 1;
    const route = routeFor(rel);
    const expected = pickHouseAd(route);
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    const cards = [
      ...visible.matchAll(
        /<a\b[^>]*\bdata-house-ad="(namedscan|rankfootprint)"[^>]*>[\s\S]*?<\/a>/g,
      ),
    ];
    if (cards.length !== 1) {
      errors.push(`${rel}: expected 1 house ad, found ${cards.length}`);
      continue;
    }
    const card = cards[0][0];
    const id = cards[0][1] as HouseAdId;
    counts[id] += 1;
    if (!examples[id]) examples[id] = route;
    if (id !== expected.id) errors.push(`${rel}: path ${route} rendered ${id}, expected ${expected.id}`);
    const offer = HOUSE_ADS[id];
    if (!card.includes(`>${offer.label}<`)) errors.push(`${rel}: missing label ${offer.label}`);
    if (!card.includes(`<span class="house-ad-btn">${offer.cta}</span>`)) {
      errors.push(`${rel}: missing button span ${offer.cta}`);
    }
    if (!card.includes(offer.pitch)) errors.push(`${rel}: missing pitch`);
    if (!card.includes('rel="sponsored noopener"')) errors.push(`${rel}: missing rel="sponsored noopener"`);
    if (!card.includes('target="_blank"')) errors.push(`${rel}: missing target="_blank"`);
    if (!card.includes("min-height:72px")) errors.push(`${rel}: missing reserved 72px min-height`);
    const sampleScripts = [
      ...html.matchAll(/<script\b[^>]*\bsrc="\/rankfootprint-sample\.js"[^>]*>\s*<\/script>/gi),
    ];
    if (id === "rankfootprint") {
      if (sampleScripts.length !== 1) {
        errors.push(`${rel}: expected one deferred sample script, found ${sampleScripts.length}`);
      } else if (!/\bdefer\b/i.test(sampleScripts[0][0]) || !/\bdata-keep=/.test(sampleScripts[0][0])) {
        errors.push(`${rel}: sample script must be deferred and marked data-keep`);
      }
    } else if (sampleScripts.length) {
      errors.push(`${rel}: sample script is only for RankFootprint`);
    }
    if (!card.includes("utm_source=mapthemidterms")) errors.push(`${rel}: missing utm_source`);
    if (!card.includes("utm_medium=house_ad")) errors.push(`${rel}: missing utm_medium`);
    if (!card.includes(`utm_campaign=${id}`)) errors.push(`${rel}: missing utm_campaign`);
    if ((card.match(/<a\b/g) ?? []).length !== 1) errors.push(`${rel}: house ad must be a single anchor`);
    if (/<img\b|<script\b|<button\b/i.test(card)) errors.push(`${rel}: house ad has an image, script, or button`);
    if (/Joshua|LLC|Ventures|gmail/i.test(card)) errors.push(`${rel}: house ad names the operator`);
    if (/position:\s*(sticky|fixed)/i.test(card)) errors.push(`${rel}: house ad is sticky or fixed`);
    const adAt = visible.indexOf("data-house-ad");
    const headerEnd = visible.indexOf("</header>");
    const h1At = visible.search(/<h1\b/i);
    if (headerEnd !== -1 && adAt !== -1 && adAt < headerEnd) {
      errors.push(`${rel}: house ad is not below the header`);
    }
    if (h1At !== -1 && adAt !== -1 && adAt > h1At) {
      errors.push(`${rel}: house ad is not above the main heading`);
    }
  }
}

if (!existsSync(OUT)) {
  console.error("house ads: out/ is missing. Run next build first.");
  process.exit(1);
}

walk(OUT);

if (pages === 0) errors.push("no HTML pages found");

if (pages > 0) {
  const named = counts.namedscan / pages;
  const rank = counts.rankfootprint / pages;
  if (named < 0.55 || named > 0.65) {
    errors.push(`NamedScan share ${(named * 100).toFixed(1)}% is outside 55–65%`);
  }
  if (rank < 0.35 || rank > 0.45) {
    errors.push(`RankFootprint share ${(rank * 100).toFixed(1)}% is outside 35–45%`);
  }
}

if (errors.length) {
  console.error(`house ads: ${errors.length} problem(s)`);
  for (const error of errors.slice(0, 40)) console.error(`  ${error}`);
  process.exit(1);
}

const sample = (Object.keys(examples) as HouseAdId[]).map((id) => `${id} ${examples[id]}`).join("; ");
console.log(
  `house ads: ${pages} pages, ${redirects} redirect stubs skipped; NamedScan ${counts.namedscan}, RankFootprint ${counts.rankfootprint}; examples: ${sample}`,
);
