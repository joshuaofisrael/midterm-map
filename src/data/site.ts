export const SITE = {
  name: "Midterm Map",
  tagline: "A voter information utility for the 2026 U.S. midterms",
  description:
    "Ballot lookup, race guides, poll tables, and a results tracker shell for the Tuesday, November 3, 2026 U.S. midterm elections. Informational only. Not an official election website.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://midtermmap.com",
  brandNote:
    "Midterm Map is an unfiled brand / service name of Joshua Israel Ventures LLC. It is not a separate company and is not claimed here as a filed DBA or trademark.",
  legalName: "Joshua Israel Ventures LLC",
  entityType: "Florida limited liability company",
  sunbizDocumentNumber: "L26000261819",
  sunbizStatus: "ACTIVE",
  email: "joshuaofisrael@gmail.com",
  emailSubject: "[Contact: Midterm Map]",
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
