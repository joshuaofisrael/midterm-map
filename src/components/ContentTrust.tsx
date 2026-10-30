import Link from "next/link";
import { reportErrorHref, SITE } from "@/data/site";

/** Used when a page is not about one state. */
const MULTI_STATE_OFFICE = "https://vote.gov";

/**
 * Page-level trust line. `updated` must be a date already stored for this
 * page's facts. The office link is the election-office URL already used on
 * the page, or Vote.gov when the page is not about one state.
 */
export function ContentTrust({
  updated,
  pagePath,
  officeHref,
  officeLabel,
}: {
  updated: string;
  pagePath: string;
  officeHref?: string;
  officeLabel?: string;
}) {
  const href = officeHref || MULTI_STATE_OFFICE;
  const accessibleName = officeHref ? officeLabel : "Vote.gov";

  return (
    <div className="rounded-lg border border-line bg-paper-card px-4 py-3 text-sm leading-6 text-ink">
      <p>
        <span className="font-semibold">Last updated: {updated}.</span> Unofficial information.{" "}
        {SITE.notAffiliated} Confirm with your{" "}
        <a
          className="font-medium text-navy underline underline-offset-2"
          href={href}
          rel="noopener noreferrer"
        >
          official election office
          {accessibleName ? <span className="sr-only"> ({accessibleName})</span> : null}
        </a>.
      </p>
      <p className="mt-1">
        By the{" "}
        <Link className="font-medium text-navy underline underline-offset-2" href="/about/#editorial">
          {SITE.name} Editorial Team
        </Link>
        {" · "}
        <Link
          className="font-medium text-navy underline underline-offset-2"
          href={reportErrorHref(pagePath)}
        >
          Report an error
        </Link>
      </p>
    </div>
  );
}
