/** Public Cloudflare Web Analytics token for mapthemidterms.com. Safe in the frontend. */
export const CLOUDFLARE_WEB_ANALYTICS_TOKEN = "acf65aa20fc5402db5459b56440920fe";

/**
 * Sitewide Cloudflare Web Analytics beacon for the GitHub Pages static export.
 * Uses a native script tag so `output: "export"` keeps the beacon and token in HTML.
 * Replace {@link CLOUDFLARE_WEB_ANALYTICS_TOKEN} if the token is rotated.
 */
export function CloudflareAnalytics() {
  return (
    <script
      type="module"
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_WEB_ANALYTICS_TOKEN })}
    />
  );
}
