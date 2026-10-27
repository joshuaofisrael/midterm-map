import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { raceStructuredData } from "./citySeo.ts";
import { organizationJsonLd, websiteJsonLd } from "./siteSchema.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const NOTICE =
  "© 2026 Joshua Israel Ventures LLC. All rights reserved. Map the Midterms is a trade name of Joshua Israel Ventures LLC, a Florida limited liability company.";

const LEGAL_PAGES = [
  "app/(site)/terms/page.tsx",
  "app/(site)/privacy/page.tsx",
  "app/(site)/disclaimer/page.tsx",
  "app/(site)/copyright/page.tsx",
  "app/(site)/advertising/page.tsx",
];

const PUBLIC_CHROME = [
  "components/SiteFooter.tsx",
  "components/CityChrome.tsx",
  "components/SiteHeader.tsx",
  "components/SiteJsonLd.tsx",
  "lib/siteSchema.ts",
  "app/(site)/page.tsx",
  "app/(site)/about/page.tsx",
  "app/(site)/contact/page.tsx",
];

function read(rel: string) {
  return readFileSync(path.join(root, rel), "utf8");
}

test("copyright notice is the required legal-page sentence", () => {
  assert.ok(read("components/CopyrightNotice.tsx").includes(NOTICE));
});

test("legal pages render that notice, and terms keep Florida governing law", () => {
  for (const rel of LEGAL_PAGES) {
    assert.match(read(rel), /<CopyrightNotice\s*\/>/, rel);
  }
  assert.match(read("app/(site)/terms/page.tsx"), /governed by the laws of the State of Florida/);
});

test("header, footer, hero, city chrome, and JSON-LD stay free of the copyright line and the company name", () => {
  for (const rel of PUBLIC_CHROME) {
    const source = read(rel);
    assert.equal(source.includes("©"), false, rel);
    assert.equal(source.includes("All rights reserved"), false, rel);
    assert.equal(source.includes("Joshua Israel"), false, rel);
  }
  const jsonld = read("lib/siteSchema.ts");
  assert.match(jsonld, /publisher:\s*\{[^}]*name:\s*SITE\.name/);
  assert.equal(jsonld.includes("parentOrganization"), false);
  assert.equal(jsonld.includes("sameAs"), false);
});

function typesOf(node: unknown, found: string[] = []): string[] {
  if (Array.isArray(node)) {
    for (const item of node) typesOf(item, found);
    return found;
  }
  if (!node || typeof node !== "object") return found;
  const record = node as Record<string, unknown>;
  if (typeof record["@type"] === "string") found.push(record["@type"]);
  for (const value of Object.values(record)) typesOf(value, found);
  return found;
}

test("organization and race Article JSON-LD parse, and the author is not a person", () => {
  const org = JSON.parse(JSON.stringify(organizationJsonLd));
  const site = JSON.parse(JSON.stringify(websiteJsonLd));
  assert.equal(org["@type"], "Organization");
  assert.equal(org.name, "Map the Midterms");
  assert.equal(org.url, "https://mapthemidterms.com/");
  assert.equal(org.sameAs, undefined);
  assert.equal(org.logo["@type"], "ImageObject");
  assert.equal(org.logo.url, "https://mapthemidterms.com/logo.svg");
  assert.equal(site.publisher.name, "Map the Midterms");
  const race = JSON.parse(
    JSON.stringify(
      raceStructuredData({
        title: "Example Race — 2026",
        shortTitle: "Example Race",
        path: "/races/example",
        stateCode: "OH",
        stateName: "Ohio",
        faqs: [],
        crumbs: [{ name: "Home", path: "/" }],
      }),
    ),
  );
  const article = race["@graph"].find((node: { "@type": string }) => node["@type"] === "Article");
  assert.deepEqual(article.author, {
    "@type": "Organization",
    name: "Map the Midterms Editorial Team",
    url: "https://mapthemidterms.com/",
  });
  assert.equal(typesOf(org).includes("Person"), false);
  assert.equal(typesOf(race).includes("Person"), false);
  assert.match(read("components/Byline.tsx"), /By Map the Midterms Editorial Team/);
  assert.match(read("app/(site)/races/[slug]/page.tsx"), /<Byline\s*\/>/);
  assert.match(read("app/(site)/about/page.tsx"), /<Byline\s*\/>/);
  assert.match(read("app/(site)/learn/[slug]/page.tsx"), /<Byline/);
  assert.match(read("app/(site)/about/page.tsx"), /"@type": "WebPage"/);
});
