import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { VotingDeadlinesTable } from "@/components/ElectionDates";
import { DEADLINE_ONLY_STATES, ELECTION_DATES, MARKER_NOTE, stateKeyDatesHref } from "@/data/electionDates";
import { SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "2026 voter registration, early voting and mail ballot deadlines by state",
  description: `Voter registration, early voting, and mail-ballot deadlines for the November 3, 2026 general election in ${ELECTION_DATES.length} states. Each date is tied to an official election-office page, state statute, or Vote.gov. Not an official election website.`,
  path: "/voting-deadlines",
});

export default function VotingDeadlinesPage() {
  const rows = ELECTION_DATES.map((dates) => {
    const state = STARTER_STATES.find((item) => item.code === dates.code);
    const extra = DEADLINE_ONLY_STATES.find((item) => item.code === dates.code);
    const name = state?.name ?? extra?.name;
    if (!name) {
      throw new Error(`Missing display name for ${dates.code}`);
    }
    return {
      code: dates.code,
      name,
      hubHref: state ? stateKeyDatesHref(state.code) : undefined,
      dates,
    };
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
        lede={`Registration, early voting, and mail-ballot dates for ${rows.length} states. Each date is paraphrased from a state election office page, a state statute, or Vote.gov, linked in the same cell. Items from a single county board are labeled as county-only.`}
      />
      <OfficialNotice compact />
      <p className="max-w-3xl text-sm leading-6 text-ink-muted">
        The date under each state name is the day those lines were checked against the linked
        official page or statute. A line that prints its own date was not rechecked with the
        rest of that state. Dates can change. The linked official page is the current source.
        County voting hours vary, so this table stays with statewide dates or says when a
        figure comes from one county board. {MARKER_NOTE} A field this site could not verify
        names the official office and does not guess a date.
      </p>
      <nav aria-label="States on this page" className="rounded-xl border border-line bg-paper-card p-4">
        <p className="text-sm font-semibold">States</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {rows.map(({ code, name }) => (
            <li key={code}>
              <a className="text-navy hover:underline" href={`#${code}`}>
                {name}
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
