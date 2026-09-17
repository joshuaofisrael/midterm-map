# Map the Midterms

Public informational website for the **U.S. 2026 midterm elections** (Election Day **Tuesday, November 3, 2026**).

**Map the Midterms** is an unfiled brand / service name of **Joshua Israel Ventures LLC**, a Florida limited liability company (Sunbiz document number **L26000261819**, ACTIVE). It is not a separate company and is not claimed here as a filed DBA or trademark.

The site is a **voter information utility**: ballot sketches, race-guide templates, demo poll/rating boards, and a results-tracker shell. It is **not** an official election website.

Production URL: **https://mapthemidterms.com** (apex is canonical). Hosted on **free GitHub Pages** — not Vercel or any paid host.

## Stack

- Next.js App Router with `output: "export"` (static HTML in `out/`)
- TypeScript
- Tailwind CSS
- Typed local modules under `src/data/`
- GitHub Pages + GitHub Actions

No paid election APIs. No fake API keys. ZIP lookup is client-side.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/ (must succeed)
npm run start    # serve out/ at http://localhost:3000
npm run lint     # Next.js ESLint
```

Set `NEXT_PUBLIC_SITE_URL` to the public origin (defaults to `https://mapthemidterms.com` for canonical / OG / sitemap URLs).

## Deploy (free GitHub Pages)

This repo deploys a static export. Do **not** attach Vercel or another paid host.

### One-time GitHub settings

1. Repo **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. After the first successful workflow run, confirm **Custom domain** is `mapthemidterms.com` (the deployed `CNAME` file sets this). Apex is the canonical host.
4. After DNS resolves, enable **Enforce HTTPS**.

Pushes to `main` run `.github/workflows/pages.yml` (`npm ci`, `npm run build`, `actions/upload-pages-artifact`, `actions/deploy-pages`). You can also run the workflow from the Actions tab.

Cloudflare Web Analytics token is embedded for mapthemidterms.com; replace the token in `src/components/CloudflareAnalytics.tsx` if rotated.

### Namecheap DNS

Domain **mapthemidterms.com** is registered at Namecheap. Point DNS at GitHub Pages (not Vercel):

**Apex (`@` / `mapthemidterms.com`) — A records**

| Type | Host | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**www — CNAME**

| Type | Host | Value |
|------|------|--------|
| CNAME | `www` | `joshuaofisrael.github.io` |

Remove Namecheap parking / placeholder records that conflict. GitHub Pages will serve the apex domain from the `CNAME` file (`mapthemidterms.com`) and typically redirect `www` to apex once both records are live.

Optional IPv6 AAAA records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

Do not use `https://joshuaofisrael.github.io/midterm-map/` as the public URL. Canonical links assume the custom domain at the site root.

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
2. Update `NEXT_PUBLIC_SITE_URL`, `public/CNAME`, root `CNAME`, and the workflow `NEXT_PUBLIC_SITE_URL`.
3. Search the repo for `Map the Midterms` / `mapthemidterms.com` (README, COMPLIANCE, `public/og.png`).
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

Calm civic news palette (navy / neutrals). Source Serif + Source Sans. No meme politics, party propaganda, or government-seal cosplay. Open Graph image is the static file `public/og.png`. Internal links cross ballot, races, polls, results, and state hubs.

## Out of scope (intentionally)

Live government APIs, paid Associated Press results, user accounts, comments, candidate fundraising, scraped voter PII, and paid hosting.

## License / contact

Operated by Joshua Israel Ventures LLC. Email `joshuaofisrael@gmail.com` with subject `[Contact: Map the Midterms]`.
