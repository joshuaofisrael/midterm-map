/**
 * Resolve Ballotpedia profile URLs for candidates shown on the site.
 *
 * Lists come from each state's Ballotpedia elections page for 2026
 * (federal and state tables) and, for city and county contests, from the
 * county candidate list that page loads. A profile is stored only after the
 * profile URL itself returns HTTP 200, is not a disambiguation page, and
 * mentions the same state or office.
 *
 * Requests use a named user agent, wait between calls, and are cached in
 * src/data/ballotpedia/cache.json so a later run does not repeat them.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import {
  countyOptions,
  electionsTitle,
  jurisdictionKey,
  ledeFrom,
  matchNames,
  mentionsOffice,
  mentionsState,
  nameTokens,
  parseCandidateRows,
  placeStem,
  profileAcceptable,
  rowsForContest,
  rowsForLocal,
} from "./ballotpedia-lib.mjs";

const UA = "Mozilla/5.0 (compatible; MapTheMidterms/1.0; +https://mapthemidterms.com)";
const GAP_MS = 700;
const root = process.cwd();
const cachePath = path.join(root, "src/data/ballotpedia/cache.json");
const linksPath = path.join(root, "src/data/ballotpedia/race-links.json");
const reportPath = path.join(root, "docs/ballotpedia-unresolved.md");

const args = new Set(process.argv.slice(2));
const stateArg = process.argv.find((arg) => arg.startsWith("--states="));
const onlyStates = stateArg ? new Set(stateArg.slice("--states=".length).split(",").map((code) => code.toUpperCase())) : null;
const skipLocal = args.has("--skip-local");
const skipProfiles = args.has("--skip-profiles");
const noApply = args.has("--no-apply");

const pollClose = readFileSync(path.join(root, "src/data/pollClose.ts"), "utf8");
const stateNames = new Map();
for (const match of pollClose.matchAll(/code:\s*"([A-Z]{2})"[\s\S]*?name:\s*"([^"]+)"/g)) {
  stateNames.set(match[1], match[2]);
}

let cache = { userAgent: UA, states: {}, local: {}, profiles: {} };
if (existsSync(cachePath)) {
  cache = JSON.parse(readFileSync(cachePath, "utf8"));
  cache.userAgent = UA;
  cache.states ??= {};
  cache.local ??= {};
  cache.profiles ??= {};
}

let nextSlot = 0;
let requests = 0;

function saveCache() {
  mkdirSync(path.dirname(cachePath), { recursive: true });
  writeFileSync(cachePath, JSON.stringify(cache));
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function politeFetch(url) {
  const now = Date.now();
  const wait = Math.max(0, nextSlot - now);
  nextSlot = Math.max(nextSlot, now) + GAP_MS;
  if (wait) await sleep(wait);
  let lastError = null;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": UA,
          Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
      });
      requests += 1;
      if (response.status === 429 || response.status === 503 || response.status === 202) {
        const retry = Number(response.headers.get("retry-after")) || 10 * (attempt + 1);
        console.error(`backoff ${response.status} ${retry}s ${url}`);
        await sleep(retry * 1000);
        nextSlot = Date.now() + GAP_MS;
        continue;
      }
      const body = await response.text();
      return { status: response.status, url: response.url, body };
    } catch (error) {
      lastError = error;
      console.error(`fetch error ${url}: ${error.message}`);
      await sleep(5000 * (attempt + 1));
      nextSlot = Date.now() + GAP_MS;
    }
  }
  throw lastError ?? new Error(`gave up ${url}`);
}

function readJson(rel) {
  return JSON.parse(readFileSync(path.join(root, rel), "utf8"));
}

function publishedCandidateStates() {
  const codes = [];
  for (const file of readdirSync(path.join(root, "src/data/candidates"))) {
    if (!file.endsWith(".json")) continue;
    const code = file.slice(0, -5);
    const data = readJson(`src/data/candidates/${file}`);
    if (data.status === "published") codes.push(code);
  }
  return codes;
}

function extractRaces() {
  const races = [];
  for (const file of ["senate.ts", "house.ts", "governors.ts", "expansion.ts"]) {
    const text = readFileSync(path.join(root, "src/data/races", file), "utf8");
    const parts = text.split(/\n  \{\n    slug: "/).slice(1);
    for (const part of parts) {
      const slug = part.match(/^([^"]+)"/)?.[1];
      const state = part.match(/\n    state: "([A-Z]{2})"/)?.[1];
      const chamber = part.match(/\n    chamber: "([^"]+)"/)?.[1];
      const office = part.match(/\n    office: "([^"]+)"/)?.[1];
      const district = part.match(/\n    district: "([^"]+)"/)?.[1] ?? null;
      if (!slug || !state || !chamber || !office) continue;
      const block = part.split(/\n  \},/)[0];
      const names = [...block.matchAll(/\bname: "((?:\\.|[^"\\])*)"/g)].map((match) =>
        match[1].replace(/\\"/g, '"').replace(/\\n/g, " "),
      );
      races.push({ slug, state, kind: chamber, office, district, names });
    }
  }
  return races;
}

async function ensureState(code) {
  const name = stateNames.get(code);
  if (!name) throw new Error(`no state name for ${code}`);
  const cached = cache.states[code];
  if (cached?.status === 200 && Array.isArray(cached.candidates)) return cached;
  const title = electionsTitle(name);
  const page = `https://ballotpedia.org/${title}`;
  console.error(`state ${code} ${page}`);
  const response = await politeFetch(page);
  const candidates = response.status === 200 ? parseCandidateRows(response.body) : [];
  const counties = response.status === 200 ? countyOptions(response.body) : [];
  cache.states[code] = {
    page,
    status: response.status,
    finalUrl: response.url,
    fetched: new Date().toISOString(),
    candidates,
    counties,
  };
  saveCache();
  console.error(`  ${code} status ${response.status} rows ${candidates.length} counties ${counties.length}`);
  return cache.states[code];
}

function countyIdFor(stateCache, countyName) {
  const want = jurisdictionKey(countyName);
  const compact = (value) => value.replace(/ /g, "");
  let hits = stateCache.counties.filter((county) => jurisdictionKey(county.name) === want);
  if (hits.length !== 1) {
    hits = stateCache.counties.filter((county) => compact(jurisdictionKey(county.name)) === compact(want));
  }
  if (hits.length === 1) return hits[0];
  return null;
}

async function ensureLocal(code, county) {
  const key = `${code}:${county.id}`;
  const cached = cache.local[key];
  if (cached?.status === 200 && Array.isArray(cached.candidates)) return cached;
  const name = stateNames.get(code);
  const title = electionsTitle(name);
  const candidates = [];
  let status = 0;
  let pages = 1;
  for (let page = 1; page <= pages; page += 1) {
    const url = new URL("https://bpwidget.net/apps/candidate-list-data");
    url.searchParams.set("columns", "candidate,office,party,status");
    url.searchParams.set("level", "Local");
    url.searchParams.set("show_state", "false");
    url.searchParams.set("state", code);
    url.searchParams.set("year", "2026");
    url.searchParams.set("title", title);
    url.searchParams.set("section", "Local");
    url.searchParams.set("fragment", "results");
    url.searchParams.set("groupcandidatesby", "level");
    url.searchParams.set("countyid", county.id);
    url.searchParams.set("page", String(page));
    console.error(`local ${code} ${county.name} page ${page}/${pages}`);
    const response = await politeFetch(url);
    status = response.status;
    if (response.status !== 200) break;
    candidates.push(...parseCandidateRows(response.body));
    if (page === 1) {
      const totalMatch = response.body.match(/of\s+([\d,]+)\s+results/i);
      const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : 0;
      const numbered = [...response.body.matchAll(/page=(\d+)/g)].map((match) => Number(match[1]));
      const fromTotal = total > 0 ? Math.ceil(total / 25) : 1;
      pages = Math.max(1, fromTotal, ...numbered);
    }
  }
  cache.local[key] = {
    state: code,
    county: county.name,
    countyId: county.id,
    sourcePage: cache.states[code]?.page ?? "",
    status,
    pages,
    fetched: new Date().toISOString(),
    candidates,
  };
  saveCache();
  console.error(`  ${code} ${county.name} rows ${candidates.length}`);
  return cache.local[key];
}

function titleMatches(title, name) {
  const cleaned = String(title ?? "").replace(/\s*[-|]\s*Ballotpedia\s*$/i, "").trim();
  const titleTokens = nameTokens(cleaned).filter((token) => token.length > 1);
  const ours = nameTokens(name).filter((token) => token.length > 1);
  if (titleTokens.length < 2 || ours.length < 2) return false;
  const set = new Set(titleTokens);
  return ours.every((token) => set.has(token));
}

async function verifyProfile(url, stateName, office, candidateName) {
  const cached = cache.profiles[url];
  if (cached && cached.status) {
    const text = `${cached.title ?? ""} ${cached.lede ?? ""}`;
    const disambiguation = cached.disambiguation === true;
    const stateHit = mentionsState(text, stateName);
    const officeHit = mentionsOffice(text, office);
    const titled = titleMatches(cached.title, candidateName);
    const ok = cached.status === 200
      && String(cached.finalUrl || url).startsWith("https://ballotpedia.org/")
      && !disambiguation
      && titled
      && (stateHit || officeHit);
    return { ...cached, ok, titleMatched: titled, finalUrl: cached.finalUrl || url };
  }
  console.error(`profile ${url}`);
  const response = await politeFetch(url);
  const judged = profileAcceptable({
    status: response.status,
    finalUrl: response.url,
    html: response.body,
    stateName,
    office,
  });
  const { title, lede } = response.status === 200 ? ledeFrom(response.body) : { title: "", lede: "" };
  const record = {
    status: response.status,
    finalUrl: response.url,
    disambiguation: judged.disambiguation,
    title,
    lede,
    fetched: new Date().toISOString(),
  };
  cache.profiles[url] = record;
  if (requests % 25 === 0) saveCache();
  const text = `${title} ${lede}`;
  const titled = titleMatches(title, candidateName);
  const ok = response.status === 200
    && response.url.startsWith("https://ballotpedia.org/")
    && !judged.disambiguation
    && titled
    && (mentionsState(text, stateName) || mentionsOffice(text, office));
  return { ...record, ok, titleMatched: titled };
}

function addUnresolved(list, item) {
  list.push(item);
}

async function main() {
  const candidateStates = publishedCandidateStates();
  const races = extractRaces();
  const needed = new Set([...candidateStates, ...races.map((race) => race.state)]);
  const codes = [...needed].filter((code) => !onlyStates || onlyStates.has(code)).sort();
  console.error(`states ${codes.join(" ")}`);
  console.error(`race guides ${races.length} candidate names ${races.reduce((sum, race) => sum + race.names.length, 0)}`);

  for (const code of codes) await ensureState(code);

  const localNeeded = new Map();
  if (!skipLocal) {
    for (const code of ["CA", "FL", "NY", "TX"]) {
      if (!codes.includes(code)) continue;
      const data = readJson(`src/data/local/${code}.json`);
      const counties = new Set(Object.keys(data.localByCounty ?? {}));
      const places = readJson(`src/data/places/${code}.json`);
      const byGeoid = new Map(places.map((place) => [place.geoid, place]));
      for (const geoid of Object.keys(data.local ?? {})) {
        const place = byGeoid.get(geoid);
        for (const county of place?.counties ?? []) counties.add(county);
      }
      const stateCache = cache.states[code];
      const resolved = [];
      const missing = [];
      for (const countyName of counties) {
        const county = countyIdFor(stateCache, countyName);
        if (!county) missing.push(countyName);
        else resolved.push({ countyName, county });
      }
      localNeeded.set(code, { resolved, missing, data, byGeoid });
      for (const item of resolved) await ensureLocal(code, item.county);
    }
  }

  const unresolved = [];
  const linked = [];
  const pending = [];

  function queue(entry) {
    if (!entry.match.url) {
      addUnresolved(unresolved, { ...entry, reason: entry.match.reason });
      return;
    }
    pending.push(entry);
  }

  for (const code of candidateStates) {
    if (onlyStates && !onlyStates.has(code)) continue;
    const data = readJson(`src/data/candidates/${code}.json`);
    const stateName = stateNames.get(code);
    const bp = cache.states[code]?.candidates ?? [];
    if (cache.states[code]?.status !== 200) {
      for (const contest of data.contests) {
        for (const candidate of contest.candidates) {
          queue({
            source: "candidate-file",
            state: code,
            office: contest.office,
            name: candidate.name,
            match: { url: null, reason: `Ballotpedia’s ${stateName} elections, 2026 page did not return HTTP 200.` },
          });
        }
      }
      continue;
    }
    for (const contest of data.contests) {
      const rows = rowsForContest(contest, bp, stateName);
      const matches = matchNames(contest.candidates, rows);
      matches.forEach((match, index) => {
        queue({
          source: "candidate-file",
          state: code,
          office: contest.office,
          district: contest.district,
          name: contest.candidates[index].name,
          stateName,
          checkOffice: match.office || contest.office,
          file: code,
          contestIndex: data.contests.indexOf(contest),
          candidateIndex: index,
          match,
        });
      });
    }
  }

  for (const race of races) {
    if (onlyStates && !onlyStates.has(race.state)) continue;
    const stateName = stateNames.get(race.state);
    const bp = cache.states[race.state]?.candidates ?? [];
    const rows = cache.states[race.state]?.status === 200 ? rowsForContest(race, bp, stateName) : [];
    const matches = matchNames(race.names.map((name) => ({ name })), rows);
    if (cache.states[race.state]?.status !== 200) {
      for (const name of race.names) {
        queue({
          source: "race-guide",
          state: race.state,
          office: race.office,
          slug: race.slug,
          name,
          match: { url: null, reason: `Ballotpedia’s ${stateName} elections, 2026 page did not return HTTP 200.` },
        });
      }
      continue;
    }
    matches.forEach((match, index) => {
      queue({
        source: "race-guide",
        state: race.state,
        office: race.office,
        slug: race.slug,
        name: race.names[index],
        stateName,
        checkOffice: match.office || race.office,
        match,
      });
    });
  }

  if (!skipLocal) {
    for (const [code, info] of localNeeded) {
      const stateName = stateNames.get(code);
      const missing = new Set(info.missing);
      const localByCounty = new Map();
      for (const item of info.resolved) {
        const cached = cache.local[`${code}:${item.county.id}`];
        localByCounty.set(item.countyName, cached?.status === 200 ? cached.candidates : null);
      }
      const visit = (contest, where) => {
        for (const candidate of contest.candidates) {
          const base = {
            source: "local",
            state: code,
            office: contest.office,
            name: candidate.name,
            where,
          };
          if (missing.has(where.county)) {
            queue({
              ...base,
              match: { url: null, reason: `Ballotpedia’s county list has no entry named ${where.county}.` },
            });
            continue;
          }
          const rows = localByCounty.get(where.county);
          if (!rows) {
            queue({
              ...base,
              match: { url: null, reason: `The Ballotpedia county candidate list for ${where.county} did not return HTTP 200.` },
            });
            continue;
          }
          const pool = rowsForLocal(contest.office, where.stem, rows, stateName);
          const [match] = matchNames([candidate], pool);
          queue({
            ...base,
            stateName,
            checkOffice: match.office || contest.office,
            localKey: where.localKey,
            contestKey: where.contestKey,
            contestIndex: where.contestIndex,
            candidateIndex: where.candidateIndex,
            match,
          });
        }
      };
      for (const [county, contests] of Object.entries(info.data.localByCounty ?? {})) {
        contests.forEach((contest, contestIndex) => {
          contest.candidates.forEach((candidate, candidateIndex) => {
            visit({ ...contest, candidates: [candidate] }, {
              county,
              stem: placeStem(county.replace(/\s+County$/i, "")),
              localKey: "localByCounty",
              contestKey: county,
              contestIndex,
              candidateIndex,
            });
          });
        });
      }
      for (const [geoid, contests] of Object.entries(info.data.local ?? {})) {
        const place = info.byGeoid.get(geoid);
        const county = place?.counties?.[0] ?? "";
        const stem = placeStem(place?.name ?? "");
        contests.forEach((contest, contestIndex) => {
          contest.candidates.forEach((candidate, candidateIndex) => {
            visit({ ...contest, candidates: [candidate] }, {
              county,
              stem,
              localKey: "local",
              contestKey: geoid,
              contestIndex,
              candidateIndex,
            });
          });
        });
      }
    }
  }

  console.error(`pending profiles ${pending.length} unresolved before verification ${unresolved.length}`);
  const verified = new Map();
  if (!skipProfiles) {
    let n = 0;
    for (const entry of pending) {
      n += 1;
      const record = await verifyProfile(entry.match.url, entry.stateName, entry.checkOffice, entry.name);
      const finalUrl = record.finalUrl && record.finalUrl.startsWith("https://ballotpedia.org/") ? record.finalUrl : entry.match.url;
      if (record.ok && finalUrl.startsWith("https://ballotpedia.org/")) {
        verified.set(entry, finalUrl);
        linked.push({ ...entry, url: finalUrl });
      } else {
        let reason = "The profile URL did not pass verification.";
        if (record.status !== 200) reason = `Profile URL returned HTTP ${record.status}.`;
        else if (record.disambiguation) reason = "Profile URL is a disambiguation page.";
        else if (record.titleMatched === false) reason = "Profile title did not match this candidate.";
        else reason = "Profile page did not mention the same state or office.";
        unresolved.push({ ...entry, reason });
      }
      if (n % 25 === 0) {
        saveCache();
        console.error(`verified ${n}/${pending.length}`);
      }
    }
    saveCache();
  }

  const summary = {
    linked: linked.length,
    unresolved: unresolved.length,
    requests,
    bySource: {},
  };
  for (const row of linked) summary.bySource[row.source] = summary.bySource[row.source] ?? { linked: 0, unresolved: 0 };
  for (const row of unresolved) summary.bySource[row.source] = summary.bySource[row.source] ?? { linked: 0, unresolved: 0 };
  for (const row of linked) summary.bySource[row.source].linked += 1;
  for (const row of unresolved) summary.bySource[row.source].unresolved += 1;
  console.log(JSON.stringify(summary, null, 2));

  if (noApply || skipProfiles) {
    console.error("not writing candidate files");
    return;
  }

  const raceLinks = {};
  for (const entry of linked) {
    if (entry.source !== "race-guide") continue;
    raceLinks[entry.slug] ??= {};
    raceLinks[entry.slug][entry.name] = entry.url;
  }
  writeFileSync(linksPath, `${JSON.stringify(raceLinks, null, 2)}\n`);

  for (const code of candidateStates) {
    if (onlyStates && !onlyStates.has(code)) continue;
    const rel = `src/data/candidates/${code}.json`;
    const data = readJson(rel);
    const keep = new Set(linked.filter((entry) => entry.source === "candidate-file" && entry.file === code).map((entry) => `${entry.contestIndex}:${entry.candidateIndex}`));
    for (let contestIndex = 0; contestIndex < data.contests.length; contestIndex += 1) {
      const contest = data.contests[contestIndex];
      contest.candidates.forEach((candidate, candidateIndex) => {
        delete candidate.ballotpedia;
        if (keep.has(`${contestIndex}:${candidateIndex}`)) {
          const found = linked.find((entry) => entry.source === "candidate-file" && entry.file === code && entry.contestIndex === contestIndex && entry.candidateIndex === candidateIndex);
          if (found) candidate.ballotpedia = found.url;
        }
      });
    }
    writeFileSync(path.join(root, rel), `${JSON.stringify(data, null, 2)}\n`);
  }

  if (!skipLocal) {
    for (const code of ["CA", "FL", "NY", "TX"]) {
      if (onlyStates && !onlyStates.has(code)) continue;
      const rel = `src/data/local/${code}.json`;
      const data = readJson(rel);
      const clear = (contests) => {
        for (const contest of contests ?? []) {
          for (const candidate of contest.candidates ?? []) delete candidate.ballotpedia;
        }
      };
      for (const contests of Object.values(data.local ?? {})) clear(contests);
      for (const contests of Object.values(data.localByCounty ?? {})) clear(contests);
      for (const entry of linked) {
        if (entry.source !== "local" || entry.state !== code) continue;
        const bucket = data[entry.localKey]?.[entry.contestKey];
        const contest = bucket?.[entry.contestIndex];
        const candidate = contest?.candidates?.[entry.candidateIndex];
        if (candidate && candidate.name === entry.name) candidate.ballotpedia = entry.url;
      }
      writeFileSync(path.join(root, rel), `${JSON.stringify(data, null, 2)}\n`);
    }
  }

  const lines = [];
  lines.push("# Ballotpedia profiles not stored");
  lines.push("");
  lines.push("A profile URL is stored only when Ballotpedia’s 2026 candidate list for that office names the same person and the profile page returns HTTP 200, is not a disambiguation page, and mentions the same state or office. Rows below have no stored URL.");
  lines.push("");
  lines.push(`- Linked: ${linked.length}`);
  lines.push(`- Unresolved: ${unresolved.length}`);
  lines.push("");
  for (const [source, counts] of Object.entries(summary.bySource)) {
    lines.push(`- ${source}: ${counts.linked} linked, ${counts.unresolved} unresolved`);
  }
  lines.push("");
  lines.push("| State | Office | Candidate | Reason |");
  lines.push("| --- | --- | --- | --- |");
  const sorted = unresolved.slice().sort((a, b) => `${a.state} ${a.office} ${a.name}`.localeCompare(`${b.state} ${b.office} ${b.name}`));
  for (const row of sorted) {
    const cells = [row.state, row.office, row.name, row.reason].map((value) => String(value ?? "").replace(/\|/g, "/").replace(/\n/g, " "));
    lines.push(`| ${cells.join(" | ")} |`);
  }
  lines.push("");
  writeFileSync(reportPath, lines.join("\n"));
  console.error(`wrote ${reportPath}`);
}

process.on("SIGINT", () => {
  saveCache();
  process.exit(130);
});

main().catch((error) => {
  saveCache();
  console.error(error);
  process.exit(1);
});
