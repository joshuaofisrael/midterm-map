import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SourceLines } from "@/components/SourceLines";
import { ZipPlaceSearchSection } from "@/components/ZipPlaceSearchSection";
import coverage from "@/data/ballot/coverage.json";
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
        <p className="mt-4">
          Of these {coverage.placeCount.toLocaleString("en-US")} places,{" "}
          {coverage.localPlaces.toLocaleString("en-US")} pages include at least one local contest
          copied from an official election list read on {coverage.accessed}. The lists read for
          local offices so far are{" "}
          {states
            .filter((state) => coverage.byState[state.code as keyof typeof coverage.byState].countiesRead > 0)
            .map((state) => state.name)
            .join(", ")}
          . A precinct or district contest is copied only when the list names a Census place or
          names the whole county with no precinct. {coverage.placesUnchecked.toLocaleString("en-US")}{" "}
          places still include a county whose candidate list has not been read. The sentence “Local
          races: no official listing found yet” is used only for a county whose election office was
          read and publishes no candidate list or sample ballot. No county is in that group in the
          lists read so far.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-paper-card">
          <table className="min-w-full text-left text-sm">
            <caption className="border-b border-line px-4 py-3 text-left text-sm text-ink">
              Local contest coverage by state, from official lists read {coverage.accessed}
            </caption>
            <thead className="bg-paper-tint text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-2 font-semibold" scope="col">State</th>
                <th className="px-4 py-2 font-semibold" scope="col">Places with a local contest</th>
                <th className="px-4 py-2 font-semibold" scope="col">Counties read</th>
                <th className="px-4 py-2 font-semibold" scope="col">Counties with no online list</th>
                <th className="px-4 py-2 font-semibold" scope="col">Counties not yet read</th>
              </tr>
            </thead>
            <tbody>
              {states.map((state) => {
                const row = coverage.byState[state.code as keyof typeof coverage.byState];
                return (
                  <tr key={state.code} className="border-t border-line">
                    <th className="px-4 py-2 font-medium" scope="row">{state.name}</th>
                    <td className="px-4 py-2">{row.placesWithLocal.toLocaleString("en-US")} of {row.places.toLocaleString("en-US")}</td>
                    <td className="px-4 py-2">{row.countiesRead.toLocaleString("en-US")} of {row.counties.toLocaleString("en-US")}</td>
                    <td className="px-4 py-2">{row.countiesUnpublished.toLocaleString("en-US")}</td>
                    <td className="px-4 py-2">{row.countiesUnchecked.toLocaleString("en-US")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <SourceLines sources={[gazetteerCitation, ...coverage.localSources]} />
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
    </div>
  );
}
