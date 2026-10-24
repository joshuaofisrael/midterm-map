/**
 * Election-night guards that are not poll-close rules:
 * the live tracker stays on one same-origin JSON file, and the public
 * files the scale plan depends on are present.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(rel) {
  return readFileSync(path.join(root, rel), "utf8");
}

const feed = read("src/lib/liveFeed.ts");
if (feed.includes("raw.githubusercontent.com")) {
  errors.push("liveFeed.ts fetches GitHub from the browser");
}
if (/cache:\s*"no-store"/.test(feed)) {
  errors.push("liveFeed.ts bypasses HTTP caching");
}
if (!feed.includes('"/live/results.json"') && !feed.includes("'/live/results.json'")) {
  errors.push("liveFeed.ts must read /live/results.json");
}
if (!feed.includes("?t=")) {
  errors.push("liveFeed.ts must cache-bust the results file with a query string");
}
if (!feed.includes("60_000") && !feed.includes("60000")) {
  errors.push("liveFeed.ts must poll at most every 60 seconds");
}
if (feed.includes("googletagmanager.com")) {
  errors.push("liveFeed.ts must not load a third-party script");
}
for (const file of ["src/components/LiveResults.tsx", "src/components/LiveNeedles.tsx"]) {
  const source = read(file);
  if (!source.includes("subscribeLive")) errors.push(`${file} must read the shared static JSON feed`);
  if (source.includes("fetch(")) errors.push(`${file} must not fetch on its own`);
  if (source.includes("raw.githubusercontent.com") || source.includes("googletagmanager.com")) {
    errors.push(`${file} must not call a third party`);
  }
}

const layout = read("src/components/GoogleAnalytics.tsx");
if (layout.includes("googletagmanager.com")) {
  errors.push("GoogleAnalytics.tsx must not embed gtag.js; consent.js loads it after Accept");
}

const consent = read("public/consent.js");
if (!consent.includes("loadGa") || !consent.includes("googletagmanager.com")) {
  errors.push("consent.js must be able to load Google Analytics after Accept");
}

const beacon = read("src/components/CloudflareAnalytics.tsx");
if (!beacon.includes("acf65aa20fc5402db5459b56440920fe")) {
  errors.push("Cloudflare Web Analytics token changed");
}
if (!beacon.includes("static.cloudflareinsights.com/beacon.min.js")) {
  errors.push("Cloudflare Web Analytics beacon missing");
}

const ads = read("public/ads.txt").trim();
if (!ads.startsWith("google.com, pub-5681559774142917, DIRECT, f08c47fec0942fa0")) {
  errors.push("public/ads.txt is missing the AdSense publisher line");
}

const indexNowName = "7d9821210489aaf528bb6f613749ac93.txt";
const indexNow = read(`public/${indexNowName}`).trim();
if (indexNow !== "7d9821210489aaf528bb6f613749ac93") {
  errors.push("IndexNow key file content does not match its name");
}

const privacy = read("src/app/(site)/privacy/page.tsx");
for (const phrase of ["Cloudflare Web Analytics", "Google Analytics", "AdSense", "Ezoic", "Adsterra"]) {
  if (!privacy.includes(phrase)) errors.push(`Privacy policy does not mention ${phrase}`);
}

const headers = read("public/_headers");
if (!headers.includes("/live/results.json") || !headers.includes("/_next/static/*")) {
  errors.push("public/_headers is missing live JSON or hashed-asset cache rules");
}

const redirects = read("public/_redirects");
if (!redirects.includes("/live/results.json") || !redirects.includes("live-results/results.json")) {
  errors.push("public/_redirects does not proxy /live/results.json to the live-results branch");
}

const results = JSON.parse(read("public/live/results.json"));
if (results.electionDay !== "2026-11-03") errors.push("public/live/results.json electionDay is not 2026-11-03");
if (results.remoteUrl) errors.push("public/live/results.json still advertises a third-party URL");

const workflow = read(".github/workflows/live-results.yml");
if (!workflow.includes("2-57/5")) errors.push("live-results workflow is not scheduled every 5 minutes");
if (workflow.includes("deploy-pages") || workflow.includes("npm run build")) {
  errors.push("live-results workflow must not rebuild or deploy the site");
}

if (errors.length) {
  console.error(`scale-ready: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log("scale-ready: same-origin live JSON, ads.txt, IndexNow key, privacy names, cache files.");
