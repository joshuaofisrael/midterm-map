import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { CrossLinks } from "@/components/CrossLinks";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import {
  CALENDAR_BASIS_LABEL,
  CALENDAR_CHECKED_ON,
  CALENDAR_DESCRIPTION,
  CALENDAR_TITLE,
  calendarEventsByYear,
} from "@/data/electionCalendar";
import { SITE } from "@/data/site";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: CALENDAR_TITLE,
  description: CALENDAR_DESCRIPTION,
  path: "/calendar",
});

const RELATED = [
  { href: "/", label: "Home" },
  { href: "/results", label: "Results" },
  { href: "/results/2026", label: "2026 results" },
  { href: "/voting-deadlines", label: "2026 voting deadlines" },
  { href: "/learn", label: "Explainers" },
  { href: "/races", label: "Race guides" },
];

export default function ElectionCalendarPage() {
  const groups = calendarEventsByYear();

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Election calendar", path: "/calendar" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Election calendar" }]} />
      <PageHeader
        eyebrow="Election calendar"
        title={CALENDAR_TITLE}
        lede="Specials, 2027 off-year elections, and the 2028 federal general election. Each dated line is tied to a state election office, a statute, or the FEC. A contest without a posted date is marked not yet announced."
      />
      <ContentTrust updated={contentUpdatedLabel("/calendar")} pagePath="/calendar" />
      <OfficialNotice compact />
      <div className="max-w-3xl space-y-3 text-sm leading-6 text-ink-muted">
        <p>
          Sources were read on {CALENDAR_CHECKED_ON}. A regular federal general election falls in
          even-numbered years under{" "}
          <a className="font-medium text-navy hover:underline" href="https://www.govinfo.gov/content/pkg/USCODE-2023-title2/html/USCODE-2023-title2-chap1-sec7.htm" rel="noopener noreferrer">
            2 U.S.C. § 7
          </a>
          . November 2, 2027 is a state election day where a state calendar prints it. It is not the
          next regular federal general election. The FEC Election Dates page, read the same day,
          does not yet list 2028 presidential primary dates. State primary dates are not filled in
          from that gap. Virginia&apos;s own schedule is quoted where it prints a date.
        </p>
        <p>
          Confirm registration and voting rules with the state election office or{" "}
          <a className="font-medium text-navy hover:underline" href={SITE.voteGovUrl} rel="noopener noreferrer">
            Vote.gov
          </a>
          . The National Association of Secretaries of State publishes{" "}
          <a className="font-medium text-navy hover:underline" href="https://www.nass.org/can-i-vote" rel="noopener noreferrer">
            Can I Vote
          </a>
          , which links to state election websites.
        </p>
      </div>
      <nav aria-label="Years on this page" className="rounded-xl border border-line bg-paper-card p-4">
        <p className="text-sm font-semibold">On this page</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {groups.map((group) => (
            <li key={group.year}>
              <a className="text-navy hover:underline" href={`#year-${group.year}`}>
                {group.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {groups.map((group) => (
        <section key={group.year} id={`year-${group.year}`} className="scroll-mt-6">
          <h2 className="font-serif text-2xl font-semibold">{group.heading}</h2>
          <ol className="mt-4 space-y-4">
            {group.events.map((event) => (
              <li key={event.id} id={event.id} className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy">
                  {CALENDAR_BASIS_LABEL[event.basis]}
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold">
                  {event.iso ? <time dateTime={event.iso}>{event.dateLabel}</time> : event.dateLabel}
                </h3>
                <p className="mt-1 text-sm font-semibold">
                  {event.jurisdiction}
                  <span aria-hidden="true"> · </span>
                  {event.office}
                </p>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{event.detail}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {event.sources.map((source) => (
                    <li key={source.href}>
                      <a className="font-medium text-navy hover:underline" href={source.href} rel="noopener noreferrer">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      ))}
      <EmailSignup />
      <CrossLinks omitHref="/calendar" />
      <nav aria-label="Related pages" className="text-sm">
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {RELATED.map((link) => (
            <li key={link.href}>
              <Link className="font-medium text-navy hover:underline" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
