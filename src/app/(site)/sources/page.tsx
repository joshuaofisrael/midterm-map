import { ContentTrust } from "@/components/ContentTrust";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import {
  cd120BefCitation,
  congressionalBoundariesCitation,
  countyCitation,
  countyNameCitation,
  districtCitation,
  gazetteerCitation,
  GAZETTEER_FILE,
  GAZETTEER_FILE_DATE,
  populationCitation,
  zctaBlockCitation,
  zctaCd119Citation,
  zctaPlaceCitation,
} from "@/data/censusSources";
import type { Citation } from "@/data/types";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Sources",
  description:
    "Census files used for place names, population, counties, congressional districts, nearest places, and ZIP search on Map the Midterms.",
  path: "/sources",
});

function Cited({ source }: { source: Citation }) {
  return (
    <p>
      <a href={source.url} rel="noopener noreferrer">
        {source.name}
      </a>
      {source.accessed ? `. Accessed ${source.accessed}.` : null}
    </p>
  );
}

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Sources", path: "/sources" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Sources" }]} />
      <PageHeader
        eyebrow="Sources"
        title="Where the place facts come from"
        lede="Census place pages link here instead of repeating the same source notes. Candidate names stay on each place page, with that state's election-office citation."
      />
      <ContentTrust updated={contentUpdatedLabel("/sources")} pagePath="/sources" />
      <div className="prose-legal">
        <h2 id="names">Place-name spellings</h2>
        <p>
          Each city page uses the Census place name. The title drops the class word (city, town,
          village, borough, township, CDP, and the longer government suffixes) when that leaves a
          unique name in the state. Search and the short redirect URLs also try Saint, St., and St;
          Mount, Mt., and Mt; Fort, Ft., and Ft; Centre and Center; Harbour and Harbor; hyphens and
          spaces; apostrophes; and City, Town, Township, Village, and Borough after the place name.
          A fixed list of common misspellings is matched for a few large cities. Those spellings are
          not extra Census places. A redirect page points at the Census URL and uses that URL as its
          canonical link. If two places in one state would share a spelling, no redirect is created.
        </p>
        <p>
          A place with no 2020 population and no congressional-district row is not given its own
          page. Its name, GEOID, and that absence are listed on the county page.
        </p>

        <h2 id="gazetteer">Place names, states, and GEOIDs</h2>
        <p>
          Place name, state, and GEOID on each Census place page are from the U.S. Census Bureau
          2026 Gazetteer Files, national places file {GAZETTEER_FILE}, file date {GAZETTEER_FILE_DATE}.
          The Census Bureau spells the directory “gazetter” on that page.
        </p>
        <Cited source={gazetteerCitation} />

        <h2 id="counties">Counties</h2>
        <p>
          The current county for each place code is the 2026 Geographic Reference File. County names
          are from the 2026 Gazetteer national counties file. A place page lists up to five other
          places in the same county, ordered by 2020 Census population.
        </p>
        <Cited source={countyCitation} />
        <Cited source={countyNameCitation} />

        <h2 id="population">2020 Census population</h2>
        <p>
          Population is the 2020 Census Redistricting Data (Public Law 94-171) summary level 160
          (state-place) count in the geographic header. When that file has no population for a
          GEOID, the place page says so.
        </p>
        <Cited source={populationCitation} />

        <h2 id="districts">119th Congress district names</h2>
        <p>
          These names are the 119th Congress district names in the relationship file for the 2020
          place code. That file is not a 2026 ballot district. When the file has no row for a place
          code, the place page says so.
        </p>
        <Cited source={districtCitation} />
        <Cited source={congressionalBoundariesCitation} />

        <h2 id="house-120">U.S. House contests where the 2026 boundaries changed</h2>
        <p>
          Alabama, California, Florida, Louisiana, North Carolina, Ohio, Tennessee, Texas, and Utah
          delineated new congressional boundaries for the 2026 election. Place pages in those states
          list a U.S. House contest when the 120th Congressional District Block Equivalency File
          assigns the place’s 2020 census blocks to that district. The join keeps blocks with land
          area greater than zero.
        </p>
        <Cited source={cd120BefCitation} />

        <h2 id="house-119">U.S. House contests where the 2024 lines stayed</h2>
        <p>
          For every other state, the District of Columbia, and Puerto Rico, the Census Bureau says
          congressional boundaries did not change from the 2024 cycle. Place pages there list a U.S.
          House contest when the district number in the 119th Congressional District to 2020 Place
          relationship file matches the contest.
        </p>
        <Cited source={districtCitation} />
        <Cited source={congressionalBoundariesCitation} />

        <h2 id="nearest">Nearest Census places</h2>
        <p>
          Nearest places are ranked by distance between Census interior points in the 2026 Gazetteer
          places file. Each place page lists up to five.
        </p>
        <Cited source={gazetteerCitation} />

        <h2 id="zcta">ZIP Code Tabulation Areas</h2>
        <p>
          ZIP search uses 2020 ZIP Code Tabulation Area relationship files. Overlaps with no land
          area are omitted. A 120th Congressional District to ZCTA relationship file is not
          published, so Alabama, California, Florida, Louisiana, North Carolina, Ohio, Tennessee,
          Texas, and Utah use the ZCTA-to-block file joined to the 120th block equivalency files.
        </p>
        <Cited source={zctaPlaceCitation} />
        <Cited source={zctaCd119Citation} />
        <Cited source={zctaBlockCitation} />
      </div>
    </div>
  );
}
