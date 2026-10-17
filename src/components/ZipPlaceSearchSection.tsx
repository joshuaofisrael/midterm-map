import { ZipPlaceSearch } from "@/components/ZipPlaceSearch";
import { SourceLines } from "@/components/SourceLines";
import {
  cd120BefCitation,
  congressionalBoundariesCitation,
  zctaBlockCitation,
  zctaCd119Citation,
  zctaPlaceCitation,
} from "@/data/censusSources";

export function ZipPlaceSearchSection({ scopeName }: { scopeName?: string }) {
  return (
    <section className="max-w-3xl">
      <h2 className="font-serif text-2xl font-semibold">Find Census places by ZIP code</h2>
      <p className="mt-2 text-sm leading-6">
        A 5-digit ZIP code is matched to the Census ZIP Code Tabulation Area relationship files.
        Places and congressional districts are the overlaps that have land area, listed from the
        largest land area to the smallest. Alabama, California, Florida, Louisiana, North
        Carolina, Ohio, Tennessee, Texas, and Utah use the 120th Congressional District block
        assignments joined to the ZCTA-to-block file, because the Census Bureau has not published
        a 120th Congressional District to ZCTA relationship file. Every other state, the District
        of Columbia, and Puerto Rico use the 119th Congressional District to ZCTA file. The Census
        Bureau states that those boundaries had no changes from the 2024 cycle for the 2026
        election.
      </p>
      <SourceLines
        sources={[
          zctaPlaceCitation,
          zctaCd119Citation,
          zctaBlockCitation,
          cd120BefCitation,
          congressionalBoundariesCitation,
        ]}
      />
      <ZipPlaceSearch scopeName={scopeName} />
    </section>
  );
}
