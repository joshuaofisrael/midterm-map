import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HouseAd } from "@/components/HouseAd";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SourceLines } from "@/components/SourceLines";
import { PlaceNameSearch } from "@/components/PlaceNameSearch";
import { ZipPlaceSearchSection } from "@/components/ZipPlaceSearchSection";
import { gazetteerCitation, GAZETTEER_FILE, GAZETTEER_FILE_DATE } from "@/data/censusSources";
import { placeManifest, placeStates } from "@/data/places/load";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

const PATH = "/cities";

export const metadata = pageMetadata({
  title: "2026 midterm election info by city",
  description: `Search Census places in the 50 states, the District of Columbia, and Puerto Rico, then open a state, county, or city page. Names are the U.S. Census Bureau 2026 Gazetteer Files (${GAZETTEER_FILE}, file date ${GAZETTEER_FILE_DATE}). Not an official election website.`,
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
        title="2026 midterm election info by city"
        lede={`${manifest.placeCount.toLocaleString("en-US")} Census places, organized by state and county. Search matches Saint/St., Mount/Mt., Fort/Ft., hyphens, and common misspellings.`}
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

      <section className="max-w-3xl">
        <h2 className="font-serif text-2xl font-semibold">Search by place name</h2>
        <PlaceNameSearch />
      </section>

      <ZipPlaceSearchSection />

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
      <HouseAd path={PATH} />
    </div>
  );
}
