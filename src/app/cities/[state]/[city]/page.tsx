import { notFound } from "next/navigation";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { CityCandidates } from "@/components/CityCandidates";
import { CityLocal } from "@/components/CityLocal";
import { CityRelated } from "@/components/CityRelated";
import { JsonLd } from "@/components/JsonLd";
import { JurisdictionLinks } from "@/components/JurisdictionLinks";
import { electionOfficeFor } from "@/data/electionOffices";
import { reportErrorHref } from "@/data/site";
import {
  placeBySlug,
  placeState,
  placeStates,
  placesForState,
  sharedPlaceNames,
} from "@/data/places/load";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { citySeoDescription, citySeoTitle, cityStructuredData } from "@/lib/citySeo";
import { pageMetadata } from "@/lib/metadata";
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
    title: citySeoTitle(state.code, place, shared),
    description: citySeoDescription(state.code, state.name, place),
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
  const title = citySeoTitle(state.code, place, shared);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Census places", path: "/cities" },
    { name: state.name, path: `/cities/${state.code}` },
    { name: place.name, path },
  ];

  return (
    <div>
      <JsonLd
        data={cityStructuredData({
          stateCode: state.code,
          stateName: state.name,
          place,
          path,
          crumbs,
        })}
      />
      <nav aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {" / "}
        <Link href="/cities">Census places</Link>
        {" / "}
        <Link href={`/cities/${state.code}`}>{state.name}</Link>
        {" / "}
        <span>{place.name}</span>
      </nav>
      <h1>{title}</h1>
      <p className="note">
        Last updated: {contentUpdatedLabel(path)}. Unofficial information. Confirm with your{" "}
        <a href={office.office.href} rel="noopener noreferrer">
          official election office ({office.office.label})
        </a>
        . <Link href={reportErrorHref(path)}>Report an error</Link>. Census sources are on the{" "}
        <a href="/sources/#gazetteer">sources page</a>.
      </p>
      <AdSlot id="city-top" height={90} />

      <section>
        <h2>Census facts</h2>
        <dl>
          <dt>Place name</dt>
          <dd>{place.name}</dd>
          <dt>State</dt>
          <dd>{state.name}</dd>
          <dt>Census GEOID</dt>
          <dd>{place.geoid}</dd>
          <dt>{place.counties.length > 1 ? "Counties" : "County"}</dt>
          <dd>
            {joinFacts(place.counties)}{" "}
            <a href="/sources/#counties">County source</a>
          </dd>
          <dt>2020 Census population</dt>
          <dd>
            {place.pop == null ? `No population for GEOID ${place.geoid}.` : formatPopulation(place.pop)}{" "}
            <a href="/sources/#population">Population source</a>
          </dd>
          <dt>119th Congress district names</dt>
          <dd>
            {place.districts && place.districts.length > 0 ? (
              <ul>
                {place.districts.map((district) => (
                  <li key={district}>{district}</li>
                ))}
              </ul>
            ) : (
              <p>No 119th district row for place code {place.geoid}.</p>
            )}
            <a href="/sources/#districts">What these district names mean</a>
          </dd>
        </dl>
      </section>

      <CityCandidates code={state.code} place={place} />
      <CityLocal code={state.code} place={place} />
      <AdSlot id="city-bottom" height={250} />
      <CityRelated code={state.code} stateName={state.name} place={place} />

      <JurisdictionLinks code={state.code} name={state.name} />
    </div>
  );
}

