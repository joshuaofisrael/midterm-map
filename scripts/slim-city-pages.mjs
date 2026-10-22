/**
 * Next's static export writes an RSC flight payload into every city HTML file
 * and a second copy as index.txt. At ~32,000 places that exceeds the GitHub
 * Pages site size limit. City pages are fully static facts, so this keeps the
 * rendered document (metadata, CSS, visible HTML, JSON-LD) and drops the
 * flight payload. State indexes stay as normal Next pages so place search keeps
 * its script. County indexes are static lists, so their flight payload and
 * index.txt copies are removed the same way.
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
    .replace(/<script\b(?![^>]*\bdata-keep=)[^>]*\bsrc=[^>]*>\s*<\/script>/g, "")
    .replace(/<script\b(?![^>]*type="application\/ld\+json")(?![^>]*\bdata-keep=)[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<div hidden=""><!--\$--><!--\/\$--><\/div>/g, "");
  return withoutFlight;
}

let pages = 0;
let countyPages = 0;
let bytes = 0;

for (const state of fs.readdirSync(citiesDir)) {
  const stateDir = path.join(citiesDir, state);
  if (!fs.statSync(stateDir).isDirectory()) continue;
  for (const city of fs.readdirSync(stateDir)) {
    if (city === "county") continue;
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
    if (!slim.includes("G-Q9FB3RS751") || !slim.includes("/consent.js")) {
      throw new Error(`Analytics consent tags missing in ${htmlPath}`);
    }
    if (!slim.includes("/sources/#gazetteer")) {
      throw new Error(`Sources link missing in ${htmlPath}`);
    }
    if (slim.includes("Starter state hubs") || slim.includes('"@type":"Organization"')) {
      throw new Error(`Long site chrome remained in ${htmlPath}`);
    }
    fs.writeFileSync(htmlPath, slim);
    const txtPath = path.join(cityDir, "index.txt");
    if (fs.existsSync(txtPath)) fs.unlinkSync(txtPath);
    pages += 1;
    bytes += Buffer.byteLength(slim);
  }

  const countyDir = path.join(stateDir, "county");
  if (!fs.existsSync(countyDir)) continue;
  for (const county of fs.readdirSync(countyDir)) {
    const pageDir = path.join(countyDir, county);
    if (!fs.statSync(pageDir).isDirectory()) continue;
    const htmlPath = path.join(pageDir, "index.html");
    if (!fs.existsSync(htmlPath)) continue;
    const slim = slimHtml(fs.readFileSync(htmlPath, "utf8"));
    if (slim.includes("__next_f") || slim.includes("self.__next")) {
      throw new Error(`Flight payload remained in ${htmlPath}`);
    }
    if (!slim.includes('rel="canonical"') || !slim.includes("Unofficial information")) {
      throw new Error(`Required county markup missing in ${htmlPath}`);
    }
    fs.writeFileSync(htmlPath, slim);
    const txtPath = path.join(pageDir, "index.txt");
    if (fs.existsSync(txtPath)) fs.unlinkSync(txtPath);
    countyPages += 1;
    bytes += Buffer.byteLength(slim);
  }
}

let standalone = 0;
for (const state of manifest.states) {
  const places = JSON.parse(
    fs.readFileSync(new URL(`../src/data/places/${state.code}.json`, import.meta.url), "utf8"),
  );
  for (const place of places) {
    if (place.pop != null || (place.districts && place.districts.length > 0)) standalone += 1;
  }
}

if (pages !== standalone) {
  throw new Error(
    `Slimmed ${pages} city pages; ${standalone} places have a population or a congressional district (${manifest.placeCount} Census places total).`,
  );
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
  `Slimmed ${pages} city pages and ${countyPages} county pages (${(bytes / (1024 * 1024)).toFixed(1)} MiB HTML). out/ is ${(outBytes / (1024 * 1024)).toFixed(1)} MiB (${gib.toFixed(3)} GiB).`,
);
if (outBytes >= 1024 * 1024 * 1024) {
  throw new Error("out/ is at least 1 GiB");
}
