import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InfoNote } from "@/components/InfoNote";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { JurisdictionLinks } from "@/components/JurisdictionLinks";
import { OfficialNotice } from "@/components/OfficialNotice";
import { PageHeader } from "@/components/PageHeader";
import { PlaceIndex } from "@/components/PlaceIndex";
import { SourceLines } from "@/components/SourceLines";
import { countyCitation, countyNameCitation, gazetteerCitation, populationCitation } from "@/data/censusSources";
import { electionOfficeFor } from "@/data/electionOffices";
import { countiesForState, countyBySlug, placeState, placeStates } from "@/data/places/load";
import { absoluteUrl } from "@/data/site";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { placeDisplayName, placeIsStandalone } from "@/lib/placeNames";
import { formatPopulation } from "@/lib/placeText";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { state: string; county: string }[] = [];
  for (const state of placeStates()) {
    for (const county of countiesForState(state.code)) {
      params.push({ state: state.code, county: county.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; county: string }>;
}) {
  const { state: code, county: slug } = await params;
  const state = placeState(code);
  const county = state ? countyBySlug(state.code, slug) : undefined;
  if (!state || !county) return {};
  return pageMetadata({
    title: `2026 Midterm Election Info for ${county.name}, ${state.code}`,
    description: `${county.places.length.toLocaleString("en-US")} Census places in ${county.name}, ${state.name}, with links to 2026 midterm pages. Population figures are the 2020 Census counts stored for each place. Not an official election website.`,
    path: `/cities/${state.code}/county/${county.slug}`,
  });
}

export default async function CountyPlacesPage({
  params,
}: {
  params: Promise<{ state: string; county: string }>;
}) {
  const { state: code, county: slug } = await params;
  const state = placeState(code);
  if (!state || code !== state.code) notFound();
  const county = countyBySlug(state.code, slug);
  if (!county || slug !== county.slug) notFound();
  const office = electionOfficeFor(state.code);
  const path = `/cities/${state.code}/county/${county.slug}`;
  const listed = county.places.filter((place) => !placeIsStandalone(place));
  const known = county.places.filter((place) => place.pop != null);
  const population = known.reduce((sum, place) => sum + (place.pop ?? 0), 0);

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Census places", path: "/cities" },
          { name: state.name, path: `/cities/${state.code}` },
          { name: county.name, path },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AdministrativeArea",
          name: county.name,
          url: absoluteUrl(path),
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: state.name,
          },
        }}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/cities", label: "Census places" },
          { href: `/cities/${state.code}`, label: state.name },
          { label: county.name },
        ]}
      />
      <PageHeader
        eyebrow={`${state.name} · ${county.name}`}
        title={`2026 Midterm Election Info for ${county.name}, ${state.code}`}
        lede={`${county.places.length.toLocaleString("en-US")} Census places. The sum of stored 2020 Census populations is ${formatPopulation(population)} across ${known.length.toLocaleString("en-US")} places that have a population. ${listed.length.toLocaleString("en-US")} places have no 2020 population and no congressional-district row, so they are listed on this page instead of a separate page.`}
      >
        <InfoNote />
      </PageHeader>
      <ContentTrust
        updated={contentUpdatedLabel(path)}
        pagePath={path}
        officeHref={office.office.href}
        officeLabel={office.office.label}
      />
      <OfficialNotice compact />
      <JurisdictionLinks code={state.code} name={state.name} />
      <p className="text-sm">
        <Link className="font-medium text-navy hover:underline" href={`/cities/${state.code}#place-search`}>
          Search places in {state.name}
        </Link>
      </p>
      <SourceLines sources={[gazetteerCitation, populationCitation, countyCitation, countyNameCitation]} />
      <PlaceIndex stateCode={state.code} places={county.places} heading={`Places in ${county.name}`} />
      {listed.length > 0 ? (
        <section>
          <h2 className="font-serif text-2xl font-semibold">Places without a separate page</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted">
            These places have no 2020 Census population and no congressional-district row. The
            facts below are the Census name and GEOID. They are not given a separate URL.
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            {listed.map((place) => (
              <li key={place.geoid} id={`place-${place.geoid}`}>
                <strong>{placeDisplayName(place.name)}</strong> ({place.name}). GEOID {place.geoid}. No
                2020 population. No 119th congressional district row.
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
