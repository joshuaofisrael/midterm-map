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
- [x] `/privacy` — no voter-file sales; client-side ZIP; Cloudflare Web Analytics (privacy-oriented beacon; not selling voter data); email handling
- [x] `/terms` — use of site, LLC operator, limitation of liability, Florida governing law, no campaign contribution solicitation
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

## What counsel should still review

These items are **intentionally not signed off** in this repo:

1. **Whether Florida LLC public-facing legal pages are sufficient** for a national election-information site (governing law, venue, limitation of liability, warranty disclaimer).
2. **Election-administration and voter-intimidation optics** — tone is conservative, but counsel should confirm that ZIP sketches, district examples, and “sample ballot” wording cannot be read as official instruction in any target state.
3. **Campaign-finance / political-committee risk** if the site later adds ads, email lists, or paid promotion. MVP does not solicit contributions; adding any fundraising or coordinated messaging needs a new review.
4. **Defamation / nominative-use risk** when publishing real candidate names. Do not publish accusations, fundraising, or implied endorsements.
5. **Trademark / brand filing** if “Map the Midterms” will be used commercially. The site currently states the name is unfiled. Do not treat the public name as a filed DBA or registered mark.
6. **Privacy / logging** once a custom domain, analytics, forms, or email vendor is connected. Update `/privacy` before adding scripts.
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
