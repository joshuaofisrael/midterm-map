/**
 * Upcoming U.S. election dates checked on November 5, 2026.
 * A date is included only when the linked office or statute prints it,
 * or when the entry says the weekday is computed from a cited statute
 * and is not an announced contest. No candidate ratings.
 */

export const CALENDAR_CHECKED_ON = "November 5, 2026";

export const CALENDAR_TITLE = "US election calendar 2027 and 2028";

export const CALENDAR_DESCRIPTION =
  "US election calendar for 2027 and 2028. Specials, off-year elections, and federal Election Day, each cited to an official source.";

if (CALENDAR_DESCRIPTION.length > 160) {
  throw new Error(`Calendar description is ${CALENDAR_DESCRIPTION.length} characters`);
}

export type CalendarBasis = "official-calendar" | "statute" | "not-announced";

export type CalendarSource = {
  label: string;
  href: string;
};

export type CalendarEvent = {
  id: string;
  /** First calendar day, when one is printed or computed and labeled as such. */
  iso?: string;
  dateLabel: string;
  year: "2026" | "2027" | "2028" | "Undated";
  jurisdiction: string;
  office: string;
  detail: string;
  basis: CalendarBasis;
  sources: CalendarSource[];
};

export const CALENDAR_BASIS_LABEL: Record<CalendarBasis, string> = {
  "official-calendar": "Official calendar",
  statute: "Set by statute",
  "not-announced": "Not yet announced",
};

const KY_SBE_2027: CalendarSource = {
  label: "Kentucky State Board of Elections, 2027 election calendar (PDF)",
  href: "https://elect.ky.gov/Resources/Documents/2027%20Election%20Calendar.pdf",
};

const KY_SOS_GOVERNOR: CalendarSource = {
  label: "Kentucky Secretary of State, governor and lieutenant governor primary filing packet (PDF)",
  href: "https://web.sos.ky.gov/CandidateFilingDocuments/Governor_RepublicanDemocraticPrimary.pdf",
};

const MS_CALENDAR: CalendarSource = {
  label: "Mississippi Secretary of State, election calendar 2026-2027 (PDF)",
  href: "https://www.sos.ms.gov/sites/default/files/publications/Election%20Calendar_2026.pdf",
};

const LA_DATES: CalendarSource = {
  label: "Louisiana Secretary of State, election dates",
  href: "https://www.sos.la.gov/elections-voting/election-dates",
};

const LA_2027: CalendarSource = {
  label: "Louisiana Secretary of State, 2027 elections calendar, revised October 2026 (PDF)",
  href: "https://www.sos.la.gov/media/byfpyc5f/elections-calendar-2027.pdf",
};

const VA_SCHEDULE: CalendarSource = {
  label: "Virginia Department of Elections, schedule of general elections 2026-2030 (PDF)",
  href: "https://www.elections.virginia.gov/media/boardpapers/calendar/Five_year_election_day_calendar-2026_2030.pdf",
};

const VA_CODE: CalendarSource = {
  label: "Code of Virginia § 24.2-210",
  href: "https://law.lis.virginia.gov/vacode/title24.2/chapter2/section24.2-210/",
};

const FEC_DEADLINES: CalendarSource = {
  label: "FEC, dates and deadlines",
  href: "https://www.fec.gov/help-candidates-and-committees/dates-and-deadlines/",
};

const FEC_DATES: CalendarSource = {
  label: "FEC, election dates",
  href: "https://www.fec.gov/introduction-campaign-finance/how-to-research-public-records/election-dates/",
};

const USC_2_7: CalendarSource = {
  label: "2 U.S.C. § 7",
  href: "https://www.govinfo.gov/content/pkg/USCODE-2023-title2/html/USCODE-2023-title2-chap1-sec7.htm",
};

const USC_3_21: CalendarSource = {
  label: "3 U.S.C. § 21",
  href: "https://www.govinfo.gov/content/pkg/USCODE-2023-title3/html/USCODE-2023-title3-chap1-sec21.htm",
};

const USC_52_30101: CalendarSource = {
  label: "52 U.S.C. § 30101",
  href: "https://www.govinfo.gov/content/pkg/USCODE-2023-title52/html/USCODE-2023-title52-subtitleIII-chap301-subchapI-sec30101.htm",
};

const NJ_STATUTE: CalendarSource = {
  label: "N.J.S.A. 19:2-3",
  href: "https://www.nj.gov/state/dos-statutes-elections-19-01-09.shtml",
};

const NJ_GOV: CalendarSource = {
  label: "NJ.gov, Your Government",
  href: "https://nj.gov/nj/gov/",
};

export const ELECTION_CALENDAR: CalendarEvent[] = [
  {
    id: "la-2026-12-12",
    iso: "2026-12-12",
    dateLabel: "Saturday, December 12, 2026",
    year: "2026",
    jurisdiction: "Louisiana",
    office: "Open U.S. House general, open general, and State Senate District 14 special primary",
    detail:
      "The Secretary of State lists December 12, 2026 as the open U.S. Representative general, open general, and special primary for State Senate District 14 in East Baton Rouge Parish.",
    basis: "official-calendar",
    sources: [LA_DATES],
  },
  {
    id: "ky-filing-2027-01-08",
    iso: "2027-01-08",
    dateLabel: "Friday, January 8, 2027, 4:00 p.m. local time",
    year: "2027",
    jurisdiction: "Kentucky",
    office: "Filing deadline for primary candidates, including governor and lieutenant governor",
    detail:
      "The State Board of Elections calendar prints Friday, January 8, 2027, at 4:00 p.m., as the last day to file nomination papers for candidates who must run in a primary. The Secretary of State filing packet says the office of governor and lieutenant governor will appear on the 2027 ballot and prints the same 4:00 p.m. local-time deadline. The packet says its information is subject to change under the Kentucky Revised Statutes. It also prints November 4, 2026 as the earliest filing date. That day has passed.",
    basis: "official-calendar",
    sources: [KY_SBE_2027, KY_SOS_GOVERNOR],
  },
  {
    id: "la-sd14-2027-01-09",
    iso: "2027-01-09",
    dateLabel: "Saturday, January 9, 2027",
    year: "2027",
    jurisdiction: "Louisiana",
    office: "State Senate District 14 special general",
    detail:
      "The Secretary of State lists a special general election for the 14th senatorial district only. The 2027 calendar says its dates are subject to change by the legislature.",
    basis: "official-calendar",
    sources: [LA_DATES, LA_2027],
  },
  {
    id: "la-hd77-2027-02-06",
    iso: "2027-02-06",
    dateLabel: "Saturday, February 6, 2027",
    year: "2027",
    jurisdiction: "Louisiana",
    office: "State Representative District 77 special primary",
    detail:
      "The Secretary of State lists a special primary for the 77th representative district in St. Tammany Parish. Qualifying on that page is January 5-7, 2027. The 2027 calendar says its dates are subject to change by the legislature.",
    basis: "official-calendar",
    sources: [LA_DATES, LA_2027],
  },
  {
    id: "la-hd77-2027-03-13",
    iso: "2027-03-13",
    dateLabel: "Saturday, March 13, 2027",
    year: "2027",
    jurisdiction: "Louisiana",
    office: "State Representative District 77 special general",
    detail:
      "The Secretary of State lists a special general election for the 77th representative district in St. Tammany Parish. The 2027 calendar says its dates are subject to change by the legislature.",
    basis: "official-calendar",
    sources: [LA_DATES, LA_2027],
  },
  {
    id: "la-bese-2027-04-17",
    iso: "2027-04-17",
    dateLabel: "Saturday, April 17, 2027",
    year: "2027",
    jurisdiction: "Louisiana",
    office: "BESE party primary and municipal primary",
    detail:
      "The 2027 elections calendar lists April 17, 2027 as the BESE party primary and municipal primary. The calendar says its dates are subject to change by the legislature.",
    basis: "official-calendar",
    sources: [LA_2027, LA_DATES],
  },
  {
    id: "ky-primary-2027-05-18",
    iso: "2027-05-18",
    dateLabel: "Tuesday, May 18, 2027",
    year: "2027",
    jurisdiction: "Kentucky",
    office: "Primary election, including governor and lieutenant governor",
    detail:
      "The State Board of Elections calendar prints Tuesday, May 18, 2027 as primary election day, the first Tuesday after the third Monday in May, and cites KRS 118.025(3). It prints poll hours of 6 a.m. to 6 p.m. The Secretary of State filing packet says the office of governor and lieutenant governor will appear on the 2027 ballot.",
    basis: "official-calendar",
    sources: [KY_SBE_2027, KY_SOS_GOVERNOR],
  },
  {
    id: "la-bese-2027-05-29",
    iso: "2027-05-29",
    dateLabel: "Saturday, May 29, 2027",
    year: "2027",
    jurisdiction: "Louisiana",
    office: "BESE second party primary and municipal general",
    detail:
      "The 2027 elections calendar lists May 29, 2027 as the BESE second party primary and municipal general. The calendar says its dates are subject to change by the legislature.",
    basis: "official-calendar",
    sources: [LA_2027, LA_DATES],
  },
  {
    id: "va-primary-2027-06-15",
    iso: "2027-06-15",
    dateLabel: "June 15, 2027, if held",
    year: "2027",
    jurisdiction: "Virginia",
    office: "Primary in the 2027 column",
    detail:
      "The Department of Elections schedule headers run 2026 through 2030. In the column with the November 2 general election, the schedule prints \"Primary if held: June 15.\" That November 2 column is the 2027 column. The June 15 line does not print its own year. The same column lists the Senate of Virginia and the House of Delegates, not governor.",
    basis: "official-calendar",
    sources: [VA_SCHEDULE],
  },
  {
    id: "ms-primary-2027-08-03",
    iso: "2027-08-03",
    dateLabel: "Tuesday, August 3, 2027",
    year: "2027",
    jurisdiction: "Mississippi",
    office: "Primary election for statewide offices, including governor",
    detail:
      "The Secretary of State calendar lists August 3, 2027 as the primary election. The 2027 statewide offices it names include governor, lieutenant governor, secretary of state, attorney general, and the other statewide offices on that page, plus the state Senate and House.",
    basis: "official-calendar",
    sources: [MS_CALENDAR],
  },
  {
    id: "la-qualify-2027-08-03",
    iso: "2027-08-03",
    dateLabel: "Tuesday, August 3 through Thursday, August 5, 2027",
    year: "2027",
    jurisdiction: "Louisiana",
    office: "Qualifying for the gubernatorial primary",
    detail:
      "The 2027 elections calendar prints qualifying dates of August 3-5, 2027 in the gubernatorial primary column. The calendar says its dates are subject to change by the legislature.",
    basis: "official-calendar",
    sources: [LA_2027],
  },
  {
    id: "ky-running-mate-2027-08-10",
    iso: "2027-08-10",
    dateLabel: "Tuesday, August 10, 2027, 4:00 p.m.",
    year: "2027",
    jurisdiction: "Kentucky",
    office: "Lieutenant governor running-mate designation",
    detail:
      "The Secretary of State filing packet prints August 10, 2027 as the latest date to designate a lieutenant governor running mate. It says the designation is due by 4 p.m. on the second Tuesday in August preceding the regular election for governor, under KRS 118.126. The packet says its information is subject to change under the Kentucky Revised Statutes.",
    basis: "official-calendar",
    sources: [KY_SOS_GOVERNOR],
  },
  {
    id: "ms-primary-runoff-2027-08-31",
    iso: "2027-08-31",
    dateLabel: "Tuesday, August 31, 2027",
    year: "2027",
    jurisdiction: "Mississippi",
    office: "Primary runoff election",
    detail:
      "The Secretary of State calendar lists August 31, 2027 as the primary runoff election for the 2027 offices on that calendar, including governor.",
    basis: "official-calendar",
    sources: [MS_CALENDAR],
  },
  {
    id: "la-gov-primary-2027-10-09",
    iso: "2027-10-09",
    dateLabel: "Saturday, October 9, 2027",
    year: "2027",
    jurisdiction: "Louisiana",
    office: "Gubernatorial primary",
    detail:
      "The Secretary of State 2027 calendar, revised October 2026, lists October 9, 2027 as the gubernatorial primary. A note says that election date was advanced one week under R.S. 18:402(A). The calendar says its dates are subject to change by the legislature.",
    basis: "official-calendar",
    sources: [LA_2027, LA_DATES],
  },
  {
    id: "ky-general-2027-11-02",
    iso: "2027-11-02",
    dateLabel: "Tuesday, November 2, 2027",
    year: "2027",
    jurisdiction: "Kentucky",
    office: "General election, including governor and lieutenant governor",
    detail:
      "The State Board of Elections calendar prints Tuesday, November 2, 2027 as general election day, the first Tuesday after the first Monday in November, and cites the Kentucky Constitution § 148 and KRS 118.025(4). It prints poll hours of 6 a.m. to 6 p.m. The Secretary of State filing packet says the office of governor and lieutenant governor will appear on the 2027 ballot. This is a state election day. 2 U.S.C. § 7 sets the regular congressional election in even-numbered years.",
    basis: "official-calendar",
    sources: [KY_SBE_2027, KY_SOS_GOVERNOR, USC_2_7],
  },
  {
    id: "ms-general-2027-11-02",
    iso: "2027-11-02",
    dateLabel: "Tuesday, November 2, 2027",
    year: "2027",
    jurisdiction: "Mississippi",
    office: "General election for statewide offices, including governor",
    detail:
      "The Secretary of State calendar lists November 2, 2027 as the general election. The 2027 statewide offices it names include governor, lieutenant governor, secretary of state, attorney general, and the other statewide offices on that page, plus the state Senate and House.",
    basis: "official-calendar",
    sources: [MS_CALENDAR],
  },
  {
    id: "va-general-2027-11-02",
    iso: "2027-11-02",
    dateLabel: "Tuesday, November 2, 2027",
    year: "2027",
    jurisdiction: "Virginia",
    office: "Senate of Virginia and House of Delegates",
    detail:
      "The Department of Elections schedule prints November 2 for the Senate of Virginia (40 seats, four-year term) and the House of Delegates (100 seats, two-year term) in the 2027 column. It does not list governor, lieutenant governor, or attorney general on that date. The same schedule prints those three offices on November 6, 2029. Virginia Code § 24.2-210 says voters elect them at the general election in November 1997 and every fourth year thereafter.",
    basis: "official-calendar",
    sources: [VA_SCHEDULE, VA_CODE],
  },
  {
    id: "la-gov-general-2027-11-20",
    iso: "2027-11-20",
    dateLabel: "Saturday, November 20, 2027",
    year: "2027",
    jurisdiction: "Louisiana",
    office: "Gubernatorial general",
    detail:
      "The Secretary of State 2027 calendar lists November 20, 2027 as the gubernatorial general. A note says that election date was advanced one week under R.S. 18:402(A). The calendar says its dates are subject to change by the legislature. The calendar uses the labels gubernatorial primary and gubernatorial general.",
    basis: "official-calendar",
    sources: [LA_2027, LA_DATES],
  },
  {
    id: "ms-general-runoff-2027-11-30",
    iso: "2027-11-30",
    dateLabel: "Tuesday, November 30, 2027",
    year: "2027",
    jurisdiction: "Mississippi",
    office: "General runoff election",
    detail:
      "The Secretary of State calendar lists November 30, 2027 as the general runoff election for the 2027 offices on that calendar, including governor.",
    basis: "official-calendar",
    sources: [MS_CALENDAR],
  },
  {
    id: "va-pres-primary-2028-03-07",
    iso: "2028-03-07",
    dateLabel: "March 7, 2028, if held",
    year: "2028",
    jurisdiction: "Virginia",
    office: "Presidential primary",
    detail:
      "In the 2028 column, the Department of Elections schedule prints \"Presidential Primary (if held: March 7).\" The FEC Election Dates page, read November 5, 2026, lists primary dates through the 2026 congressional primaries and does not list a 2028 presidential primary calendar. This line is the date Virginia printed. It is not a national primary date.",
    basis: "official-calendar",
    sources: [VA_SCHEDULE, FEC_DATES],
  },
  {
    id: "va-primary-2028-06-20",
    iso: "2028-06-20",
    dateLabel: "June 20, 2028, if held",
    year: "2028",
    jurisdiction: "Virginia",
    office: "Primary for offices other than president",
    detail:
      "In the 2028 column, the Department of Elections schedule prints \"Primary - All Other Offices (if held: June 20).\" The same column lists President and U.S. Representative on November 7.",
    basis: "official-calendar",
    sources: [VA_SCHEDULE],
  },
  {
    id: "federal-general-2028-11-07",
    iso: "2028-11-07",
    dateLabel: "Tuesday, November 7, 2028",
    year: "2028",
    jurisdiction: "United States",
    office: "Federal general election",
    detail:
      "2 U.S.C. § 7 sets the Tuesday next after the first Monday in November, in every even-numbered year, as the day for electing U.S. Representatives. In 2028 that Tuesday is November 7. 3 U.S.C. § 21 defines presidential election day as that same weekday, in every fourth year. The Virginia Department of Elections schedule prints November 7 for President and U.S. Representative in its 2028 column. 52 U.S.C. § 30101 defines an election cycle as ending on the date of the next election for that office, and it treats a primary and a general election as separate cycles. State presidential primary dates are not filled in here. The FEC Election Dates page does not yet list them.",
    basis: "statute",
    sources: [USC_2_7, USC_3_21, USC_52_30101, VA_SCHEDULE, FEC_DATES],
  },
  {
    id: "fl-20-special",
    dateLabel: "Not yet announced",
    year: "Undated",
    jurisdiction: "Florida",
    office: "U.S. House District 20 special election",
    detail:
      "The FEC dates-and-deadlines page lists a 2026 special election for Florida's 20th Congressional District. It prints the special primary and the special general as TBD, and it says filing information is coming soon. No date is added here. Specials on that page with dates before November 5, 2026 are omitted.",
    basis: "not-announced",
    sources: [FEC_DEADLINES],
  },
  {
    id: "tx-23-special",
    dateLabel: "Not yet announced",
    year: "Undated",
    jurisdiction: "Texas",
    office: "U.S. House District 23 special election",
    detail:
      "The FEC dates-and-deadlines page lists a 2026 special election for Texas's 23rd Congressional District. It prints the special general as TBD, and it says filing information is coming soon. No date is added here.",
    basis: "not-announced",
    sources: [FEC_DEADLINES],
  },
  {
    id: "nj-governor-2027",
    dateLabel: "Not yet announced",
    year: "Undated",
    jurisdiction: "New Jersey",
    office: "Governor",
    detail:
      "N.J.S.A. 19:2-3 states that the general election is the Tuesday next after the first Monday in November. In 2027 that Tuesday is November 2. NJ.gov states that the governor is elected every four years to a four-year term. Those pages do not name a 2027 gubernatorial election. November 2, 2027 is the statutory weekday, not an announced New Jersey governor election.",
    basis: "not-announced",
    sources: [NJ_STATUTE, NJ_GOV],
  },
];

export const CALENDAR_YEARS = ["2026", "2027", "2028", "Undated"] as const;

export function calendarEventsByYear() {
  return CALENDAR_YEARS.map((year) => ({
    year,
    heading: year === "Undated" ? "Dates not yet announced" : year,
    events: ELECTION_CALENDAR.filter((event) => event.year === year),
  })).filter((group) => group.events.length > 0);
}
