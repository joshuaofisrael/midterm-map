/**
 * Builds public/place-search/{letter}.json for the place-name search.
 * Each row is [state, slug, census name, primary county, population, path].
 * A place is filed under every first letter of its search keys.
 */
import fs from "node:fs";
import path from "node:path";
import { placeIsStandalone, placeTargetPath, searchKeys } from "../src/lib/placeNames.ts";

type Row = [string, string, string, string, number | null, string];

const root = process.cwd();
const dir = path.join(root, "src/data/places");
const outDir = path.join(root, "public/place-search");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const shards = new Map<string, Map<string, Row>>();
let places = 0;
let standalone = 0;

function shard(letter: string): Map<string, Row> {
  const key = /[a-z]/.test(letter) ? letter : "0";
  let rows = shards.get(key);
  if (!rows) {
    rows = new Map();
    shards.set(key, rows);
  }
  return rows;
}

for (const file of fs.readdirSync(dir)) {
  if (!/^[A-Z]{2}\.json$/.test(file)) continue;
  const code = file.slice(0, 2);
  const list = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")) as Array<{
    geoid: string;
    slug: string;
    name: string;
    pop: number | null;
    counties: string[];
    districts?: string[];
  }>;
  for (const place of list) {
    places += 1;
    if (placeIsStandalone(place)) standalone += 1;
    const row: Row = [code, place.slug, place.name, place.counties[0] ?? "", place.pop, placeTargetPath(code, place)];
    const id = `${code}/${place.slug}`;
    const letters = new Set<string>();
    for (const key of searchKeys(place.name)) letters.add(key[0] ?? "0");
    for (const letter of letters) shard(letter).set(id, row);
  }
}

let bytes = 0;
for (const [letter, rows] of shards) {
  const json = JSON.stringify([...rows.values()]);
  const file = path.join(outDir, `${letter}.json`);
  fs.writeFileSync(file, json);
  bytes += Buffer.byteLength(json);
}

console.log(
  `place-search: ${places} places, ${standalone} standalone pages, ${places - standalone} listed only on a county page, ${shards.size} shards, ${(bytes / 1024).toFixed(0)} KiB`,
);
