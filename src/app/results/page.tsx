import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ControlMeter } from "@/components/ControlMeter";
import { CrossLinks } from "@/components/CrossLinks";
import { DemoBadge } from "@/components/DemoBadge";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { getRace } from "@/data/races";
import { HOUSE_METER, isPreElection, KEY_RESULT_SLUGS, SENATE_METER } from "@/data/results";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Live results tracker",
  description:
    "2026 midterm results dashboard shell with House and Senate control meters and key races. Pre-election mode before November 3, 2026. Returns are unofficial until certified.",
  path: "/results",
});

export default function ResultsPage() {
  const preElection = isPreElection();

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Results", path: "/results" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Results" }]} />
      <PageHeader
        eyebrow="Results"
        title="Results tracker"
        lede={`A dashboard shell for Election Night and the days after. ${SITE.name} does not certify outcomes. Any future vote totals shown here will be unofficial until a state or county completes certification.`}
      />
      <OfficialNotice />

      <div className="rounded-xl border border-notice-line bg-notice-wash p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-xl font-semibold">
            {preElection ? "Awaiting returns" : "Unofficial returns window"}
          </h2>
          <DemoBadge>{preElection ? "Pre-election mode" : "Unofficial"}</DemoBadge>
        </div>
        <p className="mt-2 text-sm leading-6">
          {preElection
            ? `Election Day is ${SITE.electionDayLabel}. This page stays in awaiting-returns mode until that date. No live government or paid AP feed is connected.`
            : "If numbers appear after Election Day, treat them as unofficial until the relevant election authority certifies the contest."}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ControlMeter meter={HOUSE_METER} />
        <ControlMeter meter={SENATE_METER} />
      </div>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Key races</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Selected Senate, governor, and House templates. Each row opens an unofficial-returns page.
        </p>
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-paper-card">
          {KEY_RESULT_SLUGS.map((slug) => {
            const race = getRace(slug);
            if (!race) return null;
            return (
              <li key={slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <Link className="font-semibold hover:text-navy" href={`/results/${race.slug}`}>
                    {race.title}
                  </Link>
                  <p className="text-sm text-ink-muted">Awaiting unofficial returns · demo candidates</p>
                </div>
                <Link className="text-sm font-medium text-navy hover:underline" href={`/races/${race.slug}`}>
                  Race guide
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <CrossLinks />
    </div>
  );
}
