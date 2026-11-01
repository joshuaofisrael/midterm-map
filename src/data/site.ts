const DEFAULT_SITE_URL = "https://mapthemidterms.com";

function publicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

export const SITE = {
  name: "Map the Midterms",
  tagline: "A voter information utility for the 2026 U.S. midterms",
  description:
    "Sourced 2026 U.S. midterm voter information: sample-ballot sketches, race guides, polls, key dates, and a results tracker. Not an official election website.",
  url: publicSiteUrl(),
  electionDayLabel: "Tuesday, November 3, 2026",
  electionDayIso: "2026-11-03",
  electionDayLong: "Election Day is Tuesday, November 3, 2026",
  /** Shared with the banner, footer, and trust line. Matches the disclaimer. */
  notAffiliated: "Not affiliated with any government or election authority.",
  officialNotUs:
    "Not an official election website. Not affiliated with any government or election authority. Verify ballot and voting details with your state or county election office.",
  verifyShort:
    "This is not an official government, secretary of state, or county election site, and it is not affiliated with any government or election authority. Confirm your sample ballot, districts, and voting rules with your state or county election office.",
  lastUpdated: "October 6, 2026",
  /** Last substantive change to /disclaimer. Change only when that page changes. */
  legalLastUpdated: "October 24, 2026",
  /** Last substantive change to /terms and /copyright. Change only when those pages change. */
  policyLastUpdated: "October 24, 2026",
  privacyLastUpdated: "October 30, 2026",
  /** Last substantive change to /advertising. Change only when that page changes. */
  advertisingLastUpdated: "October 27, 2026",
  voteGovUrl: "https://www.vote.gov/",
} as const;

/** Footer legal links shared by the main site shell and Census place pages. */
export const FOOTER_LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/copyright", label: "Copyright & Corrections" },
  { href: "/advertising", label: "Advertising" },
  { href: "/contact", label: "Contact" },
] as const;

export const LEGAL_NAV = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/copyright", label: "Copyright & Corrections" },
  { href: "/advertising", label: "Advertising" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const PRIMARY_NAV = [
  { href: "/ballot", label: "Ballot" },
  { href: "/voting-deadlines", label: "Deadlines" },
  { href: "/races", label: "Races" },
  { href: "/polls", label: "Polls" },
  { href: "/results", label: "Results" },
  { href: "https://mapthegeneral.com/us/en/live/", label: "Election night" },
  { href: "/learn", label: "Learn" },
] as const;

/** Report-an-error target. The page path is the `url` query on /contact/. */
export function reportErrorHref(path: string): string {
  const trimmed = path.trim();
  const withSlash = trimmed === "/" ? "/" : `${trimmed.replace(/\/+$/, "")}/`;
  return `/contact/?url=${encodeURIComponent(withSlash)}`;
}

/** Apex canonical URL. Directory routes use a trailing slash for GitHub Pages. */
export function absoluteUrl(path: string = "/"): string {
  const base = SITE.url.replace(/\/+$/, "");
  if (!path || path === "/") {
    return `${base}/`;
  }
  const clean = path.replace(/^\/+|\/+$/g, "");
  return `${base}/${clean}/`;
}
