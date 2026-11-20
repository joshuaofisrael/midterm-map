/**
 * Fails the build when any exported HTML file contains an AdSense marker,
 * or when ads.txt exists anywhere in out/.
 * Also requires the Consent Mode default, rejects Ezoic and Adsterra,
 * requires Google Analytics 4 and the Cloudflare Web Analytics beacon on
 * every non-redirect page, and keeps the export under 1 GB.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { htmlHead, isRedirectStub } from "../src/lib/htmlDocument.ts";
import { isBallotHtml } from "../src/lib/ballotZip.ts";
import { consentHeadProblems } from "../src/lib/consentHead.ts";

const OUT = path.join(process.cwd(), "out");
const GIGABYTE = 1024 * 1024 * 1024;
const GA_ID = "G-Q9FB3RS751";
const BEACON = "static.cloudflareinsights.com/beacon.min.js";
const BEACON_TOKEN = "acf65aa20fc5402db5459b56440920fe";
const FORBIDDEN = [
  "adsbygoogle",
  "pagead2.googlesyndication.com",
  "ca-pub-5681559774142917",
  "google-adsense-account",
];

const errors: string[] = [];
let htmlFiles = 0;
let redirects = 0;
let withAnalytics = 0;
let nonDocuments = 0;
let bytes = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const info = statSync(full);
    if (info.isDirectory()) {
      if (name !== "_next") walk(full);
      else bytes += dirSize(full);
      continue;
    }
    bytes += info.size;
    if (name === "ads.txt") {
      errors.push(`${path.relative(OUT, full)} exists in the output`);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    htmlFiles++;
    const html = readFileSync(full, "utf8");
    const rel = path.relative(OUT, full);
    const lower = html.toLowerCase();
    for (const marker of FORBIDDEN) {
      if (lower.includes(marker.toLowerCase())) errors.push(`${rel}: contains ${marker}`);
    }
    const head = htmlHead(html);
    if (head === null) {
      nonDocuments++;
      continue;
    }
    const relPosix = rel.split(path.sep).join("/");
    for (const problem of consentHeadProblems(head, html, isBallotHtml(relPosix))) {
      errors.push(`${rel}: ${problem}`);
    }
    if (isRedirectStub(html)) {
      redirects++;
      continue;
    }
    const hasGa = html.includes(GA_ID) && html.includes("/consent.js");
    const hasBeacon = html.includes(BEACON) && html.includes(BEACON_TOKEN);
    if (!hasGa) errors.push(`${rel}: missing Google Analytics ${GA_ID} or /consent.js`);
    if (!hasBeacon) errors.push(`${rel}: missing Cloudflare Web Analytics beacon`);
    if (hasGa && hasBeacon) withAnalytics++;
  }
}

function dirSize(dir: string): number {
  let total = 0;
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const info = statSync(full);
    total += info.isDirectory() ? dirSize(full) : info.size;
  }
  return total;
}

if (!existsSync(OUT)) {
  console.error("no-adsense: out/ is missing. Run next build first.");
  process.exit(1);
}

walk(OUT);

const consentDefaultPath = path.join(OUT, "consent-default.js");
if (!existsSync(consentDefaultPath)) {
  errors.push("consent-default.js is missing from out/");
} else {
  const consentDefault = readFileSync(consentDefaultPath, "utf8");
  if (!consentDefault.includes('consent", "default"') || !consentDefault.includes("analytics_storage")) {
    errors.push("consent-default.js does not set a Consent Mode default");
  }
  if (/ad_storage"\s*:\s*"granted"/.test(consentDefault)) {
    errors.push("consent-default.js grants advertising storage");
  }
}

const consentPath = path.join(OUT, "consent.js");
if (!existsSync(consentPath)) {
  errors.push("consent.js is missing from out/");
} else {
  const consent = readFileSync(consentPath, "utf8");
  if (!consent.includes("googletagmanager.com") || !consent.includes("analytics_storage")) {
    errors.push("consent.js no longer loads Google Analytics after a grant");
  }
  for (const marker of FORBIDDEN) {
    if (consent.toLowerCase().includes(marker.toLowerCase())) {
      errors.push(`consent.js contains ${marker}`);
    }
  }
}

if (bytes >= GIGABYTE) {
  errors.push(`out/ is ${bytes} bytes, which is not under 1 GB`);
}

if (errors.length) {
  console.error(`no-adsense: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

const mb = (bytes / (1024 * 1024)).toFixed(1);
console.log(
  `no-adsense: ${htmlFiles} HTML files checked, 0 AdSense references; ads.txt absent; GA4 ${GA_ID} and the Cloudflare beacon on ${withAnalytics} pages; ${redirects} redirect stubs have neither (unchanged); ${nonDocuments} non-documents skipped; out/ is ${mb} MB.`,
);
