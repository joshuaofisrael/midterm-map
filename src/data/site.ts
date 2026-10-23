const DEFAULT_SITE_URL = "https://mapthemidterms.com";

function publicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

export const SITE = {
  name: "Map the Midterms",
  tagline: "A voter information utility for the 2026 U.S. midterms",
  description:
    "Sourced 2026 U.S. midterm voter information: sample-ballot sketches, Senate and governor race guides, published polls, key general-election dates, and a results tracker. Informational only. Not an official election website.",
  url: publicSiteUrl(),
  brandNote:
    "Map the Midterms is a brand of Joshua Israel Ventures LLC. It is only a brand name: it is not a separate company and not a DBA or fictitious name. All business on and through this site is done by Joshua Israel Ventures LLC.",
  /** Exact brand sentence required by the owner (About page). */
  brandSentence: "Map the Midterms is a brand of Joshua Israel Ventures LLC.",
  legalName: "Joshua Israel Ventures LLC",
  entityType: "Florida limited liability company",
  sunbizDocumentNumber: "L26000261819",
  sunbizStatus: "ACTIVE",
  location: "Miami Beach, FL",
  electionDayLabel: "Tuesday, November 3, 2026",
  electionDayIso: "2026-11-03",
  electionDayLong: "Election Day is Tuesday, November 3, 2026",
  officialNotUs:
    "Not an official election website. Verify ballot and voting details with your state or county election office.",
  verifyShort:
    "This is not an official government, secretary of state, or county election site. Confirm your sample ballot, districts, and voting rules with your state or county election office.",
  lastUpdated: "October 6, 2026",
  /** Last substantive change to /disclaimer. Change only when that page changes. */
  legalLastUpdated: "October 23, 2026",
  /** Last substantive change to /terms. Change only when that page changes. */
  policyLastUpdated: "October 23, 2026",
  privacyLastUpdated: "October 23, 2026",
  mailingAddress: "5640 W Maple Rd, Ste 101, West Bloomfield, MI 48322",
  voteGovUrl: "https://www.vote.gov/",
} as const;

/** Footer legal links shared by the main site shell and Census place pages. */
export const FOOTER_LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact" },
] as const;

export const LEGAL_NAV = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const PRIMARY_NAV = [
  { href: "/ballot", label: "Ballot" },
  { href: "/voting-deadlines", label: "Deadlines" },
  { href: "/races", label: "Races" },
  { href: "/polls", label: "Polls" },
  { href: "/results", label: "Results" },
  { href: "/live", label: "Live" },
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
