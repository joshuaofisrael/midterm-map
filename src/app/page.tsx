import Link from "next/link";
import { BallotLookup } from "@/components/BallotLookup";
import { OfficialNotice } from "@/components/OfficialNotice";
import { RaceCard } from "@/components/RaceCard";
import { featuredRaces } from "@/data/races";
import { SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

const CTAS = [
  {
    href: "/ballot",
    title: "Ballot lookup",
    body: "Enter a ZIP or starter state for a structured sample-ballot sketch. Confirm the official version with your election office.",
  },
  {
    href: "/races",
    title: "Race guides",
    body: "Senate, governor, and House pages with sourced candidate names, short bios, and outbound citations.",
  },
  {
    href: "/polls",
    title: "Polls & ratings",
    body: "Published surveys with pollster, dates, sample, and source links. Ratings appear only when a named outlet is cited.",
  },
  {
    href: "/results",
    title: "Results tracker",
    body: "House and Senate control meters and key-race pages. Awaiting unofficial returns until November 3, 2026.",
  },
];

export default function HomePage() {
  const featured = featuredRaces();

  return (
    <div className="space-y-14">
      <section className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
            {SITE.electionDayLong}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            One calm map for ballots, races, polls, and returns.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-muted">
            {SITE.name} is a neutral voter information utility for the 2026 U.S.
            midterms. It is operated by {SITE.legalName}. It is not a government
            site, not a campaign, and not a donation page.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {CTAS.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-deep"
              >
                {cta.title}
              </Link>
            ))}
          </div>
        </div>
        <OfficialNotice />
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Find a starter sample ballot</h2>
        <p className="mt-2 max-w-2xl text-ink-muted">
          ZIP matching runs in your browser. We do not collect Social Security
          numbers, voter registration numbers, or ballot images.
        </p>
        <div className="mt-4">
          <BallotLookup />
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Four ways into the hub</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {CTAS.map((cta) => (
            <article key={cta.href} className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
              <h3 className="font-serif text-xl font-semibold">
                <Link className="hover:text-navy" href={cta.href}>
                  {cta.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{cta.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="font-serif text-2xl font-semibold">Featured race guides</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Battleground Senate and governor pages with sourced names, bios, and citations.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((race) => (
            <RaceCard key={race.slug} race={race} />
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link className="font-medium text-navy hover:underline" href="/races">
            All race guides
          </Link>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">State hubs</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Twelve states: Arizona, Georgia, Michigan, North Carolina, Nevada, Ohio,
          Pennsylvania, Wisconsin, Texas, Florida, California, and New York.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STARTER_STATES.map((state) => (
            <li key={state.code} className="rounded-xl border border-line bg-paper-card p-4">
              <Link className="font-serif text-lg font-semibold hover:text-navy" href={`/states/${state.code}`}>
                {state.name}
              </Link>
              <p className="mt-1 text-sm text-ink-muted">{state.summary}</p>
              <div className="mt-3 flex gap-3 text-sm">
                <Link className="text-navy hover:underline" href={`/ballot/${state.code}`}>
                  Sample ballot
                </Link>
                <Link className="text-navy hover:underline" href={`/states/${state.code}`}>
                  Hub
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
