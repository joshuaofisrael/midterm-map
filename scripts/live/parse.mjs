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
  } else if (/GOVERNOR/.test(upper) && !/LIEUTENANT|LT\.?\s*GOVERNOR/.test(upper)) {
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

export function isGeneralElectionName(name, dateText) {
  const blob = `${name || ""} ${dateText || ""}`.toUpperCase();
  if (!/2026/.test(blob)) return false;
  if (/PRIMARY|RUNOFF|RECOUNT|SPECIAL/.test(blob)) return false;
  return /GENERAL/.test(blob) || /11\/0?3\/2026/.test(blob) || /2026-11-03/.test(blob) || /NOVEMBER 3/.test(blob);
}
