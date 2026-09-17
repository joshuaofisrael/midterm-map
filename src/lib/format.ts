import type { PartyId, RatingTier } from "@/data/types";

export function partyTone(party: PartyId): string {
  switch (party) {
    case "DEM":
      return "text-[#1d4f86]";
    case "REP":
      return "text-[#8a3030]";
    default:
      return "text-ink-muted";
  }
}

export function ratingTone(tier: RatingTier): string {
  if (tier.includes("D")) return "bg-[#e4eef7] text-[#1d4f86] border-[#b9cde3]";
  if (tier.includes("R")) return "bg-[#f6e8e8] text-[#7a2d2d] border-[#e0c0c0]";
  return "bg-[#f3efe4] text-[#5c4a1f] border-[#ddd0a8]";
}

export function chamberLabel(chamber: string): string {
  switch (chamber) {
    case "senate":
      return "U.S. Senate";
    case "house":
      return "U.S. House";
    case "governor":
      return "Governor";
    default:
      return "Statewide";
  }
}
