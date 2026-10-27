import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HouseAd } from "@/components/HouseAd";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { JurisdictionLinks } from "@/components/JurisdictionLinks";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SourceLines } from "@/components/SourceLines";
import { PlaceIndex } from "@/components/PlaceIndex";
import { PlaceNameSearch } from "@/components/PlaceNameSearch";
import { ZipPlaceSearchSection } from "@/components/ZipPlaceSearchSection";
import {
  countyCitation,
  countyNameCitation,
  gazetteerCitation,
  GAZETTEER_FILE,
  GAZETTEER_FILE_DATE,
  populationCitation,
} from "@/data/censusSources";
import { electionOfficeFor } from "@/data/electionOffices";
import { countiesForState, placeState, placeStates, placesForState } from "@/data/places/load";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { placeIndexLetter } from "@/lib/placeNames";

export const dynamicParams = false;

export function generateStaticParams() {
  return placeStates().map((state) => ({ state: state.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  const state = placeState(code);
  if (!state) return {};
  return pageMetadata({
    title: `${state.name} cities and towns — 2026 midterm election info`,
    description: `A–Z index of Census places in ${state.name}, grouped by county, from the U.S. Census Bureau 2026 Gazetteer Files (${GAZETTEER_FILE}, file date ${GAZETTEER_FILE_DATE}). Each city page lists sourced 2026 ballot and voting links. Not an official election website.`,
    path: `/cities/${state.code}`,
  });
}

export default async function StateCitiesPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  const state = placeState(code);
  if (!state || code !== state.code) notFound();
  const office = electionOfficeFor(state.code);
  const places = [...placesForState(state.code)].sort((a, b) => {
    const byName = a.name.localeCompare(b.name, "en");
    return byName === 0 ? a.geoid.localeCompare(b.geoid) : byName;
  });
  const counties = countiesForState(state.code);
  const path = `/cities/${state.code}`;
  const countyLetters = new Map<string, typeof counties>();
  for (const county of counties) {
    const letter = placeIndexLetter(county.name);
    const list = countyLetters.get(letter);
    if (list) list.push(county);
    else countyLetters.set(letter, [county]);
  }

  return (
    <>
      <HouseAd path={path} />
      <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Census places", path: "/cities" },
          { name: state.name, path },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/cities", label: "Census places" },
          { label: state.name },
        ]}
      />
      <PageHeader
        eyebrow={state.name}
        title={`2026 midterm election info for cities in ${state.name}`}
        lede={`${state.count.toLocaleString("en-US")} Census places in ${counties.length.toLocaleString("en-US")} counties or equivalent areas, from the U.S. Census Bureau 2026 Gazetteer national places file (${GAZETTEER_FILE}, file date ${GAZETTEER_FILE_DATE}).`}
      />
      <ContentTrust
        updated={contentUpdatedLabel(path)}
        pagePath={path}
        officeHref={office.office.href}
        officeLabel={office.office.label}
      />
      <OfficialNotice compact />
      <JurisdictionLinks code={state.code} name={state.name} />

      <section className="max-w-3xl">
        <h2 className="font-serif text-2xl font-semibold">Search places in {state.name}</h2>
        <PlaceNameSearch stateCode={state.code} scopeName={state.name} />
      </section>

      <ZipPlaceSearchSection scopeName={state.name} />

      <section>
        <h2 className="font-serif text-2xl font-semibold">Counties and equivalent areas</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted">
          County names are from the 2026 Geographic Reference File and the 2026 Gazetteer counties
          file. A place in more than one county is listed under each county.
        </p>
        <SourceLines sources={[countyCitation, countyNameCitation]} />
        <nav aria-label="Counties A to Z" className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("").map((letter) =>
            countyLetters.has(letter) ? (
              <a key={letter} className="font-medium text-navy hover:underline" href={`#county-${letter}`}>
                {letter}
              </a>
            ) : (
              <span key={letter} className="text-ink-muted">
                {letter}
              </span>
            ),
          )}
        </nav>
        {[...countyLetters.entries()].map(([letter, rows]) => (
          <div key={letter} id={`county-${letter}`} className="mt-4">
            <h3 className="font-semibold">{letter}</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((county) => (
                <li key={county.slug}>
                  <a className="font-medium text-navy hover:underline" href={`/cities/${state.code}/county/${county.slug}/`}>
                    {county.name}
                  </a>
                  <span className="text-ink-muted">
                    {" "}
                    · {county.places.length.toLocaleString("en-US")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <PlaceIndex stateCode={state.code} places={places} heading="Places A to Z" />
      <SourceLines sources={[gazetteerCitation, populationCitation]} />
      </div>
    </>
  );
}
