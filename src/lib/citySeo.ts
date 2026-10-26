import { EDITORIAL_TEAM } from "@/data/editorial";
import { electionOfficeFor } from "@/data/electionOffices";
import { pollCloseIso } from "@/data/pollClose";
import type { PlaceRecord } from "@/data/places/load";
import { nearbyFor } from "@/data/places/nearby";
import { absoluteUrl, SITE } from "@/data/site";
import { citySeoHeading, placeDisplayName, readableAliases, type TitleKind } from "@/lib/placeNames";
import { formatPopulation } from "@/lib/placeText";

const TITLE_TAIL = "2026 Elections: Candidates & Races";

export function citySeoTitle(stateCode: string, place: PlaceRecord, kind: TitleKind): string {
  return citySeoHeading(stateCode, place, kind);
}

const META_MAX = 160;

function boundedDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length > META_MAX) {
    throw new Error(`Meta description is ${clean.length} characters: ${clean}`);
  }
  return clean;
}

export function citySeoDescription(
  stateCode: string,
  stateName: string,
  place: PlaceRecord,
): string {
  const display = placeDisplayName(place.name);
  const population =
    place.pop == null ? "" : ` 2020 Census population ${formatPopulation(place.pop)}.`;
  const withPopulation = `${display}, ${stateName} (GEOID ${place.geoid}): 2026 midterm candidates and races.${population} Not an official election website.`;
  if (withPopulation.length <= META_MAX) return withPopulation;
  const coded = `${display}, ${stateCode} (GEOID ${place.geoid}): 2026 midterm candidates and races.${population} Not an official election website.`;
  if (coded.length <= META_MAX) return coded;
  const noPopulation = `${display}, ${stateCode} (GEOID ${place.geoid}): 2026 midterm candidates and races. Not an official election website.`;
  if (noPopulation.length <= META_MAX) return noPopulation;
  const suffix = `, ${stateCode} (GEOID ${place.geoid}): 2026 midterm races. Not an official election website.`;
  const room = META_MAX - suffix.length;
  const name = display.length <= room ? display : `${display.slice(0, Math.max(1, room - 1)).trimEnd()}…`;
  return boundedDescription(`${name}${suffix}`);
}

export function raceSeoTitle(shortTitle: string): string {
  return `${shortTitle} ${TITLE_TAIL}`;
}

export function raceSeoDescription(shortTitle: string, stateCode: string): string {
  return boundedDescription(
    `${shortTitle}, ${stateCode}: 2026 candidates and race guide. Informational only. Not an endorsement.`,
  );
}

/**
 * One election-day Event. Office rows are not separate Events: they are not
 * ticketed, and a performer or an offer would not be a fact we have.
 * endDate is that state's poll-close instant. The organizer is the state
 * election office, which administers the election. Image is this site's
 * existing Open Graph card, not a photograph of the polling place.
 */
function eventNode(input: {
  name: string;
  place: Record<string, unknown>;
  about: string;
  stateCode: string;
  image?: string;
}) {
  const office = electionOfficeFor(input.stateCode);
  const endDate = pollCloseIso(input.stateCode);
  const node: Record<string, unknown> = {
    "@type": "Event",
    name: input.name,
    startDate: SITE.electionDayIso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    // Inline Place (name + address): Google's Event parser does not resolve @id references.
    location: {
      "@type": "Place",
      name: input.place.name,
      address: input.place.address,
    },
    description: input.about,
    image: input.image ?? `${SITE.url}/og.jpg`,
    organizer: {
      "@type": "GovernmentOrganization",
      name: office.office.label,
      url: office.office.href,
    },
  };
  if (endDate) node.endDate = endDate;
  return node;
}

export function cityStructuredData(input: {
  stateCode: string;
  stateName: string;
  place: PlaceRecord;
  path: string;
  crumbs: { name: string; path: string }[];
}) {
  const url = absoluteUrl(input.path);
  const placeId = `${url}#place`;
  const display = placeDisplayName(input.place.name);
  const near = nearbyFor(input.stateCode, input.place.geoid);
  const placeNode: Record<string, unknown> = {
    "@type": "Place",
    "@id": placeId,
    name: display,
    alternateName: readableAliases(input.place.name)
      .filter((name) => name.toLowerCase() !== display.toLowerCase())
      .slice(0, 12),
    url,
    identifier: input.place.geoid,
    address: {
      "@type": "PostalAddress",
      addressLocality: display,
      addressRegion: input.stateCode,
      addressCountry: input.stateCode === "PR" ? "PR" : "US",
    },
    containedInPlace: input.place.counties.map((county) => ({
      "@type": "AdministrativeArea",
      name: county,
    })),
  };
  if (near) {
    placeNode.geo = {
      "@type": "GeoCoordinates",
      latitude: near.lat,
      longitude: near.lon,
    };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      placeNode,
      eventNode({
        name: `2026 Midterm Election in ${display}, ${input.stateCode}`,
        place: placeNode,
        about: `Informational page for the November 3, 2026 general election in ${display}, ${input.stateCode}. Not a forecast and not an official election website.`,
        stateCode: input.stateCode,
      }),
      {
        "@type": "BreadcrumbList",
        itemListElement: input.crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: absoluteUrl(crumb.path),
        })),
      },
    ],
  };
}

export function raceStructuredData(input: {
  title: string;
  shortTitle: string;
  path: string;
  stateCode: string;
  stateName: string;
  faqs: { question: string; answer: string }[];
  crumbs: { name: string; path: string }[];
  image?: string;
}) {
  const url = absoluteUrl(input.path);
  const placeId = `${url}#place`;
  const statePlace: Record<string, unknown> = {
    "@type": "Place",
    "@id": placeId,
    name: input.stateName,
    address: {
      "@type": "PostalAddress",
      addressRegion: input.stateCode,
      addressCountry: "US",
    },
  };
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: input.title,
      url,
      mainEntityOfPage: url,
      author: EDITORIAL_TEAM,
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: absoluteUrl("/"),
      },
      description: `${input.shortTitle}. Informational only. Not an endorsement.`,
    },
    statePlace,
    eventNode({
      name: input.title,
      place: statePlace,
      about: `${input.shortTitle}. Informational only. Not an endorsement.`,
      stateCode: input.stateCode,
      image: input.image,
    }),
    {
      "@type": "BreadcrumbList",
      itemListElement: input.crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    },
  ];
  if (input.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: input.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
