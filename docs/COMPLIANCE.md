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
