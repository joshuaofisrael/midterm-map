import type { Citation } from "./types";

/** Day the Census place files used on /cities were read. */
export const CENSUS_PLACES_UPDATED = "October 17, 2026";

export const GAZETTEER_VINTAGE = "2026";
export const GAZETTEER_FILE = "2026_Gaz_place_national.zip";
export const GAZETTEER_FILE_DATE = "September 8, 2026";

/** Census spells the directory “gazetter” on this page. */
const GAZETTEER_URL =
  "https://www.census.gov/geographies/reference-files/2026/geo/gazetter-file.html";

export const gazetteerCitation: Citation = {
  name: `U.S. Census Bureau, ${GAZETTEER_VINTAGE} Gazetteer Files, National Places (${GAZETTEER_FILE}, file date ${GAZETTEER_FILE_DATE})`,
  url: GAZETTEER_URL,
  accessed: CENSUS_PLACES_UPDATED,
};

export const populationCitation: Citation = {
  name: "U.S. Census Bureau, 2020 Census Redistricting Data (Public Law 94-171), summary level 160 (state-place) population in the geographic header",
  url: "https://www.census.gov/programs-surveys/decennial-census/about/rdo/summary-files.html",
  accessed: CENSUS_PLACES_UPDATED,
};

export const countyCitation: Citation = {
  name: "U.S. Census Bureau, 2026 Geographic Reference File — Codes (current county for each place code). County names from the 2026 Gazetteer national counties file.",
  url: "https://www.census.gov/geographies/reference-files/time-series/geo/geo-reference-files.2026.html",
  accessed: CENSUS_PLACES_UPDATED,
};

export const countyNameCitation: Citation = {
  name: `U.S. Census Bureau, ${GAZETTEER_VINTAGE} Gazetteer Files, National Counties (county names)`,
  url: GAZETTEER_URL,
  accessed: CENSUS_PLACES_UPDATED,
};

export const districtCitation: Citation = {
  name: "U.S. Census Bureau, National 119th Congressional District to 2020 Place Relationship File (tab20_cd11920_place20_natl.txt)",
  url: "https://www.census.gov/geographies/reference-files/2020/geo/relationship-files.html",
  accessed: CENSUS_PLACES_UPDATED,
};
