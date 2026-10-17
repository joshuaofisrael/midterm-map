/**
 * State pages that list county election offices, read October 17, 2026.
 * A page is included only when its title or visible text identified it as
 * that directory. These are not individual county websites.
 */

export type CountyDirectory = {
  label: string;
  href: string;
};

export const COUNTY_DIRECTORIES: Record<string, CountyDirectory> = {
  CA: {
    label: "California Secretary of State — County Elections Offices",
    href: "https://www.sos.ca.gov/elections/voting-resources/county-elections-offices",
  },
  FL: {
    label: "Florida Division of Elections — Find your Supervisor of Elections",
    href: "https://dos.elections.myflorida.com/supervisors/",
  },
  HI: {
    label: "Hawaii Office of Elections — County Elections Divisions",
    href: "https://elections.hawaii.gov/resources/county-election-divisions/",
  },
  KY: {
    label: "Kentucky State Board of Elections — County Clerks",
    href: "https://elect.ky.gov/About-Us/Pages/County-Clerks.aspx",
  },
  MD: {
    label: "Maryland State Board of Elections — Local Boards of Elections",
    href: "https://elections.maryland.gov/about/county_boards.html",
  },
  NC: {
    label: "North Carolina State Board of Elections — County Boards of Elections",
    href: "https://www.ncsbe.gov/about-elections/county-boards-elections",
  },
  ND: {
    label: "North Dakota Secretary of State — County election officials",
    href: "https://vip.sos.nd.gov/CountyAuditors.aspx",
  },
  NE: {
    label: "Nebraska Secretary of State — Election Officials Contact Information",
    href: "https://sos.nebraska.gov/election-officials-contact-information",
  },
  NJ: {
    label: "New Jersey Division of Elections — County Election Officials",
    href: "https://www.nj.gov/state/elections/vote-county-election-officials.shtml",
  },
  NM: {
    label: "New Mexico Secretary of State — County Clerk Information",
    href: "https://www.sos.nm.gov/voting-and-elections/county-clerk-information/",
  },
  OR: {
    label: "Oregon Secretary of State — County Elections Officials",
    href: "https://sos.oregon.gov/elections/pages/county-officials.aspx",
  },
  VT: {
    label: "Vermont Secretary of State — Town Clerks and Election Workers",
    href: "https://sos.vermont.gov/elections/town-clerks",
  },
  WA: {
    label: "Washington Secretary of State — County Elections Offices",
    href: "https://www.sos.wa.gov/elections/voters/voter-registration/county-elections-offices",
  },
  WV: {
    label: "West Virginia Secretary of State — County Clerk Directory",
    href: "https://sos.wv.gov/west-virginia-county-clerk-directory",
  },
  DC: {
    label: "District of Columbia Board of Elections",
    href: "https://www.dcboe.org/",
  },
};
