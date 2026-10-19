import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { liveSourceRows } from "@/components/LivePanel";
import { LiveResults } from "@/components/LiveResults";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { TipJar } from "@/components/TipJar";
import liveSources from "@/data/live-sources.json";
import { POLL_CLOSE } from "@/data/pollClose";
import { SITE, absoluteUrl } from "@/data/site";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "2026 election night results",
  description:
    "Unofficial November 3, 2026 results copied from state election-office files after polls close. No winner is shown unless that office marks the race decided or certified.",
  path: "/live",
});

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "2026 United States general election",
  startDate: "2026-11-03",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Country",
    name: "United States",
  },
  description:
    "General election for federal and state offices on November 3, 2026. Map the Midterms displays figures only after polls close, and only from state election-office files. It does not call winners.",
  url: absoluteUrl("/live"),
  organizer: {
    "@type": "Organization",
    name: SITE.legalName,
    url: absoluteUrl("/"),
  },
};

export default function LivePage() {
  const readable = liveSources.states.filter((state) => state.machineReadable);
  const links = liveSources.states.filter((state) => !state.machineReadable);

  return (
    <div className="space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Live results", path: "/live" },
          ]),
          eventJsonLd,
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Live results" }]} />
      <PageHeader
        eyebrow="Live results"
        title="Election night results"
        lede={`Unofficial figures for the November 3, 2026 general election, copied from state election-office files after polls close. ${SITE.name} does not call a winner. A winner is labeled only when the official file marks that candidate.`}
      />
      <ContentTrust updated={contentUpdatedLabel("/live")} pagePath="/live" />
      <OfficialNotice />

      <section className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">How to read this page</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Nothing is shown for a state until its polls have closed.</li>
          <li>Vote totals and percents are the figures in the official file. A percent is left blank when the file does not include one.</li>
          <li>The page says “Unofficial results” until the file itself says the results are official.</li>
          <li>If a check fails, the last file that loaded stays on the page with its time and a link to the official site.</li>
          <li>
            A job checks the official files every 10 minutes on November 3 and 4, 2026, and on later days through December 15 while counting continues. This page checks that copy about once a minute.
          </li>
        </ul>
        <p className="mt-3">
          <Link className="font-medium text-navy underline" href="/results">
            Results tracker
          </Link>
          {" · "}
          <Link className="font-medium text-navy underline" href="/races">
            Race guides
          </Link>
        </p>
      </section>

      <EmailSignup prominent />

      <LiveResults sources={liveSourceRows()} />

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-xl font-semibold">Official sources</h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          Checked October 18, 2026. {readable.length} offices publish a public results file this site can read when they post the general election. {links.length} offices are a link to the official results page.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">State election-night results sources</caption>
            <thead className="text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th scope="col" className="py-2 pr-4">State</th>
                <th scope="col" className="py-2 pr-4">Polls close</th>
                <th scope="col" className="py-2 pr-4">File</th>
                <th scope="col" className="py-2">Official page</th>
              </tr>
            </thead>
            <tbody>
              {liveSources.states.map((state) => {
                const close = POLL_CLOSE.find((row) => row.code === state.code);
                return (
                  <tr key={state.code} className="border-t border-line align-top">
                    <th scope="row" className="py-2 pr-4 font-medium">{state.name}</th>
                    <td className="py-2 pr-4">{close?.closeLabel}</td>
                    <td className="py-2 pr-4">{state.machineReadable ? state.format : "Link only"}</td>
                    <td className="py-2">
                      <a className="text-navy underline" href={state.resultsUrl} rel="noopener noreferrer">
                        {state.resultsLabel}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <TipJar />
    </div>
  );
}
