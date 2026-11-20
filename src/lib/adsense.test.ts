import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { SITE } from "../data/site.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const FORBIDDEN = [
  "adsbygoogle",
  "pagead2.googlesyndication.com",
  "ca-pub-5681559774142917",
  "google-adsense-account",
];

function read(rel: string): string {
  return readFileSync(path.join(root, rel), "utf8");
}

function renderedDescription(source: string): string {
  const match = source.match(/description:\s*\n\s*`([^`]*)`/);
  assert.ok(match, "meta description template missing");
  return match[1].replaceAll("${SITE.name}", SITE.name);
}

test("homepage meta description is 160 characters or fewer", () => {
  assert.ok(
    SITE.description.length <= 160,
    `homepage meta description is ${SITE.description.length} characters`,
  );
});

test("privacy and advertising say the site does not show ads", () => {
  const privacy = read("src/app/(site)/privacy/page.tsx");
  const advertising = read("src/app/(site)/advertising/page.tsx");
  const about = read("src/app/(site)/about/page.tsx");
  const terms = read("src/app/(site)/terms/page.tsx");
  const disclaimer = read("src/app/(site)/disclaimer/page.tsx");
  for (const source of [privacy, advertising, about, terms, disclaimer]) {
    assert.match(source, /does not show ads/);
    assert.match(source, /does not use advertising cookies/);
    assert.doesNotMatch(source, /AdSense/);
    assert.doesNotMatch(source, /Mediavine/);
    assert.doesNotMatch(source, /ads\.txt/);
  }
  assert.match(privacy, /Cloudflare Web Analytics/);
  assert.match(privacy, /Google Analytics/);
  assert.match(privacy, /G-Q9FB3RS751|GA_MEASUREMENT_ID/);
  assert.match(advertising, /consent script/);
  assert.match(advertising, /Cloudflare Web\s+Analytics/);
  for (const [label, source] of [
    ["privacy", privacy],
    ["advertising", advertising],
    ["terms", terms],
    ["disclaimer", disclaimer],
  ] as const) {
    const description = renderedDescription(source);
    assert.ok(
      description.length <= 160,
      `${label} meta description is ${description.length} characters`,
    );
  }
});

test("ads.txt and the AdSense stamp are gone", () => {
  assert.equal(existsSync(path.join(root, "public/ads.txt")), false);
  assert.equal(existsSync(path.join(root, "src/lib/adsense.ts")), false);
  assert.equal(existsSync(path.join(root, "scripts/stamp-adsense-html.ts")), false);
  const pkg = read("package.json");
  assert.doesNotMatch(pkg, /stamp-adsense-html/);
  assert.match(pkg, /check-adsense\.ts/);
  const checker = read("scripts/check-adsense.ts");
  for (const marker of FORBIDDEN) assert.match(checker, new RegExp(marker.replace(/\./g, "\\.")));
  assert.match(checker, /ads\.txt/);
});

test("pages, layouts, and generators do not carry AdSense markers", () => {
  const skip = new Set(["scripts/check-adsense.ts", "scripts/check-scale-ready.mjs"]);
  const hits: string[] = [];
  function walk(dir: string) {
    for (const name of readdirSync(dir)) {
      if (name === "node_modules" || name === "out" || name === ".git") continue;
      const full = path.join(dir, name);
      const rel = path.relative(root, full);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (skip.has(rel) || /\.test\.(ts|tsx|mjs|js)$/.test(rel)) continue;
      if (!/\.(tsx?|jsx?|mjs|js|css|json|txt|html)$/.test(name)) continue;
      const text = readFileSync(full, "utf8").toLowerCase();
      for (const marker of FORBIDDEN) {
        if (text.includes(marker.toLowerCase())) hits.push(`${rel}: ${marker}`);
      }
    }
  }
  for (const dir of ["src", "public", "scripts"]) walk(path.join(root, dir));
  assert.deepEqual(hits, []);
});

test("analytics consent stays, and the layout still loads GA4 and the beacon", () => {
  const ga = read("src/components/GoogleAnalytics.tsx");
  const beacon = read("src/components/CloudflareAnalytics.tsx");
  const consent = read("public/consent.js");
  const consentDefault = read("public/consent-default.js");
  const layout = read("src/app/layout.tsx");
  assert.match(ga, /G-Q9FB3RS751/);
  assert.match(ga, /src="\/consent\.js"/);
  assert.match(beacon, /static\.cloudflareinsights\.com\/beacon\.min\.js/);
  assert.match(beacon, /acf65aa20fc5402db5459b56440920fe/);
  assert.match(layout, /<GoogleAnalyticsHead/);
  assert.match(layout, /<CloudflareAnalytics/);
  assert.match(consent, /googletagmanager\.com/);
  assert.match(consent, /analytics_storage/);
  assert.doesNotMatch(consent, /__tcfapi|ezCMP|Gatekeeper/);
  assert.doesNotMatch(consentDefault, /ad_storage"\s*:\s*"granted"/);
  assert.match(consentDefault, /analytics_storage: "denied"/);
  assert.match(consentDefault, /ad_storage: "denied"/);
});
