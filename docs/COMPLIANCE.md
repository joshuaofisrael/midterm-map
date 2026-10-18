# Compliance notes — Map the Midterms

**Operator:** Joshua Israel Ventures LLC (Florida LLC, Sunbiz L26000261819, ACTIVE)  
**Site brand:** Map the Midterms (unfiled brand / service name of the LLC; not a separate company; not claimed as a filed DBA or trademark)  
**Rename note:** The public-facing name previously appeared as “Midterm Map.” The operator is unchanged. Neither name is claimed here as a filed DBA or trademark.  
**Contact:** joshuaofisrael@gmail.com  
**Location used on-site:** Miami Beach, FL (no street address published; EIN not published)

This document is an **internal owner checklist**. It is **not legal advice** and **not a lawyer sign-off**. Counsel for Joshua Israel Ventures LLC should review the live site before treating this copy as final.

## What this MVP ships

### Ownership and identity
- [x] LLC legal name in the sitewide footer, About, Terms, Privacy, Disclaimer
- [x] Organization JSON-LD names Joshua Israel Ventures LLC as the organization / publisher
- [x] WebSite JSON-LD names Map the Midterms as the site name and the LLC as publisher/operator
- [x] Brand described as an unfiled name of the LLC (About, footer, Terms)
- [x] Sunbiz document number listed as public corporate identification (About, footer)
- [x] Contact email only; no invented street address

### Required legal pages
- [x] `/about` — operator, what the site is, what it is not
- [x] `/disclaimer` — election-specific cautions (not official; not legal advice; not an endorsement; ballots may be incomplete; ratings attributed to named outlets; polls cited or honestly empty; unofficial returns)
- [x] `/privacy` — no accounts; browser-only ZIP; cookieless Cloudflare Web Analytics (aggregate); GitHub Pages IP logging; no sale/sharing; email handling; retention; EU/UK GDPR and U.S. state-law rights; children; contact
- [x] `/terms` — informational-only, no warranties, limitation of liability, Florida governing law, LLC operator, corrections, third-party links, image licenses, copyright/takedown contact, severability, no campaign contribution solicitation
- [x] Footer links: Disclaimer / Privacy / Terms / About
- [x] Footer line: “Not an official election website. Verify ballot and voting details with your state or county election office.”
- [x] Persistent official-not-us banner sitewide, plus stronger notices on Ballot and Results
- [x] No affiliate-disclosure page (no monetization / affiliate links shipped)

### Product hygiene
- [x] No .gov visual language, seals, or flags-as-official-marks
- [x] No “official ballot,” “certified results,” or “your official voter guide” claims
- [x] No SSN, voter-registration-number, citizenship-doc, or ballot-image collection
- [x] No candidate/PAC donate CTAs
- [x] Candidate names / party labels framed as nominative identification with sources
- [x] Poll rows and ratings appear only with a named outlet, URL, and access date when possible
- [x] Results labeled unofficial / awaiting returns; pre-election mode before 2026-11-03

## October 6, 2026 compliance pass (not legal advice)

- Candidate photos: every file re-matched to its Wikimedia Commons page. Earlier captions credited several CC BY / BY-SA photos as "public domain" and linked to Commons pages that did not exist. Credits now live in `src/data/candidateImages.ts` (author, license, license link, file link, changes note) and `public/ATTRIBUTION.md`. The El-Sayed event photo (with audience members) was swapped for a cropped CC BY-SA portrait, and the Becerra California-AG photo for a federal HHS portrait.
- Ohio dates: statewide rules now cite the Ohio Revised Code (§§ 3503.19, 3509.051, 3509.03, 3509.05 as amended by S.B. 293, 3501.32) and Vote.gov because ohiosos.gov blocks automated reads. Cuyahoga County items are labeled county-only.
- All 12 states' dates re-checked against their cited official pages on October 6, 2026 (Nevada FAQ page blocked automated reads; the Nevada procedures manual corroborates the October 17–30 vote-center window). Pages now show "last checked" dates and explain that browser markers ignore cutoff times and time zones.
- Voter checklist no longer says the site publishes no deadlines.
- Privacy policy rewritten; legal pages use `SITE.legalLastUpdated`.

## October 16, 2026 — trust line

State hubs, ballot pages, race guides, results pages, and `/voting-deadlines/` show a “Last updated” date taken from dates already stored for that page (deadline check dates, office-list check dates, or citation access dates). The same pages say the information is unofficial and link that sentence to the state election office already used on the page, or to https://vote.gov when the page is not about one state. “Report an error” goes to `/contact/` with the page path in the `url` query. `/contact/` says error reports are welcome and that corrections are made promptly. Reports still use the existing email address. No form backend and no new vendor were added. Candidate claims that do not already sit next to an official source were not given new citations.

## October 16, 2026 — election-office citations for 2026 nominees

Race guides that had named a 2026 nominee from Ballotpedia, news, Wikipedia, or a biography now name a person only when an election-office candidate list, official ballot, certified results page, or the Clerk of the House nominee list prints that name. Bios restate that listing. Primary percentages, endorsements, occupations, term-limit claims, and “seeking another term” lines that those lists do not print were removed. Keisha Lance Bottoms is not named: the Georgia Secretary of State qualified-candidate portal did not return a November 2026 federal and state list, and the official runoff page that was read names Rick Jackson without naming a Democratic gubernatorial candidate. Poll numbers stay cited to the survey. Confirmed name labels link to the election-office list. The Georgia Democratic gubernatorial poll row no longer prints a candidate surname. The homepage FAQ no longer says candidate names are compiled from Ballotpedia or Wikipedia. No street address from a candidate file is reprinted.

## October 17, 2026 — Census place pages

`/cities/` lists incorporated places and census-designated places from the U.S. Census Bureau 2026 Gazetteer national places file (`2026_Gaz_place_national.zip`, file date September 8, 2026), read October 17, 2026. The file covers the 50 states, the District of Columbia, and Puerto Rico. Records with Census functional status F (fictitious entities) are omitted. Each place page names the place, state, GEOID, and county or counties from the 2026 Geographic Reference File — Codes with county names from the 2026 Gazetteer counties file. 2020 population is the Public Law 94-171 summary level 160 total when that file has the GEOID; otherwise the page says the file has no population for that GEOID. U.S. House district names appear only when the national 119th Congressional District to 2020 place relationship file has a land-area row for that place code. Those pages say the file is not a 2026 ballot district. Place pages link a state hub, and a statewide 2026 Senate or governor race or results page, only when this site already publishes that page. They do not add local races or candidates. Texas countywide offices were added later; see the October 18, 2026 note. Each page uses the same unofficial-information line and report-an-error link as other fact pages, cites the Gazetteer file and its vintage, and is indexable with its own canonical URL.

## October 17, 2026 — Kansas results pages

Kansas statewide results pages are `/results/ks-senate-2026` and `/results/ks-governor-2026`, with race guides at the same slugs. Both offices are on the candidate-information page’s “Offices to be Elected or Retained in 2026” list (1 U.S. Senator; Governor/Lt. Governor). Names are the United States Senate and Governor / Lt. Governor rows on the Secretary of State candidate list with the 2026 General selection, read October 17, 2026: Adam Hamilton (Democratic), Roger Marshall (Republican), and David C Graham (Libertarian) for United States Senate; Cindy Holscher / KC Ohaebosim (Democratic) and Ty Masterson / Jeffrey Klemp (Republican) for Governor / Lt. Governor. No other row for those two offices was on that table. The Class II page lists Marshall, Roger (R-KS). The candidate-list table includes address, phone, and email columns; none of those are reprinted. The candidate-list page says the table is updated automatically as each candidate files a valid petition or declaration of intention. It does not say the table is closed, so these pages do not call the list final. Returns link to the Secretary of State election-results page. That page’s 2026 section, read the same day, posts the official primary results file and does not yet post November 3, 2026 general-election returns. The pages say returns are unofficial until Kansas election authorities certify the contest and do not call a race. No other 2026 statewide office was given a results page.

## October 16, 2026 — Kansas state hub

Kansas is a state hub at `/states/KS`, linked to and from `/voting-deadlines/#KS`. Deadline lines were read on October 16, 2026 from the Secretary of State important-election-dates page and the general-election dates file linked there, the October 13, 2026 registration announcement, the voter-registration page, the voter-information page, the advance-voting page, the military and overseas citizens page, K.S.A. 25-106, 25-1122, 25-1132, and 25-2311, and Vote.gov. Offices are taken from the Secretary of State’s candidate-information page, “Offices to be Elected or Retained in 2026.” The Class 2 label cites the U.S. Senate Class II list (terms expire in 2027; the list includes Kansas). Judicial counts stay qualified with that page’s “as of July 1, 2025” date. A June 1, 2026 filing announcement also named Kansas Senate District 25; the later office list names Senate District 24, and this hub follows the office list. Candidate names are not published. The candidate-list page says the table is updated automatically as each candidate files a valid petition or declaration of intention. That page does not say the table can change until election day, so this hub does not add that date. No how-to, eligibility, or checklist copy was added. One general-election constitutional amendment is noted from the proposed-constitutional-amendments page’s statement that it will be voted on November 3, 2026, plus that page’s explanatory statement. The question text and the vote-yes / vote-no lines are not reprinted. SCR 1611 is the August 4, 2026 primary ballot question on a separate Secretary of State file and is not listed as a November general-election question. K.S.A. 25-1122 states the mailed advance-ballot application period in days before the election and does not print a calendar date; no date was calculated. K.S.A. 25-1132(b), effective January 1, 2026, states a 7:00 p.m. election-day mail-receipt deadline. The advance-voting page also describes a Douglas County district-court injunction, with a stay denied for the general election, for ballots postmarked by election day and received by the last postal delivery on the Friday after the election. Both statements are quoted. The Friday rule is not converted into a calendar date the page did not print. K.S.A. 25-1215 and 25-1216 were not read; the military page is cited for what that page says. No street address from the Secretary of State footer is reprinted.

## October 14, 2026 — Alaska state hub

Alaska is a state hub at `/states/AK`, linked to and from `/voting-deadlines/#AK`. Deadline lines were read on October 14, 2026 from the Division of Elections election calendar, the 2026 general-election candidate page, the absentee and early-voting page, the general-election information page, the petitions page, the Division homepage, and Vote.gov. The Alaska Legislature statute shell at akleg.gov did not return the text of AS 15.07.070 or AS 15.20.081, so the hub quotes the calendar’s printed dates and the statute numbers on those calendar lines. It does not paraphrase unread statute text. Offices are taken from the headings on the 2026 general-election candidate list (governor and lieutenant governor, U.S. senator, U.S. representative, the state senate districts and state house districts printed there, and the court retention headings). The Class 2 label cites the U.S. Senate Class II list (terms expire in 2027; the list includes Alaska). Candidate names are not published: the calendar lists October 29, 2026 as a write-in letter-of-intent deadline, and the candidate page’s general-information block prints a June 1, 2026 write-in line. Those two pages do not agree, so the list was not treated as final. No how-to, eligibility, or checklist copy was added. The general-election page’s ranked-choice description is noted as that page’s statement; marking instructions are not reprinted. Initiatives 25USCV and 24ESEG are noted only with the petitions page’s status line, “Will appear on General Election ballot,” which the November 3, 2026 general-election section links for ballot measures. Other petitions on that page are not described as appearing on the ballot. Same-day registration is omitted for this election: the election-information page describes it for President and Vice-President. Regional-office hours that the calendar labels as Division policy are not listed as a statewide early-voting schedule. No calendar date was calculated for a deadline a page did not print. Vote.gov states registration deadlines as 30 days before Election Day and does not print October 4; the October 4 date is the one printed on the Division’s candidate page and calendar.

## October 13, 2026 — Iowa state hub

Iowa is a state hub at `/states/IA`, linked to and from `/voting-deadlines/#IA`. Deadline lines were read on October 13, 2026 from the Secretary of State three-year election calendar, the February 4, 2026 general-election candidate guide, the Voter Ready dates and registration pages (linked from the Secretary of State site), the absentee-voting page, the military and overseas page, the polling-place finder, Iowa Code §§ 39.1, 48A.7A, 48A.9, 49.73, 53.2, 53.8, 53.10, 53.17, and 53.44, and Vote.gov. Offices are taken from the Secretary of State’s November 3, 2026 general-election page. The Class 2 label cites the U.S. Senate Class II list (terms expire in 2027; the list includes Iowa). County, township, and judicial-retention rows are not itemized beyond that page, because they vary. Candidate names are not published: the general-election page says the candidate list will be updated throughout the filing period, and the August 2026 candidate-list PDF says ballot vacancies after the primary may be filled by convention until August 19 at 5:00 p.m. and invites change requests. No how-to, eligibility, or checklist copy was added. A separate early-voting period is not listed; the official pages describe in-person absentee voting. The candidate guide prints noon on Monday, November 9, 2026 for UOCAVA and Safe at Home ballots and cites §53.17(2). The hub quotes that line and also quotes the Iowa Code 2026 text of §53.17(2), which does not print November 9, plus the military page’s Monday-before / noon-Monday-after rule and §53.44, which does not name November 9. No calendar date was calculated for a deadline a page did not print. The military page’s federal write-in sentence that says polls close at 9 p.m. (CST) is omitted because the same page, the voter-ready page, the candidate guide, and §49.73 state 8:00 p.m. §53.17A describes some ballots received after the polls close and prints no calendar date, so no date was added for it. No 2026 statewide constitutional-amendment list was on the general-election page.

## October 12, 2026 — Maine state hub

Maine is a state hub at `/states/ME`, linked to and from `/voting-deadlines/#ME`. Deadline lines were read on October 12, 2026 from the Secretary of State voter guide, the September 4 and August 3, 2026 election updates, the absentee request and tracking service, Title 21-A §§ 121-A, 626, 753-B, and 755, and Vote.gov. Offices are taken from the Secretary of State’s 2026 office listing and the office codes on the July 27, 2026 general-election candidate spreadsheet. The Class 2 label cites the U.S. Senate Class II list (terms expire in 2027). County offices are not itemized beyond the official chart, because they vary by county. Ranked-choice voting is noted only as the upcoming-elections page’s statement that it is used in the general election for federal offices; the marking instructions are not reprinted. Candidate names are not published: the upcoming-elections page says replacement nominations are added as received, and the withdrawals file was updated September 22, 2026, after the July 27 spreadsheet. No how-to, eligibility, or checklist copy was added. Statewide ballot questions were not listed because those pages did not publish a question list.

## October 11, 2026 — Minnesota state hub

Minnesota is a state hub at `/states/MN`, linked to and from `/voting-deadlines/#MN`. Deadline lines were re-read on October 11, 2026 from the Secretary of State 2026 elections calendar, Minnesota Statutes § 201.061, and the register-to-vote page. Offices on the general-election ballot are taken from the Secretary of State’s What’s on my ballot page. The Class 2 label cites the U.S. Senate Class II list (terms expire in 2027). One proposed constitutional amendment is noted and linked; the question text and voting instructions are not reprinted. Candidate names are not published: the SOS candidate file says it can change until election day, and this pass did not treat that file or the candidate-filings finder as a certified list. No how-to, eligibility, or checklist copy was added.

## October 7, 2026 content rule

The public site keeps plain, sourced facts (registration and other deadline dates, each with its official link). Step-by-step voter guidance, eligibility how-tos, and instructions to the reader are off the public pages. Anything beyond a bare sourced fact links to the state election office, Vote.gov, or `/voting-deadlines/`. Legal pages keep rights language and the disclaimer’s verify line. The October 6 voter-preparation section and its HowTo markup were removed.

## What counsel should still review

These items are **intentionally not signed off** in this repo:

1. **Whether Florida LLC public-facing legal pages are sufficient** for a national election-information site (governing law, venue, limitation of liability, warranty disclaimer).
2. **Election-administration and voter-intimidation optics** — tone is conservative, but counsel should confirm that ZIP sketches, district examples, and “sample ballot” wording cannot be read as official instruction in any target state.
3. **Campaign-finance / political-committee risk** if the site later adds ads, email lists, or paid promotion. MVP does not solicit contributions; adding any fundraising or coordinated messaging needs a new review.
4. **Defamation / nominative-use risk** when publishing real candidate names. Do not publish accusations, fundraising, or implied endorsements.
5. **Trademark / brand filing** if “Map the Midterms” will be used commercially. The site currently states the name is unfiled. Do not treat the public name as a filed DBA or registered mark.
6. **Privacy / logging** — `/privacy` now describes Cloudflare Web Analytics and GitHub Pages logging and adds GDPR / U.S. state-law rights language. Counsel should confirm it is sufficient. Update `/privacy` before adding any script, form, or vendor.
7. **Accessibility and public-accommodation claims** if the site is presented as a primary voter tool for people with disabilities (it is not a replacement for official accessible ballots).
8. **State-specific electioneering or “voter guide” statutes** if distribution is targeted (mail, SMS, paid social) rather than a passive website.
9. **Results republication** if unofficial returns from any third party are later displayed (license terms, “certified” language, takedown process).
10. **Sunbiz / registered-agent display rules** if counsel wants more or less corporate identification than document number + Miami Beach, FL.

## Explicit non-claims

- This file is not an attorney-client communication.
- Passing `npm run build` is not a compliance review.
- Matching the posture of other Joshua Israel Ventures LLC informational sites does not make the copy jurisdiction-perfect for elections.
- Official URLs linked from state hubs can change; verify them periodically.

## When you change the product

Update this file and the public legal pages together if you add analytics, accounts, live APIs, ads, affiliates, real candidate names, or any payment flow.

## City-page candidate names (October 17, 2026)

Place pages list 2026 general-election candidate names and parties only when an official state election-office certified or candidate list was read on October 17, 2026. The page cites that list’s URL and the date it was read. Names and parties are copied in the list’s order. A state whose official list was not available says “Official candidate list not yet published” and links the state election office. Pages do not show ratings, rankings, or contact details. Mayor and council races are omitted. Texas countywide November 3, 2026 offices are copied from the Secretary of State ballot certification, as described in the October 18, 2026 note. No other official county or city candidate list was matched to a place. Each place page title is “[Place], [ST] 2026 Elections: Candidates & Races”, with the county added when the Census name is repeated in that state. The description names the GEOID. Schema is Place, one Event per contest printed on the page, and BreadcrumbList. Race guides use the same title pattern from the guide’s short title, and FAQPage only when that guide already prints questions. Fixed-height boxes on those pages reserve space for ads and contain no ad code.

## October 18, 2026 — Texas countywide contests on place pages

Texas Census place pages list countywide offices from the Texas Secretary of State ballot certification for the November 3, 2026 general election, signed August 28, 2026: https://www.sos.texas.gov/elections/forms/2026-ballot-cert.pdf. The certification was read October 17, 2026 and checked again October 18, 2026. Its date line prints November 03, 2026. The file covers all 254 Census counties, which covers every Texas place page. Names and parties are copied in the certification’s order. Countywide offices on the page include county judge, county clerk, district clerk, combined clerk, treasurer, sheriff, county attorney, county surveyor, tax assessor-collector, county courts at law, probate courts, and criminal-district attorney or criminal-district judge offices the certification prints as countywide. Precinct offices, justice of the peace, judicial-district and court-of-appeals contests, State Board of Education districts, and the 1st Multicounty Court at Law are not copied. Each county block says the certification lists those omitted district contests and does not identify which places are in each district. Houston city (GEOID 4835000) is in Fort Bend, Harris, Montgomery, and Waller counties, so that page lists each of those counties’ countywide offices, including Harris County Judge candidates ORLANDO SANCHEZ (REP) and LETITIA PLUMMER (DEM) and the Fort Bend County offices. No voting advice, how-to, or race call was added. The page cites the certification URL and the October 17, 2026 read date already used for local-file citations.

## ZIP search (October 17, 2026)

The homepage and Census place indexes include a ZIP search that runs in the browser. It loads static JSON split by the first three digits of the ZIP, built from Census ZCTA relationship files. The site does not store the entered ZIP, does not put it in the address bar, and does not send it to a third-party service. The request to this site is only for the three-digit prefix file.

## October 18, 2026 — election-law pass (not legal advice)

Joshua's rule: every site must follow the election laws of each country it covers. Full matrix: `/workspace/legal/election-law-matrix-2026-10-18.md` on the operator box.

- **FEC disclaimers (11 CFR 110.11):** apply to public communications by political committees, communications that expressly advocate or solicit, and paid internet ads (11 CFR 100.26). The site is unpaid, neutral and not a committee, so no "paid for by" line is required. It keeps the LLC name in the footer.
- **Exit polls and early results:** no federal or state law bars publishing them (state limits only cover conduct near polling places, e.g. *Daily Herald Co. v. Munro*, 838 F.2d 380 (9th Cir. 1988)). Site rule regardless: no exit polls, no projections, no returns for a state before its last polls close.
- **Build guard:** `scripts/check-election-law.mjs` runs first in `npm run build`. It fails the build if `pollClose.ts` does not list 51 election-night close times, if the committed `public/live-data/results.json` has returns for a state before its polls close, or if `polls.ts` contains an exit poll.
- **Live tracker:** `scripts/live/fetch.mjs` and `LiveResults.tsx` already hold every state's returns until `allPollsClosedAt`.
