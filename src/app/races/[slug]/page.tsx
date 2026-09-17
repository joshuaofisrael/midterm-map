import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { DemoBadge } from "@/components/DemoBadge";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { PollTable } from "@/components/PollTable";
import { ShareLink } from "@/components/ShareLink";
import { pollsForRace } from "@/data/polls";
import { getRace, RACES, racesForState } from "@/data/races";
import { getState } from "@/data/states";
import { chamberLabel, partyTone, ratingTone } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return RACES.map((race) => ({ slug: race.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const race = getRace(slug);
  if (!race) return {};
  return pageMetadata({
    title: race.title,
    description: `${race.overview} Informational only. Not an endorsement.`,
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
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Races", path: "/races" },
          { name: race.shortTitle, path: `/races/${race.slug}` },
        ])}
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
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ratingTone(race.rating)}`}>
            {race.rating}
          </span>
          <DemoBadge>Editorial demo rating</DemoBadge>
          <ShareLink title={race.title} />
        </div>
      </PageHeader>
      <OfficialNotice compact />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="space-y-5 rounded-xl border border-line bg-paper-card p-5">
          <section>
            <h2 className="font-serif text-xl font-semibold">What this office is</h2>
            <p className="mt-2 leading-7">{race.whatIsOnTheLine}</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-semibold">How to read this page</h2>
            <p className="mt-2 leading-7">{race.howToRead}</p>
            {race.currentOfficeholderNote && (
              <p className="mt-3 text-sm leading-6 text-ink-muted">{race.currentOfficeholderNote}</p>
            )}
            <p className="mt-3 text-sm leading-6 text-ink-muted">{race.ratingNote}</p>
          </section>
          <section>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-xl font-semibold">Candidate lines</h2>
              <DemoBadge>Placeholder</DemoBadge>
            </div>
            <ul className="mt-3 divide-y divide-line">
              {race.candidates.map((candidate) => (
                <li key={candidate.label} className="py-3">
                  <p className={`font-semibold ${partyTone(candidate.party)}`}>{candidate.label}</p>
                  <p className="text-sm text-ink-muted">{candidate.partyLabel} · {candidate.note}</p>
                </li>
              ))}
            </ul>
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
                  {state?.name} sample ballot
                </Link>
              </li>
              <li>
                <Link className="text-navy hover:underline" href={`/results/${race.slug}`}>
                  Results shell for this race
                </Link>
              </li>
              <li>
                <Link className="text-navy hover:underline" href="/polls">
                  Polls and ratings hub
                </Link>
              </li>
              {state && (
                <li>
                  <a className="text-navy hover:underline" href={state.officialElectionOffice.href} rel="noopener noreferrer">
                    {state.officialElectionOffice.label}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      {polls.length > 0 && (
        <section id={race.slug}>
          <PollTable rows={polls} caption={`Demo polls tagged to ${race.shortTitle}`} showRace={false} />
        </section>
      )}

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
