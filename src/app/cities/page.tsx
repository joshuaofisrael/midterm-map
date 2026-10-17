import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SourceLines } from "@/components/SourceLines";
import { gazetteerCitation, GAZETTEER_FILE, GAZETTEER_FILE_DATE } from "@/data/censusSources";
import { placeManifest, placeStates } from "@/data/places/load";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

const PATH = "/cities";

export const metadata = pageMetadata({
  title: "U.S. Census places",
  description: `Index of incorporated places and census-designated places from the U.S. Census Bureau 2026 Gazetteer Files (${GAZETTEER_FILE}, file date ${GAZETTEER_FILE_DATE}), with a page for each state, the District of Columbia, and Puerto Rico. Not an official election website.`,
  path: PATH,
});

export default function CitiesIndexPage() {
  const manifest = placeManifest();
  const states = [...placeStates()].sort((a, b) => a.name.localeCompare(b.name, "en"));

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Census places", path: PATH },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Census places" }]} />
      <PageHeader
        eyebrow="Census places"
        title="U.S. Census places"
        lede={`${manifest.placeCount.toLocaleString("en-US")} incorporated places and census-designated places from the U.S. Census Bureau 2026 Gazetteer national places file.`}
      />
      <ContentTrust updated={contentUpdatedLabel(PATH)} pagePath={PATH} />
      <OfficialNotice compact />

      <section className="max-w-3xl text-sm leading-6">
        <p>
          The list is the national places file {GAZETTEER_FILE}, file date {GAZETTEER_FILE_DATE}. It
          covers the 50 states, the District of Columbia, and Puerto Rico. Records with Census
          functional status F (fictitious entities) are not included. Each state page links the
          place pages for that jurisdiction.
        </p>
        <SourceLines sources={[gazetteerCitation]} />
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">States and other jurisdictions</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <li key={state.code} className="rounded-lg border border-line bg-paper-card px-4 py-3">
              <Link className="font-medium text-navy hover:underline" href={`/cities/${state.code}`}>
                {state.name}
              </Link>
              <p className="text-sm text-ink-muted">
                {state.count.toLocaleString("en-US")} {state.count === 1 ? "place" : "places"}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
