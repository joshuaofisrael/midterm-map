/**
 * Turn official state results files into the small JSON the pages poll.
 * Percents and winner flags are copied from the file. They are not estimated.
 */

const PARTY_SUFFIX = /\s[-–]\s*(Republican|Democratic|Rep|Dem|Lib|Grn|Libertarian|Green)\.?\s*$/i;

export function classifyContest(name) {
  const cleaned = String(name || "").replace(/\s+/g, " ").trim();
  const upper = cleaned.toUpperCase();
  const partyPrimary = PARTY_SUFFIX.test(cleaned);
  let office = null;
  let district = null;

  if (/U\.?\s*S\.?\s*SENAT(?:E|OR)|UNITED STATES SENAT(?:E|OR)|US SENATE/.test(upper)) {
    office = "senate";
  } else if (isGovernorContest(upper)) {
    office = "governor";
  } else if (
    /U\.?\s*S\.?\s*HOUSE|U\.?\s*S\.?\s*REPRESENTATIVE|UNITED STATES REPRESENTATIVE|REPRESENTATIVE IN CONGRESS|CONGRESSIONAL DISTRICT|US HOUSE/.test(
      upper,
    )
  ) {
    office = "house";
    const match = upper.match(/DISTRICT\s+0*(\d+)/);
    if (match) district = match[1].padStart(2, "0");
    else if (/AT[\s-]*LARGE/.test(upper)) district = "AL";
    else district = "AL";
  }

  return { office, district, partyPrimary, title: cleaned };
}

/** A joint governor and lieutenant-governor ticket is the governor contest. */
function isGovernorContest(upper) {
  if (!/\bGOVERNOR\b/.test(upper)) return false;
  if (/GOVERNOR\s*(?:&|AND)\s*(?:LT\.?|LIEUTENANT)(?:\s+GOVERNOR)?/.test(upper)) return true;
  if (/\bLIEUTENANT\b|\bLT\.?\s*GOVERNOR\b/.test(upper)) return false;
  return true;
}

export function siteSlug(stateCode, office, district) {
  const state = stateCode.toLowerCase();
  if (office === "senate") return `${state}-senate-2026`;
  if (office === "governor") return `${state}-governor-2026`;
  if (office === "house") return `${state}-${String(district).toLowerCase()}-house-2026`;
  return null;
}

function raceShell(stateCode, classified, extra) {
  return {
    siteSlug: siteSlug(stateCode, classified.office, classified.district),
    office: classified.office,
    district: classified.district,
    title: classified.title,
    voteFor: extra.voteFor ?? null,
    precinctsReporting: extra.precinctsReporting ?? null,
    precinctsTotal: extra.precinctsTotal ?? null,
    reportingLabel: extra.reportingLabel ?? null,
    estimatedVoteCounted: null,
    certified: extra.certified === true,
    candidates: extra.candidates,
  };
}

function keepGeneral(classified) {
  return classified.office && !classified.partyPrimary;
}

/** North Carolina ENR `pct` is a proportion string such as "0.5086" (50.86%). */
export function ncsbeProportionToPercent(raw) {
  const text = String(raw ?? "").trim();
  if (!/^\d+(\.\d+)?$/.test(text)) return null;
  const [whole, frac = ""] = text.split(".");
  const combined = `${whole}${frac}`;
  const point = whole.length + 2;
  const padded = combined.padEnd(point, "0");
  const left = (padded.slice(0, point).replace(/^0+(?=\d)/, "") || "0");
  const right = padded.slice(point).replace(/0+$/, "");
  return right ? `${left}.${right}` : left;
}

export function parseNcsbe(text, stateCode = "NC") {
  const rows = JSON.parse(text);
  const groups = new Map();
  for (const row of rows) {
    const classified = classifyContest(row.cnm);
    if (!keepGeneral(classified)) continue;
    const key = row.cnm;
    if (!groups.has(key)) {
      groups.set(key, {
        classified,
        voteFor: Number(row.vfr) || null,
        precinctsReporting: Number(row.prt),
        precinctsTotal: Number(row.ptl),
        candidates: [],
      });
    }
    const group = groups.get(key);
    group.precinctsReporting = Number(row.prt);
    group.precinctsTotal = Number(row.ptl);
    group.candidates.push({
      name: String(row.bnm || "").trim(),
      partyLabel: String(row.pty || "").trim(),
      votes: Number(row.vct),
      percentText: ncsbeProportionToPercent(row.pct),
      winner: false,
    });
  }
  return [...groups.values()].map((group) =>
    raceShell(stateCode, group.classified, {
      voteFor: group.voteFor,
      precinctsReporting: group.precinctsReporting,
      precinctsTotal: group.precinctsTotal,
      reportingLabel: "precincts",
      candidates: group.candidates,
    }),
  );
}

function textOf(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const english = value.find((item) => item && String(item.languageId || "").startsWith("en"));
    return String((english || value[0])?.text || "").trim();
  }
  return "";
}

export function parseScytlBallotItems(payload, stateCode, { certified = false } = {}) {
  const items = Array.isArray(payload) ? payload : payload.data || [];
  const races = [];
  for (const item of items) {
    const classified = classifyContest(textOf(item.name));
    if (!keepGeneral(classified)) continue;
    const options = item.summaryResults?.ballotOptions || [];
    const reporting = item.reportingStatus || {};
    races.push(
      raceShell(stateCode, classified, {
        voteFor: item.voteFor ?? null,
        precinctsReporting: reporting.reportingUnits ?? null,
        precinctsTotal: reporting.totalUnits ?? null,
        reportingLabel: "precincts",
        certified,
        candidates: options.map((option) => ({
          name: textOf(option.name),
          partyLabel: option.party?.abbreviation || textOf(option.party?.name),
          votes: Number(option.voteCount),
          percentText: null,
          winner: option.isWinner === true,
        })),
      }),
    );
  }
  return races;
}

function csvRows(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  const source = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (inQuotes) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else inQuotes = false;
      } else cell += char;
    } else if (char === '"') inQuotes = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((item) => item.some((value) => value !== ""));
}

function winnerNames(settings) {
  const winners = settings?.settings?.winners || {};
  const names = new Set();
  for (const entry of Object.values(winners)) {
    const list = String(entry?.winnerlist || "");
    for (const piece of list.split(",")) {
      const name = piece.split("|").slice(1).join("|").trim();
      if (name) names.add(name.toLowerCase());
    }
  }
  return names;
}

export function parseClarityCsv(csvText, stateCode, { reportingLabel = "areas", settings = null } = {}) {
  const table = csvRows(csvText);
  const header = table[0].map((cell) => cell.trim());
  const index = Object.fromEntries(header.map((name, i) => [name, i]));
  const winners = winnerNames(settings);
  const groups = new Map();
  for (const cells of table.slice(1)) {
    const title = cells[index["contest name"]] || "";
    const classified = classifyContest(title.replace(/\s*\(Vote For \d+\)\s*$/i, "").trim() || title);
    if (!keepGeneral(classified)) continue;
    if (!groups.has(title)) {
      groups.set(title, {
        classified: { ...classified, title },
        precinctsReporting: Number(cells[index["num Area rptg"]]),
        precinctsTotal: Number(cells[index["num Area total"]]),
        candidates: [],
      });
    }
    const name = cells[index["choice name"]];
    groups.get(title).candidates.push({
      name,
      partyLabel: cells[index["party name"]] || "",
      votes: Number(cells[index["total votes"]]),
      percentText: cells[index["percent of votes"]] ?? null,
      winner: winners.has(String(name).toLowerCase()),
    });
  }
  return [...groups.values()].map((group) =>
    raceShell(stateCode, group.classified, {
      precinctsReporting: group.precinctsReporting,
      precinctsTotal: group.precinctsTotal,
      reportingLabel,
      candidates: group.candidates,
    }),
  );
}

export function parseFloridaTsv(text, stateCode = "FL") {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  const header = lines[0].split("\t").map((cell) => cell.trim());
  const index = Object.fromEntries(header.map((name, i) => [name, i]));
  const groups = new Map();
  for (const line of lines.slice(1)) {
    const cells = line.split("\t");
    const title = cells[index.RaceName] || "";
    const classified = classifyContest(title);
    if (!keepGeneral(classified)) continue;
    if (!groups.has(title)) groups.set(title, { classified, counties: new Map(), candidates: new Map() });
    const group = groups.get(title);
    const county = cells[index.CountyCode] || cells[index.CountyName];
    group.counties.set(county, {
      total: Number(cells[index.Precincts] || 0),
      reporting: Number(cells[index.PrecinctsReporting] || 0),
    });
    const name = [cells[index.CanNameFirst], cells[index.CanNameMiddle], cells[index.CanNameLast]]
      .map((part) => String(part || "").trim())
      .filter(Boolean)
      .join(" ");
    const party = cells[index.PartyCode] || "";
    const key = `${name}|${party}`;
    const previous = group.candidates.get(key) || { name, partyLabel: party, votes: 0, percentText: null, winner: false };
    previous.votes += Number(cells[index.CanVotes] || 0);
    group.candidates.set(key, previous);
  }
  return [...groups.values()].map((group) => {
    let precinctsTotal = 0;
    let precinctsReporting = 0;
    for (const county of group.counties.values()) {
      precinctsTotal += county.total;
      precinctsReporting += county.reporting;
    }
    return raceShell(stateCode, group.classified, {
      precinctsReporting,
      precinctsTotal,
      reportingLabel: "precincts",
      candidates: [...group.candidates.values()],
    });
  });
}

function texasPercent(value) {
  if (value == null || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return String(number);
}

export function parseTexasRaces(files, stateCode = "TX") {
  const races = [];
  for (const data of files) {
    for (const race of data.Races || []) {
      const classified = classifyContest(race.N);
      if (!keepGeneral(classified)) continue;
      races.push(
        raceShell(stateCode, classified, {
          precinctsReporting: race.PrecinctsReporting ?? race.PR ?? null,
          precinctsTotal: race.PrecinctsTotal ?? race.TP ?? null,
          reportingLabel: race.PrecinctsReporting != null || race.PR != null ? "precincts" : null,
          candidates: (race.Candidates || []).map((candidate) => ({
            name: String(candidate.N || "").trim(),
            partyLabel: String(candidate.P || "").trim(),
            votes: Number(candidate.V),
            percentText: texasPercent(candidate.PE),
            winner: false,
          })),
        }),
      );
    }
  }
  return races;
}

export function parseWashingtonCsv(text, stateCode = "WA") {
  const table = csvRows(text);
  const header = table[0].map((cell) => cell.trim());
  const index = Object.fromEntries(header.map((name, i) => [name, i]));
  const groups = new Map();
  for (const cells of table.slice(1)) {
    const title = cells[index.Race] || "";
    const classified = classifyContest(title);
    if (!keepGeneral(classified)) continue;
    if (!groups.has(title)) groups.set(title, { classified, candidates: [] });
    groups.get(title).candidates.push({
      name: cells[index.Candidate],
      partyLabel: cells[index.Party] || "",
      votes: Number(String(cells[index.Votes]).replace(/,/g, "")),
      percentText: cells[index.PercentageOfTotalVotes] ?? null,
      winner: false,
    });
  }
  return [...groups.values()].map((group) =>
    raceShell(stateCode, group.classified, { candidates: group.candidates }),
  );
}

/** Minnesota media files. Columns are the Secretary of State's published layout. */
export function parseMinnesotaMedia(text, stateCode = "MN") {
  const groups = new Map();
  for (const line of text.replace(/^\uFEFF/, "").split(/\r?\n/)) {
    if (!line.trim()) continue;
    const cells = line.split(";");
    if (cells.length < 16) continue;
    if (cells[1].trim() || cells[2].trim()) continue;
    const title = cells[4].trim();
    const classified = classifyContest(title);
    if (!keepGeneral(classified)) continue;
    const districtField = cells[5].trim();
    if (classified.office === "house" && /^\d+$/.test(districtField)) {
      classified.district = districtField.padStart(2, "0");
    }
    const key = `${classified.office}|${classified.district || ""}|${title}`;
    if (!groups.has(key)) {
      groups.set(key, {
        classified,
        precinctsReporting: Number(cells[11]),
        precinctsTotal: Number(cells[12]),
        candidates: [],
      });
    }
    groups.get(key).candidates.push({
      name: cells[7].trim(),
      partyLabel: cells[10].trim(),
      votes: Number(cells[13]),
      percentText: cells[14].trim() === "" ? null : cells[14].trim(),
      winner: false,
    });
  }
  return [...groups.values()].map((group) =>
    raceShell(stateCode, group.classified, {
      precinctsReporting: group.precinctsReporting,
      precinctsTotal: group.precinctsTotal,
      reportingLabel: "precincts",
      candidates: group.candidates,
    }),
  );
}

/** California media JSON. Only the statewide or districtwide object is used. */
export function parseCaliforniaJson(races, stateCode = "CA") {
  const list = Array.isArray(races) ? races : [];
  const kept = [];
  for (const race of list) {
    const title = String(race.raceTitle || "");
    if (!/statewide results|districtwide results/i.test(title)) continue;
    const classified = classifyContest(title);
    if (!keepGeneral(classified)) continue;
    const reporting = String(race.Reporting || "");
    const match = reporting.match(/\(([0-9,]+) of ([0-9,]+)\)/);
    kept.push(
      raceShell(stateCode, classified, {
        precinctsReporting: match ? Number(match[1].replace(/,/g, "")) : null,
        precinctsTotal: match ? Number(match[2].replace(/,/g, "")) : null,
        reportingLabel: match ? "precincts" : null,
        candidates: (race.candidates || []).map((candidate) => ({
          name: String(candidate.Name || "").trim(),
          partyLabel: String(candidate.Party || "").trim(),
          votes: Number(String(candidate.Votes ?? "").replace(/,/g, "")),
          percentText: candidate.Percent == null || candidate.Percent === "" ? null : String(candidate.Percent),
          winner: false,
        })),
      }),
    );
  }
  return kept;
}

function precinctPair(value) {
  const text = String(value || "").replace(/^=/, "").replace(/"/g, "");
  const match = text.match(/(\d+)\s*\/\s*(\d+)/);
  if (!match) return { reporting: null, total: null };
  return { reporting: Number(match[1]), total: Number(match[2]) };
}

/**
 * Statewide CSV published by the South Dakota and Nebraska results sites.
 * County rows are skipped. A congressional district comes from the area column.
 */
export function parseStateResultsCsv(text, stateCode) {
  const table = csvRows(text);
  if (!table.length) return [];
  const header = table[0].map((cell) => cell.trim());
  const index = Object.fromEntries(header.map((name, i) => [name, i]));
  const groups = new Map();
  for (const cells of table.slice(1)) {
    const areaType = String(cells[index.AreaType] || "").trim().toUpperCase();
    const areaNum = String(cells[index.AreaNum] || "").trim();
    const statewide = areaType === "" || areaType === "SW" || areaType === "SWR";
    const congress = areaType === "CG";
    if (!statewide && !congress) continue;
    const title = String(cells[index.RaceName] || "").trim();
    const classified = classifyContest(title);
    if (!keepGeneral(classified)) continue;
    if (classified.office === "house") {
      const fromArea = areaNum.match(/(\d+)/);
      if (fromArea) classified.district = fromArea[1].padStart(2, "0");
    }
    const key = `${cells[index.RaceID] || title}|${classified.district || ""}`;
    const precincts = precinctPair(cells[index.PrecinctsReporting]);
    if (!groups.has(key)) {
      groups.set(key, {
        classified,
        precinctsReporting: precincts.reporting,
        precinctsTotal: precincts.total,
        candidates: [],
      });
    }
    const percent = String(cells[index.CandidatePercentage] ?? "").trim();
    groups.get(key).candidates.push({
      name: String(cells[index.CandidateName] || "").replace(/\s+/g, " ").trim(),
      partyLabel: String(cells[index.PartyCode] || "").trim(),
      votes: Number(String(cells[index.CandidateVotes] ?? "").replace(/,/g, "")),
      percentText: percent === "" ? null : percent,
      winner: false,
    });
  }
  return [...groups.values()].map((group) =>
    raceShell(stateCode, group.classified, {
      precinctsReporting: group.precinctsReporting,
      precinctsTotal: group.precinctsTotal,
      reportingLabel: group.precinctsTotal == null ? null : "precincts",
      candidates: group.candidates,
    }),
  );
}

export function isGeneralElectionName(name, dateText) {
  const label = String(name || "").toUpperCase();
  const date = String(dateText || "").toUpperCase();
  const blob = `${label} ${date}`;
  if (!/2026/.test(blob)) return false;
  if (/PRIMARY|RUNOFF|RECOUNT|SPECIAL/.test(blob)) return false;
  const novemberThird = (text) =>
    /(^|\D)11\/0?3\/2026/.test(text) || /2026-11-03/.test(text) || /NOVEMBER 0?3(RD)?,? 2026/.test(text) || /2026 NOVEMBER 0?3/.test(text);
  // A file that carries a date must carry November 3, 2026.
  if (date.trim()) return novemberThird(date);
  return novemberThird(label) || (/GENERAL/.test(label) && /NOVEMBER/.test(label));
}

/**
 * Calendar date (YYYY-MM-DD) found in an official timestamp, or null.
 * Reads ISO dates, M/D/YYYY, "Month D, YYYY", and HTTP dates.
 */
export function calendarDate(value) {
  const text = String(value || "");
  let match = text.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (match) return `${match[1]}-${match[2]}-${match[3]}`;
  match = text.match(/(?:^|\D)(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (match) return `${match[3]}-${match[1].padStart(2, "0")}-${match[2].padStart(2, "0")}`;
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  match = text.toUpperCase().match(/(?:^|[^A-Z])(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*\.? (\d{1,2}),? (\d{4})/);
  if (match) return `${match[3]}-${String(months.indexOf(match[1]) + 1).padStart(2, "0")}-${match[2].padStart(2, "0")}`;
  match = text.toUpperCase().match(/(\d{1,2}) (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]* (\d{4})/);
  if (match) return `${match[3]}-${String(months.indexOf(match[2]) + 1).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
  return null;
}
