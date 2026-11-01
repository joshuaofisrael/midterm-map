/**
 * Fail the build unless the election-night sponsorship row sits under the
 * house-ad banner and above the h1 on the homepage, /live/, /results/, and
 * each state results page, and unless /advertise/ states the offer.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { STARTER_STATES } from "../src/data/states.ts";
import {
  activeSponsor,
  SPONSOR_CHECKOUT_URL,
  SPONSOR_COLORS,
  SPONSOR_SLOT_COPY,
  SPONSOR_SLOT_MIN_HEIGHT,
} from "../src/data/sponsor.ts";

const OUT = path.join(process.cwd(), "out");
const errors: string[] = [];
const sponsor = activeSponsor();

function read(rel: string): string {
  return readFileSync(path.join(OUT, rel), "utf8");
}

/** Drop scripts so RankFootprint's deferred sample tag is not content between the banners. */
function visible(html: string): string {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function gapIsEmpty(html: string, from: number, to: number): boolean {
  return html.slice(from, to).replace(/<!--[\s\S]*?-->/g, "").trim() === "";
}

function slotElement(html: string, kind: "open" | "sold"): string | null {
  const tag = kind === "open" ? "aside" : "a";
  const match = html.match(new RegExp(`<${tag}\\b[^>]*data-sponsor-slot="${kind}"[\\s\\S]*?<\\/${tag}>`));
  return match ? match[0] : null;
}

function assertPlacement(rel: string, html: string) {
  const body = visible(html);
  const kind = sponsor ? "sold" : "open";
  const other = sponsor ? "open" : "sold";
  if (body.includes(`data-sponsor-slot="${other}"`)) {
    errors.push(`${rel}: unexpected ${other} slot`);
  }
  const el = slotElement(body, kind);
  if (!el) {
    errors.push(`${rel}: missing ${kind} sponsor slot`);
    return;
  }
  if ((body.match(/data-sponsor-slot=/g) ?? []).length !== 1) {
    errors.push(`${rel}: expected one sponsor slot`);
  }
  if (!el.includes(`min-height:${SPONSOR_SLOT_MIN_HEIGHT}px`)) {
    errors.push(`${rel}: missing reserved min-height`);
  }
  if (/position:\s*(sticky|fixed)/i.test(el)) errors.push(`${rel}: sponsor slot is sticky or fixed`);
  const adAt = body.indexOf("data-house-ad");
  const slotMark = body.indexOf(`data-sponsor-slot="${kind}"`);
  const slotAt = slotMark === -1 ? -1 : body.lastIndexOf("<", slotMark);
  const h1At = body.search(/<h1\b/i);
  const adEnd = adAt === -1 ? -1 : body.indexOf("</a>", adAt);
  if (adAt === -1 || adEnd === -1 || slotAt < adEnd || (h1At !== -1 && slotAt > h1At)) {
    errors.push(`${rel}: sponsor slot is not under the house ad and above the heading`);
  } else if (!gapIsEmpty(body, adEnd + "</a>".length, slotAt)) {
    errors.push(`${rel}: content between the house ad and the sponsor slot`);
  }

  if (!sponsor) {
    if (!el.includes(">Advertise here<")) errors.push(`${rel}: missing Advertise here`);
    if (!el.includes(SPONSOR_SLOT_COPY)) errors.push(`${rel}: missing booking copy`);
    if (!el.includes('href="/advertise/"')) errors.push(`${rel}: booking link is not /advertise/`);
    if (!el.includes(">Book this slot<")) errors.push(`${rel}: missing Book this slot`);
    if (!el.includes(`border:2px solid ${SPONSOR_COLORS.border}`)) errors.push(`${rel}: missing emerald border`);
    if (!el.includes(`background:${SPONSOR_COLORS.background}`)) errors.push(`${rel}: missing emerald background`);
    if (!el.includes(`background:${SPONSOR_COLORS.button}`)) errors.push(`${rel}: missing emerald button`);
    if (!el.includes(`color:${SPONSOR_COLORS.buttonText}`)) errors.push(`${rel}: button text is not white`);
    if (el.includes('rel="sponsored')) errors.push(`${rel}: booking link is marked sponsored`);
    return;
  }

  if (!el.includes(`>Sponsored by ${sponsor.name}<`)) errors.push(`${rel}: missing Sponsored by name`);
  if (!el.includes(sponsor.copy)) errors.push(`${rel}: missing sponsor copy`);
  if (!el.includes(`href="${sponsor.url}"`)) errors.push(`${rel}: missing sponsor URL`);
  if (!el.includes('rel="sponsored noopener"')) errors.push(`${rel}: missing rel="sponsored noopener"`);
  if (!el.includes('target="_blank"')) errors.push(`${rel}: sold banner is not a new tab`);
  if (sponsor.image) {
    if (!el.includes(`src="${sponsor.image}"`)) errors.push(`${rel}: missing sponsor image`);
    if (!el.includes('width="120"') || !el.includes('height="40"')) {
      errors.push(`${rel}: sponsor image has no reserved size`);
    }
  } else if (/<img\b/i.test(el)) {
    errors.push(`${rel}: image rendered without a config image`);
  }
}

function assertAdvertisePage(html: string) {
  const body = visible(html);
  if (body.includes("data-sponsor-slot")) errors.push("advertise/index.html: booking slot should not repeat here");
  if (!body.includes(SPONSOR_CHECKOUT_URL)) errors.push("advertise/index.html: missing checkout URL");
  if (!body.includes(">Pay $1,000<")) errors.push("advertise/index.html: missing Pay $1,000");
  if (!body.includes("Traffic is not guaranteed")) errors.push("advertise/index.html: missing traffic line");
  if (!/full refund/i.test(body)) errors.push("advertise/index.html: missing full refund");
  if (!body.includes("00:00") || !body.includes("23:59")) errors.push("advertise/index.html: missing ET window");
  if (!/Non-political businesses only/i.test(body)) errors.push("advertise/index.html: missing non-political rule");
  if (!/candidates/i.test(body) || !/PACs/i.test(body) || !/ballot-measure/i.test(body)) {
    errors.push("advertise/index.html: missing excluded advertisers");
  }
  if (!/issue advocacy/i.test(body)) errors.push("advertise/index.html: missing issue advocacy exclusion");
  if (!body.includes("Sponsored")) errors.push("advertise/index.html: missing Sponsored label");
  if (!body.includes('href="/contact/"')) errors.push("advertise/index.html: missing contact form link");
  if (/noindex/i.test(html)) errors.push("advertise/index.html: noindex is set");
  if (/Joshua|LLC|Ventures/i.test(body)) errors.push("advertise/index.html: names the operator");
}

if (!existsSync(OUT)) {
  console.error("sponsor slot: out/ is missing. Run next build first.");
  process.exit(1);
}

const required = ["index.html", "results/index.html"];
for (const state of STARTER_STATES) required.push(`results/state/${state.code}/index.html`);

for (const rel of required) {
  const full = path.join(OUT, rel);
  if (!existsSync(full)) {
    errors.push(`${rel}: missing`);
    continue;
  }
  assertPlacement(rel, read(rel));
}

const stateDir = path.join(OUT, "results/state");
if (existsSync(stateDir)) {
  for (const name of readdirSync(stateDir)) {
    const index = path.join(stateDir, name, "index.html");
    if (statSync(path.join(stateDir, name)).isDirectory() && !existsSync(index)) {
      errors.push(`results/state/${name}/index.html: missing`);
    }
  }
}

const advertise = path.join(OUT, "advertise/index.html");
if (!existsSync(advertise)) errors.push("advertise/index.html: missing");
else assertAdvertisePage(read("advertise/index.html"));

for (const rel of ["about/index.html", "advertising/index.html", "ballot/index.html", "contact/index.html"]) {
  if (!existsSync(path.join(OUT, rel))) continue;
  if (visible(read(rel)).includes("data-sponsor-slot")) errors.push(`${rel}: sponsor slot is only for home, live, and results`);
}

if (errors.length) {
  console.error(`sponsor slot: ${errors.length} problem(s)`);
  for (const error of errors.slice(0, 40)) console.error(`  ${error}`);
  process.exit(1);
}

console.log(
  `sponsor slot: ${required.length} pages ${sponsor ? `sold to ${sponsor.name}` : "open"}; /advertise/ checked`,
);
