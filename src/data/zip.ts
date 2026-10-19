import type { StateCode } from "./types";

/**
 * ZIP3 → starter-state map for client-side lookup only.
 * These ranges are ordinary public ZIP geography, not a voter file.
 * Overlaps and exceptions exist; users must still verify with officials.
 */
const ZIP3_TO_STATE: Record<string, StateCode> = {};

function fill(start: number, end: number, state: StateCode) {
  for (let n = start; n <= end; n += 1) {
    ZIP3_TO_STATE[String(n).padStart(3, "0")] = state;
  }
}

fill(850, 865, "AZ");
fill(300, 319, "GA");
fill(398, 399, "GA");
fill(480, 499, "MI");
fill(270, 289, "NC");
fill(889, 898, "NV");
fill(430, 459, "OH");
fill(150, 196, "PA");
fill(530, 549, "WI");
fill(750, 799, "TX");
ZIP3_TO_STATE["885"] = "TX";
fill(320, 349, "FL");
fill(900, 961, "CA");
fill(100, 149, "NY");
fill(550, 567, "MN");
fill(39, 49, "ME");
fill(500, 528, "IA");
fill(995, 999, "AK");
fill(660, 662, "KS");
fill(664, 679, "KS");
fill(600, 629, "IL");
fill(30, 38, "NH");
ZIP3_TO_STATE["201"] = "VA";
fill(220, 246, "VA");
fill(70, 89, "NJ");
fill(10, 27, "MA");
fill(980, 994, "WA");
fill(800, 816, "CO");
fill(370, 385, "TN");
fill(460, 479, "IN");
fill(630, 658, "MO");
fill(206, 219, "MD");
fill(290, 299, "SC");
fill(350, 369, "AL");
fill(716, 729, "AR");
fill(60, 69, "CT");
fill(197, 199, "DE");
ZIP3_TO_STATE["200"] = "DC";
fill(202, 205, "DC");
fill(967, 968, "HI");
fill(832, 838, "ID");
fill(400, 427, "KY");
fill(700, 714, "LA");
fill(386, 397, "MS");
fill(590, 599, "MT");
fill(680, 693, "NE");
fill(870, 884, "NM");
fill(580, 588, "ND");
fill(730, 749, "OK");
fill(970, 979, "OR");
fill(28, 29, "RI");
fill(570, 577, "SD");
fill(840, 847, "UT");
fill(50, 54, "VT");
fill(56, 59, "VT");
fill(247, 268, "WV");
fill(820, 831, "WY");

export function normalizeZip(input: string): string {
  return input.replace(/\D/g, "").slice(0, 5);
}

export function lookupZipState(zip: string): StateCode | undefined {
  const digits = normalizeZip(zip);
  if (digits.length < 3) return undefined;
  return ZIP3_TO_STATE[digits.slice(0, 3)];
}

export function zipLookupSupported(zip: string): boolean {
  return Boolean(lookupZipState(zip));
}
