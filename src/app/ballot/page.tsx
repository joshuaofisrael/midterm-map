import Link from "next/link";
import { BallotLookup } from "@/components/BallotLookup";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

/** Prints “General Election - November 3, 2026”. Checked October 7, 2026. */
const ELECTION_DAY_SOURCE = {
  label: "California Secretary of State — General Election, November 3, 2026",
  href: "https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2026",
};

/** Sets congressional elections for the Tuesday after the first Monday in November. */
const ELECTION_DAY_STATUTE = {
  label: "2 U.S.C. § 7 — time of election",
  href: "https://www.govinfo.gov/content/pkg/USCODE-2023-title2/html/USCODE-2023-title2-chap1-sec7.htm",
};

export const metadata = pageMetadata({
  title: "2026 ballot lookup",
  description:
    "Look up a 2026 sample-ballot sketch by ZIP or starter state, with links to official election offices, Vote.gov, and key voting deadlines. Not an official ballot.",
  path: "/ballot",
});

export default function BallotIndexPage() {
  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Ballot", path: "/ballot" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Ballot" }]} />
      <PageHeader
        eyebrow="Ballot"
        title="Look up a structured sample ballot"
        lede="Enter a ZIP or choose a starter state. Matching stays in your browser. This is a voter information sketch of offices on the 2026 cycle, not an official sample ballot and not a certified list of contests."
      />
      <OfficialNotice />
      <div id="ballot-lookup">
        <BallotLookup />
      </div>
      <section className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-xl font-semibold">Election Day 2026</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
          {SITE.electionDayLong}. The California Secretary of State titles its general-election
          page for that date.{" "}
          <a className="font-medium text-navy underline" href={ELECTION_DAY_STATUTE.href} rel="noopener noreferrer">
            {ELECTION_DAY_STATUTE.label}
          </a>{" "}
          sets the congressional election for the Tuesday after the first Monday in November.
        </p>
        <p className="mt-3 text-sm leading-6">
          <a className="font-medium text-navy underline" href={ELECTION_DAY_SOURCE.href} rel="noopener noreferrer">
            {ELECTION_DAY_SOURCE.label}
          </a>
        </p>
        <p className="mt-4 text-sm leading-6">
          <Link className="font-medium text-navy underline" href="/voting-deadlines">
            Key 2026 registration, early-voting, and mail-ballot dates for 12 states
          </Link>
          {" · "}
          <a className="font-medium text-navy underline" href={SITE.voteGovUrl} rel="noopener noreferrer">
            Vote.gov
          </a>
        </p>
      </section>
      <section id="starter-states">
        <h2 className="font-serif text-2xl font-semibold">Starter states</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          MVP coverage: Arizona, Georgia, Michigan, North Carolina, Nevada, Ohio,
          Pennsylvania, Wisconsin, Texas, Florida, California, and New York. Each card
          links to that state’s official election office.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STARTER_STATES.map((state) => (
            <li key={state.code} className="rounded-xl border border-line bg-paper-card p-4">
              <Link className="font-serif text-lg font-semibold hover:text-navy" href={`/ballot/${state.code}`}>
                {state.name} sample ballot
              </Link>
              <p className="mt-1 text-sm text-ink-muted">
                Official office:{" "}
                <a
                  className="text-navy underline"
                  href={state.officialElectionOffice.href}
                  rel="noopener noreferrer"
                >
                  {state.officialElectionOffice.label}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>
      <CrossLinks />
    </div>
  );
}
