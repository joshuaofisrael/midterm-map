/**
 * Match Map the Midterms candidates to names on Ballotpedia's 2026 candidate lists.
 * Matching is exact after light normalization (initials, suffixes, quoted nicknames).
 * A partial name, a nickname, or a different given name does not match.
 */

const SUFFIXES = new Set(["jr", "sr", "ii", "iii", "iv", "v"]);
const NAME_STOP = new Set(["of", "the", "for", "and", "a", "an"]);
const ROLE_STOP = new Set([
  "of",
  "the",
  "for",
  "and",
  "a",
  "an",
  "member",
  "office",
  "no",
  "number",
  "at",
  "place",
  "district",
  "group",
  "seat",
  "position",
]);
const GENERIC_ROLE = new Set([
  "judge",
  "commissioner",
  "member",
  "trustee",
  "director",
  "representative",
  "senator",
  "council",
  "candidate",
]);
const BOUNDARY = new Set([
  "city",
  "town",
  "village",
  "township",
  "county",
  "parish",
  "borough",
  "council",
  "mayor",
  "clerk",
  "treasurer",
  "judge",
  "sheriff",
  "attorney",
  "commission",
  "commissioner",
  "district",
  "trustee",
  "supervisor",
  "assessor",
  "collector",
  "surveyor",
  "constable",
  "justice",
  "court",
  "probate",
  "tax",
  "auditor",
  "recorder",
  "coroner",
  "marshal",
  "police",
  "school",
  "board",
  "seat",
  "at",
  "large",
  "group",
  "place",
  "circuit",
  "judicial",
  "solicitor",
  "public",
  "defender",
  "state",
  "unified",
  "government",
  "municipal",
  "township",
  "ward",
  "position",
  "office",
]);
const ORDINALS = {
  first: "1",
  second: "2",
  third: "3",
  fourth: "4",
  fifth: "5",
  sixth: "6",
  seventh: "7",
  eighth: "8",
  ninth: "9",
  tenth: "10",
  eleventh: "11",
  twelfth: "12",
  thirteenth: "13",
  fourteenth: "14",
  fifteenth: "15",
};
const PLACE_CLASS = [
  "unified government",
  "consolidated government",
  "metropolitan government",
  "urban county",
  "municipality",
  "corporation",
  "comunidad",
  "urbana",
  "village",
  "borough",
  "township",
  "city",
  "town",
  "cdp",
];

export function decodeHtml(value) {
  return String(value)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function stripTags(html) {
  return decodeHtml(String(html).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

export function isTicket(name) {
  return /[A-Za-z]\s*\/\s*[A-Za-z]/.test(String(name));
}

export function nameTokens(raw) {
  let s = String(raw).normalize("NFKD").replace(/\p{M}/gu, "");
  s = s.replace(/[“”"]([^“”"]+)[“”"]/g, " ");
  s = s.replace(/\([^)]*\)/g, " ");
  s = s.replace(/&[a-z]+;/gi, " ");
  s = s.replace(/[^A-Za-z\s'-]/g, " ");
  s = s.toLowerCase();
  return s
    .split(/[\s'-]+/)
    .filter(Boolean)
    .filter((token) => !SUFFIXES.has(token) && !NAME_STOP.has(token));
}

/** True when two labels are the same person, not merely the same surname. */
export function samePerson(a, b) {
  const left = nameTokens(a).filter((token) => token.length > 1);
  const right = nameTokens(b).filter((token) => token.length > 1);
  if (left.length < 2 || right.length < 2) return false;
  const key = (tokens) => tokens.slice().sort().join("|");
  return key(left) === key(right);
}

export function placeStem(name) {
  let stem = String(name).trim();
  const lower = stem.toLowerCase();
  const suffixes = PLACE_CLASS.slice().sort((a, b) => b.length - a.length);
  for (const suffix of suffixes) {
    if (lower.endsWith(` ${suffix}`)) return stem.slice(0, -suffix.length).trim();
  }
  return stem;
}

function singular(token) {
  if (token.length > 4 && token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

export function normTokens(value) {
  let s = String(value).normalize("NFKD").replace(/\p{M}/gu, "");
  s = s.toLowerCase();
  s = s.replace(/['’.]/g, "");
  s = s.replace(/&/g, " and ");
  s = s.replace(/[^a-z0-9\s-]/g, " ");
  s = s.replace(/\bst\b/g, "saint");
  s = s.replace(/-/g, " ");
  return s.split(/\s+/).filter(Boolean).map(singular);
}

export function jurisdictionKey(name) {
  const tokens = normTokens(name).filter(
    (token) => !["county", "parish", "borough", "census", "area", "municipality", "and"].includes(token),
  );
  return tokens.join(" ");
}

export function officeNumbers(value) {
  let s = String(value).toLowerCase();
  s = s.replace(/\d+\s*-\s*year\b/g, " ");
  s = s.replace(/\b(19|20)\d{2}\b/g, " ");
  const found = new Set();
  for (const match of s.matchAll(/\b(\d+)(?:st|nd|rd|th)?\b/g)) {
    const n = String(parseInt(match[1], 10));
    if (n !== "0") found.add(n);
  }
  for (const [word, n] of Object.entries(ORDINALS)) {
    if (new RegExp(`\\b${word}\\b`).test(s)) found.add(n);
  }
  return [...found];
}

function numbersCompatible(ourOffice, bpOffice) {
  const ours = officeNumbers(ourOffice);
  const theirs = officeNumbers(bpOffice);
  if (ours.length === 0 && theirs.length === 0) return true;
  if (ours.length === 0 || theirs.length === 0) return false;
  return ours.some((n) => theirs.includes(n));
}

export function roleWords(office, jurisdictionStem) {
  const skip = new Set(normTokens(jurisdictionStem));
  return normTokens(office).filter((token) => !skip.has(token) && !ROLE_STOP.has(token) && !/^\d+$/.test(token));
}

function sameWordSet(a, b) {
  const left = [...new Set(a)].sort();
  const right = [...new Set(b)].sort();
  return left.length > 0 && left.join("|") === right.join("|");
}

function isSubset(smaller, larger) {
  const set = new Set(larger);
  return smaller.length > 0 && smaller.every((word) => set.has(word));
}

export function jurisdictionFollows(office, stem) {
  const hay = normTokens(office);
  const needle = normTokens(stem);
  if (needle.length === 0 || hay.length < needle.length) return false;
  for (let i = 0; i <= hay.length - needle.length; i += 1) {
    let matched = true;
    for (let j = 0; j < needle.length; j += 1) {
      if (hay[i + j] !== needle[j]) {
        matched = false;
        break;
      }
    }
    if (!matched) continue;
    const next = hay[i + needle.length];
    if (!next || BOUNDARY.has(next) || /^\d+$/.test(next)) return true;
  }
  return false;
}

function hasUsMark(value) {
  return /(?:^|[^a-z])u\.?\s*s\.?(?:[^a-z]|$)|united states/.test(value);
}

export function classifyBallotpediaOffice(office) {
  const s = String(office).toLowerCase().replace(/&amp;/g, "and");
  const districtMatch = s.match(/district\s+(\d+)/);
  const numbered = districtMatch ? String(parseInt(districtMatch[1], 10)) : null;
  const atLarge = /at[-\s]?large/.test(s);
  const federal = hasUsMark(s);
  const stateLeg = /state senate|state house|house of delegates|state assembly|house of representatives district/.test(s);
  if (stateLeg && !federal) return { kind: "legislature", district: numbered };
  const usSenate = /senate|senator|shadow senator/.test(s) && federal && !/state senate/.test(s);
  if (usSenate) return { kind: "senate", district: null };
  const usHouse = /house|representative in congress|representative|delegate/.test(s) && federal && !/state house|state representative/.test(s);
  if (usHouse && (/house|representative in congress|delegate/.test(s) || /representative/.test(s))) {
    let district = numbered;
    if (!district && (atLarge || /delegate/.test(s))) district = "0";
    if (district || /house|representative in congress|delegate|representative/.test(s)) {
      return { kind: "house", district };
    }
  }
  if (/\bgovernor\b/.test(s) && !/lieutenant|lt\.?\s*gov/.test(s) && !/board of governors/.test(s)) {
    return { kind: "governor", district: null };
  }
  return { kind: "statewide", district: numbered };
}

export function isGeneralBallot(status) {
  const s = String(status).toLowerCase();
  if (!s.includes("on the ballot") || !s.includes("general")) return false;
  if (s.includes("withdrew") || s.includes("disqualified")) return false;
  return true;
}

export function parseCandidateRows(html) {
  const rows = [];
  const parts = String(html).split(/<tr\b/i).slice(1);
  for (const part of parts) {
    const tr = part.split(/<\/tr>/i)[0];
    if (!/ballotpedia\.org\//i.test(tr)) continue;
    let name = "";
    let url = "";
    let office = "";
    let officeUrl = "";
    let party = "";
    let status = "";
    const cand = tr.match(/data-cell="candidate"[\s\S]*?<a href="(https:\/\/ballotpedia\.org\/[^"]+)"[^>]*>([^<]+)/i);
    if (cand) {
      url = decodeURIComponentSafe(cand[1]);
      name = decodeHtml(cand[2]);
      const linkedOffice = tr.match(/data-cell="office"[\s\S]*?<a href="([^"]+)"[^>]*>([^<]+)/i);
      if (linkedOffice) {
        officeUrl = decodeHtml(linkedOffice[1]);
        office = decodeHtml(linkedOffice[2]);
      } else {
        const spanOffice = tr.match(/data-cell="office"[\s\S]*?<span>([^<]+)<\/span>/i);
        if (spanOffice) office = decodeHtml(spanOffice[1]);
      }
      const partyMatch = tr.match(/data-cell="party"[\s\S]*?<span[^>]*>([^<]+)/i);
      if (partyMatch) party = decodeHtml(partyMatch[1]);
      const statusMatch = tr.match(/data-cell="status"[\s\S]*?<\/td>/i);
      if (statusMatch) status = stripTags(statusMatch[0]);
    } else {
      const cells = [...tr.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => match[1]);
      if (cells.length < 2) continue;
      const link = cells[0].match(/<a href="(https:\/\/ballotpedia\.org\/[^"]+)"[^>]*>([^<]+)/i);
      if (!link) continue;
      url = decodeURIComponentSafe(link[1]);
      name = decodeHtml(link[2]);
      const officeLink = cells[1].match(/<a href="([^"]+)"[^>]*>([^<]+)/i);
      if (officeLink) {
        officeUrl = decodeHtml(officeLink[1]);
        office = decodeHtml(officeLink[2]);
      } else office = stripTags(cells[1]);
      party = cells[2] ? stripTags(cells[2]) : "";
      status = cells[3] ? stripTags(cells[3]) : "";
    }
    name = name.replace(/\s+/g, " ").trim();
    office = office.replace(/\s+/g, " ").trim();
    if (!name || !url.startsWith("https://ballotpedia.org/")) continue;
    if (/\/wiki\/|Special:|Ballotpedia:|Category:|File:/i.test(url)) continue;
    rows.push({
      name,
      url,
      office,
      officeUrl,
      party: party.replace(/\s+/g, " ").trim(),
      status: status.replace(/\s+/g, " ").trim(),
    });
  }
  return rows;
}

function decodeURIComponentSafe(url) {
  const decoded = decodeHtml(url);
  try {
    return decodeURI(decoded);
  } catch {
    return decoded;
  }
}

export function countyOptions(html) {
  const selects = String(html).split(/<select\b/i).slice(1);
  let best = [];
  for (const select of selects) {
    const body = select.split(/<\/select>/i)[0];
    const options = [...body.matchAll(/<option value="(\d+)"[^>]*>([^<]+)/gi)].map((match) => ({
      id: match[1],
      name: decodeHtml(match[2]).replace(/\s+/g, " ").trim(),
    }));
    if (options.length > best.length) best = options;
  }
  return best;
}

export function electionsTitle(stateName) {
  return `${stateName.replace(/ /g, "_")}_elections,_2026`;
}

function wordKey(words) {
  return [...new Set(words)].sort().join("|");
}

function chooseOffices(ourOffice, groups, jurisdiction, stateName) {
  const ours = roleWords(ourOffice, jurisdiction);
  const stateTokens = new Set(normTokens(stateName || ""));
  let bestScore = 0;
  const scored = [];
  for (const [office, rows] of groups) {
    if (!numbersCompatible(ourOffice, office)) continue;
    const theirs = roleWords(office, jurisdiction);
    const score = officeScore(ours, theirs, stateTokens);
    if (score > 0) scored.push({ office, rows, score, key: wordKey(theirs) });
    if (score > bestScore) bestScore = score;
  }
  const top = scored.filter((item) => item.score === bestScore && bestScore > 0);
  if (top.length === 0) return [];
  const keys = new Set(top.map((item) => item.key));
  if (keys.size > 1) return [];
  return top.flatMap((item) => item.rows);
}

function officeScore(ours, theirs, stateTokens) {
  if (ours.length === 0 || theirs.length === 0) return 0;
  if (sameWordSet(ours, theirs)) return 3;
  if (ours.length === 1 && GENERIC_ROLE.has(ours[0])) return 0;
  if (theirs.length === 1 && GENERIC_ROLE.has(theirs[0])) return 0;
  const ourSet = new Set(ours);
  const theirSet = new Set(theirs);
  if (isSubset(ours, theirs)) {
    const extra = [...theirSet].filter((word) => !ourSet.has(word));
    if (extra.every((word) => stateTokens.has(word))) return 2;
  }
  if (isSubset(theirs, ours)) {
    const extra = [...ourSet].filter((word) => !theirSet.has(word));
    if (extra.every((word) => stateTokens.has(word))) return 2;
  }
  return 0;
}

export function houseDistrict(value) {
  const text = String(value ?? "");
  if (/at[-\s]?large/i.test(text)) return "0";
  const match = text.match(/\d+/);
  if (!match) return "0";
  return String(parseInt(match[0], 10));
}

export function rowsForContest(contest, rows, stateName) {
  const general = rows.filter((row) => row.office && isGeneralBallot(row.status));
  if (contest.kind === "senate" || contest.kind === "house" || contest.kind === "governor") {
    const wantDistrict = contest.kind === "house" ? houseDistrict(contest.district) : null;
    const matched = general.filter((row) => {
      const classified = classifyBallotpediaOffice(row.office);
      if (classified.kind !== contest.kind) return false;
      if (contest.kind === "house") return classified.district === wantDistrict;
      return true;
    });
    const offices = new Set(matched.map((row) => row.office));
    if (offices.size <= 1) return matched;
    const grouped = groupBy(matched, (row) => row.office);
    const narrowed = chooseOffices(contest.office, grouped, "", stateName);
    return narrowed.length > 0 ? narrowed : [];
  }
  const grouped = groupBy(
    general.filter((row) => classifyBallotpediaOffice(row.office).kind === "statewide"),
    (row) => row.office,
  );
  return chooseOffices(contest.office, grouped, "", stateName);
}

export function rowsForLocal(office, jurisdictionStem, rows, stateName) {
  const general = rows.filter((row) => row.office && isGeneralBallot(row.status) && jurisdictionFollows(row.office, jurisdictionStem));
  const grouped = groupBy(general, (row) => row.office);
  return chooseOffices(office, grouped, jurisdictionStem, stateName);
}

function groupBy(rows, keyFn) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    const list = map.get(key);
    if (list) list.push(row);
    else map.set(key, [row]);
  }
  return map;
}

export function matchNames(candidates, bpRows) {
  return candidates.map((candidate) => {
    if (!candidate.name || !candidate.name.trim()) {
      return { name: candidate.name, url: null, reason: "The candidate row has no name." };
    }
    if (isTicket(candidate.name)) {
      return {
        name: candidate.name,
        url: null,
        reason: "Joint ticket. Ballotpedia lists these names on separate pages, so one profile URL is not stored.",
      };
    }
    const hits = bpRows.filter((row) => samePerson(candidate.name, row.name));
    const urls = [...new Set(hits.map((row) => row.url))];
    if (urls.length === 1) return { name: candidate.name, url: urls[0], reason: null, office: hits[0].office };
    if (urls.length === 0) {
      return {
        name: candidate.name,
        url: null,
        reason: bpRows.length === 0
          ? "No Ballotpedia 2026 general-election candidate list matched this office."
          : "No name on the Ballotpedia 2026 general candidate list for this office matched.",
      };
    }
    return { name: candidate.name, url: null, reason: "More than one Ballotpedia profile matched this name." };
  });
}

export function isDisambiguation(html, finalUrl) {
  const title = decodeHtml((String(html).match(/<title>([^<]*)/i) || [])[1] || "");
  if (/disambiguation/i.test(title) || /disambiguation/i.test(finalUrl)) return true;
  const early = stripTags(String(html).slice(0, 60000)).slice(0, 1800);
  if (/may refer to/i.test(early)) return true;
  if (/disambiguation page/i.test(early)) return true;
  return false;
}

export function ledeFrom(html) {
  const title = decodeHtml((String(html).match(/<title>([^<]*)/i) || [])[1] || "");
  let start = String(html).search(/class="mw-parser-output"|id="mw-content-text"/i);
  if (start < 0) start = 0;
  let chunk = String(html).slice(start, start + 24000);
  chunk = chunk.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  const lede = stripTags(chunk).slice(0, 4000);
  return { title, lede };
}

const OFFICE_WORDS = [
  "senate",
  "senator",
  "governor",
  "representative",
  "delegate",
  "attorney",
  "treasurer",
  "sheriff",
  "council",
  "clerk",
  "judge",
  "mayor",
  "commissioner",
  "superintendent",
  "comptroller",
  "auditor",
  "secretary",
  "agriculture",
  "insurance",
  "lieutenant",
  "justice",
  "controller",
  "solicitor",
  "assessor",
  "surveyor",
  "constable",
  "coroner",
  "recorder",
  "trustee",
];

export function mentionsState(text, stateName) {
  const hay = String(text).toLowerCase();
  const name = String(stateName).toLowerCase();
  if (name && hay.includes(name)) return true;
  if (name === "district of columbia") {
    return hay.includes("washington, d.c") || hay.includes("washington dc") || hay.includes("d.c.");
  }
  return false;
}

export function mentionsOffice(text, office) {
  const hay = String(text).toLowerCase();
  const words = normTokens(office);
  if (words.some((word) => word.length >= 6 && hay.includes(word) && OFFICE_WORDS.includes(word))) return true;
  return OFFICE_WORDS.some((word) => words.includes(word) && hay.includes(word));
}

export function profileAcceptable({ status, finalUrl, html, stateName, office }) {
  if (status !== 200) return { ok: false, disambiguation: false, mentionsState: false, mentionsOffice: false };
  if (!String(finalUrl).startsWith("https://ballotpedia.org/")) {
    return { ok: false, disambiguation: false, mentionsState: false, mentionsOffice: false };
  }
  const disambiguation = isDisambiguation(html, finalUrl);
  const { title, lede } = ledeFrom(html);
  const text = `${title} ${lede}`;
  if (/does not have an article|there is currently no text in this page|page does not exist/i.test(text)) {
    return { ok: false, disambiguation, mentionsState: false, mentionsOffice: false, title, lede };
  }
  const stateHit = mentionsState(text, stateName);
  const officeHit = mentionsOffice(text, office);
  return {
    ok: !disambiguation && (stateHit || officeHit),
    disambiguation,
    mentionsState: stateHit,
    mentionsOffice: officeHit,
    title,
    lede,
  };
}
