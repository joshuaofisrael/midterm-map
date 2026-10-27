/**
 * House ads for our own sites. One card per page, chosen at build time.
 * Copy is limited to offers stated on namedscan.com, taxdeedpack.com, and
 * rankfootprint.com. No rankings promises, testimonials, or invented figures.
 *
 * Buckets are FNV-1a of the normalized path, modulo 5:
 * 0–2 NamedScan (60%), 3 Tax Deed Pack (20%), 4 RankFootprint (20%).
 */

export type HouseAdId = "namedscan" | "taxdeedpack" | "rankfootprint";

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

function offerUrl(host: string, campaign: HouseAdId): string {
  return `https://${host}/?${UTM}&utm_campaign=${campaign}`;
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
    href: offerUrl("namedscan.com", "namedscan"),
  },
  taxdeedpack: {
    id: "taxdeedpack",
    siteName: "Tax Deed Pack",
    label: "Sponsored by Tax Deed Pack",
    headline: "Tax deed research for one property",
    pitch:
      "Get a $149 research PDF for one tax-deed property: public records, raw sold comps, and a zoning, flood, and use checklist. It is not an appraisal, a title search, or a recommended bid.",
    cta: "Get the $149 pack",
    href: offerUrl("taxdeedpack.com", "taxdeedpack"),
  },
  rankfootprint: {
    id: "rankfootprint",
    siteName: "RankFootprint",
    label: "Sponsored by RankFootprint",
    headline: "Your Google Maps rank, block by block",
    pitch:
      "See the Google Maps rank at each point on a grid around your business. A free scan is 3×3, and RankFootprint is not affiliated with Google.",
    cta: "Start a free grid scan",
    href: offerUrl("rankfootprint.com", "rankfootprint"),
  },
};

/** Three NamedScan buckets, then one each of the alternates. */
const BUCKETS: readonly HouseAdId[] = [
  "namedscan",
  "namedscan",
  "namedscan",
  "taxdeedpack",
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
  const id = BUCKETS[houseAdHash(path) % BUCKETS.length];
  return HOUSE_ADS[id];
}
