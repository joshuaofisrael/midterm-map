import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossLinks } from "@/components/CrossLinks";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { RaceCard } from "@/components/RaceCard";
import { RACES, racesByChamber } from "@/data/races";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "2026 race guides",
  description:
    "2026 U.S. midterm race guides for Senate, governor, and House contests in 12 states. Sourced candidate names, attributed ratings, and published polls. Not endorsements.",
  path: "/races",
});

const GROUPS = [
  { key: "senate" as const, title: "U.S. Senate" },
  { key: "governor" as const, title: "Governor" },
  { key: "house" as const, title: "U.S. House districts we cover" },
];

export default function RacesPage() {
  return (
    <div className="space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Races", path: "/races" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Races" }]} />
      <PageHeader
        eyebrow="Races"
        title="Race guides for the 2026 midterms"
        lede={`${RACES.length} guides cover Senate, governor, and selected House districts in our starter states. Candidate names are reported as of mid-September 2026. Party labels identify tickets only. Nothing here is an endorsement.`}
      />
      {GROUPS.map((group) => (
        <section key={group.key}>
          <h2 className="font-serif text-2xl font-semibold">{group.title}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {racesByChamber(group.key).map((race) => (
              <RaceCard key={race.slug} race={race} />
            ))}
          </div>
        </section>
      ))}
      <CrossLinks />
    </div>
  );
}
