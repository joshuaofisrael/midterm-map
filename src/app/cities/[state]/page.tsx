import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { JurisdictionLinks } from "@/components/JurisdictionLinks";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { SourceLines } from "@/components/SourceLines";
import {
  countyCitation,
  countyNameCitation,
  gazetteerCitation,
  GAZETTEER_FILE,
  GAZETTEER_FILE_DATE,
  populationCitation,
} from "@/data/censusSources";
import { electionOfficeFor } from "@/data/electionOffices";
import { placeState, placeStates, placesForState, sharedPlaceNames } from "@/data/places/load";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { formatPopulation, joinFacts } from "@/lib/placeText";

export const dynamicParams = false;

export function generateStaticParams() {
  return placeStates().map((state) => ({ state: state.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state: code } = await params;
  const state = placeState(code);
  if (!state) return {};
  return pageMetadata({
    title: `Census places in ${state.name}`,
    description: `${state.count.toLocaleString("en-US")} Census incorporated places and census-designated places in ${state.name}, from the U.S. Census Bureau 2026 Gazetteer Files (${GAZETTEER_FILE}, file date ${GAZETTEER_FILE_DATE}). Not an official election website.`,
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
  const shared = sharedPlaceNames(state.code);
  const path = `/cities/${state.code}`;

  return (
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
        title={`Census places in ${state.name}`}
        lede={`${state.count.toLocaleString("en-US")} places from the U.S. Census Bureau 2026 Gazetteer national places file (${GAZETTEER_FILE}, file date ${GAZETTEER_FILE_DATE}).`}
      />
      <ContentTrust
        updated={contentUpdatedLabel(path)}
        pagePath={path}
        officeHref={office.office.href}
        officeLabel={office.office.label}
      />
      <OfficialNotice compact />
      <JurisdictionLinks code={state.code} name={state.name} />

      <section>
        <h2 className="font-serif text-2xl font-semibold">Places</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted">
          Population is the 2020 Census Redistricting Data (Public Law 94-171) state-place total
          when that file includes the place code. County names are from the 2026 Geographic
          Reference File — Codes and the 2026 Gazetteer counties file. A place with the same Census
          name as another place in {state.name} is listed with its GEOID.
        </p>
        <SourceLines
          sources={[gazetteerCitation, populationCitation, countyCitation, countyNameCitation]}
        />
        <ul className="mt-4 divide-y divide-line border-y border-line text-sm">
          {places.map((place) => (
            <li key={place.geoid} className="flex flex-wrap gap-x-3 py-1.5">
              <a
                className="font-medium text-navy hover:underline"
                href={`/cities/${state.code}/${place.slug}/`}
              >
                {shared.has(place.name) ? `${place.name} (GEOID ${place.geoid})` : place.name}
              </a>
              <span className="text-ink-muted">{joinFacts(place.counties)}</span>
              <span className="text-ink-muted">
                {place.pop == null ? "Not in the 2020 place file" : formatPopulation(place.pop)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
