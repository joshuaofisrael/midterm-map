import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { SITE } from "../data/site.ts";
import {
  ADS_TXT_LINE,
  ADSENSE_CLIENT,
  ADSENSE_HEAD_TAGS,
  ADSENSE_LOADER_TAG,
  ADSENSE_META_TAG,
  GOOGLE_ADS_POLICIES_URL,
  ensureAdsenseHead,
  adsAllowedForPath,
  stampAdsenseHead,
  headHasAdsense,
  htmlHead,
} from "./adsense.ts";

const SAMPLE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Sample</title>
</head>
<body><p>Page</p></body>
</html>
`;

test("exact AdSense tags use the approved client id and no ad unit", () => {
  assert.equal(ADSENSE_META_TAG, `<meta name="google-adsense-account" content="${ADSENSE_CLIENT}">`);
  assert.equal(
    ADSENSE_LOADER_TAG,
    `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>`,
  );
  assert.equal(ADSENSE_CLIENT, "ca-pub-5681559774142917");
  assert.doesNotMatch(ADSENSE_HEAD_TAGS, /<ins\b|adsbygoogle\s*=/);
  assert.equal(ADS_TXT_LINE, "google.com, pub-5681559774142917, DIRECT, f08c47fec0942fa0");
  assert.equal(GOOGLE_ADS_POLICIES_URL, "https://policies.google.com/technologies/ads");
});

test("ensureAdsenseHead inserts the exact pair once, including on a redirect stub", () => {
  const stamped = ensureAdsenseHead(SAMPLE);
  const head = htmlHead(stamped);
  assert.ok(head);
  assert.equal(headHasAdsense(head), true);
  assert.equal(stamped, ensureAdsenseHead(stamped));

  const redirect = SAMPLE.replace(
    "</head>",
    '<meta http-equiv="refresh" content="0; url=/cities/MI/farmington-hills-city/">\n</head>',
  );
  const stampedRedirect = ensureAdsenseHead(redirect);
  assert.equal(headHasAdsense(htmlHead(stampedRedirect) ?? ""), true);
  assert.match(stampedRedirect, /http-equiv="refresh"/);
});

test("ensureAdsenseHead replaces a mangled copy and leaves a non-document unchanged", () => {
  const mangled = SAMPLE.replace(
    "</head>",
    '<meta name="google-adsense-account" content="ca-pub-5681559774142917"/>\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5681559774142917" crossorigin="anonymous"></script>\n</head>',
  );
  const fixed = ensureAdsenseHead(mangled);
  const head = htmlHead(fixed) ?? "";
  assert.equal(headHasAdsense(head), true);
  assert.equal(head.split(ADSENSE_META_TAG).length - 1, 1);
  assert.equal(head.split("adsbygoogle.js").length - 1, 1);
  assert.equal(ensureAdsenseHead("not a document"), "not a document");
});

test("public ads.txt matches the shared line and is not rewritten by this change", () => {
  const body = readFileSync(new URL("../../public/ads.txt", import.meta.url), "utf8").replace(/\r\n/g, "\n").trim();
  assert.equal(body, ADS_TXT_LINE);
});

test("homepage meta description is 160 characters or fewer", () => {
  assert.ok(
    SITE.description.length <= 160,
    `homepage meta description is ${SITE.description.length} characters`,
  );
});

test("privacy and advertising say AdSense may serve ads", () => {
  const privacy = readFileSync(new URL("../app/(site)/privacy/page.tsx", import.meta.url), "utf8");
  const advertising = readFileSync(new URL("../app/(site)/advertising/page.tsx", import.meta.url), "utf8");
  for (const source of [privacy, advertising]) {
    assert.doesNotMatch(source, /No advertising script is loaded/);
    assert.doesNotMatch(source, /AdSense is not running/);
    assert.doesNotMatch(source, /no advertising script loads/i);
    assert.match(source, /GOOGLE_ADS_POLICIES_URL/);
    assert.match(source, /European Economic\s+Area/);
    assert.match(source, /United Kingdom/);
    assert.match(source, /Switzerland/);
  }
  assert.doesNotMatch(privacy, /Ezoic/);
  assert.match(privacy, /Adsterra/);
  assert.match(privacy, /click Accept/);
  assert.match(advertising, /consent script/);
});

test("analytics consent.js stays the Analytics loader and does not load AdSense", () => {
  const ga = readFileSync(new URL("../components/GoogleAnalytics.tsx", import.meta.url), "utf8");
  const consent = readFileSync(new URL("../../public/consent.js", import.meta.url), "utf8");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(ga, /src="\/consent\.js"/);
  assert.match(consent, /googletagmanager\.com/);
  assert.doesNotMatch(consent, /adsbygoogle/);
  assert.match(layout, /google-adsense-account/);
  assert.doesNotMatch(layout, /ADSENSE_SCRIPT_SRC/);
});

test("ad loader only on substantive pages; thin, embed, live-free and legal pages get meta only", () => {
  for (const p of ["/", "/states/pa/", "/races/pa-senate/", "/results/", "/live/", "/voting-deadlines/", "/learn/", "/learn/house-majority/"]) {
    assert.equal(adsAllowedForPath(p), true, p);
  }
  for (const p of ["/cities/pa/erie-city/", "/cities/", "/embed/x/", "/contact/", "/privacy/", "/terms/", "/404/", "/polls/"]) {
    assert.equal(adsAllowedForPath(p), false, p);
  }
  const doc = "<html><head><title>x</title></head><body></body></html>";
  assert.ok(stampAdsenseHead(doc, true).includes("adsbygoogle.js"));
  const off = stampAdsenseHead(stampAdsenseHead(doc, true), false);
  assert.ok(!off.includes("adsbygoogle.js"));
  assert.ok(off.includes("google-adsense-account"));
});
