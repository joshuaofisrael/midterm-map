import Link from "next/link";
import { notFound } from "next/navigation";
import { BallotLookup } from "@/components/BallotLookup";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { DemoBadge } from "@/components/DemoBadge";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { ballotSectionsForState } from "@/data/ballots";
import { racesForState } from "@/data/races";
import { getState, isStateCode, STARTER_STATES } from "@/data/states";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return STARTER_STATES.map((state) => ({ state: state.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  const state = getState(code);
  if (!state) return {};
  return pageMetadata({
    title: `${state.name} sample ballot structure`,
    description: `Structured 2026 sample ballot sections for ${state.name}. Not an official ballot. Verify contests with ${state.officialElectionOffice.label}.`,
    path: `/ballot/${state.code}`,
  });
}

export default async function BallotStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  if (!isStateCode(code)) notFound();
  const state = getState(code);
  if (!state) notFound();

  const sections = ballotSectionsForState(state.code);
  const races = racesForState(state.code);

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Ballot", path: "/ballot" },
          { name: state.name, path: `/ballot/${state.code}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/ballot", label: "Ballot" },
          { label: state.name },
        ]}
      />
      <PageHeader
        eyebrow={`${state.name} · Ballot`}
        title={`${state.name} sample ballot structure`}
        lede="A sectioned sketch of contests that often appear. It is incomplete, may be outdated, and is not a substitute for the sample ballot issued by your county or state election office."
      />
      <OfficialNotice />
      <BallotLookup initialState={state.code} />

      <aside className="rounded-xl border border-line bg-paper-card p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-xl font-semibold">Verify with officials</h2>
          <DemoBadge>Not your official ballot</DemoBadge>
        </div>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
          <li>
            State election office:{" "}
            <a className="text-navy underline" href={state.officialElectionOffice.href} rel="noopener noreferrer">
              {state.officialElectionOffice.label}
            </a>
          </li>
          <li>
            Registration starting point:{" "}
            <a className="text-navy underline" href={state.voteGov.href} rel="noopener noreferrer">
              {state.voteGov.label}
            </a>
          </li>
          <li>{state.registrationNote}</li>
          <li>{state.idNote}</li>
        </ul>
      </aside>

      <div className="space-y-6">
        {sections.map((section) => (
          <section key={section.kind} className="rounded-xl border border-line bg-paper-card p-5">
            <h2 className="font-serif text-2xl font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{section.intro}</p>
            <div className="mt-4 space-y-4">
              {section.contests.map((contest) => (
                <div key={contest.id} className="border-t border-line pt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{contest.heading}</h3>
                    <DemoBadge>Sample section</DemoBadge>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                    {contest.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  {contest.raceSlug && (
                    <p className="mt-2 text-sm">
                      <Link className="text-navy hover:underline" href={`/races/${contest.raceSlug}`}>
                        Open the race guide
                      </Link>
                      {" · "}
                      <Link className="text-navy hover:underline" href={`/results/${contest.raceSlug}`}>
                        Results shell
                      </Link>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section>
        <h2 className="font-serif text-xl font-semibold">Race guides for {state.name}</h2>
        <ul className="mt-3 flex flex-wrap gap-3 text-sm">
          {races.map((race) => (
            <li key={race.slug}>
              <Link className="text-navy hover:underline" href={`/races/${race.slug}`}>
                {race.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          <Link className="font-medium text-navy hover:underline" href={`/states/${state.code}`}>
            Full {state.name} hub
          </Link>
        </p>
      </section>
      <CrossLinks state={state.code} />
    </div>
  );
}
