/**
 * Google AdSense site-verification tags for mapthemidterms.com.
 * AdSense application approved 21 October 2026.
 * The loader also delivers Google's European consent message once that
 * message is published in the AdSense account. Do not gate or delay it.
 * No ad units are placed. ads.txt is not changed here.
 */
export const ADSENSE_CLIENT = "ca-pub-5681559774142917";

export const ADSENSE_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

/** Google’s advertising privacy policy. Linked from the privacy and advertising pages. */
export const GOOGLE_ADS_POLICIES_URL = "https://policies.google.com/technologies/ads";

/** Exact tags required inside <head> of every HTML page, including redirect stubs. */
export const ADSENSE_META_TAG = `<meta name="google-adsense-account" content="${ADSENSE_CLIENT}">`;

export const ADSENSE_LOADER_TAG = `<script async src="${ADSENSE_SCRIPT_SRC}" crossorigin="anonymous"></script>`;

export const ADSENSE_HEAD_TAGS = `${ADSENSE_META_TAG}\n${ADSENSE_LOADER_TAG}`;

/** IAB ads.txt record. The publisher id has no ca- prefix. Keep public/ads.txt identical to this line. */
export const ADS_TXT_LINE = "google.com, pub-5681559774142917, DIRECT, f08c47fec0942fa0";

const HEAD_RE = /<head\b[^>]*>([\s\S]*?)<\/head>/i;
const REFRESH_RE = /http-equiv\s*=\s*["']refresh["']/i;

export function isRedirectStub(html: string): boolean {
  return REFRESH_RE.test(html);
}

/** Real documents have a head. Verification tokens and other non-pages do not. */
export function htmlHead(html: string): string | null {
  const match = html.match(HEAD_RE);
  return match ? match[1] : null;
}

export function headHasAdsense(head: string): boolean {
  return head.includes(ADSENSE_META_TAG) && head.includes(ADSENSE_LOADER_TAG);
}

/**
 * Insert the exact AdSense tags before </head> when they are missing.
 * Includes redirect stubs. Leaves non-documents (no head) unchanged.
 * Strips a mangled copy of the same tags so the exact pair appears once.
 */
export function ensureAdsenseHead(html: string): string {
  if (htmlHead(html) === null) return html;
  if (headHasAdsense(htmlHead(html) ?? "")) return html;
  const stripped = html
    .replace(/<meta\b[^>]*\bgoogle-adsense-account\b[^>]*>\s*/gi, "")
    .replace(/<script\b[^>]*\badsbygoogle\.js\b[^>]*>\s*<\/script>\s*/gi, "");
  return stripped.replace(/<\/head>/i, `${ADSENSE_HEAD_TAGS}\n</head>`);
}
