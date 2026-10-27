/**
 * Pre-publish legal hold for Map the Midterms.
 *
 * Fails the process when content that would publish is flagged or is on hold
 * without Joshua's approval of that exact file (sha256 in data/review/approvals.jsonl).
 * This script never writes an approval. A clean scan is not an approval.
 *
 * Automated:
 *   1 allegation keywords next to a named person
 *   2 private emails, phone numbers, and street addresses in content
 *   3 image / asset provenance in data/review/asset-rights.json
 *   4 source URL and retrieval time on candidate, race, and results files
 *   6 final/certified results need an official-status flag; projections, odds,
 *     partial counts, and official results stay distinct; deadline and poll-close
 *     rows need an election-authority source
 *   7 claims that this site is official or affiliated, and unlabelled synthetic media
 * Manual hold list (rules 5 and 8, and any other item Joshua holds):
 *   data/review/holds.jsonl with status HOLD_REVIEW
 *
 * Headline strength, implied wrongdoing beyond the keyword test, personalised
 * advice, and legal complaints that nobody has listed are not machine-detectable.
 * Those stay on the manual hold list.
 */
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "Map the Midterms";
const BOT = "Politics Bot";
const TEXT_EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".txt", ".html", ".svg", ".xml", ".css"]);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg", ".ico"]);
const DATE_RE =
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b|\b\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)?\b/;
const URL_RE = /https?:\/\/[^\s"'<>)\\]+/g;
const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const PHONE_RE = /(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]\d{3}[\s.-]\d{4}\b/g;
const ADDRESS_RE =
  /\b\d{1,6}\s+(?:[A-Za-z0-9.'#-]+\s+){1,6}(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Court|Ct|Way|Place|Terrace|Trail|Circle|Cir)\.?,?\s+(?:[A-Za-z.'-]+,?\s+){1,6}[A-Z]{2}\s+\d{5}(?:-\d{4})?\b/g;

/** The operator's published business mailing address. Not a private-home leak. */
const BUSINESS_ADDRESS = "5640 W Maple Rd, Ste 101, West Bloomfield, MI 48322";

/**
 * Generator cache. Scripts read it. The Next build does not import it, and
 * GitHub Pages publishes `out/`, not this file. Flags here are recorded and
 * left unpublished; they do not by themselves fail the Pages deploy.
 */
const UNPUBLISHED = new Set(["src/data/ballotpedia/cache.json"]);

const SOURCED_FILES = [
  "src/data/races/senate.ts",
  "src/data/races/house.ts",
  "src/data/races/governors.ts",
  "src/data/races/expansion.ts",
  "src/data/officialLists.ts",
  "src/data/live-sources.json",
  "public/live/results.json",
];

const DEADLINE_FILES = ["src/data/electionDates.ts", "src/data/electionDatesMore.ts"];

export type HoldFlag = {
  rule: number;
  title: string;
  flagged: string;
  sources: string[];
  suggestion: string;
  draft_path: string;
  publishable: boolean;
};

type Approval = { path: string; sha256: string };
type HoldLine = { path?: string; status?: string; rule?: number; title?: string; reason?: string };
type RightsEntry = {
  path?: string;
  basis?: string;
  license?: string;
  sourceUrl?: string;
  note?: string;
};

export type HoldOptions = {
  root: string;
  /** Limit the scan to these paths. Used by generators before they publish one file. */
  paths?: string[];
  writeQueue?: boolean;
};

export type HoldResult = {
  exitCode: number;
  flags: HoldFlag[];
  blocking: HoldFlag[];
};

function relPath(root: string, file: string): string {
  return path.relative(root, file).split(path.sep).join("/");
}

function readText(file: string): string {
  return readFileSync(file, "utf8");
}

function sha256(file: string): string {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "out") continue;
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function isTest(rel: string): boolean {
  return /\.test\.(ts|tsx|mjs|js)$/.test(rel) || rel.includes("/__tests__/");
}

function publishable(rel: string): boolean {
  if (UNPUBLISHED.has(rel) || isTest(rel) || rel.startsWith("data/review/")) return false;
  return (
    rel.startsWith("src/app/") ||
    rel.startsWith("src/components/") ||
    rel.startsWith("src/lib/") ||
    rel.startsWith("src/data/") ||
    rel.startsWith("public/")
  );
}

function clip(text: string, max = 400): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1)}…`;
}

function nearbyUrls(text: string, index: number): string[] {
  const window = text.slice(Math.max(0, index - 600), index + 200);
  return [...new Set(window.match(URL_RE) ?? [])].slice(0, 4);
}

function sentences(text: string): string[] {
  return text
    .split(/\n+|(?<=[.?!])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function jsonl(file: string): unknown[] {
  if (!existsSync(file)) return [];
  return readText(file)
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as unknown);
}

function loadApprovals(root: string): Approval[] {
  return jsonl(path.join(root, "data/review/approvals.jsonl")).flatMap((row) => {
    const item = row as Approval;
    return item && typeof item.path === "string" && typeof item.sha256 === "string"
      ? [{ path: item.path, sha256: item.sha256.toLowerCase() }]
      : [];
  });
}

function loadHolds(root: string): HoldLine[] {
  return jsonl(path.join(root, "data/review/holds.jsonl")).flatMap((row) => {
    const item = row as HoldLine;
    return item && typeof item === "object" ? [item] : [];
  });
}

function approved(approvals: Approval[], rel: string, file: string): boolean {
  if (!existsSync(file)) return false;
  const hash = sha256(file);
  return approvals.some((item) => item.path === rel && item.sha256 === hash);
}

function flag(partial: Omit<HoldFlag, "publishable"> & { publishable?: boolean }): HoldFlag {
  return {
    ...partial,
    publishable: partial.publishable ?? publishable(partial.draft_path),
    flagged: clip(partial.flagged),
  };
}

function scanRule1(rel: string, text: string, flags: HoldFlag[]) {
  const directed =
    /\b(?:charges|investigation|allegations?|accused|indicted|indictment|convicted|arrested)\b[^.?!]{0,80}\b(?:into|against|of)\s+([A-Z][A-Za-z.'’-]+(?:\s+[A-Z][A-Za-z.'’-]+){0,3})|\b([A-Z][a-z.'’-]+(?:\s+[A-Z][a-z.'’-]+){1,2})\s+(?:was|were|is|has been|had been)\s+(?:charged|indicted|convicted|accused|arrested|investigated)\b/g;
  const keyword =
    /\b(defrauded|fraudulent|fraud|corruption|corrupt|bribery|bribed|embezzl\w*|indicted|indictment|misconduct|doxx(?:ed|ing)?|money laundering|sexual assault|child abuse|racketeering|convicted|felony)\b/i;
  const seen = new Set<string>();
  for (const match of text.matchAll(directed)) {
    const name = (match[1] || match[2] || "").trim();
    if (!name || /^(the|a|an)$/i.test(name)) continue;
    const start = Math.max(0, (match.index ?? 0) - 140);
    const window = text.slice(start, (match.index ?? 0) + match[0].length + 140);
    if (/\b(shall|charter|if he or she|if the mayor|amendment|proposition)\b/i.test(window)) continue;
    if (/\b(prevent|detect|avoid|deter)\s+fraud\b/i.test(window)) continue;
    if (/\b(prosecutor|prosecution)\b/i.test(window) && !/\b(charged|indicted|convicted|accused)\b/i.test(window)) continue;
    if (!keyword.test(window)) continue;
    const snippet = clip(window, 320);
    const key = `${rel}:${name.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    flags.push(
      flag({
        rule: 1,
        title: `Allegation next to ${name}`,
        flagged: snippet,
        sources: nearbyUrls(text, match.index ?? 0),
        suggestion: "Hold the allegation for Joshua. Do not soften or rephrase it to pass this gate.",
        draft_path: rel,
      }),
    );
  }
}

function scanRule2(rel: string, text: string, flags: HoldFlag[]) {
  const seen = new Set<string>();
  for (const match of text.matchAll(EMAIL_RE)) {
    const email = match[0];
    if (/example\.com$|schema\.org$|w3\.org$/i.test(email)) continue;
    if (seen.has(email)) continue;
    seen.add(email);
    flags.push(
      flag({
        rule: 2,
        title: "Private email in content",
        flagged: email,
        sources: nearbyUrls(text, match.index ?? 0),
        suggestion: "Leave this address unpublished. Do not copy it onto a page.",
        draft_path: rel,
      }),
    );
  }
  for (const match of text.matchAll(PHONE_RE)) {
    const phone = match[0];
    if (seen.has(phone)) continue;
    seen.add(phone);
    flags.push(
      flag({
        rule: 2,
        title: "Phone number in content",
        flagged: phone,
        sources: nearbyUrls(text, match.index ?? 0),
        suggestion: "Leave this number unpublished unless it is a published election-office main line you have confirmed.",
        draft_path: rel,
      }),
    );
  }
  for (const match of text.matchAll(ADDRESS_RE)) {
    const address = match[0];
    if (address === BUSINESS_ADDRESS || BUSINESS_ADDRESS.startsWith(address)) continue;
    if (seen.has(address)) continue;
    seen.add(address);
    flags.push(
      flag({
        rule: 2,
        title: "Street address in content",
        flagged: address,
        sources: nearbyUrls(text, match.index ?? 0),
        suggestion: "Leave this address unpublished. Ballot questions may name a public property; a home address may not.",
        draft_path: rel,
      }),
    );
  }
}

function loadRights(root: string): RightsEntry[] {
  const file = path.join(root, "data/review/asset-rights.json");
  if (!existsSync(file)) return [];
  const parsed = JSON.parse(readText(file)) as { entries?: RightsEntry[] };
  return Array.isArray(parsed.entries) ? parsed.entries : [];
}

function rightsCover(entry: RightsEntry, rel: string): boolean {
  const pattern = entry.path ?? "";
  if (!pattern) return false;
  if (pattern.includes("*")) {
    const source = pattern
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\*\*/g, "\u0000")
      .replace(/\*/g, "[^/]*")
      .replace(/\u0000/g, ".*");
    return new RegExp(`^${source}$`).test(rel);
  }
  return pattern === rel;
}

function rightsSufficient(entry: RightsEntry): boolean {
  if (entry.basis === "original" || entry.basis === "generated") return true;
  if (entry.basis !== "licensed" && entry.basis !== "public-domain") return false;
  if (!entry.sourceUrl || !entry.license) return false;
  if (/fair use|fair dealing/i.test(entry.license)) return false;
  return true;
}

function scanRule3(root: string, files: string[], flags: HoldFlag[]) {
  const rights = loadRights(root);
  for (const file of files) {
    const rel = relPath(root, file);
    if (!IMAGE_EXT.has(path.extname(rel).toLowerCase())) continue;
    if (!rel.startsWith("public/") && !rel.startsWith("src/app/")) continue;
    const entry = rights.find((item) => rightsCover(item, rel));
    if (entry && rightsSufficient(entry)) continue;
    flags.push(
      flag({
        rule: 3,
        title: `Asset without provenance: ${path.basename(rel)}`,
        flagged: rel,
        sources: entry?.sourceUrl ? [entry.sourceUrl] : [],
        suggestion:
          "Add a provenance entry in data/review/asset-rights.json with a license or public-domain source, or mark it original or generated by us. Attribution alone is not enough. Fair use is not enough.",
        draft_path: rel,
      }),
    );
  }
}

function scanRule4(root: string, flags: HoldFlag[]) {
  const files = [
    ...walk(path.join(root, "src/data/candidates")).filter((file) => file.endsWith(".json")),
    ...walk(path.join(root, "src/data/local")).filter((file) => file.endsWith(".json")),
    ...SOURCED_FILES.map((rel) => path.join(root, rel)),
  ];
  for (const file of files) {
    if (!existsSync(file)) continue;
    const rel = relPath(root, file);
    const text = readText(file);
    const url = text.match(URL_RE)?.[0];
    if (!url || !DATE_RE.test(text)) {
      flags.push(
        flag({
          rule: 4,
          title: "Candidate, race, or results file is missing a source",
          flagged: url ? "Retrieval time is missing." : "Source URL is missing.",
          sources: url ? [url] : [],
          suggestion: "Add the source URL and the time that source was retrieved. Do not invent either.",
          draft_path: rel,
        }),
      );
    }
  }
}

function authorityUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host === "vote.gov" || host.endsWith(".gov")) return true;
    if (host.endsWith(".us") && /state|sos|election|vote/.test(host)) return true;
    if (host.includes("legislature") || host.startsWith("legis.") || host.includes(".legis.")) return true;
    if (/election|vote|ballot|boe/.test(host)) return true;
    return false;
  } catch {
    return false;
  }
}

function sourceConstants(text: string): Map<string, string> {
  const named = new Map<string, string>();
  const objectRe = /const\s+([A-Z][A-Z0-9_]*)\s*(?::\s*[A-Za-z]+)?\s*=\s*\{[\s\S]*?href:\s*"([^"]+)"/g;
  for (const match of text.matchAll(objectRe)) named.set(match[1], match[2]);
  const srcRe = /const\s+([A-Z][A-Z0-9_]*)\s*(?::\s*[A-Za-z]+)?\s*=\s*src\(\s*"(?:\\.|[^"\\])*"\s*,\s*"([^"]+)"/g;
  for (const match of text.matchAll(srcRe)) named.set(match[1], match[2]);
  return named;
}

function sourceArrays(text: string): string[] {
  const arrays: string[] = [];
  let index = 0;
  while ((index = text.indexOf("sources:", index)) !== -1) {
    const after = text.slice(index + "sources:".length, index + "sources:".length + 30);
    if (!/^\s*\[/.test(after)) {
      index += 8;
      continue;
    }
    const bracket = text.indexOf("[", index);
    if (bracket < 0 || bracket - index > 40) {
      index += 8;
      continue;
    }
    let depth = 0;
    let end = bracket;
    for (; end < text.length; end += 1) {
      if (text[end] === "[") depth += 1;
      else if (text[end] === "]") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    arrays.push(text.slice(bracket, end + 1));
    index = end + 1;
  }
  return arrays;
}

function urlsInSourceArray(body: string, named: Map<string, string>): string[] {
  const urls = [...body.matchAll(/https?:\/\/[^\s"'<>]+/g)].map((match) => match[0]);
  for (const match of body.matchAll(/\b([A-Z][A-Z0-9_]*)\b/g)) {
    const url = named.get(match[1]);
    if (url) urls.push(url);
  }
  return urls;
}

function scanDeadlines(root: string, flags: HoldFlag[]) {
  for (const rel of DEADLINE_FILES) {
    const file = path.join(root, rel);
    if (!existsSync(file)) continue;
    const text = readText(file);
    const named = sourceConstants(text);
    for (const body of sourceArrays(text)) {
      if (/^\[\s*\]$/.test(body)) {
        flags.push(
          flag({
            rule: 6,
            title: "Voting date with no source",
            flagged: "A deadline fact has an empty sources list.",
            sources: [],
            suggestion: "Cite the election authority that printed the date, and the day that page was read. If the office did not print the date, omit the date.",
            draft_path: rel,
          }),
        );
        continue;
      }
      const urls = urlsInSourceArray(body, named);
      if (!urls.some(authorityUrl)) {
        flags.push(
          flag({
            rule: 6,
            title: "Voting date without an election-authority source",
            flagged: clip(body, 240),
            sources: urls,
            suggestion: "Point the deadline at the election office, Vote.gov, or the statute that prints it.",
            draft_path: rel,
          }),
        );
      }
    }
    const chunks = text.split(/code:\s*"/).slice(1);
    for (const chunk of chunks) {
      const code = chunk.slice(0, 2);
      const factsAt = chunk.indexOf("facts:");
      if (factsAt < 0) continue;
      if (/facts:\s*\[\s*\]/.test(chunk.slice(factsAt, factsAt + 30))) continue;
      if (!/checkedOn:/.test(chunk.slice(0, factsAt))) {
        flags.push(
          flag({
            rule: 6,
            title: `${code} deadlines have no retrieval date`,
            flagged: `${code} publishes voting dates without checkedOn.`,
            sources: [],
            suggestion: "Record the day the election-authority pages were read.",
            draft_path: rel,
          }),
        );
      }
    }
  }
  const pollFile = path.join(root, "src/data/pollClose.ts");
  if (!existsSync(pollFile)) return;
  const poll = readText(pollFile);
  const rows = [...poll.matchAll(/code:\s*"([A-Z]{2})"[\s\S]*?citation:\s*"([^"]*)"/g)];
  for (const match of rows) {
    const citation = match[2].trim();
    if (citation && (/(?:Code|Stat|Laws?|Const|Elec)\b|§/.test(citation) || authorityUrl(citation))) continue;
    flags.push(
      flag({
        rule: 6,
        title: `${match[1]} poll close has no election-authority source`,
        flagged: citation || "(empty citation)",
        sources: [],
        suggestion: "Cite the statute or election-office page that sets the poll-close time.",
        draft_path: "src/data/pollClose.ts",
      }),
    );
  }
}

function scanRule6Labels(rel: string, text: string, flags: HoldFlag[]) {
  if (rel.endsWith(".json")) {
    try {
      const parsed = JSON.parse(text) as {
        states?: Record<string, { resultsUrl?: string; races?: { certified?: boolean; officialStatus?: boolean; status?: string }[] }>;
      };
      for (const state of Object.values(parsed.states ?? {})) {
        for (const race of state.races ?? []) {
          const claimsFinal = race.status === "final" || race.status === "certified" || race.certified === true;
          const official = race.officialStatus === true || (race.certified === true && Boolean(state.resultsUrl));
          if (claimsFinal && !official) {
            flags.push(
              flag({
                rule: 6,
                title: "Results marked final or certified without official status",
                flagged: JSON.stringify(race).slice(0, 300),
                sources: state.resultsUrl ? [state.resultsUrl] : [],
                suggestion: "Keep certified or final results behind the election file's own official-status flag, and keep the source URL on the state.",
                draft_path: rel,
              }),
            );
          }
        }
      }
    } catch {
      // Prose scan still runs.
    }
  }
  for (const sentence of sentences(text)) {
    if (sentence.length > 800) continue;
    const conflated =
      /\bofficial projection\b|\bcertified (?:projection|odds|partial)\b|\bprojection is (?:the )?(?:official|certified|final)\b|\bpartial counts? (?:are|is) (?:the )?(?:official|final|certified)\b/i.test(
        sentence,
      );
    const kalshi = /\bKalshi\b/.test(sentence) && !/\b(odds|prediction|market|forecast)\b/i.test(sentence);
    const kinds = [
      /\bprojections?\b/i.test(sentence),
      /\bKalshi\b|\bodds\b/i.test(sentence),
      /\bpartial counts?\b|\bpercent reporting\b|\bprecincts reporting\b/i.test(sentence),
      /\b(?:official results|certified results|final results)\b/i.test(sentence),
    ].filter(Boolean).length;
    const distinguished = /\b(not|until|distinct|separate|different|rather|neither|unlike)\b/i.test(sentence);
    if (conflated || kalshi || (kinds >= 2 && !distinguished)) {
      flags.push(
        flag({
          rule: 6,
          title: "Election figure is not labelled distinctly",
          flagged: sentence,
          sources: [],
          suggestion: "Say whether the figure is a projection, market odds, a partial count, or an official result. Do not treat those as the same thing.",
          draft_path: rel,
        }),
      );
    }
    const assertsFinal = /\bresults are (?:final|certified)\b|\bfinal certified results\b|\bwe certify\b/i.test(sentence);
    const negated = /\b(not|never|until|unofficial|n't)\b/i.test(sentence);
    if (assertsFinal && !negated && !/"officialStatus"\s*:\s*true/.test(sentence)) {
      flags.push(
        flag({
          rule: 6,
          title: "Results described as final or certified",
          flagged: sentence,
          sources: [],
          suggestion: "Do not call results final or certified unless the election authority's file says so, and store that official-status flag with the row.",
          draft_path: rel,
        }),
      );
    }
  }
}

function negatedBefore(sentence: string, index: number): boolean {
  const before = sentence.slice(Math.max(0, index - 48), index);
  return /\b(not|no|never|unofficial|n't)\b/i.test(before);
}

function scanRule7(rel: string, text: string, flags: HoldFlag[]) {
  for (const sentence of sentences(text)) {
    if (sentence.length > 800 || sentence.includes("?")) continue;
    const aboutUs = /\b(map the midterms|this site|this website|this page|\bwe\b|\bour\b)\b/i.test(sentence);
    const patterns = [
      /\bofficial election (?:website|site)\b/i,
      /\b(?:this|the|our) (?:site|website|page) is (?:an? )?official\b/i,
    ];
    if (aboutUs) {
      patterns.push(/\baffiliat(?:ed|ion)\b/i, /\b(?:endorsed by|we endorse|our endorsement)\b/i);
    }
    for (const pattern of patterns) {
      const match = pattern.exec(sentence);
      if (!match || negatedBefore(sentence, match.index)) continue;
      flags.push(
        flag({
          rule: 7,
          title: "Official or affiliation claim",
          flagged: sentence,
          sources: [],
          suggestion: "This site is not an election authority and is not affiliated with one. Delete the claim. Do not imply an endorsement.",
          draft_path: rel,
        }),
      );
      break;
    }
  }
  if (rel === "src/data/visuals.ts") {
    const captions = [...text.matchAll(/caption:\s*"([^"]+)"/g)].map((match) => match[1]);
    for (const caption of captions) {
      if (/\b(generic|not a specific|not a photograph)\b/i.test(caption)) continue;
      flags.push(
        flag({
          rule: 7,
          title: "Generated image could be read as evidence",
          flagged: caption,
          sources: [],
          suggestion: "Say the image is generic and not a record of a real person, precinct, or event.",
          draft_path: rel,
        }),
      );
    }
  }
}

function scanHolds(root: string, approvals: Approval[], limit: Set<string> | null, flags: HoldFlag[]) {
  for (const hold of loadHolds(root)) {
    if (hold.status !== "HOLD_REVIEW" || !hold.path) continue;
    if (limit && !limit.has(hold.path)) continue;
    const rel = hold.path;
    const file = path.join(root, rel);
    if (approved(approvals, rel, file)) continue;
    flags.push(
      flag({
        rule: typeof hold.rule === "number" ? hold.rule : 8,
        title: hold.title || `Held: ${rel}`,
        flagged: hold.reason || rel,
        sources: [],
        suggestion: "Leave it unpublished until data/review/approvals.jsonl records the sha256 of this exact file.",
        draft_path: rel,
        publishable: publishable(rel) || Boolean(limit?.has(rel)),
      }),
    );
  }
}

function contentFiles(root: string, limit: Set<string> | null): string[] {
  if (limit) {
    return [...limit].map((rel) => path.join(root, rel)).filter((file) => existsSync(file));
  }
  const roots = ["src/app", "src/components", "src/lib", "src/data", "public"].map((dir) => path.join(root, dir));
  return roots.flatMap((dir) => walk(dir)).filter((file) => {
    const rel = relPath(root, file);
    if (rel.startsWith("data/review/") || isTest(rel)) return false;
    return TEXT_EXT.has(path.extname(rel)) || IMAGE_EXT.has(path.extname(rel));
  });
}

function collect(root: string, limit: Set<string> | null): HoldFlag[] {
  const flags: HoldFlag[] = [];
  const files = contentFiles(root, limit);
  const approvals = loadApprovals(root);
  for (const file of files) {
    const rel = relPath(root, file);
    const ext = path.extname(rel).toLowerCase();
    if (!TEXT_EXT.has(ext)) continue;
    const text = readText(file);
    scanRule1(rel, text, flags);
    scanRule2(rel, text, flags);
    if (!UNPUBLISHED.has(rel)) {
      scanRule6Labels(rel, text, flags);
      scanRule7(rel, text, flags);
    }
  }
  if (!limit) {
    scanRule3(root, files, flags);
    scanRule4(root, flags);
    scanDeadlines(root, flags);
  } else {
    scanRule3(root, files, flags);
    for (const rel of limit) {
      if (!rel.startsWith("src/data/candidates/") && !rel.startsWith("src/data/local/") && !SOURCED_FILES.includes(rel)) continue;
      const file = path.join(root, rel);
      if (!existsSync(file)) continue;
      const text = readText(file);
      const url = text.match(URL_RE)?.[0];
      if (!url || !DATE_RE.test(text)) {
        flags.push(
          flag({
            rule: 4,
            title: "Candidate, race, or results file is missing a source",
            flagged: url ? "Retrieval time is missing." : "Source URL is missing.",
            sources: url ? [url] : [],
            suggestion: "Add the source URL and the time that source was retrieved. Do not invent either.",
            draft_path: rel,
            publishable: true,
          }),
        );
      }
    }
  }
  scanHolds(root, approvals, limit, flags);
  const released = flags.filter((item) => {
    const file = path.join(root, item.draft_path);
    return approved(approvals, item.draft_path, file);
  });
  const releasedKeys = new Set(released.map((item) => `${item.draft_path}\0${item.rule}\0${item.flagged}`));
  return flags.filter((item) => !releasedKeys.has(`${item.draft_path}\0${item.rule}\0${item.flagged}`));
}

function queueKey(item: { draft_path: string; rule: number; flagged: string }): string {
  return `${item.draft_path}\0${item.rule}\0${item.flagged}`;
}

function writeQueue(root: string, flags: HoldFlag[]) {
  const file = path.join(root, "data/review/hold-queue.jsonl");
  const existing = new Set(
    jsonl(file).map((row) => {
      const item = row as { draft_path?: string; rule?: number; flagged?: string };
      return queueKey({
        draft_path: item.draft_path ?? "",
        rule: item.rule ?? 0,
        flagged: item.flagged ?? "",
      });
    }),
  );
  const ts = new Date().toISOString();
  for (const item of flags) {
    const key = queueKey(item);
    if (existing.has(key)) continue;
    existing.add(key);
    const line = {
      ts,
      site: SITE,
      bot: BOT,
      title: item.title,
      flagged: item.flagged,
      rule: item.rule,
      sources: item.sources,
      suggestion: item.suggestion,
      draft_path: item.draft_path,
      status: "HOLD_REVIEW",
    };
    appendFileSync(file, `${JSON.stringify(line)}\n`);
  }
}

export function runLegalHold(options: HoldOptions): HoldResult {
  const root = options.root;
  const limit = options.paths ? new Set(options.paths.map((item) => item.split(path.sep).join("/"))) : null;
  const flags = collect(root, limit);
  if (options.writeQueue !== false) writeQueue(root, flags);
  const blocking = flags.filter((item) => item.publishable || (limit?.has(item.draft_path) ?? false));
  return { exitCode: blocking.length ? 1 : 0, flags, blocking };
}

function parseArgs(argv: string[]): HoldOptions {
  const options: HoldOptions = { root: process.cwd(), writeQueue: true };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--root") options.root = path.resolve(argv[++i] ?? ".");
    else if (arg === "--paths") {
      options.paths = (argv[++i] ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else if (arg === "--no-queue") options.writeQueue = false;
  }
  return options;
}

function isDirectRun(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return path.resolve(entry) === fileURLToPath(import.meta.url);
}

if (isDirectRun()) {
  const result = runLegalHold(parseArgs(process.argv.slice(2)));
  const held = result.flags.filter((item) => !item.publishable);
  console.log(
    `legal-hold: ${result.flags.length} flag(s), ${result.blocking.length} blocking publish, ${held.length} recorded and already unpublished.`,
  );
  for (const item of result.blocking) {
    console.error(`  BLOCK rule ${item.rule} ${item.draft_path}: ${item.flagged}`);
  }
  if (result.blocking.length) process.exit(1);
}
