import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { adsAllowedForPath } from "../lib/adsense.ts";
import {
  activeSponsor,
  ELECTION_NIGHT_SPONSOR,
  SPONSOR_CHECKOUT_URL,
  SPONSOR_COLORS,
  SPONSOR_SLOT_COPY,
  SPONSOR_SLOT_MIN_HEIGHT,
} from "./sponsor.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

function lin(channel: number): number {
  const s = channel / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16);
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
}

function contrast(a: string, b: string): number {
  const hi = Math.max(luminance(a), luminance(b));
  const lo = Math.min(luminance(a), luminance(b));
  return (hi + 0.05) / (lo + 0.05);
}

test("the slot stays unsold until name, https URL, and copy are all set", () => {
  assert.equal(ELECTION_NIGHT_SPONSOR, null);
  assert.equal(activeSponsor(null), null);
  assert.equal(activeSponsor({ name: " ", url: "https://example.com", copy: "Hi" }), null);
  assert.equal(activeSponsor({ name: "Acme", url: "https://example.com", copy: " " }), null);
  assert.equal(activeSponsor({ name: "Acme", url: "http://example.com", copy: "Hi" }), null);
  assert.equal(activeSponsor({ name: "Acme", url: "javascript:alert(1)", copy: "Hi" }), null);
  assert.equal(
    activeSponsor({ name: "Acme", url: "https://example.com", copy: "Hi", image: "javascript:alert(1)" }),
    null,
  );
  assert.deepEqual(activeSponsor({ name: " Acme ", url: "https://example.com/offer", copy: " Hello " }), {
    name: "Acme",
    url: "https://example.com/offer",
    copy: "Hello",
  });
  assert.deepEqual(
    activeSponsor({
      name: "Acme",
      url: "https://example.com",
      copy: "Hello",
      image: " /sponsors/acme.png ",
    }),
    { name: "Acme", url: "https://example.com", copy: "Hello", image: "/sponsors/acme.png" },
  );
});

test("emerald colors meet WCAG AA on the slot", () => {
  const page = "#f6f7f9";
  assert.ok(contrast(SPONSOR_COLORS.border, SPONSOR_COLORS.background) >= 3);
  assert.ok(contrast(SPONSOR_COLORS.border, page) >= 3);
  assert.ok(contrast(SPONSOR_COLORS.text, SPONSOR_COLORS.background) >= 4.5);
  assert.ok(contrast(SPONSOR_COLORS.button, SPONSOR_COLORS.buttonText) >= 4.5);
  assert.equal(SPONSOR_COLORS.border, "#059669");
  assert.equal(SPONSOR_COLORS.background, "#ecfdf5");
  assert.equal(SPONSOR_COLORS.buttonText, "#ffffff");
});

test("booking copy, checkout URL, and slot markup match the offer", () => {
  assert.equal(
    SPONSOR_SLOT_COPY,
    "Your ad here on election night: one exclusive sponsor, 3–6 Nov 2026, $1,000.",
  );
  assert.equal(SPONSOR_CHECKOUT_URL, "https://buy.stripe.com/bJe14o4A8dEBe870jKb3r1U");
  assert.equal(adsAllowedForPath("/advertise/"), false);

  const slot = readFileSync(path.join(root, "src/components/SponsorSlot.tsx"), "utf8");
  assert.match(slot, /Advertise here/);
  assert.match(slot, /Book this slot/);
  assert.match(slot, /href="\/advertise\/"/);
  assert.match(slot, /Sponsored by \{sponsor\.name\}/);
  assert.match(slot, /rel="sponsored noopener"/);
  assert.match(slot, /minHeight: SPONSOR_SLOT_MIN_HEIGHT/);
  assert.match(slot, /2px solid \$\{SPONSOR_COLORS\.border\}/);
  assert.equal(slot.includes("Joshua"), false);
  assert.equal(slot.includes("LLC"), false);
  assert.equal(SPONSOR_SLOT_MIN_HEIGHT >= 72, true);

  const page = readFileSync(path.join(root, "src/app/(site)/advertise/page.tsx"), "utf8");
  assert.match(page, /Pay \$1,000/);
  assert.match(page, /SPONSOR_CHECKOUT_URL/);
  assert.match(page, /Traffic is not guaranteed/);
  assert.match(page, /full refund/);
  assert.match(page, /00:00 Eastern Time \(ET\)/);
  assert.match(page, /23:59 Eastern Time \(ET\)/);
  assert.match(page, /Non-political businesses only/);
  assert.match(page, /candidates, campaigns, political parties, PACs/);
  assert.match(page, /ballot-measure committees, or issue advocacy/);
  assert.match(page, /labelled Sponsored/);
  assert.match(page, /href="\/contact"/);
  assert.doesNotMatch(page, /noindex/);
  assert.doesNotMatch(page, /Joshua|LLC|Ventures/);

  const placements: Array<[string, string]> = [
    ["src/app/(site)/page.tsx", "<HouseAd path=\"/\" />"],
    ["src/app/(site)/live/layout.tsx", "<HouseAd path=\"/live\" />"],
    ["src/app/(site)/results/page.tsx", "<HouseAd path=\"/results\" />"],
    ["src/app/(site)/results/state/[state]/layout.tsx", "<HouseAd path={`/results/state/${state}`} />"],
  ];
  for (const [rel, house] of placements) {
    const source = readFileSync(path.join(root, rel), "utf8");
    const houseAt = source.indexOf(house);
    const slotAt = source.indexOf("<SponsorSlot />");
    assert.ok(houseAt !== -1 && slotAt > houseAt, rel);
    assert.equal(source.slice(houseAt + house.length, slotAt).trim(), "", rel);
  }
});
