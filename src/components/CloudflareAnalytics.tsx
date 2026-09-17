import Script from "next/script";

/** Public Cloudflare Web Analytics token for mapthemidterms.com. Safe in the frontend. */
export const CLOUDFLARE_WEB_ANALYTICS_TOKEN = "acf65aa20fc5402db5459b56440920fe";

/**
 * Sitewide Cloudflare Web Analytics beacon for the GitHub Pages static export.
 * Replace {@link CLOUDFLARE_WEB_ANALYTICS_TOKEN} if the token is rotated.
 */
export function CloudflareAnalytics() {
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      type="module"
      data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_WEB_ANALYTICS_TOKEN })}
    />
  );
}
