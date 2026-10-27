# Election-night scale plan

Map the Midterms is a Next.js static export (`output: "export"`) deployed to GitHub Pages by `.github/workflows/pages.yml`. The custom domain is the `CNAME` file (`mapthemidterms.com`). DNS for that domain is changed in Cloudflare and at the registrar, not in this repo.

Baseline traffic used below: **1,000 non-bot pageviews per day**. “10×” is 10,000 a day. “50×” is 50,000 a day. A normal peak hour is treated as **20% of that day’s pageviews in one hour** (200 pageviews/hour today, about 0.056 requests/second). 10× peak is about **0.56 requests/second**. 50× peak is about **2.8 requests/second**.

Spend nothing. Every host below has a free tier. The free tiers have quotas; this file says what those quotas are.

## What visitors hit

| Request | Where it goes |
| --- | --- |
| HTML, CSS, JS, images | GitHub Pages, then Cloudflare’s cache once the proxy is on |
| `/live/results.json` | One static JSON file on this site. The browser polls it at most every 60 seconds |
| Cloudflare Web Analytics | `static.cloudflareinsights.com` beacon, token `acf65aa20fc5402db5459b56440920fe`. Leave this in the HTML |
| Google Analytics | Loaded only after the visitor clicks Accept. Reject and no choice do not download `gtag.js` |

The live tracker used to request `raw.githubusercontent.com` from every browser. That is removed. `src/components/LiveResults.tsx` fetches only `/live/results.json?t=<minute>`. The minute bucket is `Math.floor(Date.now() / 60000)`, so everyone in the same minute shares one URL and a CDN can cache it. The fetch uses the browser’s default cache mode. It does not send `cache: "no-store"`. A hidden tab does not poll. Poll-close checks, “no returns before polls close,” and “a winner label only when the official file marks that candidate” are unchanged. Parsers do not invent a percent or a winner.

## Why the JSON is not a full site rebuild

`.github/workflows/live-results.yml` runs every 5 minutes (minutes 2, 7, 12, …) from 3 November through 16 December. The script then no-ops outside 3 November–16 December 2026, and it publishes returns only after that state’s polls have closed.

The job fetches official state files and commits **one** `results.json` on the `live-results` branch. It does not run `npm run build` and it does not call `deploy-pages`.

A full rebuild is the wrong tool for a 5-minute refresh:

- The export is on the order of 30,000 Census place pages. Building and uploading it every 5 minutes would run all night.
- GitHub Pages deployments time out after 10 minutes.
- Re-uploading the whole artifact from a stale copy can roll back a newer site deploy.
- Public repositories do not pay for Actions minutes, but the deploy timeout and the rollback risk remain.

Tradeoff: the branch file is fresh every 5 minutes, and GitHub Pages itself still serves the copy baked in at the last full deploy (`public/live/results.json`, no returns before polls close). **Vote totals on the custom domain stay current only after the Cloudflare origin rule below is on.** That rule is an owner step. GitHub’s scheduler can also start a few minutes late, so a file can be 5–15 minutes behind the state office. The page says the figures are unofficial and links the official site.

The committed copy in git must stay free of early returns. `scripts/check-election-law.mjs` fails the build if it does not.

## Cloudflare setup (owner)

Do this in the Cloudflare dashboard for `mapthemidterms.com`. Do not edit DNS from this repository.

1. Add the site on the Free plan. Cloudflare shows two nameservers. At the registrar, set those nameservers. Wait until Cloudflare says the zone is active.
2. DNS records, all **Proxied** (orange cloud), matching [GitHub’s Pages IPs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain):
   - `A` `mapthemidterms.com` → `185.199.108.153`
   - `A` `mapthemidterms.com` → `185.199.109.153`
   - `A` `mapthemidterms.com` → `185.199.110.153`
   - `A` `mapthemidterms.com` → `185.199.111.153`
   - `AAAA` `mapthemidterms.com` → `2606:50c0:8000::153`
   - `AAAA` `mapthemidterms.com` → `2606:50c0:8001::153`
   - `AAAA` `mapthemidterms.com` → `2606:50c0:8002::153`
   - `AAAA` `mapthemidterms.com` → `2606:50c0:8003::153`
   - `CNAME` `www` → `mapthemidterms.com`
3. **SSL/TLS → Overview → Full (strict).** GitHub Pages serves a public certificate for the custom domain, so strict checking works. The mode asked for is Full; Full (strict) is that mode plus a certificate check. If the dashboard reports an origin certificate error, switch to **Full** until the certificate is valid, then return to Full (strict). Turn **Always Use HTTPS** on.
4. **Caching → Cache Rules.** Create three rules, in this order. Free-plan Edge Cache TTL cannot be set below **2 hours**. A 60-second edge TTL needs a paid plan. The live JSON stays about a minute fresh because each minute is a different `?t=` URL, not because the edge TTL is 60 seconds.
   - **Hashed assets.** If URI Path starts with `/_next/static/`. Cache eligibility: Eligible for cache. Edge TTL: Ignore cache-control and use 1 year. Browser TTL: 1 year. These files are content-hashed.
   - **Pictures.** If URI Path starts with `/visuals/` or `/candidates/` or URI Path equals `/og.jpg`. Eligible for cache. Edge TTL: 1 month. Browser TTL: 1 day.
   - **Live JSON.** If URI Path equals `/live/results.json`. Eligible for cache (cache everything; Cloudflare does not cache `.json` by default). Edge TTL: 2 hours (the free-plan minimum). Browser TTL: Respect existing headers. Cache key → Query string → **Include all query parameters**. Do not ignore the query string. If the query string is ignored, a 2-hour cache will serve stale totals. Status-code TTL: cache only `200`. Do not cache `404` or `500`.
   - **HTML (optional, recommended).** If URI Path ends with `/` or equals `/`. Eligible for cache. Edge TTL: 2 hours. Browser TTL: Respect existing headers. Query string: ignore (tracking parameters should not fragment the cache). Vote totals are not in the HTML. After a content deploy, **Caching → Configuration → Purge Everything** (or purge the URLs you changed) so the new HTML is not stuck for 2 hours.
5. **Rules → Transform Rules → Rewrite URL** (Rewrite to), then **Rules → Origin Rules**. Both are on the Free plan (10 rules each). Together they make `/live/results.json` come from the `live-results` branch without a Pages deploy.
   - Rewrite URL, custom filter: Hostname equals `mapthemidterms.com` AND URI Path equals `/live/results.json`.
     - Path → Rewrite to → Static: `/joshuaofisrael/midterm-map/live-results/results.json`
     - Query → Rewrite to → Static: empty (GitHub’s raw host should not see `?t=`). The **visitor** URL still has `?t=`, and that is the cache key.
   - Origin Rule, same hostname and path:
     - Host Header → Rewrite to → `raw.githubusercontent.com`
     - DNS Record → Override → `raw.githubusercontent.com`
     - Destination Port → 443
   - This is a same-origin response. The browser does not call GitHub. Only Cloudflare’s cache miss does, about once a minute per data center that sees traffic.
6. Confirm with two requests, not a load test:
   ```bash
   curl -sI "https://mapthemidterms.com/live/results.json?t=1"
   curl -s "https://mapthemidterms.com/live/results.json?t=1" | head -c 200
   ```
   Expect HTTP 200, a `cf-cache-status` header, and `"electionDay":"2026-11-03"`. A second request in the same minute should be `HIT`.
7. **Security → Bots → Block AI Bots → Off.** `src/app/robots.ts` allows those crawlers on purpose. Leave **Bot Fight Mode** off on election night so real browsers are not challenged.
8. **Web Analytics.** The beacon is already in every page. In **Analytics & logs → Web Analytics**, the site for `mapthemidterms.com` should be enabled and the token must stay `acf65aa20fc5402db5459b56440920fe`. Creating a new Web Analytics site rotates the token and the beacon stops matching until the code is updated. Do not rotate it for election night.

Do not put a Cloudflare Worker on `/live/results.json` for election night. A Worker runs before the cache, and the Free plan includes 100,000 Worker requests a day. People who leave the results page open poll once a minute, which can pass that cap. The origin rule above is cached by Cloudflare and does not use that quota.

## GitHub Pages bandwidth

GitHub’s limit is a **soft 100 GB per month** for the Pages site, and a published site may not be larger than 1 GB. Past the bandwidth quota, GitHub can stop serving the site or email the owner. [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

With the proxy on, GitHub only sends cache misses. Hashed assets are fetched once per edge. HTML, if cached for 2 hours, is fetched a few times a day per data center. The live JSON is fetched about once a minute per data center that has a visitor (the `?t=` key), which is megabytes per night, not gigabytes.

The numbers below are the **uncached** cost if Cloudflare is not in front and every pageview downloads the document plus the CSS, JS, and images that page references. Third-party beacons (Cloudflare Web Analytics, and Google Analytics only after Accept) are not GitHub bandwidth.

Measured from the local `out/` directory after `npm run build` on this change. “Cold” is the HTML plus the CSS, JavaScript, fonts, and one image format (AVIF when a `<picture>` offers it). “Warm” is the HTML only, which is the cost of a repeat view after hashed assets are cached. Bytes are the files on disk, not compressed transfer size. GitHub Pages and Cloudflare gzip or brotli the text, so the wire size is smaller than these figures. The 100 GB figure below is treated as 100,000,000,000 bytes.

| Page | HTML | Cold pageview | Warm pageview |
| --- | ---: | ---: | ---: |
| Home `/` | 374 KB | 1,175 KB | 374 KB |
| State `/states/GA/` | 156 KB | 952 KB | 156 KB |
| City `/cities/FL/miami-city/` | 16 KB | 128 KB | 16 KB |
| Election night `/live/` | 180 KB | 774 KB | 180 KB |
| Key races `/results/` | 303 KB | 897 KB | 303 KB |
| Live file `/live/results.json` | 22 KB | 22 KB | 22 KB |

An even split of the five HTML pages is about **785 KB cold** and **206 KB warm**.

| Traffic | Pageviews in 30 days | Cold, even split | Warm HTML only |
| --- | ---: | ---: | ---: |
| Today, 1,000/day | 30,000 | 24 GB | 6 GB |
| 10× | 300,000 | 236 GB | 62 GB |
| 50× | 1,500,000 | 1,178 GB | 309 GB |

10× cold traffic is already past 100 GB. 50× is past it even if GitHub only sends the HTML and every asset is cached somewhere else. That is why the Cloudflare proxy has to be on before election night. With the cache rules above, GitHub sees cache misses: hashed files about once per data center, HTML on the order of the 2-hour edge TTL, and the live JSON about once a minute per data center that has a visitor. That origin traffic stays far under 100 GB. The JSON itself is 22 KB; a thousand browsers polling it for two hours is about 2.7 GB if each poll hits GitHub, and about 100 MB if forty data centers cache each minute.

The built `out/` directory is **707 MiB**, including 97,669 spelling-variant redirect stubs (43 MiB). The published-site cap is 1 GB. There is room, and another large batch of pages can use it up. The live-results job must not upload this directory every 5 minutes.

How to read the limit: `100 GB / bytes per pageview` is how many uncached pageviews fit in the month. 10× for a 30-day month is 300,000 pageviews. 50× is 1,500,000. If the uncached weight times 1,500,000 is over 100 GB, election night needs the Cloudflare proxy. Do not load-test `mapthemidterms.com` to find this out.

## Images, cache, and indexability

- `/_next/static/` files are content-hashed by the Next.js build. Cache them for a year (rule above). `public/_headers` sets the same policy for a Netlify or Cloudflare Pages fallback. GitHub Pages ignores `_headers`.
- Shared photographs are already AVIF and WebP with width and height (`src/data/visuals.ts`, `src/components/CivicImage.tsx`). The in-view hero is eager. Other slots are lazy.
- Candidate portraits in `public/candidates/` are WebP. The short side is at most 320 pixels. The card sets `width`, `height`, `loading="lazy"`, and `decoding="async"`. Credits stay in `public/ATTRIBUTION.md`.
- `og.jpg` stays JPEG (about 40 KB) because link-preview crawlers ask for the file named in the metadata.
- Cloudflare Web Analytics loads on a normal pageview. Ezoic’s Gatekeeper, `sa.min.js`, and `ezoicanalytics.com/analytics.js` are in `<head>` on every page. `gtag.js` loads after Accept, or after Gatekeeper grants analytics storage. Tips are a link to Stripe, not Stripe.js. The contact form posts to FormSubmit only when someone sends it.
- Pages are indexable. `robots` metadata is index/follow unless a page opts out, and none of the content routes do. Spelling-variant city URLs are `noindex` redirect stubs with a canonical link to the real place; they are not in the sitemap.
- `/sitemap.xml` is a sitemap index written by `scripts/write-sitemap-index.mjs`. It lists `/sitemap/core.xml` and one file per state. `/`, `/live`, `/results`, state pages, and city pages are in those files.
- The IndexNow key file is `https://mapthemidterms.com/7d9821210489aaf528bb6f613749ac93.txt`. The body is the same key. `robots.txt` allows `/`.

## Privacy and ads.txt

`/privacy` names Cloudflare Web Analytics, Google Analytics 4 (measurement ID `G-Q9FB3RS751`), and the ad networks Google AdSense, Ezoic, and Adsterra. The Google AdSense loader (`adsbygoogle.js`, client `ca-pub-5681559774142917`) stays limited to substantive pages. The `google-adsense-account` meta tag is on every HTML page, including city, county, and redirect pages. No AdSense ad unit is placed. Ezoic’s header scripts (Gatekeeper, then `sa.min.js`, `ezstandalone`, and `ezoicanalytics.com/analytics.js`) are on every HTML page. No Ezoic ad placeholder is added on thin or noindexed pages. Adsterra scripts are not loaded. `/ads.txt` is still `google.com, pub-5681559774142917, DIRECT, f08c47fec0942fa0` and is served from `public/ads.txt`. Ezoic and Adsterra are not in that file. Analytics consent stays in `consent.js`. Where Gatekeeper’s TCF signal says GDPR applies (EEA and UK), that prompt is the only one and GA4 Consent Mode is updated from purposes 1, 7, 8, and 10. Elsewhere the site banner remains. Switzerland keeps the site banner; the Consent Mode default for CH is denied.

## Fallback: move the site off GitHub Pages

Use this if GitHub stops serving the site or the 100 GB quota is exhausted. Build once locally or in the new host’s CI:

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://mapthemidterms.com npm run build
```

The site is the `out/` directory. Do not use `next start`; this project has no Node server.

Keep the Cloudflare zone if you can. Change only the origin records, and **leave the `/live/results.json` rewrite and origin rule in place**. The live file then keeps updating every 5 minutes no matter which host serves the HTML.

### Cloudflare Pages (free)

1. dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → `joshuaofisrael/midterm-map`.
2. Production branch: `main`.
3. Framework preset: None.
4. Build command: `npm run build`
5. Build output directory: `out`
6. Environment variable: `NEXT_PUBLIC_SITE_URL` = `https://mapthemidterms.com`. Set the Node.js version to 22 (`NODE_VERSION` = `22`).
7. Deploy. Open the `*.pages.dev` URL and check `/`, `/live/`, `/results/`, one `/states/` page, one `/cities/` page, `/ads.txt`, `/sitemap.xml`, and the IndexNow key file.
8. **Custom domains** → add `mapthemidterms.com` and `www.mapthemidterms.com`. Cloudflare will offer to replace the GitHub Pages `A`/`AAAA` records. Accept that only when the `*.pages.dev` site looks right.
9. SSL/TLS stays **Full (strict)**. Pages serves a Cloudflare certificate.
10. In the GitHub repo, **Settings → Pages → Custom domain**: remove `mapthemidterms.com` after the new host answers. Until you do, GitHub and Pages can both claim the name. You can leave `.github/workflows/pages.yml` in the repo; it will not affect the domain once the custom domain is removed and DNS points at Cloudflare Pages.
11. `public/_headers` is copied into `out/` and Cloudflare Pages will honor it. The live JSON should still follow the origin rule in the zone. If that rule is missing, Cloudflare Pages may serve the baked `out/live/results.json` instead of the 5-minute file.

### Netlify (free)

Netlify’s free bandwidth quota is also about 100 GB/month. It is a working spare, not a larger pipe. Prefer Cloudflare’s cache in front if the quota is the problem.

1. app.netlify.com → **Add new site** → **Import an existing project** → GitHub → `midterm-map`.
2. Build command: `npm run build`
3. Publish directory: `out`
4. Environment variables: `NEXT_PUBLIC_SITE_URL` = `https://mapthemidterms.com`, `NODE_VERSION` = `22`.
5. Deploy and check the same URLs as above on the `*.netlify.app` host.
6. `out/_redirects` contains a forced proxy (`200!`) from `/live/results.json` to `https://raw.githubusercontent.com/joshuaofisrael/midterm-map/live-results/results.json`. Netlify fetches GitHub; the browser stays on your domain. `out/_headers` sets a 60-second `Cache-Control` on that file and a year on `/_next/static/*`. The `!` is required because the static file also exists.
7. **Domain management → Add a domain** → `mapthemidterms.com`. Netlify shows the records to create.
   - If the DNS stays on Cloudflare: set `CNAME` `mapthemidterms.com` (or the CNAME flattening / `A` records Netlify shows) to the Netlify host, **Proxied**, SSL **Full (strict)**. Keep the live-JSON origin rule.
   - If you leave Cloudflare: use the nameservers or `A`/`ALIAS` Netlify prints, and rely on `_redirects` for the live file.
8. Remove the custom domain from GitHub Pages, same as the Cloudflare Pages step.

### Switch back

Point DNS at the four GitHub Pages `A` records and four `AAAA` records again, Proxied, and put the custom domain back in the repo’s Pages settings. The `CNAME` file in the repo should still say `mapthemidterms.com`. The next push to `main` runs `.github/workflows/pages.yml`.

## Load test (local only)

Do not point this at `mapthemidterms.com`. The run below served `out/` with a small Node static server on `127.0.0.1` and used autocannon for 15 seconds. The 10× case was **1 request/second** (the peak-hour model is 0.56). The 50× case was **3 requests/second** (the model is 2.8). Latency is milliseconds on this machine. A separate uncapped run shows the files are cheap to read from disk. None of these numbers are GitHub Pages or Cloudflare capacity.

| Page | 1 rps (10×) p50 / p99 | 3 rps (50×) p50 / p99 | Errors |
| --- | --- | --- | ---: |
| `/` | 2 ms / 7 ms | 3 ms / 7 ms | 0 |
| `/states/GA/` | 1 ms / 3 ms | 2 ms / 4 ms | 0 |
| `/cities/FL/miami-city/` | 1 ms / 2 ms | 1 ms / 2 ms | 0 |
| `/live/` | 1 ms / 3 ms | 2 ms / 5 ms | 0 |
| `/results/` | 2 ms / 10 ms | 2 ms / 5 ms | 0 |
| `/live/results.json` | 1 ms / 2 ms | 1 ms / 6 ms | 0 |

Uncapped, 20 connections, 8 seconds, same local server: home about 920 requests/second (p99 44 ms), `/live/` about 2,400 requests/second (p99 16 ms), the JSON about 17,000 requests/second (p99 2 ms). Zero errors. That only means the static files are small. GitHub Pages will not do this, and it was not asked to.

A light production check, three HEAD requests, returned 200 for `/`, `/ads.txt`, and the IndexNow key file. That was not a load test.

## Owner checklist before 3 November 2026

- Cloudflare proxy on, SSL Full (strict), the three cache rules, the URL rewrite, and the origin rule. One curl of `/live/results.json?t=1` returns the JSON.
- Block AI Bots off. Web Analytics on, token unchanged.
- GitHub Actions → Live election results: the scheduled workflow is enabled (not disabled). A manual dry run (`workflow_dispatch`, dry run checked) should finish without deploying Pages.
- Do not load-test the production domain. A couple of `curl` checks are enough.
