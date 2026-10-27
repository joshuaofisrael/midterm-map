/**
 * Read official state results files and write public/live/results.json.
 *
 *   node scripts/live/fetch.mjs --dry-run
 *     Fetch the November 3, 2026 files when they exist, parse saved-format
 *     samples that are online now, and write results.json. Does not commit.
 *
 *   node scripts/live/fetch.mjs
 *     Used by GitHub Actions. Exits immediately outside the counting window.
 *     Set LIVE_PUBLISH=1 to push public/live/results.json to live-results.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { appendFileSync, readFileSync, writeFileSync, mkdirSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { gunzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import {
  calendarDate,
  isGeneralElectionName,
  parseClarityCsv,
  parseFloridaTsv,
  parseNcsbe,
  parseScytlBallotItems,
  parseCaliforniaJson,
  parseMinnesotaMedia,
  parseStateResultsCsv,
  parseTexasRaces,
  parseWashingtonCsv,
} from "./parse.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sources = JSON.parse(readFileSync(path.join(root, "src/data/live-sources.json"), "utf8"));
const outPath = process.env.LIVE_OUT ? path.resolve(process.env.LIVE_OUT) : path.join(root, "public/live/results.json");
const dryRun = process.argv.includes("--dry-run") || process.env.LIVE_DRY_RUN === "true";
const ELECTION_DAY = "2026-11-03";
const REPO = process.env.GITHUB_REPOSITORY || "joshuaofisrael/midterm-map";
const REMOTE_URL = `https://raw.githubusercontent.com/${REPO}/live-results/results.json`;

/**
 * Poll-close instants come from src/data/pollClose.ts, the same table the
 * pages use. A state missing from the table is treated as still voting.
 */
function readPollClose() {
  const text = readFileSync(path.join(root, "src/data/pollClose.ts"), "utf8");
  const map = new Map();
  for (const match of text.matchAll(/code:\s*"([A-Z]{2})"[\s\S]*?allPollsClosedAt:\s*"([^"]+)"/g)) {
    const instant = Date.parse(match[2]);
    if (!Number.isNaN(instant)) map.set(match[1], instant);
  }
  if (map.size < 51) throw new Error(`pollClose.ts parsed ${map.size} states; expected 51. Refusing to publish.`);
  return map;
}
const POLL_CLOSE = readPollClose();

// LIVE_NOW (dry runs only) rehearses a later instant, e.g. 2026-11-04T05:00:00Z.
const NOW = dryRun && process.env.LIVE_NOW ? Date.parse(process.env.LIVE_NOW) : null;
function nowMs() {
  return NOW != null && !Number.isNaN(NOW) ? NOW : Date.now();
}

function pollsClosed(code, now = nowMs()) {
  const instant = POLL_CLOSE.get(code);
  return instant != null && now >= instant;
}
// Texas returns 403 for a short bot token and 200 for a browser-style agent.
// The token still names this site. The files are the public results JSON.
const USER_AGENT = "Mozilla/5.0 (compatible; MapTheMidterms/1.0; +https://mapthemidterms.com/live/)";
const COUNT_END = "2026-12-15";
const ALWAYS_THROUGH = "2026-11-20";

function setOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

function nyDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function inCountingWindow(previous, now = new Date()) {
  const day = nyDate(now);
  if (day === "2026-11-03" || day === "2026-11-04") return true;
  if (day < "2026-11-03" || day > COUNT_END) return false;
  if (process.env.LIVE_STOP === "true") return false;
  if (day <= ALWAYS_THROUGH) return previous?.countsContinue !== false || day >= "2026-11-03";
  return previous?.countsContinue === true;
}

function decode(buf) {
  if (buf.length >= 2 && buf[0] === 0x1f && buf[1] === 0x8b) return gunzipSync(buf);
  return buf;
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "*/*", "Accept-Encoding": "identity" },
    redirect: "follow",
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status} for ${url}`);
    error.status = response.status;
    throw error;
  }
  const buf = decode(Buffer.from(await response.arrayBuffer()));
  return {
    text: buf.toString("utf8"),
    buf,
    lastModified: response.headers.get("last-modified"),
    url: response.url,
  };
}

function stateRecord(source, patch) {
  return {
    code: source.code,
    name: source.name,
    office: source.office,
    resultsUrl: source.resultsUrl,
    resultsLabel: source.resultsLabel,
    machineReadable: source.machineReadable,
    format: source.format,
    feedStatus: patch.feedStatus,
    feedNote: patch.feedNote || "",
    sourceUpdatedAt: patch.sourceUpdatedAt || null,
    fetchedAt: patch.fetchedAt || null,
    races: patch.races || [],
  };
}

function linkOnly(source) {
  return stateRecord(source, {
    feedStatus: "link-only",
    feedNote: "No machine-readable results file was confirmed. Use the official results page.",
  });
}

/**
 * The previous run is read from the live-results branch, never from the copy
 * committed on main (that copy holds no returns).
 */
async function loadPrevious() {
  try {
    const previous = JSON.parse((await fetchBuffer(`${REMOTE_URL}?t=${Date.now()}`)).text);
    return previous?.electionDay === ELECTION_DAY ? previous : null;
  } catch {
    return null;
  }
}

function keepPrevious(source, previous, error) {
  const prior = previous?.states?.[source.code];
  const closeAt = POLL_CLOSE.get(source.code);
  const priorFetched = Date.parse(prior?.fetchedAt || "");
  const priorAfterClose = closeAt != null && !Number.isNaN(priorFetched) && priorFetched >= closeAt;
  if (prior && priorAfterClose && (prior.races?.length || prior.feedStatus === "ok")) {
    return {
      ...prior,
      feedStatus: "stale",
      feedNote: `The latest check failed (${error.message}). Showing the last file that loaded.`,
    };
  }
  return stateRecord(source, {
    feedStatus: "error",
    feedNote: `The official file did not load (${error.message}). Use the official results page.`,
    fetchedAt: new Date().toISOString(),
  });
}

async function fetchScytl(source) {
  const { apiBase, jurisdiction } = source.feed;
  const jurisdictionBody = await fetchBuffer(`${apiBase}/jurisdictions/${jurisdiction}`);
  const jurisdictionJson = JSON.parse(jurisdictionBody.text);
  const elections = jurisdictionJson.elections || [];
  const match = elections.find((election) => {
    const name = (election.name || []).map((item) => item.text).join(" ");
    return String(election.electionDate || "").startsWith("2026-11-03") && isGeneralElectionName(name, election.electionDate);
  });
  if (!match) {
    return stateRecord(source, {
      feedStatus: "not-published",
      feedNote: "The November 3, 2026 general election is not in the official election list yet.",
      fetchedAt: new Date().toISOString(),
    });
  }
  const electionUrl = `${apiBase}/elections/${jurisdiction}/${match.publicElectionId}`;
  const election = JSON.parse((await fetchBuffer(electionUrl)).text);
  const items = [];
  let offset = 0;
  let total = Infinity;
  while (offset < total) {
    const page = JSON.parse(
      (await fetchBuffer(`${electionUrl}/ballot-items?limit=500&offset=${offset}`)).text,
    );
    items.push(...(page.data || []));
    total = page.totalRecordCount ?? items.length;
    offset += page.data?.length || 0;
    if (!page.data?.length) break;
  }
  return stateRecord(source, {
    feedStatus: "ok",
    sourceUpdatedAt: election.asOf || election.lastUpdated || null,
    fetchedAt: new Date().toISOString(),
    races: parseScytlBallotItems({ data: items }, source.code, { certified: election.isOfficialResults === true }),
  });
}

async function fetchClarity(source) {
  const index = JSON.parse((await fetchBuffer(source.feed.indexUrl)).text);
  const match = index.find((election) => isGeneralElectionName(election.ElectionName, election.Date));
  if (!match) {
    return stateRecord(source, {
      feedStatus: "not-published",
      feedNote: "The November 3, 2026 general election is not in the official election list yet.",
      fetchedAt: new Date().toISOString(),
    });
  }
  const version = (await fetchBuffer(`${source.feed.fileBase}/${match.EID}/current_ver.txt`)).text.trim();
  const base = `${source.feed.fileBase}/${match.EID}/${version}`;
  const zip = await fetchBuffer(`${base}/reports/summary.zip`);
  const csv = unzipSummary(zip.buf);
  let settings = null;
  try {
    settings = JSON.parse((await fetchBuffer(`${base}/json/en/electionsettings.json`)).text);
  } catch {
    settings = null;
  }
  return stateRecord(source, {
    feedStatus: "ok",
    sourceUpdatedAt: settings?.websiteupdatedat || null,
    fetchedAt: new Date().toISOString(),
    races: parseClarityCsv(csv, source.code, {
      reportingLabel: source.feed.reportingLabel,
      settings,
    }),
  });
}

function unzipSummary(buf) {
  const dir = mkdtempSync(path.join(tmpdir(), "clarity-"));
  const zipPath = path.join(dir, "summary.zip");
  writeFileSync(zipPath, buf);
  execFileSync("unzip", ["-o", zipPath, "-d", dir], { stdio: "ignore" });
  return readFileSync(path.join(dir, "summary.csv"), "utf8");
}

async function fetchFlorida(source) {
  const page = await fetchBuffer(source.feed.indexUrl);
  const hrefs = [...page.text.matchAll(/href="([^"]*ElecResultsFL\.txt)"/gi)].map((match) => match[1]);
  const general = hrefs.find((href) => href.includes("20261103"));
  if (!general) {
    return stateRecord(source, {
      feedStatus: "not-published",
      feedNote: "Florida Election Watch has not posted the November 3, 2026 results file yet.",
      fetchedAt: new Date().toISOString(),
    });
  }
  const url = new URL(general, source.feed.indexUrl).href;
  const file = await fetchBuffer(url);
  return stateRecord(source, {
    feedStatus: "ok",
    sourceUpdatedAt: file.lastModified,
    fetchedAt: new Date().toISOString(),
    races: parseFloridaTsv(file.text, source.code),
  });
}

async function fetchTexas(source) {
  const version = JSON.parse((await fetchBuffer(`${source.feed.dataBase}/Version.json`)).text);
  const constants = JSON.parse(
    (await fetchBuffer(`${source.feed.dataBase}/ElectionConstants_${version.___versionNo}.json`)).text,
  );
  const year = constants.electionInfo?.["2026"] || {};
  const generals = Object.entries(year.G || {}).filter(([, election]) =>
    isGeneralElectionName(election.N, ""),
  );
  if (!generals.length) {
    return stateRecord(source, {
      feedStatus: "not-published",
      feedNote: "The Texas Secretary of State has not posted the November 3, 2026 general election yet.",
      fetchedAt: new Date().toISOString(),
    });
  }
  const [electionId] = generals[0];
  const electionVersion = JSON.parse(
    (await fetchBuffer(`${source.feed.dataBase}/election/${electionId}/Version.json`)).text,
  );
  const base = `${source.feed.dataBase}/election/${electionId}/${electionVersion.___versionNo}`;
  const files = [];
  for (const name of ["Federal.json", "StateWide.json"]) {
    try {
      files.push(JSON.parse((await fetchBuffer(`${base}/${name}`)).text));
    } catch (error) {
      if (error.status !== 404) throw error;
    }
  }
  return stateRecord(source, {
    feedStatus: "ok",
    sourceUpdatedAt: electionVersion.elecDate || null,
    fetchedAt: new Date().toISOString(),
    races: parseTexasRaces(files, source.code),
  });
}

async function fetchWashington(source) {
  const page = await fetchBuffer(source.feed.exportPage);
  const hrefs = [...page.text.matchAll(/href="([^"]+\.csv)"/gi)].map((match) => new URL(match[1], page.url).href);
  const wanted = hrefs.filter((href) => /20261103/.test(href) && /AllState|Congressional|StateExecutive/i.test(href));
  if (!wanted.length) {
    return stateRecord(source, {
      feedStatus: "not-published",
      feedNote: "The Washington Secretary of State has not posted the November 3, 2026 CSV export yet.",
      fetchedAt: new Date().toISOString(),
    });
  }
  const races = [];
  let updated = null;
  for (const href of wanted) {
    const file = await fetchBuffer(href);
    updated = file.lastModified || updated;
    races.push(...parseWashingtonCsv(file.text, source.code));
  }
  return stateRecord(source, {
    feedStatus: "ok",
    sourceUpdatedAt: updated,
    fetchedAt: new Date().toISOString(),
    races,
  });
}

async function fetchMinnesota(source) {
  const races = [];
  let updated = null;
  let found = false;
  for (const name of source.feed.files) {
    try {
      const file = await fetchBuffer(`${source.feed.fileBase}/${name}`);
      found = true;
      updated = file.lastModified || updated;
      races.push(...parseMinnesotaMedia(file.text, source.code));
    } catch (error) {
      if (error.status !== 404) throw error;
    }
  }
  if (!found) {
    return stateRecord(source, {
      feedStatus: "not-published",
      feedNote: "The Minnesota Secretary of State has not posted the November 3, 2026 media files yet.",
      fetchedAt: new Date().toISOString(),
    });
  }
  return stateRecord(source, {
    feedStatus: "ok",
    sourceUpdatedAt: updated,
    fetchedAt: new Date().toISOString(),
    races,
  });
}

function californiaWanted(url) {
  return /\/(?:governor|us-rep|us-senate|united-states-senate)\.json$/i.test(url);
}

async function fetchCalifornia(source) {
  const index = await fetchBuffer(source.feed.indexUrl);
  const heading = index.text.split(/\r?\n/).find((line) => line.trim()) || "";
  if (!/November 3, 2026/i.test(heading) || !/General Election/i.test(heading)) {
    return stateRecord(source, {
      feedStatus: "not-published",
      feedNote: "The California Secretary of State media index does not name the November 3, 2026 general election.",
      fetchedAt: new Date().toISOString(),
    });
  }
  const urls = [...index.text.matchAll(/https?:\/\/[^\s",]+\.json/g)]
    .map((match) => match[0])
    .filter(californiaWanted);
  if (!urls.length) {
    return stateRecord(source, {
      feedStatus: "not-published",
      feedNote: "The California Secretary of State media index does not list a November 3, 2026 statewide or congressional JSON file yet.",
      fetchedAt: new Date().toISOString(),
    });
  }
  const races = [];
  let updated = null;
  for (const url of urls) {
    const file = await fetchBuffer(url);
    const json = JSON.parse(file.text);
    const reportingTime = Array.isArray(json) ? json.find((race) => race?.ReportingTime)?.ReportingTime : null;
    updated = reportingTime || file.lastModified || updated;
    races.push(...parseCaliforniaJson(json, source.code));
  }
  return stateRecord(source, {
    feedStatus: "ok",
    sourceUpdatedAt: updated,
    fetchedAt: new Date().toISOString(),
    races,
  });
}

async function fetchStateResultsCsv(source) {
  const home = await fetchBuffer(new URL("/", source.feed.mediaPage || source.feed.csvUrls[0]).href);
  const electionDate = home.text.match(/id="hidElectionDate"\s+value="([^"]+)"/i)?.[1] || "";
  if (calendarDate(electionDate) !== ELECTION_DAY) {
    return stateRecord(source, {
      feedStatus: "not-published",
      feedNote: `The results site is set to an election other than November 3, 2026 (${electionDate || "no date found"}).`,
      fetchedAt: new Date().toISOString(),
    });
  }
  const races = [];
  let updated = null;
  for (const url of source.feed.csvUrls) {
    const file = await fetchBuffer(url);
    const parsed = parseStateResultsCsv(file.text, source.code);
    races.push(...parsed);
    const table = file.text.split(/\r?\n/).find((line) => /,(\d{1,2}\/\d{1,2}\/\d{4}[^,]*)/.test(line));
    if (!updated && table) {
      const match = table.match(/(\d{1,2}\/\d{1,2}\/\d{4}[^,"]*)/);
      updated = match ? match[1].trim() : file.lastModified;
    }
    updated = updated || file.lastModified;
  }
  return stateRecord(source, {
    feedStatus: "ok",
    sourceUpdatedAt: updated,
    fetchedAt: new Date().toISOString(),
    races,
  });
}

async function fetchNcsbe(source) {
  const file = await fetchBuffer(source.feed.url);
  return stateRecord(source, {
    feedStatus: "ok",
    sourceUpdatedAt: file.lastModified,
    fetchedAt: new Date().toISOString(),
    races: parseNcsbe(file.text, source.code),
  });
}

async function fetchSource(source, previous) {
  if (!source.machineReadable || !source.feed) return linkOnly(source);
  try {
    if (source.feed.kind === "ncsbe") return await fetchNcsbe(source);
    if (source.feed.kind === "scytl") return await fetchScytl(source);
    if (source.feed.kind === "clarity") return await fetchClarity(source);
    if (source.feed.kind === "florida-tsv") return await fetchFlorida(source);
    if (source.feed.kind === "texas-enr") return await fetchTexas(source);
    if (source.feed.kind === "washington-csv") return await fetchWashington(source);
    if (source.feed.kind === "minnesota-media") return await fetchMinnesota(source);
    if (source.feed.kind === "california-json") return await fetchCalifornia(source);
    if (source.feed.kind === "state-results-csv") return await fetchStateResultsCsv(source);
    return linkOnly(source);
  } catch (error) {
    if (error.status === 404) {
      return stateRecord(source, {
        feedStatus: "not-published",
        feedNote: "The November 3, 2026 results file is not posted yet.",
        fetchedAt: new Date().toISOString(),
      });
    }
    return keepPrevious(source, previous, error);
  }
}

/**
 * Last line of defence before anything is written:
 * - before the state's last polls close, no returns leave this script;
 * - a file whose own timestamp is before November 3, 2026 is test or earlier
 *   data and is dropped.
 */
function guard(record, now = nowMs()) {
  if (!pollsClosed(record.code, now)) {
    const linkOnly = record.feedStatus === "link-only";
    return {
      ...record,
      feedStatus: linkOnly ? "link-only" : "polls-open",
      feedNote: linkOnly
        ? record.feedNote
        : "Polls have not closed in this state. No returns are published before every polling place closes.",
      sourceUpdatedAt: null,
      races: [],
    };
  }
  const sourceDay = calendarDate(record.sourceUpdatedAt);
  if (record.races.length && sourceDay && sourceDay < ELECTION_DAY) {
    return {
      ...record,
      feedStatus: "not-published",
      feedNote: `The official file is dated ${sourceDay}, before November 3, 2026. It is test or earlier data and is not shown.`,
      races: [],
    };
  }
  return record;
}

function countsContinue(states, day) {
  if (process.env.LIVE_STOP === "true") return false;
  if (day < "2026-11-03" || day > COUNT_END) return false;
  if (day <= ALWAYS_THROUGH) return true;
  return states.some((state) =>
    state.races.some(
      (race) =>
        race.certified !== true ||
        (race.precinctsTotal != null && race.precinctsReporting != null && race.precinctsReporting < race.precinctsTotal),
    ),
  );
}

async function sampleLines() {
  const lines = [];
  const samples = [
    ["GA primary JSON", "https://results.sos.ga.gov/results/public/api/elections/Georgia/GeneralPrimary51926/ballot-items?limit=20&offset=0", async (body) => {
      const json = JSON.parse(body);
      return `items=${json.totalRecordCount ?? json.data?.length ?? 0} generalRaces=${parseScytlBallotItems(json, "GA").length}`;
    }],
    ["IA primary index", "https://electionresults.iowa.gov/IA/elections.json", async (body) => JSON.parse(body).length],
    ["FL August file header", "https://flelectionfiles.floridados.gov/enightfilespublic/20260818_ElecResultsFL.txt", async (body) => body.split(/\r?\n/)[0]],
    ["TX version", "https://results.texas-election.com/static/data/Version.json", async (body) => body.trim()],
    ["WA 2024 CSV races", "https://results.vote.wa.gov/results/20241105/export/20241105_Congressional.csv", async (body) => parseWashingtonCsv(body, "WA").length],
    ["CO version", "https://results.enr.clarityelections.com/CO/126592/current_ver.txt", async (body) => body.trim()],
    ["UT jurisdiction", "https://electionresults.utah.gov/results/public/api/jurisdictions/Utah", async (body) => JSON.parse(body).elections?.length],
  ];
  for (const [label, url, read] of samples) {
    try {
      const file = await fetchBuffer(url);
      lines.push(`${label}: ${await read(file.text)}`);
    } catch (error) {
      lines.push(`${label}: FAILED ${error.message}`);
    }
  }
  return lines;
}

async function main() {
  const previous = await loadPrevious();
  const day = nyDate();
  if (!dryRun && !inCountingWindow(previous)) {
    console.log(`Outside the counting window (${day}). No fetch.`);
    setOutput("publish", "false");
    return;
  }
  const states = [];
  for (const source of sources.states) {
    const record = guard(await fetchSource(source, previous));
    states.push(record);
    console.log(
      `${record.code} ${record.feedStatus} races=${record.races.length}${record.feedNote ? ` — ${record.feedNote}` : ""}`,
    );
  }
  const payload = {
    generatedAt: new Date().toISOString(),
    electionDay: ELECTION_DAY,
    countsContinue: countsContinue(states, day),
    // Seat totals stay null. Summing winner flags would be a projection of chamber control.
    chambers: {
      house: { dem: null, rep: null, other: null },
      senate: { dem: null, rep: null, other: null },
    },
    states: Object.fromEntries(states.map((state) => [state.code, state])),
  };
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(payload)}\n`);
  const bytes = Buffer.byteLength(JSON.stringify(payload));
  console.log(`Wrote ${outPath} (${bytes} bytes)`);
  const hold = spawnSync(
    process.execPath,
    [
      "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON",
      "--experimental-strip-types",
      path.join(root, "scripts/check-legal-hold.ts"),
      "--paths",
      path.relative(root, outPath),
    ],
    { cwd: root, stdio: "inherit" },
  );
  if (hold.status !== 0) {
    setOutput("publish", "false");
    process.exit(hold.status ?? 1);
  }
  setOutput("publish", dryRun ? "false" : "true");
  if (dryRun) {
    console.log("--- sample files already online ---");
    for (const line of await sampleLines()) console.log(line);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
