import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { VotingDeadlinesTable } from "@/components/ElectionDates";
import { DATES_CHECKED_ON, ELECTION_DATES, MARKER_NOTE } from "@/data/electionDates";
import { SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "2026 voter registration, early voting and mail ballot deadlines by state",
  description:
    "Voter registration, early voting, and mail-ballot deadlines for the November 3, 2026 general election, by state. Each date is tied to an official election-office page, state statute, or Vote.gov. Not an official election website.",
  path: "/voting-deadlines",
});

export default function VotingDeadlinesPage() {
  const rows = STARTER_STATES.map((state) => {
    const dates = ELECTION_DATES.find((entry) => entry.code === state.code);
    if (!dates) {
      throw new Error(`Missing election dates for ${state.code}`);
    }
    return { state, dates };
  });

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Voting deadlines", path: "/voting-deadlines" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Voting deadlines" }]} />
      <PageHeader
        eyebrow={SITE.electionDayLong}
        title="2026 voter registration, early voting and mail ballot deadlines by state"
        lede="Registration, early voting, and mail-ballot dates for the 12 states on this site. Each date is paraphrased from a state election office page, a state statute, or Vote.gov, linked in the same cell. Items from a single county board are labeled as county-only."
      />
      <OfficialNotice compact />
      <p className="max-w-3xl text-sm leading-6 text-ink-muted">
        Each date was last checked against the linked official page or statute on{" "}
        {DATES_CHECKED_ON}. Dates can change. The linked official page is the current source.
        County voting hours vary, so this table stays with statewide dates or says when a
        figure comes from one county board. {MARKER_NOTE} A field this site could not verify
        names the official office and does not guess a date.
      </p>
      <nav aria-label="States on this page" className="rounded-xl border border-line bg-paper-card p-4">
        <p className="text-sm font-semibold">States</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {rows.map(({ state }) => (
            <li key={state.code}>
              <a className="text-navy hover:underline" href={`#${state.code}`}>
                {state.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <VotingDeadlinesTable rows={rows} />
      <p className="text-sm">
        <Link className="font-medium text-navy hover:underline" href="/">
          Back to the homepage
        </Link>
      </p>
    </div>
  );
}
