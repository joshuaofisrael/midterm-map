import { candidateFile, contestsForPlace } from "@/data/candidates/load";
import { localFile } from "@/data/local/load";
import type { PlaceRecord } from "@/data/places/load";
import { nearbyFor } from "@/data/places/nearby";
import { absoluteUrl, SITE } from "@/data/site";
import { citySeoHeading, placeDisplayName, readableAliases, type TitleKind } from "@/lib/placeNames";
import { formatPopulation, joinFacts } from "@/lib/placeText";

const TITLE_TAIL = "2026 Elections: Candidates & Races";

export function citySeoTitle(stateCode: string, place: PlaceRecord, kind: TitleKind): string {
  return citySeoHeading(stateCode, place, kind);
}

export function citySeoDescription(
  stateCode: string,
  stateName: string,
  place: PlaceRecord,
): string {
  const display = placeDisplayName(place.name);
  const file = candidateFile(stateCode);
  const published = file?.status === "published";
  const list = published
    ? `Candidate names are copied from the official ${stateName} list.`
    : "Candidates are not listed on this page yet; use the official state election office.";
  const population =
    place.pop == null
      ? `The 2020 Census place file has no population for GEOID ${place.geoid}.`
      : `2020 Census population ${formatPopulation(place.pop)}.`;
  const counties = place.counties.length > 0 ? joinFacts(place.counties) : "no county on the place file";
  const districts =
    place.districts && place.districts.length > 0 ? place.districts.join("; ") : "no congressional district row";
  const aliases = readableAliases(place.name)
    .filter((name) => name.toLowerCase() !== display.toLowerCase() && name.toLowerCase() !== place.name.toLowerCase())
    .slice(0, 3);
  const also = aliases.length > 0 ? ` Also matches ${aliases.join(", ")}.` : "";
  return `2026 midterm election info for ${display}, ${stateCode}. ${list} ${counties}. ${districts}. GEOID ${place.geoid}. ${population}${also} Not an official election website.`;
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
  const display = placeDisplayName(input.place.name);
  const near = nearbyFor(input.stateCode, input.place.geoid);
  const about = `Contest listed for ${display}, ${input.stateCode}. Not an official election website and not a forecast.`;
  const { contests } = contestsForPlace(input.stateCode, input.place);
  const local = localFile(input.stateCode);
  const localContests: { office: string }[] = [
    ...(local?.local?.[input.place.geoid] ?? []),
    ...input.place.counties.flatMap((county) => local?.localByCounty?.[county] ?? []),
  ];
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
      eventNode(
        `2026 Midterm Election in ${display}, ${input.stateCode}`,
        placeId,
        `Informational page for the November 3, 2026 general election in ${display}, ${input.stateCode}. Not a forecast and not an official election website.`,
      ),
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
