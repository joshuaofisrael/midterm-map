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

/** Nine states drew new 2026 boundaries. Every other jurisdiction kept the 2024 lines. */
export const congressionalBoundariesCitation: Citation = {
  name: "U.S. Census Bureau, 120th Congress congressional districts (Alabama, California, Florida, Louisiana, North Carolina, Ohio, Tennessee, Texas, and Utah delineated new boundaries for the 2026 election; all other states, the District of Columbia, and Puerto Rico had no changes from the 2024 cycle)",
  url: "https://www.census.gov/programs-surveys/decennial-census/about/rdo/congressional-districts.120th_Congress.html",
  accessed: CENSUS_PLACES_UPDATED,
};

export const cd120BefCitation: Citation = {
  name: "U.S. Census Bureau, 120th Congressional District Block Equivalency Files (cd120.zip), joined to 2026 Geographic Reference File place codes on 2020 census blocks with land area greater than zero",
  url: "https://www.census.gov/geographies/mapping-files/2027/dec/rdo/120-congressional-district-bef.html",
  accessed: CENSUS_PLACES_UPDATED,
};

const RELATIONSHIP_FILES_URL =
  "https://www.census.gov/geographies/reference-files/2020/geo/relationship-files.html";

export const zctaPlaceCitation: Citation = {
  name: "U.S. Census Bureau, 2020 ZIP Code Tabulation Area (ZCTA5) to 2020 Place Relationship File (tab20_zcta520_place20_natl.txt). Overlaps with no land area are omitted.",
  url: RELATIONSHIP_FILES_URL,
  accessed: CENSUS_PLACES_UPDATED,
};

export const zctaCd119Citation: Citation = {
  name: "U.S. Census Bureau, 119th Congressional District to 2020 ZIP Code Tabulation Area Relationship File (tab20_cd11920_zcta520_natl.txt). Overlaps with no land area are omitted.",
  url: RELATIONSHIP_FILES_URL,
  accessed: CENSUS_PLACES_UPDATED,
};

export const zctaBlockCitation: Citation = {
  name: "U.S. Census Bureau, 2020 ZIP Code Tabulation Area (ZCTA5) to 2020 Census Tabulation Block Relationship File (tab20_zcta520_tabblock20_natl.txt), joined to the 120th Congressional District Block Equivalency Files for Alabama, California, Florida, Louisiana, North Carolina, Ohio, Tennessee, Texas, and Utah. A 120th Congressional District to ZCTA relationship file is not published.",
  url: RELATIONSHIP_FILES_URL,
  accessed: CENSUS_PLACES_UPDATED,
};
