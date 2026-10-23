/**
 * Spelling forms for Census place names.
 *
 * Forms are derived from the Census name only: Saint/St./St, Mount/Mt./Mt,
 * Fort/Ft./Ft, Centre/Center, Harbour/Harbor, hyphens and spaces, apostrophes,
 * and the class suffix (city, town, village, and so on). A short fixed list
 * adds common misspellings. Nothing here is a second Census place.
 */

export type TitleKind = "unique" | "county" | "class";

export type VariantPlace = {
  geoid: string;
  slug: string;
  name: string;
  pop: number | null;
  counties: string[];
  districts?: string[];
};

const CLASS_SUFFIXES = [
  "unified government",
  "consolidated government",
  "metropolitan government",
  "urban county",
  "municipality",
  "corporation",
  "comunidad",
  "urbana",
  "village",
  "borough",
  "township",
  "city",
  "town",
  "cdp",
] as const;

/** Suffixes people type. Township is included even though the Gazetteer uses other class words. */
const SEARCH_SUFFIXES = ["city", "town", "township", "village", "borough"] as const;

const MISSPELLINGS: Record<string, readonly string[]> = {
  cincinnati: ["cincinatti", "cincinati", "cinicinatti"],
  pittsburgh: ["pittsburg"],
  philadelphia: ["philly", "philladelphia", "philedelphia"],
  tucson: ["tuscon"],
  albuquerque: ["alburquerque", "alberquerque", "albequerque"],
  phoenix: ["pheonix"],
  milwaukee: ["milwakee"],
  minneapolis: ["minnapolis", "minneapolos"],
  chicago: ["chigaco", "chicgo"],
  chattanooga: ["chatanooga"],
  "des moines": ["des moine"],
  "san francisco": ["san fransisco", "san franciso"],
  "los angeles": ["los angelos", "los angles"],
  sacramento: ["sacremento"],
  "baton rouge": ["batton rouge"],
  worcester: ["worchester"],
  schenectady: ["schenectedy"],
  raleigh: ["raleight"],
  "fort lauderdale": ["fort lauderdal"],
};

const TOKEN_SWAPS: Array<[RegExp, string]> = [
  [/\bSaint\b/gi, "St."],
  [/\bSaint\b/gi, "St"],
  [/\bSt\./gi, "Saint"],
  [/\bSt\./gi, "St"],
  [/\bSt(?!\.)\b/gi, "Saint"],
  [/\bSt(?!\.)\b/gi, "St."],
  [/\bMount\b/gi, "Mt."],
  [/\bMount\b/gi, "Mt"],
  [/\bMt\./gi, "Mount"],
  [/\bMt\./gi, "Mt"],
  [/\bMt(?!\.)\b/gi, "Mount"],
  [/\bMt(?!\.)\b/gi, "Mt."],
  [/\bFort\b/gi, "Ft."],
  [/\bFort\b/gi, "Ft"],
  [/\bFt\./gi, "Fort"],
  [/\bFt\./gi, "Ft"],
  [/\bFt(?!\.)\b/gi, "Fort"],
  [/\bFt(?!\.)\b/gi, "Ft."],
  [/\bCentre\b/gi, "Center"],
  [/\bCenter\b/gi, "Centre"],
  [/\bHarbour\b/gi, "Harbor"],
  [/\bHarbor\b/gi, "Harbour"],
];

export function placeIsStandalone(place: { pop: number | null; districts?: string[] }): boolean {
  return place.pop != null || (place.districts != null && place.districts.length > 0);
}

export function placeIndexLetter(censusName: string): string {
  const display = placeDisplayName(censusName)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  const ch = display[0]?.toUpperCase() ?? "#";
  return /[A-Z]/.test(ch) ? ch : "#";
}

export function placeDisplayName(censusName: string): string {
  const lower = censusName.toLowerCase();
  for (const suffix of CLASS_SUFFIXES) {
    if (lower.endsWith(` ${suffix}`)) return censusName.slice(0, -(suffix.length + 1));
  }
  return censusName;
}

export function placeClassSuffix(censusName: string): string | null {
  const lower = censusName.toLowerCase();
  for (const suffix of CLASS_SUFFIXES) {
    if (lower.endsWith(` ${suffix}`)) return suffix;
  }
  return null;
}

export function normalizePlaceQuery(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[’']/g, "")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function countySlug(name: string): string {
  return normalizePlaceQuery(name).replace(/ /g, "-");
}

export function countyPath(stateCode: string, countyName: string): string {
  return `/cities/${stateCode}/county/${countySlug(countyName)}`;
}

export function placeTargetPath(stateCode: string, place: VariantPlace): string {
  if (placeIsStandalone(place)) return `/cities/${stateCode}/${place.slug}/`;
  const county = place.counties[0];
  if (!county) return `/cities/${stateCode}/`;
  return `${countyPath(stateCode, county)}/#place-${place.geoid}`;
}

export function citySeoHeading(
  stateCode: string,
  place: { name: string; counties: string[] },
  kind: TitleKind,
): string {
  const display = placeDisplayName(place.name);
  const suffix = placeClassSuffix(place.name);
  const county = place.counties[0];
  // A consolidated city-county whose display name is the county name would
  // otherwise use the same title as that county's place index.
  const sameNameAsCounty = Boolean(
    suffix && county && display.toLowerCase() === county.toLowerCase(),
  );
  if (kind === "class" || sameNameAsCounty) {
    const label = suffix ? `${display} ${suffix}` : place.name;
    return county
      ? `2026 Midterm Election Info for ${label}, ${county}, ${stateCode}`
      : `2026 Midterm Election Info for ${label}, ${stateCode}`;
  }
  if (kind === "county" && place.counties[0]) {
    return `2026 Midterm Election Info for ${display}, ${place.counties[0]}, ${stateCode}`;
  }
  return `2026 Midterm Election Info for ${display}, ${stateCode}`;
}

function applyTokenSwaps(name: string): string[] {
  const forms: string[] = [];
  for (const [pattern, replacement] of TOKEN_SWAPS) {
    pattern.lastIndex = 0;
    if (!pattern.test(name)) continue;
    pattern.lastIndex = 0;
    forms.push(name.replace(pattern, replacement));
  }
  return forms;
}

function punctuationForms(name: string): string[] {
  const forms: string[] = [];
  if (name.includes("-")) forms.push(name.replace(/-/g, " "));
  if (name.includes(" ")) forms.push(name.replace(/ /g, "-"));
  if (/['’]/.test(name)) {
    forms.push(name.replace(/['’]/g, ""));
    forms.push(name.replace(/['’]/g, " "));
  }
  return forms;
}

function expandReadable(censusName: string, extraSuffixes: readonly string[]): string[] {
  const display = placeDisplayName(censusName);
  const ordered: string[] = [];
  const seen = new Set<string>();
  const push = (value: string) => {
    const clean = value.replace(/\s+/g, " ").trim();
    const key = clean.toLowerCase();
    if (!clean || seen.has(key)) return;
    seen.add(key);
    ordered.push(clean);
  };

  push(censusName);
  push(display);
  let current = new Set<string>([display]);
  for (let pass = 0; pass < 2; pass += 1) {
    const next = new Set(current);
    for (const form of current) {
      for (const swapped of applyTokenSwaps(form)) next.add(swapped);
      for (const punct of punctuationForms(form)) next.add(punct);
    }
    if (next.size > 48) break;
    current = next;
  }
  for (const form of current) push(form);

  const suffix = placeClassSuffix(censusName);
  for (const extra of extraSuffixes) {
    if (extra !== suffix) push(`${display} ${extra}`);
  }
  return ordered;
}

/** Spellings shown on the page and in JSON-LD. Misspellings stay in search only. */
export function readableAliases(censusName: string): string[] {
  return expandReadable(censusName, ["township", "city"]);
}

export function misspellingsFor(censusName: string): string[] {
  const key = normalizePlaceQuery(placeDisplayName(censusName));
  return [...(MISSPELLINGS[key] ?? [])];
}

export function searchKeys(censusName: string): string[] {
  const keys = new Set<string>();
  const add = (value: string) => {
    const norm = normalizePlaceQuery(value);
    if (!norm) return;
    keys.add(norm);
    const flat = norm.replace(/ /g, "");
    if (flat.length >= 4) keys.add(flat);
  };
  for (const alias of expandReadable(censusName, SEARCH_SUFFIXES)) add(alias);
  for (const wrong of misspellingsFor(censusName)) add(wrong);
  return [...keys];
}

/**
 * Slugs that get a redirect page. Search still matches the wider `searchKeys`
 * set. Redirects stay limited to the spellings people put in a URL: the name
 * without its class word, Saint/Mount/Fort swaps, hyphen and apostrophe
 * forms, City and Township, one no-space form, and listed misspellings.
 */
export function redirectSlugs(censusName: string): string[] {
  const display = placeDisplayName(censusName);
  const slugs = new Set<string>();
  const add = (value: string) => {
    const norm = normalizePlaceQuery(value);
    if (norm.length < 2) return;
    slugs.add(norm.replace(/ /g, "-"));
  };
  const forms = new Set<string>([display, censusName]);
  for (const form of [display, censusName]) {
    for (const swapped of applyTokenSwaps(form)) forms.add(swapped);
    for (const punct of punctuationForms(form)) forms.add(punct);
  }
  for (const form of [...forms]) {
    for (const swapped of applyTokenSwaps(form)) forms.add(swapped);
  }
  for (const form of forms) add(form);
  add(`${display} city`);
  add(`${display} township`);
  const flat = normalizePlaceQuery(display).replace(/ /g, "");
  if (flat.length >= 4) slugs.add(flat);
  for (const wrong of misspellingsFor(censusName)) add(wrong);
  return [...slugs];
}

export function variantSlugs(censusName: string): string[] {
  return redirectSlugs(censusName);
}

/**
 * Variant slug → one canonical path. A slug is omitted when two places claim
 * it, or when a standalone place already owns that Census slug.
 */
export function redirectSlugTargets(stateCode: string, places: VariantPlace[]): Map<string, string> {
  const canonical = new Set(places.map((place) => place.slug));
  const claims = new Map<string, Set<string>>();
  const add = (slug: string, target: string) => {
    if (!slug || canonical.has(slug) && places.some((place) => place.slug === slug && placeIsStandalone(place))) {
      return;
    }
    let set = claims.get(slug);
    if (!set) {
      set = new Set();
      claims.set(slug, set);
    }
    set.add(target);
  };

  for (const place of places) {
    const target = placeTargetPath(stateCode, place);
    if (!placeIsStandalone(place)) add(place.slug, target);
    for (const slug of redirectSlugs(place.name)) {
      if (slug === place.slug) continue;
      if (canonical.has(slug)) continue;
      add(slug, target);
    }
  }

  const redirects = new Map<string, string>();
  for (const [slug, targets] of claims) {
    if (targets.size !== 1) continue;
    const target = [...targets][0];
    if (!target || target.replace(/#.*$/, "").replace(/\/$/, "") === `/cities/${stateCode}/${slug}`) continue;
    redirects.set(slug, target);
  }
  return redirects;
}

/** Lower scores are better. Null means the query does not match. */
export function scorePlaceQuery(query: string, censusName: string): number | null {
  const q = normalizePlaceQuery(query);
  if (q.length < 2) return null;
  const flatQ = q.replace(/ /g, "");
  let best: number | null = null;
  for (const key of searchKeys(censusName)) {
    const flat = key.replace(/ /g, "");
    let score: number | null = null;
    if (key === q) score = 0;
    else if (key.startsWith(q)) score = 1;
    else if (flatQ.length >= 4 && flat === flatQ) score = 2;
    else if (flatQ.length >= 4 && flat.startsWith(flatQ)) score = 3;
    else continue;
    if (best == null || score < best) best = score;
  }
  if (best == null) return null;
  if (normalizePlaceQuery(censusName) === q) best -= 0.5;
  return best;
}

export function searchShardLetter(query: string): string {
  const norm = normalizePlaceQuery(query);
  const letter = norm[0] ?? "0";
  return /[a-z]/.test(letter) ? letter : "0";
}
