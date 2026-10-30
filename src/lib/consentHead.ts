/**
 * Consent Mode default head script for mapthemidterms.com.
 * Ezoic and its Gatekeeper CMP were removed (Oct 2026). The only thing stamped
 * at the start of <head> is the same-origin Consent Mode default, which denies
 * analytics_storage everywhere (and ad storage in the EEA, UK and Switzerland)
 * before any Google tag runs. public/consent.js then loads GA only after a grant.
 */
import { BALLOT_ZIP_BOOT_SCRIPT, BALLOT_ZIP_STORAGE_KEY, isBallotHtml } from "./ballotZip";

export const CONSENT_DEFAULT_SRC = "/consent-default.js";
export const CONSENT_HEAD_BLOCK = `<script data-cfasync="false" data-mtm-consent-default="1" src="${CONSENT_DEFAULT_SRC}"></script>`;

const HEAD_RE = /<head\b[^>]*>([\s\S]*?)<\/head>/i;
const HEAD_OPEN_RE = /<head\b[^>]*>/i;
const CHARSET_RE = /^\s*<meta\b[^>]*\bcharset\b[^>]*>/i;
const STRIP_RE = /<script\b[^>]*\bdata-mtm-consent-default\b[^>]*>[\s\S]*?<\/script>\s*/gi;
export const THIRD_PARTY_AD_RE = /ezoic|ezojs|gatekeeperconsent|ezstandalone/i;
const SCRIPT_TAG_RE = /<script\b[^>]*>/gi;

export function insertConsentHead(html: string, rel = ""): string {
  if (!HEAD_RE.test(html)) return html;
  const next = html.replace(STRIP_RE, "").split(BALLOT_ZIP_BOOT_SCRIPT).join("");
  const open = next.match(HEAD_OPEN_RE);
  if (!open || open.index == null) return html;
  let pos = open.index + open[0].length;
  const charset = next.slice(pos).match(CHARSET_RE);
  if (charset && charset.index != null) pos += charset.index + charset[0].length;
  const boot = isBallotHtml(rel) ? `${BALLOT_ZIP_BOOT_SCRIPT}\n` : "";
  return `${next.slice(0, pos)}\n${boot}${CONSENT_HEAD_BLOCK}\n${next.slice(pos)}`;
}

export function consentHeadProblems(head: string, html: string, bootExpected = false): string[] {
  const problems: string[] = [];
  const tags = [...head.matchAll(/<script\b[\s\S]*?<\/script>/gi)].map((m) => m[0]);
  const bootAt = tags.findIndex((tag) => tag.includes(BALLOT_ZIP_STORAGE_KEY));
  if (bootExpected) {
    if (bootAt !== 0) problems.push("ballot ZIP boot script is not the first script");
  } else if (bootAt !== -1) {
    problems.push("ballot ZIP boot script on a non-ballot page");
  }
  const first = tags[bootAt === 0 ? 1 : 0] ?? "";
  if (!first.includes("data-mtm-consent-default")) problems.push("first script is not the consent default");
  const adsterraScript = (html.match(SCRIPT_TAG_RE) ?? []).some((t) => /adsterra|highperformanceformat|profitableratecpm/i.test(t));
  if (THIRD_PARTY_AD_RE.test(html) || adsterraScript) problems.push("third-party ad code (Ezoic/Adsterra) present");
  return problems;
}
