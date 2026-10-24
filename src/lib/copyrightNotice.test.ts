import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

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
  const jsonld = read("components/SiteJsonLd.tsx");
  assert.match(jsonld, /publisher:\s*\{[^}]*name:\s*SITE\.name/);
  assert.equal(jsonld.includes("parentOrganization"), false);
});
