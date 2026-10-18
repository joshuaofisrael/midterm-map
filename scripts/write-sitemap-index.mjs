import fs from "node:fs";
import path from "node:path";

const manifest = JSON.parse(
  fs.readFileSync(new URL("../src/data/places/manifest.json", import.meta.url), "utf8"),
);
const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mapthemidterms.com").replace(/\/+$/, "");
const lastmod = "2026-10-18";
const ids = ["core", ...manifest.states.map((state) => state.code).sort()];

for (const state of manifest.states) {
  if (state.count + 1 >= 50000) {
    throw new Error(`State sitemap for ${state.code} would have ${state.count + 1} URLs`);
  }
}

const body = ids
  .map(
    (id) =>
      `  <sitemap>\n    <loc>${base}/sitemap/${id}.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
const out = path.join(process.cwd(), "public", "sitemap.xml");
fs.writeFileSync(out, xml);
console.log(`Wrote ${out} with ${ids.length} sitemaps`);
