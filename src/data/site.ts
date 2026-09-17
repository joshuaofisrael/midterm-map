const DEFAULT_SITE_URL = "https://mapthemidterms.com";

function publicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

export const SITE = {
  name: "Map the Midterms",
  tagline: "A voter information utility for the 2026 U.S. midterms",
  description:
    "Ballot lookup, race guides, poll tables, and a results tracker shell for the Tuesday, November 3, 2026 U.S. midterm elections. Informational only. Not an official election website.",
  url: publicSiteUrl(),
  brandNote:
    "Map the Midterms is an unfiled brand / service name of Joshua Israel Ventures LLC. It is not a separate company and is not claimed here as a filed DBA or trademark.",
  legalName: "Joshua Israel Ventures LLC",
  entityType: "Florida limited liability company",
  sunbizDocumentNumber: "L26000261819",
  sunbizStatus: "ACTIVE",
  email: "joshuaofisrael@gmail.com",
  emailSubject: "[Contact: Map the Midterms]",
  location: "Miami Beach, FL",
  electionDayLabel: "Tuesday, November 3, 2026",
  electionDayIso: "2026-11-03",
  electionDayLong: "Election Day is Tuesday, November 3, 2026",
  officialNotUs:
    "Not an official election website. Verify ballot and voting details with your state or county election office.",
  verifyShort:
    "This is not an official government, secretary of state, or county election site. Confirm your sample ballot, districts, and voting rules with your state or county election office.",
  lastUpdated: "September 17, 2026",
  voteGovUrl: "https://www.vote.gov/",
} as const;

export const LEGAL_NAV = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/about", label: "About" },
] as const;

export const PRIMARY_NAV = [
  { href: "/ballot", label: "Ballot" },
  { href: "/races", label: "Races" },
  { href: "/polls", label: "Polls" },
  { href: "/results", label: "Results" },
] as const;

export function contactMailto(): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(SITE.emailSubject)}`;
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
