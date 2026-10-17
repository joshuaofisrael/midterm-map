/**
 * Next's static export writes an RSC flight payload into every city HTML file
 * and a second copy as index.txt. At ~32,000 places that exceeds the GitHub
 * Pages site size limit. City pages are fully static facts, so this keeps the
 * rendered document (metadata, CSS, visible HTML, JSON-LD) and drops the
 * flight payload. State indexes stay as normal Next pages.
 */
import fs from "node:fs";
import path from "node:path";

const manifest = JSON.parse(
  fs.readFileSync(new URL("../src/data/places/manifest.json", import.meta.url), "utf8"),
);
const outDir = path.join(process.cwd(), "out");
const citiesDir = path.join(outDir, "cities");

function slimHtml(html) {
  const withoutFlight = html
    .replace(/<link rel="preload" as="script"[^>]*>/g, "")
    .replace(/<script\b[^>]*\bsrc=[^>]*>\s*<\/script>/g, "")
    .replace(/<script\b(?![^>]*type="application\/ld\+json")[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<div hidden=""><!--\$--><!--\/\$--><\/div>/g, "");
  return withoutFlight;
}

let pages = 0;
let bytes = 0;

for (const state of fs.readdirSync(citiesDir)) {
  const stateDir = path.join(citiesDir, state);
  if (!fs.statSync(stateDir).isDirectory()) continue;
  for (const city of fs.readdirSync(stateDir)) {
    const cityDir = path.join(stateDir, city);
    if (!fs.statSync(cityDir).isDirectory()) continue;
    const htmlPath = path.join(cityDir, "index.html");
    if (!fs.existsSync(htmlPath)) continue;
    const slim = slimHtml(fs.readFileSync(htmlPath, "utf8"));
    if (slim.includes("__next_f") || slim.includes("self.__next")) {
      throw new Error(`Flight payload remained in ${htmlPath}`);
    }
    if (!slim.includes('rel="canonical"') || !slim.includes("Unofficial information")) {
      throw new Error(`Required city markup missing in ${htmlPath}`);
    }
    if (!slim.includes("2026_Gaz_place_national.zip") || !slim.includes("September 8, 2026")) {
      throw new Error(`Gazetteer citation missing in ${htmlPath}`);
    }
    fs.writeFileSync(htmlPath, slim);
    const txtPath = path.join(cityDir, "index.txt");
    if (fs.existsSync(txtPath)) fs.unlinkSync(txtPath);
    pages += 1;
    bytes += Buffer.byteLength(slim);
  }
}

if (pages !== manifest.placeCount) {
  throw new Error(`Slimmed ${pages} city pages; manifest has ${manifest.placeCount}`);
}

function walkBytes(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) total += walkBytes(full);
    else total += fs.statSync(full).size;
  }
  return total;
}

const outBytes = walkBytes(outDir);
const gib = outBytes / (1024 * 1024 * 1024);
console.log(
  `Slimmed ${pages} city pages (${(bytes / (1024 * 1024)).toFixed(1)} MiB HTML). out/ is ${(outBytes / (1024 * 1024)).toFixed(1)} MiB (${gib.toFixed(3)} GiB).`,
);
if (outBytes >= 1024 * 1024 * 1024) {
  throw new Error("out/ is at least 1 GiB");
}
