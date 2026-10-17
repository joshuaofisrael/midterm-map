import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CityCandidates } from "@/components/CityCandidates";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { JurisdictionLinks } from "@/components/JurisdictionLinks";
import { OfficialNotice } from "@/components/OfficialNotice";
import { SourceLines } from "@/components/SourceLines";
import {
  countyCitation,
  countyNameCitation,
  districtCitation,
  gazetteerCitation,
  GAZETTEER_FILE,
  GAZETTEER_FILE_DATE,
  populationCitation,
} from "@/data/censusSources";
import { electionOfficeFor } from "@/data/electionOffices";
import {
  placeBySlug,
  placeState,
  placeStates,
  placesForState,
  sharedPlaceNames,
  type PlaceRecord,
} from "@/data/places/load";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { formatPopulation, joinFacts } from "@/lib/placeText";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { state: string; city: string }[] = [];
  for (const state of placeStates()) {
    for (const place of placesForState(state.code)) {
      params.push({ state: state.code, city: place.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state: code, city } = await params;
  const state = placeState(code);
  const place = state ? placeBySlug(state.code, city) : undefined;
  if (!state || !place) return {};
  const shared = sharedPlaceNames(state.code).has(place.name);
  return pageMetadata({
    title: cityTitle(state.name, place, shared),
    description: cityDescription(state.name, place),
    path: `/cities/${state.code}/${place.slug}`,
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state: code, city } = await params;
  const state = placeState(code);
  if (!state || code !== state.code) notFound();
  const place = placeBySlug(state.code, city);
  if (!place) notFound();
  const office = electionOfficeFor(state.code);
  const shared = sharedPlaceNames(state.code).has(place.name);
  const path = `/cities/${state.code}/${place.slug}`;
  const title = cityTitle(state.name, place, shared);

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Census places", path: "/cities" },
          { name: state.name, path: `/cities/${state.code}` },
          { name: place.name, path },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/cities", label: "Census places" },
          { href: `/cities/${state.code}`, label: state.name },
          { label: place.name },
        ]}
      />
      <header className="max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy">
          Census place
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 text-lg leading-7 text-ink-muted">
          Census place facts for {place.name} in {state.name}. Not an official election website.
        </p>
      </header>
      <ContentTrust
        updated={contentUpdatedLabel(path)}
        pagePath={path}
        officeHref={office.office.href}
        officeLabel={office.office.label}
      />
      <OfficialNotice compact />

      <section className="max-w-3xl">
        <h2 className="font-serif text-2xl font-semibold">Census facts</h2>
        <dl className="mt-4 space-y-4 text-sm leading-6">
          <div>
            <dt className="font-semibold">Place name</dt>
            <dd>{place.name}</dd>
          </div>
          <div>
            <dt className="font-semibold">State</dt>
            <dd>{state.name}</dd>
          </div>
          <div>
            <dt className="font-semibold">Census GEOID</dt>
            <dd>{place.geoid}</dd>
          </div>
          <div>
            <dt className="font-semibold">{place.counties.length > 1 ? "Counties" : "County"}</dt>
            <dd>{joinFacts(place.counties)}</dd>
            <dd>
              <SourceLines sources={[countyCitation, countyNameCitation]} />
            </dd>
          </div>
          <div>
            <dt className="font-semibold">2020 Census population</dt>
            <dd>
              {place.pop == null
                ? `The 2020 Census Redistricting Data (Public Law 94-171) place file has no population for GEOID ${place.geoid}.`
                : formatPopulation(place.pop)}
            </dd>
            <dd>
              <SourceLines sources={[populationCitation]} />
            </dd>
          </div>
          <div>
            <dt className="font-semibold">119th Congress district names</dt>
            <dd>
              {place.districts && place.districts.length > 0 ? (
                <>
                  <ul className="list-disc pl-5">
                    {place.districts.map((district) => (
                      <li key={district}>{district}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-ink-muted">
                    These names are the 119th Congress district names in the relationship file for
                    this 2020 place code. That file is not a 2026 ballot district.
                  </p>
                </>
              ) : (
                <p>
                  The national 119th Congressional District to 2020 place relationship file does not
                  include place code {place.geoid}.
                </p>
              )}
            </dd>
            <dd>
              <SourceLines sources={[districtCitation]} />
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-6 text-ink-muted">
          Place name, state, and GEOID are from the U.S. Census Bureau 2026 Gazetteer Files,
          national places file {GAZETTEER_FILE}, file date {GAZETTEER_FILE_DATE}.
        </p>
        <SourceLines sources={[gazetteerCitation]} />
      </section>

      <CityCandidates code={state.code} place={place} />

      <JurisdictionLinks code={state.code} name={state.name} />
    </div>
  );
}

function cityTitle(stateName: string, place: PlaceRecord, shared: boolean): string {
  const base = `${place.name}, ${stateName}`;
  return shared ? `${base} (GEOID ${place.geoid})` : base;
}

function cityDescription(stateName: string, place: PlaceRecord): string {
  const where =
    place.counties.length === 1
      ? `is in ${place.counties[0]}`
      : `is in ${joinFacts(place.counties)}`;
  const population =
    place.pop == null
      ? `The 2020 Census place file has no population for GEOID ${place.geoid}.`
      : `2020 Census population: ${formatPopulation(place.pop)}.`;
  return `${place.name}, ${stateName} (Census GEOID ${place.geoid}) ${where}. ${population} Place record from the U.S. Census Bureau 2026 Gazetteer Files (file date ${GAZETTEER_FILE_DATE}). Not an official election website.`;
}
