/**
 * House ads for our own sites. One banner per page, chosen at build time.
 * Copy is limited to offers stated on namedscan.com and rankfootprint.com.
 * No rankings promises, testimonials, or invented figures.
 *
 * Buckets are FNV-1a of the normalized path, modulo 5:
 * 0–2 NamedScan (60%), 3–4 RankFootprint (40%).
 * `/` is always NamedScan.
 */

export type HouseAdId = "namedscan" | "rankfootprint";

export type HouseAdOffer = {
  id: HouseAdId;
  siteName: string;
  /** Visible label. Must stay exactly `Sponsored by ${siteName}`. */
  label: string;
  headline: string;
  /** One or two sentences. */
  pitch: string;
  cta: string;
  href: string;
};

const UTM = "utm_source=mapthemidterms&utm_medium=house_ad";

const OFFER_HOST: Record<HouseAdId, string> = {
  namedscan: "namedscan.com",
  rankfootprint: "rankfootprint.com",
};

function offerUrl(id: HouseAdId): string {
  return `https://${OFFER_HOST[id]}/?${UTM}&utm_campaign=${id}`;
}

export const HOUSE_ADS: Record<HouseAdId, HouseAdOffer> = {
  namedscan: {
    id: "namedscan",
    siteName: "NamedScan",
    label: "Sponsored by NamedScan",
    headline: "See if ChatGPT names your business",
    pitch:
      "See whether ChatGPT names your business when people ask which local business to hire. A free preview asks three of those questions with live web search, and the full PDF report is $5.",
    cta: "Try NamedScan",
    href: offerUrl("namedscan"),
  },
  rankfootprint: {
    id: "rankfootprint",
    siteName: "RankFootprint",
    label: "Sponsored by RankFootprint",
    headline: "Your Google Maps rank, block by block",
    pitch:
      "See the Google Maps rank at each point on a grid around your business. A free scan is 3×3, and RankFootprint is not affiliated with Google.",
    cta: "Start a free grid scan",
    href: offerUrl("rankfootprint"),
  },
};

/** Three NamedScan buckets, then two RankFootprint buckets. */
const BUCKETS: readonly HouseAdId[] = [
  "namedscan",
  "namedscan",
  "namedscan",
  "rankfootprint",
  "rankfootprint",
];

/** Site path with no query, hash, index.html, or trailing slash (except `/`). */
export function normalizeHouseAdPath(input: string): string {
  let path = input.trim();
  if (!path.startsWith("/")) path = `/${path}`;
  const cut = path.search(/[?#]/);
  if (cut !== -1) path = path.slice(0, cut);
  if (path.endsWith("/index.html")) path = path.slice(0, -"index.html".length);
  else if (path.endsWith(".html")) path = path.slice(0, -".html".length);
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path || "/";
}

/** FNV-1a 32-bit. Stable across runs; not a cryptographic hash. */
export function houseAdHash(path: string): number {
  const normalized = normalizeHouseAdPath(path);
  let hash = 2166136261;
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function pickHouseAd(path: string): HouseAdOffer {
  const normalized = normalizeHouseAdPath(path);
  if (normalized === "/") return HOUSE_ADS.namedscan;
  const id = BUCKETS[houseAdHash(normalized) % BUCKETS.length];
  return HOUSE_ADS[id];
}
