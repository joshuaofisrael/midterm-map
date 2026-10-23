/**
 * Operating company. Import this from legal pages only.
 * The public header bundle imports site.ts, so these strings stay out of that file.
 */
export const LEGAL = {
  legalName: "Joshua Israel Ventures LLC",
  brandNote:
    "Map the Midterms is a brand of Joshua Israel Ventures LLC. It is only a brand name: it is not a separate company and not a DBA or fictitious name. All business on and through this site is done by Joshua Israel Ventures LLC.",
  /** Exact brand sentence required on the legal pages that state the relationship. */
  brandSentence: "Map the Midterms is a brand of Joshua Israel Ventures LLC.",
  entityType: "Florida limited liability company",
  sunbizDocumentNumber: "L26000261819",
  sunbizStatus: "ACTIVE",
  location: "Miami Beach, FL",
  mailingAddress: "5640 W Maple Rd, Ste 101, West Bloomfield, MI 48322",
} as const;
