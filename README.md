# Map the Midterms

Public informational website for the **U.S. 2026 midterm elections** (Election Day **Tuesday, November 3, 2026**).

**Map the Midterms** is an unfiled brand / service name of **Joshua Israel Ventures LLC**, a Florida limited liability company (Sunbiz document number **L26000261819**, ACTIVE). It is not a separate company and is not claimed here as a filed DBA or trademark.

The site is a **voter information utility**: ballot sketches, race-guide templates, demo poll/rating boards, and a results-tracker shell. It is **not** an official election website.

Production URL: **https://mapthemidterms.com** (apex is canonical).

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Typed local modules under `src/data/`
- Vercel-ready (`npm run build` / `npm run start`)

No paid election APIs. No fake API keys. ZIP lookup is client-side.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (must succeed)
npm run start    # serve the production build
npm run lint     # Next.js ESLint
```

Set `NEXT_PUBLIC_SITE_URL` to the public origin (defaults to `https://mapthemidterms.com` for canonical / OG / sitemap URLs).

## Domain / deploy

- Domain **mapthemidterms.com** is registered at Namecheap.
- After deploying this Next.js app to Vercel, point Namecheap DNS to Vercel (Vercel nameservers, or the A / CNAME records Vercel shows for the project).
- Add both `mapthemidterms.com` and `www.mapthemidterms.com` in the Vercel project. Apex is canonical; `next.config.ts` redirects `www` to apex.
- In the Vercel project environment, set `NEXT_PUBLIC_SITE_URL=https://mapthemidterms.com`.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home, Election Day, CTAs, featured races |
| `/ballot` | ZIP / state lookup |
| `/ballot/[state]` | Structured sample ballot sections |
| `/races` | Race guide index |
| `/races/[slug]` | Race guide template |
| `/polls` | Ratings board + demo poll tables |
| `/results` | House/Senate meters, key races, pre-election mode |
| `/results/[slug]` | Per-race unofficial-returns shell |
| `/states/[state]` | State hub |
| `/about` `/disclaimer` `/privacy` `/terms` | Legal |
| `/sitemap.xml` `/robots.txt` | Crawlers |

Starter states: AZ, GA, MI, NC, NV, OH, PA, WI, TX, FL, CA, NY.

## Where LLC legal copy lives

| Topic | Files |
|-------|--------|
| Entity, brand note, email, Election Day, official-not-us sentence | `src/data/site.ts` |
| Organization + WebSite JSON-LD | `src/app/layout.tsx` |
| Footer + sitewide banner | `src/components/SiteFooter.tsx`, `src/components/SiteShell.tsx` |
| Ballot / results verify notices | `src/components/OfficialNotice.tsx` plus Ballot and Results pages |
| Full legal prose | `src/app/about/page.tsx`, `disclaimer/page.tsx`, `privacy/page.tsx`, `terms/page.tsx` |
| Owner checklist (not a lawyer sign-off) | `docs/COMPLIANCE.md` |

Do **not** invent a street address or publish an EIN. If a location is required, keep **Miami Beach, FL**.

## How to rename the brand

1. Change `name`, `tagline`, `description`, `url`, and `brandNote` in `src/data/site.ts`.
2. Update `NEXT_PUBLIC_SITE_URL` and the www→apex redirect host in `next.config.ts`.
3. Search the repo for `Map the Midterms` / `mapthemidterms.com` (README, COMPLIANCE, OG image).
4. Keep `legalName` as `Joshua Israel Ventures LLC` unless the operating entity actually changes.
5. Repeat that the public name is an unfiled brand of the LLC unless counsel says a DBA/trademark has been filed.

## How to replace demo data

All product numbers and placeholder candidates are local TypeScript modules:

| Data | File |
|------|------|
| Starter states, official office links, voting-process notes | `src/data/states.ts` |
| Race guides, demo candidate lines, editorial ratings | `src/data/races.ts` |
| Seeded poll rows and national strip | `src/data/polls.ts` |
| ZIP3 → state map (browser only) | `src/data/zip.ts` |
| Results shells, chamber meters, Election Day helper | `src/data/results.ts` |
| Sample ballot section builder | `src/data/ballots.ts` |

When real feeds exist:

1. Keep types in `src/data/types.ts`.
2. Remove `isDemo: true` only for rows that are actually sourced and dated.
3. Do not label unofficial returns as certified.
4. Do not add donate-to-campaign CTAs.
5. Update `/privacy` before adding analytics or server-side ZIP processing.

## Design and SEO

Calm civic news palette (navy / neutrals). Source Serif + Source Sans. No meme politics, party propaganda, or government-seal cosplay. Open Graph image is generated in `src/app/opengraph-image.tsx`. Internal links cross ballot, races, polls, results, and state hubs.

## Out of scope (intentionally)

Live government APIs, paid Associated Press results, user accounts, comments, candidate fundraising, and scraped voter PII.

## License / contact

Operated by Joshua Israel Ventures LLC. Email `joshuaofisrael@gmail.com` with subject `[Contact: Map the Midterms]`.
