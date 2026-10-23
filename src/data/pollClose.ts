/**
 * When every polling place in the state is closed on November 3, 2026.
 *
 * Election Day 2026 is after daylight-saving time ends (November 1, 2026),
 * so these instants use standard time. A state split by a time-zone boundary
 * waits until the later close. Kansas and North Dakota wait until the latest
 * hour state law still allows a polling place to be open.
 * The page shows no vote totals before `allPollsClosedAt`.
 */

export interface PollClose {
  code: string;
  name: string;
  /** Local closing time, including the later zone where the state is split. */
  closeLabel: string;
  /** UTC instant when this page may show returns. */
  allPollsClosedAt: string;
  citation: string;
  note: string;
}

export function pollCloseIso(code: string): string | undefined {
  return POLL_CLOSE.find((row) => row.code === code)?.allPollsClosedAt;
}

/** Latest poll-close instant on election night. Derived from POLL_CLOSE, not a separate fact. */
export function latestPollCloseIso(): string {
  return POLL_CLOSE.reduce(
    (latest, row) => (row.allPollsClosedAt > latest ? row.allPollsClosedAt : latest),
    POLL_CLOSE[0].allPollsClosedAt,
  );
}

export const POLL_CLOSE: PollClose[] = [
  {
    code: "AL",
    name: "Alabama",
    closeLabel: "7:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Ala. Code § 17-9-6",
    note: "Polls close at 7:00 p.m. The later close is Central Time.",
  },
  {
    code: "AK",
    name: "Alaska",
    closeLabel: "8:00 p.m. local time",
    allPollsClosedAt: "2026-11-04T06:00:00.000Z",
    citation: "Alaska Stat. § 15.15.080",
    note: "Polls close at 8:00 p.m. local time. The Aleutian Islands use Hawaii-Aleutian Time, which is the later close.",
  },
  {
    code: "AZ",
    name: "Arizona",
    closeLabel: "7:00 p.m. Mountain Standard Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Ariz. Rev. Stat. § 16-565",
    note: "Arizona does not use daylight-saving time. On this date the Navajo Nation is also on Mountain Standard Time.",
  },
  {
    code: "AR",
    name: "Arkansas",
    closeLabel: "7:30 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T01:30:00.000Z",
    citation: "Ark. Code Ann. § 7-5-304",
    note: "Polls close at 7:30 p.m.",
  },
  {
    code: "CA",
    name: "California",
    closeLabel: "8:00 p.m. Pacific Time",
    allPollsClosedAt: "2026-11-04T04:00:00.000Z",
    citation: "Cal. Elec. Code § 14212",
    note: "Polls close at 8:00 p.m. California votes largely by mail.",
  },
  {
    code: "CO",
    name: "Colorado",
    closeLabel: "7:00 p.m. Mountain Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Colo. Rev. Stat. § 1-7-101",
    note: "Polls close at 7:00 p.m. Colorado votes largely by mail.",
  },
  {
    code: "CT",
    name: "Connecticut",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Conn. Gen. Stat. § 9-174",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "DE",
    name: "Delaware",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Del. Code Ann. tit. 15, §§ 4931, 4947",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "DC",
    name: "District of Columbia",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "D.C. Code § 1-1001.10",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "FL",
    name: "Florida",
    closeLabel: "7:00 p.m. local time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Fla. Stat. § 100.011",
    note: "Polls close at 7:00 p.m. local time. The Central Time panhandle is the later close.",
  },
  {
    code: "GA",
    name: "Georgia",
    closeLabel: "7:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T00:00:00.000Z",
    citation: "Ga. Code Ann. § 21-2-403",
    note: "Statewide and federal polls close at 7:00 p.m. The 8:00 p.m. city rule applies to municipal general elections, not this statewide general election.",
  },
  {
    code: "HI",
    name: "Hawaii",
    closeLabel: "7:00 p.m. Hawaii Time",
    allPollsClosedAt: "2026-11-04T05:00:00.000Z",
    citation: "Haw. Rev. Stat. §§ 11-1, 11-131",
    note: "Voter service centers close at 7:00 p.m. Hawaii votes largely by mail.",
  },
  {
    code: "ID",
    name: "Idaho",
    closeLabel: "8:00 p.m. local time",
    allPollsClosedAt: "2026-11-04T04:00:00.000Z",
    citation: "Idaho Code § 34-1101",
    note: "Polls close at 8:00 p.m. local time. The Pacific Time panhandle is the later close.",
  },
  {
    code: "IL",
    name: "Illinois",
    closeLabel: "7:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "10 Ill. Comp. Stat. 5/17-1",
    note: "Polls close at 7:00 p.m.",
  },
  {
    code: "IN",
    name: "Indiana",
    closeLabel: "6:00 p.m. local time",
    allPollsClosedAt: "2026-11-04T00:00:00.000Z",
    citation: "Ind. Code § 3-11-8-8",
    note: "Polls close at 6:00 p.m. local time. Central Time counties are the later close.",
  },
  {
    code: "IA",
    name: "Iowa",
    closeLabel: "8:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Iowa Code § 49.73",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "KS",
    name: "Kansas",
    closeLabel: "8:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Kan. Stat. Ann. § 25-106",
    note: "The default close is 7:00 p.m. Central and 6:00 p.m. Mountain. A county may stay open as late as 8:00 p.m. Central or 7:00 p.m. Mountain. This page waits until that later hour.",
  },
  {
    code: "KY",
    name: "Kentucky",
    closeLabel: "6:00 p.m. local time",
    allPollsClosedAt: "2026-11-04T00:00:00.000Z",
    citation: "Ky. Rev. Stat. § 118.035",
    note: "Polls close at 6:00 p.m. local time. Central Time counties are the later close.",
  },
  {
    code: "LA",
    name: "Louisiana",
    closeLabel: "8:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "La. Rev. Stat. § 18:541",
    note: "Polls close at 8:00 p.m. on this Tuesday election.",
  },
  {
    code: "ME",
    name: "Maine",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Me. Rev. Stat. Ann. tit. 21-A, § 626",
    note: "Polls close at 8:00 p.m. Smaller municipalities may close earlier once every registered voter has voted.",
  },
  {
    code: "MD",
    name: "Maryland",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Md. Election Law Code Ann. § 10-301",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "MA",
    name: "Massachusetts",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Mass. Gen. Laws ch. 54, § 64",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "MI",
    name: "Michigan",
    closeLabel: "8:00 p.m. local time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Mich. Comp. Laws § 168.720",
    note: "Polls close at 8:00 p.m. local time. Central Time counties in the Upper Peninsula are the later close.",
  },
  {
    code: "MN",
    name: "Minnesota",
    closeLabel: "8:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Minn. Stat. § 204C.05",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "MS",
    name: "Mississippi",
    closeLabel: "7:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Miss. Code Ann. § 23-15-541",
    note: "Polls close at 7:00 p.m.",
  },
  {
    code: "MO",
    name: "Missouri",
    closeLabel: "7:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Mo. Rev. Stat. § 115.407",
    note: "Polls close at 7:00 p.m.",
  },
  {
    code: "MT",
    name: "Montana",
    closeLabel: "8:00 p.m. Mountain Time",
    allPollsClosedAt: "2026-11-04T03:00:00.000Z",
    citation: "Mont. Code Ann. § 13-1-106",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "NE",
    name: "Nebraska",
    closeLabel: "8:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Neb. Rev. Stat. § 32-908",
    note: "Polls close at 8:00 p.m. Central and 7:00 p.m. Mountain, which is the same moment.",
  },
  {
    code: "NV",
    name: "Nevada",
    closeLabel: "7:00 p.m. Pacific Time",
    allPollsClosedAt: "2026-11-04T03:00:00.000Z",
    citation: "Nev. Rev. Stat. § 293.273",
    note: "Polls close at 7:00 p.m.",
  },
  {
    code: "NH",
    name: "New Hampshire",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "N.H. Rev. Stat. Ann. § 659:4",
    note: "State law says polls may not close earlier than 7:00 p.m. Municipalities set the hour. This page waits until 8:00 p.m., the later close used by municipalities that stay open until then.",
  },
  {
    code: "NJ",
    name: "New Jersey",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "N.J. Rev. Stat. § 19:15-2",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "NM",
    name: "New Mexico",
    closeLabel: "7:00 p.m. Mountain Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "N.M. Stat. Ann. § 1-12-1",
    note: "Polls close at 7:00 p.m.",
  },
  {
    code: "NY",
    name: "New York",
    closeLabel: "9:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "N.Y. Elec. Law § 8-100",
    note: "Polls close at 9:00 p.m.",
  },
  {
    code: "NC",
    name: "North Carolina",
    closeLabel: "7:30 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T00:30:00.000Z",
    citation: "N.C. Gen. Stat. § 163-166.01",
    note: "Polls close at 7:30 p.m.",
  },
  {
    code: "ND",
    name: "North Dakota",
    closeLabel: "9:00 p.m. local time",
    allPollsClosedAt: "2026-11-04T04:00:00.000Z",
    citation: "N.D. Cent. Code § 16.1-01-03",
    note: "County boards set a close from 7:00 p.m. to 9:00 p.m. This page waits until 9:00 p.m. Mountain Time, the latest hour the statute allows.",
  },
  {
    code: "OH",
    name: "Ohio",
    closeLabel: "7:30 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T00:30:00.000Z",
    citation: "Ohio Rev. Code § 3501.32",
    note: "Polls close at 7:30 p.m.",
  },
  {
    code: "OK",
    name: "Oklahoma",
    closeLabel: "7:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "26 Okla. Stat. § 7-104",
    note: "Polls close at 7:00 p.m.",
  },
  {
    code: "OR",
    name: "Oregon",
    closeLabel: "8:00 p.m. Pacific Time",
    allPollsClosedAt: "2026-11-04T04:00:00.000Z",
    citation: "Or. Rev. Stat. § 254.470",
    note: "Oregon votes by mail. Ballots must be received by 8:00 p.m. There is no statewide in-person poll-closing hour separate from that deadline.",
  },
  {
    code: "PA",
    name: "Pennsylvania",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "25 Pa. Stat. § 3045",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "RI",
    name: "Rhode Island",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "R.I. Gen. Laws §§ 17-18-10, 17-18-11",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "SC",
    name: "South Carolina",
    closeLabel: "7:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T00:00:00.000Z",
    citation: "S.C. Code Ann. § 7-13-60",
    note: "Polls close at 7:00 p.m.",
  },
  {
    code: "SD",
    name: "South Dakota",
    closeLabel: "7:00 p.m. local time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "S.D. Codified Laws § 12-2-3",
    note: "Polls close at 7:00 p.m. local time. Mountain Time counties are the later close.",
  },
  {
    code: "TN",
    name: "Tennessee",
    closeLabel: "8:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T01:00:00.000Z",
    citation: "Tenn. Code Ann. § 2-3-201",
    note: "Polls close at 8:00 p.m. Eastern and 7:00 p.m. Central, which is the same moment.",
  },
  {
    code: "TX",
    name: "Texas",
    closeLabel: "7:00 p.m. local time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Tex. Elec. Code § 41.031",
    note: "Polls close at 7:00 p.m. local time. Mountain Time counties are the later close.",
  },
  {
    code: "UT",
    name: "Utah",
    closeLabel: "8:00 p.m. Mountain Time",
    allPollsClosedAt: "2026-11-04T03:00:00.000Z",
    citation: "Utah Code Ann. § 20A-1-302",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "VT",
    name: "Vermont",
    closeLabel: "7:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T00:00:00.000Z",
    citation: "Vt. Stat. Ann. tit. 17, § 2561",
    note: "Polls close at 7:00 p.m.",
  },
  {
    code: "VA",
    name: "Virginia",
    closeLabel: "7:00 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T00:00:00.000Z",
    citation: "Va. Code Ann. § 24.2-603",
    note: "Polls close at 7:00 p.m.",
  },
  {
    code: "WA",
    name: "Washington",
    closeLabel: "8:00 p.m. Pacific Time",
    allPollsClosedAt: "2026-11-04T04:00:00.000Z",
    citation: "Wash. Rev. Code § 29A.40.160",
    note: "Ballot drop boxes and voting centers close at 8:00 p.m. A mailed ballot postmarked by Election Day can arrive later. Counting continues after 8:00 p.m.",
  },
  {
    code: "WV",
    name: "West Virginia",
    closeLabel: "7:30 p.m. Eastern Time",
    allPollsClosedAt: "2026-11-04T00:30:00.000Z",
    citation: "W. Va. Code § 3-1-31",
    note: "Polls close at 7:30 p.m.",
  },
  {
    code: "WI",
    name: "Wisconsin",
    closeLabel: "8:00 p.m. Central Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Wis. Stat. § 6.78",
    note: "Polls close at 8:00 p.m.",
  },
  {
    code: "WY",
    name: "Wyoming",
    closeLabel: "7:00 p.m. Mountain Time",
    allPollsClosedAt: "2026-11-04T02:00:00.000Z",
    citation: "Wyo. Stat. § 22-13-101",
    note: "Polls close at 7:00 p.m.",
  },
];

const BY_CODE = new Map(POLL_CLOSE.map((row) => [row.code, row]));

export function pollCloseFor(code: string): PollClose | undefined {
  return BY_CODE.get(code);
}

export function pollsAreClosed(code: string, now: Date = new Date()): boolean {
  const row = BY_CODE.get(code);
  if (!row) return false;
  return now.getTime() >= Date.parse(row.allPollsClosedAt);
}
