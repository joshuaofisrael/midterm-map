import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { DemoBadge } from "@/components/DemoBadge";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { getRace, RACES } from "@/data/races";
import { isPreElection, resultShellForRace } from "@/data/results";
import { SITE } from "@/data/site";
import { getState } from "@/data/states";
import { chamberLabel, partyTone } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return RACES.map((race) => ({ slug: race.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const race = getRace(slug);
  if (!race) return {};
  return pageMetadata({
    title: `Unofficial returns — ${race.shortTitle}`,
    description: `Results shell for ${race.title}. Returns are unofficial until certified by election authorities. ${SITE.name} does not certify results.`,
    path: `/results/${race.slug}`,
  });
}

export default async function RaceResultPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const race = getRace(slug);
  if (!race) notFound();
  const state = getState(race.state);
  const shell = resultShellForRace(race.slug);
  const preElection = isPreElection();

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Results", path: "/results" },
          { name: race.shortTitle, path: `/results/${race.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/results", label: "Results" },
          { label: race.shortTitle },
        ]}
      />
      <PageHeader
        eyebrow={`${chamberLabel(race.chamber)} · Results`}
        title={race.title}
        lede="Per-race returns template. This page will never be labeled as certified results. Certification is a government function."
      />
      <OfficialNotice />

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-xl font-semibold">
            {preElection ? "Awaiting unofficial returns" : "Unofficial returns"}
          </h2>
          <DemoBadge>Not certified</DemoBadge>
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-muted">{shell.reportingNote}</p>
        <table className="mt-4 min-w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="py-2 pr-4">Candidate line</th>
              <th className="py-2 pr-4">Party</th>
              <th className="py-2 pr-4">Votes</th>
              <th className="py-2">Percent</th>
            </tr>
          </thead>
          <tbody>
            {shell.lines.map((line) => (
              <tr key={line.candidateLabel} className="border-t border-line">
                <td className={`py-2.5 pr-4 font-medium ${partyTone(line.party)}`}>
                  {line.candidateLabel}
                  <div className="text-xs font-normal text-demo">Demo placeholder</div>
                </td>
                <td className="py-2.5 pr-4">{line.party}</td>
                <td className="py-2.5 pr-4 tabular-nums">{line.votes ?? "—"}</td>
                <td className="py-2.5 tabular-nums">{line.percent ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="text-sm">
        <Link className="font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
          Race guide
        </Link>
        {" · "}
        <Link className="font-medium text-navy hover:underline" href={`/ballot/${race.state}`}>
          {state?.name} sample ballot
        </Link>
        {" · "}
        <Link className="font-medium text-navy hover:underline" href="/polls">
          Polls
        </Link>
      </p>
      <CrossLinks state={race.state} raceSlug={race.slug} />
    </div>
  );
}
