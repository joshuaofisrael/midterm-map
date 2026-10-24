import Link from "next/link";
import { BallotLookup } from "@/components/BallotLookup";
import { CivicImage } from "@/components/CivicImage";
import { ZipPlaceSearchSection } from "@/components/ZipPlaceSearchSection";
import { EmailSignup } from "@/components/EmailSignup";
import { EmbedSnippet } from "@/components/EmbedSnippet";
import { MapTheGeneral } from "@/components/MapTheGeneral";
import { ShareBar } from "@/components/ShareBar";
import { FurtherReading } from "@/components/FurtherReading";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { RaceCard } from "@/components/RaceCard";
import { TipJar } from "@/components/TipJar";
import { ELECTION_DATES } from "@/data/electionDates";
import { HOME_FAQS } from "@/data/homeFaqs";
import { featuredRaces } from "@/data/races";
import { SITE } from "@/data/site";
import { STARTER_STATES } from "@/data/states";
import { VISUALS } from "@/data/visuals";
import { faqJsonLd } from "@/lib/format";
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
    body: "Enter a ZIP or starter state for a structured sample-ballot sketch, with links to each state’s official election office.",
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
    href: "/live",
    title: "Election night",
    body: "Unofficial figures from each state’s election-office file after polls close. No projections and no winner calls.",
  },
  {
    href: "/results",
    title: "Key races",
    body: "Senate, governor, and House contests for November 3, 2026, with the official source named on each page. Awaiting unofficial returns.",
  },
  {
    href: "/voting-deadlines",
    title: "Voting deadlines",
    body: `Registration, early voting, and mail-ballot dates for ${ELECTION_DATES.length} states, each tied to an official election-office page.`,
  },
];

export default function HomePage() {
  const featured = featuredRaces();

  return (
    <div className="space-y-14">
      <JsonLd data={faqJsonLd(HOME_FAQS)} />
      <section className="overflow-hidden rounded-2xl border border-navy-deep bg-navy-deep text-white shadow-card">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="order-2 px-5 py-8 sm:px-8 sm:py-10 lg:order-1 lg:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-soft">
              {SITE.electionDayLong}
            </p>
            <h1 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              One calm map for ballots, races, polls, and returns.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-white/85">
              {SITE.name} is a neutral voter information utility for the 2026 U.S.
              midterms. It is not a government site, not a campaign, and does not
              accept political contributions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {CTAS.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-navy-soft"
                >
                  {cta.title}
                </Link>
              ))}
            </div>
          </div>
          <CivicImage asset={VISUALS.pollingPlace} priority className="order-1 lg:order-2" />
        </div>
      </section>
      <OfficialNotice />
      <ShareBar path="/" title={SITE.name} />
      <MapTheGeneral />

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

      <ZipPlaceSearchSection />

      <section>
        <h2 className="font-serif text-2xl font-semibold">Where to start</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {CTAS.map((cta) => (
            <article key={cta.href} className="rounded-xl border border-line border-t-4 border-t-navy bg-paper-card p-5 shadow-card">
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
          All 50 states and the District of Columbia. Each card links to that state’s election office and November 3, 2026 ballot facts.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STARTER_STATES.map((state) => (
            <li key={state.code} className="rounded-xl border border-line border-t-4 border-t-navy bg-paper-card p-4 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-navy">{state.code}</p>
              <Link className="mt-1 block font-serif text-lg font-semibold hover:text-navy" href={`/states/${state.code}`}>
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
        <p className="mt-5 text-sm">
          <Link className="font-medium text-navy hover:underline" href="/cities">
            Census places
          </Link>
          <span className="text-ink-muted">
            {" "}
            — incorporated places and census-designated places from the U.S. Census Bureau 2026
            Gazetteer Files, with a page for each place.
          </span>
        </p>
      </section>

      <section className="grid items-center gap-0 overflow-hidden rounded-2xl border border-line bg-paper-card shadow-card md:grid-cols-2">
        <CivicImage asset={VISUALS.pollingSign} />
        <div className="p-5 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold">A polling place, not a campaign</h2>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            Photographs on this site are generic scenes of voting places and civic buildings.
            They are not pictures of a particular precinct, a rally, or a result. Your polling
            place is assigned by your state or county election office.
          </p>
          <p className="mt-4 text-sm">
            <Link className="font-medium text-navy hover:underline" href="/ballot">
              Find a sample-ballot sketch
            </Link>
          </p>
        </div>
      </section>

      <section id="faq" className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
        <h2 className="font-serif text-2xl font-semibold">Questions people ask</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Short answers for first-time visitors. Registration and voting rules are
          published by state and county election offices and by Vote.gov.
        </p>
        <dl className="mt-5 space-y-5">
          {HOME_FAQS.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold">{faq.question}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm">
          <Link className="font-medium text-navy hover:underline" href="/voting-deadlines">
            Key 2026 dates for {ELECTION_DATES.length} states
          </Link>
          {" · "}
          <Link className="font-medium text-navy hover:underline" href="/ballot">
            Ballot lookup
          </Link>
          {" · "}
          <a className="font-medium text-navy hover:underline" href={SITE.voteGovUrl} rel="noopener noreferrer">
            Vote.gov
          </a>
        </p>
      </section>

      <EmailSignup />
      <EmbedSnippet />
      <FurtherReading />
      <TipJar />
    </div>
  );
}
