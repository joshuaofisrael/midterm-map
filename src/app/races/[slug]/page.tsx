import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CandidateCard } from "@/components/CandidateCard";
import { CrossLinks } from "@/components/CrossLinks";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { PollTable } from "@/components/PollTable";
import { ShareLink } from "@/components/ShareLink";
import { SourceList } from "@/components/SourceList";
import { pollsForRace } from "@/data/polls";
import { AGGREGATORS } from "@/data/sources";
import { getRace, RACES, racesForState } from "@/data/races";
import { getState } from "@/data/states";
import { chamberLabel, faqJsonLd, ratingTone } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return RACES.map((race) => ({ slug: race.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const race = getRace(slug);
  if (!race) return {};
  const names = race.candidates.map((candidate) => candidate.name).join(" vs. ");
  return pageMetadata({
    title: race.title,
    description: `${race.overview} ${names ? `Candidates include ${names}.` : ""} Informational only. Not an endorsement.`,
    path: `/races/${race.slug}`,
  });
}

export default async function RacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const race = getRace(slug);
  if (!race) notFound();
  const state = getState(race.state);
  const polls = pollsForRace(race.slug);
  const siblings = racesForState(race.state).filter((item) => item.slug !== race.slug);

  return (
    <div className="space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Races", path: "/races" },
            { name: race.shortTitle, path: `/races/${race.slug}` },
          ]),
          faqJsonLd(race.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/races", label: "Races" },
          { label: race.shortTitle },
        ]}
      />
      <PageHeader eyebrow={chamberLabel(race.chamber)} title={race.title} lede={race.overview}>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {race.ratings.map((rating) => (
            <a
              key={`${rating.outlet}-${rating.tier}`}
              href={rating.url}
              rel="noopener noreferrer"
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold hover:underline ${ratingTone(rating.tier)}`}
            >
              {rating.outlet}: {rating.tier} ({rating.asOf})
            </a>
          ))}
          <ShareLink title={race.title} />
        </div>
      </PageHeader>
      <OfficialNotice compact />

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="space-y-8">
          <section className="rounded-xl border border-line bg-paper-card p-5">
            <h2 className="font-serif text-xl font-semibold">What this office is</h2>
            <p className="mt-2 leading-7">{race.officeExplainer}</p>
          </section>
          <section className="rounded-xl border border-line bg-paper-card p-5">
            <h2 className="font-serif text-xl font-semibold">Why it matters in 2026</h2>
            <p className="mt-2 leading-7">{race.whyItMatters}</p>
            {race.incumbentNote && (
              <p className="mt-3 text-sm leading-6 text-ink-muted">{race.incumbentNote}</p>
            )}
            <p className="mt-3 text-sm leading-6 text-ink-muted">{race.howToRead}</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold">Candidates</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Names below are declared or nominated figures reported as of mid-September 2026.
              Party labels identify tickets only. This is not an endorsement and not a certified list.
            </p>
            <div className="mt-4 grid gap-4">
              {race.candidates.map((candidate) => (
                <CandidateCard key={candidate.name} candidate={candidate} />
              ))}
            </div>
          </section>
        </article>
        <aside className="space-y-4">
          <div className="rounded-xl border border-line bg-paper-tint p-5 text-sm leading-6">
            <p className="font-semibold">Related pages</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link className="text-navy hover:underline" href={`/states/${race.state}`}>
                  {state?.name} hub
                </Link>
              </li>
              <li>
                <Link className="text-navy hover:underline" href={`/ballot/${race.state}`}>
                  {state?.name} sample ballot structure
                </Link>
              </li>
              <li>
                <Link className="text-navy hover:underline" href={`/results/${race.slug}`}>
                  Results page for this race
                </Link>
              </li>
              <li>
                <Link className="text-navy hover:underline" href="/polls">
                  Polls and ratings hub
                </Link>
              </li>
              {state && (
                <>
                  <li>
                    <a className="text-navy hover:underline" href={state.officialElectionOffice.href} rel="noopener noreferrer">
                      {state.officialElectionOffice.label}
                    </a>
                  </li>
                  <li>
                    <a className="text-navy hover:underline" href={state.ballotpedia.href} rel="noopener noreferrer">
                      {state.ballotpedia.label}
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
            <p className="font-semibold">Where to check live polls</p>
            <ul className="mt-2 space-y-2">
              {race.aggregatorLinks.map((link) => (
                <li key={link.href}>
                  <a className="text-navy hover:underline" href={link.href} rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <SourceList sources={race.sources} title="Race sources" />
        </aside>
      </div>

      <section id={race.slug}>
        <h2 className="font-serif text-2xl font-semibold">Published polls</h2>
        {polls.length > 0 ? (
          <div className="mt-4">
            <PollTable rows={polls} caption={`Published surveys tagged to ${race.shortTitle}`} showRace={false} />
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
            <p className="font-semibold">No public polls listed yet</p>
            <p className="mt-2 text-ink-muted">
              We have not attached an individual, dated survey we can cite for this race.
              Check aggregator pages rather than treating an empty table as a forecast.
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <a className="text-navy hover:underline" href={AGGREGATORS.rcp.href} rel="noopener noreferrer">
                  {AGGREGATORS.rcp.label}
                </a>
              </li>
              <li>
                <a className="text-navy hover:underline" href={AGGREGATORS.fte.href} rel="noopener noreferrer">
                  {AGGREGATORS.fte.label}
                </a>
              </li>
            </ul>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-xl font-semibold">Questions readers ask</h2>
        <dl className="mt-3 space-y-4">
          {race.faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold">{faq.question}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {siblings.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold">Other {state?.name} guides</h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {siblings.map((item) => (
              <li key={item.slug}>
                <Link className="text-navy hover:underline" href={`/races/${item.slug}`}>
                  {item.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <CrossLinks state={race.state} raceSlug={race.slug} />
    </div>
  );
}
