import Link from "next/link";
import { BallotLookup } from "@/components/BallotLookup";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";

export const metadata = pageMetadata({
  title: "Ballot lookup",
  description:
    "Client-side ZIP and state lookup for structured 2026 sample-ballot sections and official election-office links. Not an official ballot. Verify with your state or county election office.",
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
        lede="Enter a ZIP or choose a starter state. Matching stays in your browser. This is a voter information sketch of offices on the 2026 cycle, not your official sample ballot and not a certified list of contests."
      />
      <OfficialNotice />
      <BallotLookup />
      <section>
        <h2 className="font-serif text-2xl font-semibold">Starter states</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          MVP coverage: Arizona, Georgia, Michigan, North Carolina, Nevada, Ohio,
          Pennsylvania, Wisconsin, Texas, Florida, California, and New York.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STARTER_STATES.map((state) => (
            <li key={state.code} className="rounded-xl border border-line bg-paper-card p-4">
              <Link className="font-serif text-lg font-semibold hover:text-navy" href={`/ballot/${state.code}`}>
                {state.name} sample ballot
              </Link>
              <p className="mt-1 text-sm text-ink-muted">
                Official office: {state.officialElectionOffice.label}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <p className="text-sm text-ink-muted">
        Need the federal starting point?{" "}
        <a className="text-navy underline" href={SITE.voteGovUrl} rel="noopener noreferrer">
          Vote.gov
        </a>{" "}
        links to official state registration and election information.
      </p>
      <CrossLinks />
    </div>
  );
}
