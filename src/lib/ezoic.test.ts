import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ADSENSE_HEAD_TAGS, ADSENSE_META_TAG, stampAdsenseHead } from "./adsense.ts";
import {
  EZOIC_ANALYTICS_SRC,
  EZOIC_GATEKEEPER_CMP_SRC,
  EZOIC_GATEKEEPER_SRC,
  EZOIC_HEAD_BLOCK,
  EZOIC_SA_SRC,
  ezoicHeadProblems,
  insertEzoicHead,
} from "./ezoic.ts";

const SAMPLE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Sample</title>
</head>
<body><p>Page</p></body>
</html>
`;

test("Ezoic block keeps Gatekeeper, sa.min.js, ezstandalone, and analytics in order", () => {
  const gk = EZOIC_HEAD_BLOCK.indexOf(EZOIC_GATEKEEPER_SRC);
  const cmp = EZOIC_HEAD_BLOCK.indexOf(EZOIC_GATEKEEPER_CMP_SRC);
  const consent = EZOIC_HEAD_BLOCK.indexOf("data-mtm-consent-default");
  const sa = EZOIC_HEAD_BLOCK.indexOf(EZOIC_SA_SRC);
  const standalone = EZOIC_HEAD_BLOCK.indexOf("ezstandalone.cmd");
  const analytics = EZOIC_HEAD_BLOCK.indexOf(EZOIC_ANALYTICS_SRC);
  assert.deepEqual([gk, cmp, consent, sa, standalone, analytics].every((n, i, all) => n > -1 && (i === 0 || n > all[i - 1])), true);
  assert.match(EZOIC_HEAD_BLOCK, /window\.ezstandalone = window\.ezstandalone \|\| \{\};/);
  assert.match(EZOIC_HEAD_BLOCK, /src="\/consent-default\.js"/);
  assert.doesNotMatch(EZOIC_HEAD_BLOCK, /ezoic-pub-ad-placeholder|ezstandalone\.showAds/);
  const consentDefault = readFileSync(new URL("../../public/consent-default.js", import.meta.url), "utf8");
  assert.match(consentDefault, /consent", "default"/);
  assert.match(consentDefault, /analytics_storage: "denied"/);
  assert.match(consentDefault, /gtag_enable_tcf_support/);
  for (const code of ["DE", "FR", "GB", "CH", "IS", "NO"]) {
    assert.match(consentDefault, new RegExp(`"${code}"`));
  }
});

test("insertEzoicHead is first after charset, idempotent, and does not move AdSense", () => {
  const withAds = stampAdsenseHead(SAMPLE, true);
  const stamped = insertEzoicHead(withAds);
  assert.equal(stamped, insertEzoicHead(stamped));
  const head = stamped.slice(stamped.indexOf("<head"), stamped.indexOf("</head>"));
  assert.deepEqual(ezoicHeadProblems(head, stamped, false), []);
  assert.ok(head.indexOf(EZOIC_GATEKEEPER_SRC) < head.indexOf("adsbygoogle.js"));
  assert.ok(head.trimEnd().endsWith(ADSENSE_HEAD_TAGS));
  const metaOnly = insertEzoicHead(stampAdsenseHead(SAMPLE, false));
  assert.ok(metaOnly.includes(ADSENSE_META_TAG));
  assert.equal(metaOnly.includes("adsbygoogle.js"), false);
  assert.equal(insertEzoicHead("not a document"), "not a document");
});

test("placeholder check allows header scripts and rejects slots on thin pages", () => {
  const head = insertEzoicHead(SAMPLE);
  const inner = head.slice(head.indexOf("<head"), head.indexOf("</head>"));
  assert.deepEqual(ezoicHeadProblems(inner, head, false), []);
  const slotted = head.replace("</body>", '<div id="ezoic-pub-ad-placeholder-101"></div><script>ezstandalone.showAds(101);</script></body>');
  assert.ok(ezoicHeadProblems(inner, slotted, false).some((line) => /placeholder/.test(line)));
  assert.deepEqual(ezoicHeadProblems(inner, slotted, true), []);
});

test("consent.js follows Gatekeeper for EEA and UK and still loads GA only after a grant", () => {
  const consent = readFileSync(new URL("../../public/consent.js", import.meta.url), "utf8");
  assert.match(consent, /__tcfapi/);
  assert.match(consent, /gdprApplies/);
  assert.match(consent, /analytics_storage/);
  assert.match(consent, /generateCMPFromPrivacyCenter/);
  assert.match(consent, /googletagmanager\.com/);
  assert.match(consent, /function loadGa\(/);
  assert.doesNotMatch(consent, /adsbygoogle/);
  assert.match(consent, /\[1, 7, 8, 10\]/);
});
