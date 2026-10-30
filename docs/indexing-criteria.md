# Map the Midterms: county and city indexing criteria (30 Oct 2026)

Owner instruction (30 Oct): keep county/city pages with real intros indexed; noindex
and drop from the sitemap only the thinnest pages. Pages stay live.

## Rule (code: `src/lib/cityThin.ts`, used by the city page metadata and `src/app/sitemap.ts`)
A census-place (city) page is noindex,follow and left out of the sitemap when BOTH:
1. it has no place- or county-level local contest data (no local races, no county
   listing note, no "unpublished" county record), and
2. its population is under `CITY_INDEX_MIN_POP` (10,000).

Every county page stays indexed: each one has unique facts (its own place list,
congressional districts and data-driven intro from `src/lib/placeIntro.ts`).

## Counts (production build of 30 Oct 2026)
- County pages indexed: 3,219
- City pages indexed: 10,119
- City pages noindex (kept live, out of sitemap): 21,773
- Alias/redirect pages (noindex): 97,669

## Undo
Lower `CITY_INDEX_MIN_POP` to 0 (or make `cityIsThin` return false) and rebuild.
