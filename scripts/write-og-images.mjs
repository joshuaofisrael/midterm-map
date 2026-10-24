/**
 * Build-time Open Graph cards for state hubs, ballot pages, and race pages.
 * 1200×630 PNG. State name, Nov 3, 2026, contest names, and the brand.
 * No candidate photos and no projections.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { RACES } from "../src/data/races.ts";
import { STARTER_STATES, getState } from "../src/data/states.ts";
import { OG_BRAND, OG_DATE, OG_HEIGHT, OG_WIDTH, ballotOg, raceOg, stateHubOg } from "../src/lib/ogCard.ts";

const root = process.cwd();
const regular = readFileSync(path.join(root, "scripts/fonts/LiberationSans-Regular.ttf"));
const bold = readFileSync(path.join(root, "scripts/fonts/LiberationSans-Bold.ttf"));
const fonts = [
  { name: "Liberation Sans", data: regular, weight: 400, style: "normal" },
  { name: "Liberation Sans", data: bold, weight: 700, style: "normal" },
];

function line(text, style) {
  return React.createElement("div", { style: { display: "flex", ...style } }, text);
}

function cardElement(card) {
  const contests = card.contests.map((contest) =>
    line(contest, { fontSize: 28, lineHeight: 1.25, color: "#e8eef5" }),
  );
  if (card.more > 0) {
    contests.push(line(`+ ${card.more} more contests`, { fontSize: 24, color: "#d7e4f2" }));
  }
  return React.createElement(
    "div",
    {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#143251",
        color: "#ffffff",
        padding: "56px 64px",
        fontFamily: "Liberation Sans",
      },
    },
    React.createElement(
      "div",
      { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
      line(OG_BRAND.toUpperCase(), { fontSize: 28, fontWeight: 700, letterSpacing: 1.5 }),
      line(OG_DATE, { fontSize: 32, fontWeight: 700 }),
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      line(card.kicker.toUpperCase(), { fontSize: 22, letterSpacing: 2, color: "#d7e4f2" }),
      line(card.title, { fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 12 }),
    ),
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, ...contests),
    line("Voter information. Not an official election website.", { fontSize: 22, color: "#d7e4f2" }),
  );
}

async function writeCard(card) {
  const svg = await satori(cardElement(card), { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: OG_WIDTH } }).render().asPng();
  const dest = path.join(root, "public", card.file);
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, png);
}

const cards = [
  ...STARTER_STATES.map((state) => stateHubOg(state.code, state.name)),
  ...STARTER_STATES.map((state) => ballotOg(state.code, state.name)),
  ...RACES.map((race) => raceOg(race, getState(race.state)?.name ?? race.state)),
];

for (const card of cards) {
  const banned = /candidate|tossup|lean [dr]|likely [dr]|solid [dr]|project/i;
  const text = `${card.title} ${card.kicker} ${card.contests.join(" ")} ${card.alt}`;
  if (banned.test(text)) {
    throw new Error(`OG card looks like a projection or a candidate list: ${card.file}`);
  }
}

for (const card of cards) {
  await writeCard(card);
}

const sample = cards[0];
console.log(`Wrote ${cards.length} Open Graph cards (${OG_WIDTH}×${OG_HEIGHT}), including ${sample.file}`);
