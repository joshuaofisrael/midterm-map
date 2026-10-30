/**
 * Fails the build when an HTML page with a head lacks the AdSense meta tag or loader
 * (including static city, county, and redirect pages), when an ad unit is present,
 * when the Consent Mode default is not first in <head>, when Ezoic or Adsterra
 * code is present,
 * when ads.txt is missing or different, when robots.txt blocks an AdSense crawler,
 * or when the exported site is 1 GB or larger.
 * The AdSense loader stays limited to substantive pages.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import {
  ADS_TXT_LINE,
  ADSENSE_CLIENT,
  ADSENSE_LOADER_TAG,
  ADSENSE_META_TAG,
  htmlHead,
  isRedirectStub,
  adsAllowedForPath,
} from "../src/lib/adsense.ts";
import { isBallotHtml } from "../src/lib/ballotZip.ts";
import { consentHeadProblems } from "../src/lib/consentHead.ts";

const OUT = path.join(process.cwd(), "out");
const GIGABYTE = 1024 * 1024 * 1024;
const ADSENSE_BOTS = ["Mediapartners-Google", "AdsBot-Google", "AdsBot-Google-Mobile"];
const errors: string[] = [];

let pages = 0;
let adPages = 0;
let redirects = 0;
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
    if (!name.endsWith(".html")) continue;
    const html = readFileSync(full, "utf8");
    const head = htmlHead(html);
    if (head === null) {
      nonDocuments++;
      continue;
    }
    if (isRedirectStub(html)) redirects++;
    pages++;
    const rel = path.relative(OUT, full);
    if (!head.includes(ADSENSE_META_TAG)) errors.push(`${rel}: missing ${ADSENSE_META_TAG}`);
    const sitePath = "/" + rel.split(path.sep).join("/").replace(/index\.html$/, "");
    const allow = !isRedirectStub(html) && adsAllowedForPath(sitePath);
    const hasLoader = head.includes("adsbygoogle.js");
    const noindex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(head);
    if (allow && !head.includes(ADSENSE_LOADER_TAG)) errors.push(`${rel}: missing AdSense loader`);
    if (!allow && hasLoader) errors.push(`${rel}: AdSense loader on a page that must stay ad-free`);
    if (hasLoader && noindex) errors.push(`${rel}: loader on a noindex page`);
    if (allow) adPages++;
    const relPosix = rel.split(path.sep).join("/");
    for (const problem of consentHeadProblems(head, html, isBallotHtml(relPosix))) {
      errors.push(`${rel}: ${problem}`);
    }
    if (/<ins\b[^>]*\badsbygoogle\b/i.test(html) || /adsbygoogle\s*=\s*window\.adsbygoogle/.test(html)) {
      errors.push(`${rel}: ad unit is present; only the loader is allowed`);
    }
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

type RobotGroup = { agents: string[]; rules: { allow: boolean; path: string }[] };

function parseRobots(text: string): RobotGroup[] {
  const groups: RobotGroup[] = [];
  let current: RobotGroup | null = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (!match) continue;
    const field = match[1].trim().toLowerCase();
    const value = match[2].trim();
    if (field === "user-agent") {
      if (!current || current.rules.length > 0) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value);
      continue;
    }
    if (!current) continue;
    if (field === "allow" || field === "disallow") {
      current.rules.push({ allow: field === "allow", path: value });
    }
  }
  return groups;
}

function groupFor(groups: RobotGroup[], agent: string): RobotGroup | undefined {
  const specific = groups.filter((group) =>
    group.agents.some((name) => name !== "*" && name.toLowerCase() === agent.toLowerCase()),
  );
  if (specific.length > 0) return specific[specific.length - 1];
  return groups.filter((group) => group.agents.includes("*")).pop();
}

/** True when the group blocks the site root. An empty Disallow allows everything. */
function blocksRoot(group: RobotGroup | undefined): boolean {
  if (!group) return false;
  let blocked = false;
  let allowLength = -1;
  let disallowLength = -1;
  for (const rule of group.rules) {
    if (rule.path === "") continue;
    if (rule.path !== "/" && !"/".startsWith(rule.path)) continue;
    if (rule.allow) {
      if (rule.path.length >= allowLength) allowLength = rule.path.length;
    } else if (rule.path.length >= disallowLength) {
      disallowLength = rule.path.length;
      blocked = true;
    }
  }
  if (allowLength >= disallowLength) return false;
  return blocked;
}

if (!existsSync(OUT)) {
  console.error("adsense: out/ is missing. Run next build first.");
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
}

const adsPath = path.join(OUT, "ads.txt");
if (!existsSync(adsPath)) {
  errors.push("ads.txt is missing from out/");
} else {
  const body = readFileSync(adsPath, "utf8").replace(/\r\n/g, "\n").trim();
  if (body !== ADS_TXT_LINE) errors.push(`ads.txt must be exactly: ${ADS_TXT_LINE}`);
}

const robotsPath = path.join(OUT, "robots.txt");
if (!existsSync(robotsPath)) {
  errors.push("robots.txt is missing from out/");
} else {
  const groups = parseRobots(readFileSync(robotsPath, "utf8"));
  for (const agent of ADSENSE_BOTS) {
    const group = groupFor(groups, agent);
    if (!group) errors.push(`robots.txt has no rule group covering ${agent}`);
    else if (blocksRoot(group)) errors.push(`robots.txt blocks ${agent} from /`);
  }
}

if (!ADSENSE_META_TAG.includes(ADSENSE_CLIENT) || !ADSENSE_LOADER_TAG.includes(ADSENSE_CLIENT)) {
  errors.push("AdSense client id is not in the shared tags");
}

if (bytes >= GIGABYTE) {
  errors.push(`out/ is ${bytes} bytes, which is not under 1 GB`);
}

if (errors.length) {
  console.error(`adsense: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

const mb = (bytes / (1024 * 1024)).toFixed(1);
console.log(
  `adsense: ${pages} pages have the meta tag, ${adPages} substantive pages load the ad script (${redirects} redirect stubs included); ${nonDocuments} non-documents skipped; ads.txt ok; robots.txt allows AdSense crawlers; out/ is ${mb} MB.`,
);
