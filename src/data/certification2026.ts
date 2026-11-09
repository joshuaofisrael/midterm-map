/**
 * State certification of 2026 general-election results.
 *
 * CERTIFIED_2026 lists only states whose election authority has published
 * certification of its federal and statewide results, with that source.
 * Leave a state out until its certification is confirmed from the official page.
 *
 * CERT_DEADLINES_2026 lists the statutory or published state-level certification
 * date where it was confirmed from an accessed source (9 Nov 2026). States not
 * listed have no date shown.
 */
export type CertSource = { date: string; label: string; href: string };

export const CERTIFIED_2026: Record<string, CertSource> = {};

const BP = { label: "Ballotpedia — Election results certification dates, 2026", href: "https://ballotpedia.org/Election_results_certification_dates,_2026" };

export const CERT_DEADLINES_2026: Record<string, CertSource> = {
  CA: { date: "2026-12-11", ...BP },
  CO: { date: "2026-11-30", ...BP },
  FL: { date: "2026-11-17", ...BP },
  GA: { date: "2026-11-20", ...BP },
  ID: { date: "2026-11-24", ...BP },
  IL: { date: "2026-12-04", ...BP },
  OK: {
    date: "2026-11-10",
    label: "Oklahoma State Election Board — November General Election",
    href: "https://oklahoma.gov/elections/elections-results/election-results/2026-election-results/november-general-election.html",
  },
  WA: {
    date: "2026-12-03",
    label: "Washington Secretary of State — counting continues after Election Day",
    href: "https://www.sos.wa.gov/about-office/news/2026/washington-election-officials-continue-counting-ballots-verifying-results-after-election-day",
  },
};

export const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", dateStyle: "long" });
