/**
 * Ezoic JavaScript integration for mapthemidterms.com.
 *
 * Consent approach (one prompt):
 * Gatekeeper (cmp.gatekeeperconsent.com + the.gatekeeperconsent.com) is an IAB
 * TCF CMP. Ezoic shows that modal for EU/EEA/UK visitors, not for everyone else.
 * When the TCF signal says gdprApplies, public/consent.js hides this site's
 * banner and lets Gatekeeper be the only prompt. Google Analytics still loads
 * only after a grant: public/consent-default.js denies analytics_storage (and,
 * in the EEA, the UK, and Switzerland, ad storage too), then consent.js updates
 * Consent Mode from the same purpose map as Gatekeeper's _updateGoogleConsentMode
 * (ad_storage = purpose 1, ad_user_data = 1 and 7, ad_personalization = 3 and 4,
 * analytics_storage = 1 and 7 and 8 and 10). gtag has to exist before that CMP
 * callback, so the default sits between the two CMP scripts and sa.min.js.
 * Switzerland is in the denied region so Google tags wait, but Gatekeeper does
 * not treat CH as in-scope, so the site banner stays the analytics prompt there.
 * Everywhere else the site banner stays, and ad storage stays granted so the
 * existing AdSense loader is not blocked. AdSense tag placement, ads.txt, and
 * DNS are unchanged. No Ezoic ad placeholders are inserted.
 */

import { BALLOT_ZIP_BOOT_SCRIPT, BALLOT_ZIP_STORAGE_KEY, isBallotHtml } from "./ballotZip";

export const EZOIC_GATEKEEPER_SRC = "https://cmp.gatekeeperconsent.com/min.js";
export const EZOIC_GATEKEEPER_CMP_SRC = "https://the.gatekeeperconsent.com/cmp.min.js";
export const EZOIC_SA_SRC = "//www.ezojs.com/ezoic/sa.min.js";
export const EZOIC_ANALYTICS_SRC = "//ezoicanalytics.com/analytics.js";

/**
 * Same-origin file so the default is not repeated in 100k+ HTML pages.
 * The script tag is blocking (no async/defer) and sits between the CMP and
 * sa.min.js. public/consent.js still applies the TCF update if Gatekeeper's
 * own gtag() call ran before this file executed.
 */
export const CONSENT_DEFAULT_SRC = "/consent-default.js";

/** Exact integration block, in the required order, inserted at the start of <head>. */
export const EZOIC_HEAD_BLOCK = `<script data-cfasync="false" src="${EZOIC_GATEKEEPER_SRC}"></script>
<script data-cfasync="false" src="${EZOIC_GATEKEEPER_CMP_SRC}"></script>
<script data-cfasync="false" data-mtm-consent-default="1" src="${CONSENT_DEFAULT_SRC}"></script>
<script async src="${EZOIC_SA_SRC}"></script>
<script>
    window.ezstandalone = window.ezstandalone || {};
    ezstandalone.cmd = ezstandalone.cmd || [];
</script>
<script src="${EZOIC_ANALYTICS_SRC}"></script>`;

/** Markers that must appear in this order inside <head>. */
export const EZOIC_ORDER_MARKERS = [
  EZOIC_GATEKEEPER_SRC,
  EZOIC_GATEKEEPER_CMP_SRC,
  "data-mtm-consent-default",
  EZOIC_SA_SRC,
  "ezstandalone.cmd",
  EZOIC_ANALYTICS_SRC,
] as const;

/** Placeholder slots and showAds() calls. Header scripts are not placeholders. */
export const EZOIC_PLACEHOLDER_RE = /ezoic-pub-ad-placeholder|ezstandalone\.showAds/i;

const HEAD_RE = /<head\b[^>]*>([\s\S]*?)<\/head>/i;
const HEAD_OPEN_RE = /<head\b[^>]*>/i;
const CHARSET_RE = /^\s*<meta\b[^>]*\bcharset\b[^>]*>/i;

const STRIP_RES = [
  /<script\b[^>]*\bsrc=["'][^"']*cmp\.gatekeeperconsent\.com\/min\.js[^"']*["'][^>]*>\s*<\/script>\s*/gi,
  /<script\b[^>]*\bsrc=["'][^"']*the\.gatekeeperconsent\.com\/cmp\.min\.js[^"']*["'][^>]*>\s*<\/script>\s*/gi,
  /<script\b[^>]*\bsrc=["'][^"']*ezojs\.com\/ezoic\/sa\.min\.js[^"']*["'][^>]*>\s*<\/script>\s*/gi,
  /<script\b[^>]*\bsrc=["'][^"']*ezoicanalytics\.com\/analytics\.js[^"']*["'][^>]*>\s*<\/script>\s*/gi,
  /<script\b[^>]*\bdata-mtm-consent-default\b[^>]*>[\s\S]*?<\/script>\s*/gi,
  /<script\b(?![^>]*\bsrc=)[^>]*>\s*window\.ezstandalone\s*=\s*window\.ezstandalone\s*\|\|\s*\{\s*\};\s*ezstandalone\.cmd\s*=\s*ezstandalone\.cmd\s*\|\|\s*\[\s*\];\s*<\/script>\s*/gi,
];

function stripEzoic(html: string): string {
  let next = html;
  for (const re of STRIP_RES) next = next.replace(re, "");
  return next;
}

/**
 * Insert the integration once, immediately after the charset meta when that
 * meta is the first head element, otherwise immediately after <head>.
 * Leaves every other tag, including the AdSense meta and loader, where it is.
 */
export function insertEzoicHead(html: string, rel = ""): string {
  if (!HEAD_RE.test(html)) return html;
  const next = stripEzoic(html).split(BALLOT_ZIP_BOOT_SCRIPT).join("");
  const open = next.match(HEAD_OPEN_RE);
  if (!open || open.index == null) return html;
  let pos = open.index + open[0].length;
  const charset = next.slice(pos).match(CHARSET_RE);
  if (charset && charset.index != null) pos += charset.index + charset[0].length;
  const boot = isBallotHtml(rel) ? `${BALLOT_ZIP_BOOT_SCRIPT}\n` : "";
  return `${next.slice(0, pos)}\n${boot}${EZOIC_HEAD_BLOCK}\n${next.slice(pos)}`;
}

export function ezoicHeadProblems(
  head: string,
  html: string,
  placeholdersAllowed: boolean,
  bootExpected = false,
): string[] {
  const problems: string[] = [];
  let prev = -1;
  for (const marker of EZOIC_ORDER_MARKERS) {
    const at = head.indexOf(marker);
    if (at === -1) problems.push(`missing ${marker}`);
    else if (at < prev) problems.push(`out of order: ${marker}`);
    else prev = at;
  }
  const tags = [...head.matchAll(/<script\b[\s\S]*?<\/script>/gi)].map((match) => match[0]);
  const bootAt = tags.findIndex((tag) => tag.includes(BALLOT_ZIP_STORAGE_KEY));
  if (bootExpected) {
    if (bootAt !== 0) problems.push("ballot ZIP boot script is not the first script");
  } else if (bootAt !== -1) {
    problems.push("ballot ZIP boot script on a non-ballot page");
  }
  const gate = tags[bootAt === 0 ? 1 : 0] ?? "";
  const src = gate.match(/^<script\b[^>]*\bsrc=["']([^"']+)["']/i);
  if (!src || !src[1].includes("cmp.gatekeeperconsent.com/min.js")) {
    problems.push("first script is not the Gatekeeper CMP");
  }
  if (!placeholdersAllowed && EZOIC_PLACEHOLDER_RE.test(html)) {
    problems.push("Ezoic ad placeholder on a page that must not have one");
  }
  return problems;
}
