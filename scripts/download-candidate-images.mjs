#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "public/candidates";
mkdirSync(OUT, { recursive: true });

const SEARCHES = [
  ["jon-ossoff.jpg", "Jon Ossoff"],
  ["mike-collins.jpg", "Mike Collins Georgia congress"],
  ["abdul-el-sayed.jpg", "Abdul El-Sayed"],
  ["mike-rogers.jpg", "Mike Rogers Michigan congress"],
  ["roy-cooper.jpg", "Roy Cooper governor"],
  ["ken-paxton.jpg", "Ken Paxton"],
  ["katie-hobbs.jpg", "Katie Hobbs"],
  ["andy-biggs.jpg", "Andy Biggs"],
  ["keisha-lance-bottoms.jpg", "Keisha Lance Bottoms"],
  ["jocelyn-benson.jpg", "Jocelyn Benson"],
  ["john-james.jpg", "John James Michigan"],
  ["joe-lombardo.jpg", "Joe Lombardo"],
  ["vivek-ramaswamy.jpg", "Vivek Ramaswamy Gage Skidmore"],
  ["josh-shapiro.jpg", "Josh Shapiro"],
  ["stacy-garrity.jpg", "Stacy Garrity"],
  ["tom-tiffany.jpg", "Tom Tiffany"],
  ["byron-donalds.jpg", "Byron Donalds"],
  ["david-jolly.jpg", "David Jolly"],
  ["xavier-becerra.jpg", "Xavier Becerra"],
  ["kathy-hochul.jpg", "Kathy Hochul"],
  ["greg-abbott.jpg", "Greg Abbott"],
  ["rich-mccormick.jpg", "Rich McCormick"],
  ["tom-barrett.jpg", "Tom Barrett Michigan congress"],
  ["don-davis.jpg", "Don Davis North Carolina congress"],
  ["susie-lee.jpg", "Susie Lee congress"],
  ["marcy-kaptur.jpg", "Marcy Kaptur"],
  ["ryan-mackenzie.jpg", "Ryan Mackenzie congress"],
  ["derrick-van-orden.jpg", "Derrick Van Orden"],
  ["monica-de-la-cruz.jpg", "Monica De La Cruz"],
  ["anna-paulina-luna.jpg", "Anna Paulina Luna"],
  ["adam-gray.jpg", "Adam Gray congress"],
  ["john-mannion.jpg", "John Mannion congress"],
];

const attribution = [];

async function commonsSearch(query) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrsearch", query);
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "5");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|extmetadata|mime|size");
  url.searchParams.set("iiurlwidth", "512");
  const res = await fetch(url, { headers: { "User-Agent": "MapTheMidterms/1.0 (voter information; joshuaofisrael@gmail.com)" } });
  if (!res.ok) throw new Error(`Commons search failed ${res.status}`);
  return res.json();
}

function isSafeLicense(meta) {
  const license = (meta?.LicenseShortName?.value || meta?.License?.value || "").toLowerCase();
  const artist = meta?.Artist?.value || "";
  const pd =
    license.includes("public domain") ||
    license.includes("pd") ||
    license.includes("cc0") ||
    license.includes("cc-zero") ||
    /cc by/i.test(license) ||
    license.includes("cc-by");
  return { ok: Boolean(pd), license: license || "unknown", artist };
}

function stripHtml(html = "") {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

for (const [filename, query] of SEARCHES) {
  const dest = join(OUT, filename);
  if (existsSync(dest)) {
    console.log("exists", filename);
    continue;
  }
  try {
    const data = await commonsSearch(query);
    const pages = Object.values(data?.query?.pages ?? {});
    let saved = false;
    for (const page of pages) {
      const info = page.imageinfo?.[0];
      if (!info?.url) continue;
      const mime = info.mime || "";
      if (!mime.startsWith("image/")) continue;
      const { ok, license, artist } = isSafeLicense(info.extmetadata || {});
      if (!ok) continue;
      const imageUrl = info.thumburl || info.url;
      const img = await fetch(imageUrl, { headers: { "User-Agent": "MapTheMidterms/1.0 (voter information; joshuaofisrael@gmail.com)" } });
      if (!img.ok) continue;
      const buf = Buffer.from(await img.arrayBuffer());
      writeFileSync(dest, buf);
      attribution.push({
        file: filename,
        title: page.title,
        license,
        artist: stripHtml(artist),
        page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}`,
      });
      console.log("saved", filename, page.title);
      saved = true;
      break;
    }
    if (!saved) console.log("skip", filename);
  } catch (error) {
    console.log("error", filename, error.message);
  }
}

writeFileSync("public/ATTRIBUTION.md", `# Candidate image attribution

Downloaded from Wikimedia Commons on 17 September 2026. Only public-domain, CC0, or Creative Commons Attribution works are stored here. Missing portraits fall back to initials on the site.

| File | Commons title | License | Artist | Page |
| --- | --- | --- | --- | --- |
${attribution.map((row) => `| \`${row.file}\` | ${row.title} | ${row.license} | ${row.artist || "—"} | ${row.page} |`).join("\n")}
`);
