# Map the Midterms: county and city indexing criteria

A census place page or county page stays in the index only when the stored
local-election file has a contest for that jurisdiction. The rule is
`contestHasSubstance` in `src/lib/cityThin.ts`. Search traffic is not an input.

## What counts

A contest qualifies when it has an office or question line, a named candidate,
or an incumbent line. Place contests are `local[geoid]`. County contests are
`localByCounty[county name]`.

## What does not count

- County contests or county notes repeated on every place in the county
- U.S. House and statewide candidate lists
- Census population, GEOID, and district-name rows
- Rotated intro sentences built from those shared facts
- A source citation with no contest
- A note that a contest exists but its wording or names were not copied
- An empty-list line or a "no official listing" line

Pages that do not qualify are `noindex, follow`, left out of the sitemap, and
kept live. State indexes (`/cities/` and `/cities/XX/`), race and candidate
pages, results, ballot, representatives, learn, and legal pages are not part
of this rule.

Redirect stubs from the zero-impression prune stay redirects. They are not
reopened by this rule, including the stubs whose stored file does contain a
contest.

## Counts (live pages, 20 Nov 2026)

- City pages indexed: 242
- City pages noindex: 30,687
- County pages indexed: 298
- County pages noindex: 770

The absolute URLs of the noindex pages are in `src/data/places/noindex-urls.txt`.
