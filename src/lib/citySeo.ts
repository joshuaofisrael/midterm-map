import { candidateFile, contestsForPlace } from "@/data/candidates/load";
import { localFile } from "@/data/local/load";
import type { PlaceRecord } from "@/data/places/load";
import { nearbyFor } from "@/data/places/nearby";
import { absoluteUrl, SITE } from "@/data/site";
import { formatPopulation, joinFacts } from "@/lib/placeText";

const TITLE_TAIL = "2026 Elections: Candidates & Races";

export function citySeoTitle(stateCode: string, place: PlaceRecord, shared: boolean): string {
  const where =
    shared && place.counties.length > 0
      ? `${place.name}, ${place.counties[0]}, ${stateCode}`
      : `${place.name}, ${stateCode}`;
  return `${where} ${TITLE_TAIL}`;
}

export function citySeoDescription(
  stateCode: string,
  stateName: string,
  place: PlaceRecord,
): string {
  const file = candidateFile(stateCode);
  const published = file?.status === "published";
  const list = published
    ? `Candidate names are copied from the official ${stateName} list.`
    : "Candidates not yet listed on this site; check the official state election office.";
  const population =
    place.pop == null
      ? `The 2020 Census place file has no population for GEOID ${place.geoid}.`
      : `2020 Census population ${formatPopulation(place.pop)}.`;
  const counties = place.counties.length > 0 ? joinFacts(place.counties) : "no county on the place file";
  return `${place.name}, ${stateCode} 2026 elections. ${list} Census place in ${counties}. GEOID ${place.geoid}. ${population} Not an official election website.`;
}

export function raceSeoTitle(shortTitle: string): string {
  return `${shortTitle} ${TITLE_TAIL}`;
}

export function raceSeoDescription(title: string, overview: string): string {
  return `${title}. ${overview} Informational only. Not an endorsement.`;
}

function eventNode(name: string, placeId: string, about: string) {
  return {
    "@type": "Event",
    name,
    startDate: SITE.electionDayIso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@id": placeId },
    description: about,
  };
}

function contestEvents(contests: { office: string }[], placeId: string, about: string) {
  const seen = new Set<string>();
  const events = [];
  for (const contest of contests) {
    if (seen.has(contest.office)) continue;
    seen.add(contest.office);
    events.push(eventNode(contest.office, placeId, about));
  }
  return events;
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
  const near = nearbyFor(input.stateCode, input.place.geoid);
  const about = `Contest listed for ${input.place.name}, ${input.stateCode}. Not an official election website.`;
  const { contests } = contestsForPlace(input.stateCode, input.place);
  const local = localFile(input.stateCode);
  const localContests: { office: string }[] = [
    ...(local?.local?.[input.place.geoid] ?? []),
    ...input.place.counties.flatMap((county) => local?.localByCounty?.[county] ?? []),
  ];
  const placeNode: Record<string, unknown> = {
    "@type": "Place",
    "@id": placeId,
    name: input.place.name,
    url,
    identifier: input.place.geoid,
    address: {
      "@type": "PostalAddress",
      addressLocality: input.place.name,
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
      ...contestEvents(contests, placeId, about),
      ...contestEvents(localContests, placeId, about),
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
}) {
  const url = absoluteUrl(input.path);
  const placeId = `${url}#place`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Place",
      "@id": placeId,
      name: input.stateName,
      address: {
        "@type": "PostalAddress",
        addressRegion: input.stateCode,
        addressCountry: "US",
      },
    },
    eventNode(input.title, placeId, `${input.shortTitle}. Informational only. Not an endorsement.`),
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
