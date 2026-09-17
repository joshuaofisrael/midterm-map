import type { NationalStripRow, PollRow, RatingTier } from "./types";
import { RACES } from "./races";

const POLL_NOTE =
  "Seeded demo row for table layout. Not a real poll release, not an average, and not a prediction.";

function row(
  slug: string,
  raceSlug: string,
  pollster: string,
  dates: string,
  sample: string,
  dem: number,
  rep: number,
  other: number | null,
  spread: string,
): PollRow {
  return {
    slug,
    raceSlug,
    pollster,
    dates,
    sample,
    dem,
    rep,
    other,
    spread,
    isDemo: true,
    note: POLL_NOTE,
  };
}

export const POLLS: PollRow[] = [
  row("ga-senate-demo-1", "ga-senate-2026", "Demo Pollster A", "Aug 12–15, 2026", "800 LV", 46, 45, 3, "D +1"),
  row("ga-senate-demo-2", "ga-senate-2026", "Demo Pollster B", "Aug 20–24, 2026", "650 RV", 44, 46, 2, "R +2"),
  row("mi-senate-demo-1", "mi-senate-2026", "Demo Pollster C", "Aug 8–11, 2026", "720 LV", 48, 43, 2, "D +5"),
  row("nc-senate-demo-1", "nc-senate-2026", "Demo Pollster A", "Aug 18–21, 2026", "780 LV", 44, 47, 3, "R +3"),
  row("tx-senate-demo-1", "tx-senate-2026", "Demo Pollster D", "Aug 5–9, 2026", "900 RV", 41, 50, 3, "R +9"),
  row("az-gov-demo-1", "az-governor-2026", "Demo Pollster B", "Aug 14–17, 2026", "700 LV", 45, 45, 4, "Even"),
  row("ga-gov-demo-1", "ga-governor-2026", "Demo Pollster C", "Aug 2–6, 2026", "640 LV", 42, 49, 2, "R +7"),
  row("mi-gov-demo-1", "mi-governor-2026", "Demo Pollster A", "Aug 19–22, 2026", "710 LV", 47, 44, 3, "D +3"),
  row("nv-gov-demo-1", "nv-governor-2026", "Demo Pollster D", "Aug 11–13, 2026", "600 LV", 46, 46, 2, "Even"),
  row("oh-gov-demo-1", "oh-governor-2026", "Demo Pollster B", "Aug 7–10, 2026", "750 RV", 40, 51, 3, "R +11"),
  row("pa-gov-demo-1", "pa-governor-2026", "Demo Pollster C", "Aug 16–19, 2026", "820 LV", 47, 45, 2, "D +2"),
  row("wi-gov-demo-1", "wi-governor-2026", "Demo Pollster A", "Aug 21–23, 2026", "680 LV", 46, 46, 3, "Even"),
  row("fl-gov-demo-1", "fl-governor-2026", "Demo Pollster D", "Aug 4–8, 2026", "880 RV", 39, 52, 3, "R +13"),
  row("ca-gov-demo-1", "ca-governor-2026", "Demo Pollster B", "Aug 9–12, 2026", "950 RV", 52, 38, 4, "D +14"),
  row("ny-gov-demo-1", "ny-governor-2026", "Demo Pollster C", "Aug 13–16, 2026", "800 LV", 51, 40, 3, "D +11"),
  row("tx-gov-demo-1", "tx-governor-2026", "Demo Pollster A", "Aug 1–4, 2026", "900 RV", 38, 53, 3, "R +15"),
  row("az-01-demo-1", "az-01-house-2026", "Demo Pollster D", "Aug 10–12, 2026", "400 LV", 44, 48, 2, "R +4"),
  row("ga-07-demo-1", "ga-07-house-2026", "Demo Pollster B", "Aug 15–17, 2026", "420 LV", 46, 46, 2, "Even"),
  row("mi-07-demo-1", "mi-07-house-2026", "Demo Pollster C", "Aug 6–8, 2026", "390 LV", 47, 45, 1, "D +2"),
  row("nc-01-demo-1", "nc-01-house-2026", "Demo Pollster A", "Aug 18–20, 2026", "410 LV", 49, 43, 2, "D +6"),
  row("nv-03-demo-1", "nv-03-house-2026", "Demo Pollster D", "Aug 11–13, 2026", "430 LV", 46, 46, 3, "Even"),
  row("oh-09-demo-1", "oh-09-house-2026", "Demo Pollster B", "Aug 8–10, 2026", "400 LV", 45, 47, 2, "R +2"),
  row("pa-07-demo-1", "pa-07-house-2026", "Demo Pollster C", "Aug 19–21, 2026", "440 LV", 46, 46, 2, "Even"),
  row("wi-03-demo-1", "wi-03-house-2026", "Demo Pollster A", "Aug 12–14, 2026", "380 LV", 44, 48, 2, "R +4"),
  row("tx-15-demo-1", "tx-15-house-2026", "Demo Pollster D", "Aug 3–5, 2026", "410 LV", 43, 49, 2, "R +6"),
  row("fl-13-demo-1", "fl-13-house-2026", "Demo Pollster B", "Aug 7–9, 2026", "400 LV", 42, 50, 2, "R +8"),
  row("ca-13-demo-1", "ca-13-house-2026", "Demo Pollster C", "Aug 14–16, 2026", "450 LV", 49, 44, 2, "D +5"),
  row("ny-22-demo-1", "ny-22-house-2026", "Demo Pollster A", "Aug 17–19, 2026", "420 LV", 46, 46, 2, "Even"),
];

export const NATIONAL_GENERIC_BALLOT: NationalStripRow[] = [
  { label: "Demo national generic ballot A", dem: 46, rep: 45, other: 9, isDemo: true },
  { label: "Demo national generic ballot B", dem: 45, rep: 46, other: 9, isDemo: true },
];

export const RATING_ORDER: RatingTier[] = [
  "Solid D",
  "Likely D",
  "Lean D",
  "Tossup",
  "Lean R",
  "Likely R",
  "Solid R",
];

export function pollsForRace(raceSlug: string): PollRow[] {
  return POLLS.filter((poll) => poll.raceSlug === raceSlug);
}

export function ratingBoard() {
  return RATING_ORDER.map((tier) => ({
    tier,
    races: RACES.filter((race) => race.rating === tier),
  }));
}
