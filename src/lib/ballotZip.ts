/**
 * Ballot ZIP stays in sessionStorage for this tab. It is not written to the
 * address. The boot script is inlined only on ballot HTML, ahead of ad scripts,
 * so a legacy #zip= fragment is stored and removed before those scripts run.
 */
export const BALLOT_ZIP_STORAGE_KEY = "mtm-ballot-zip";

export const BALLOT_ZIP_EVENT = "mtm-ballot-zip";

/** Blocking inline script. No src, so it runs during parse before later scripts. */
export const BALLOT_ZIP_BOOT_SCRIPT =
  `<script data-cfasync="false">` +
  `(function(){try{var q=location.hash.replace(/^#/,"");if(!q)return;` +
  `var p=new URLSearchParams(q);if(!p.has("zip"))return;` +
  `var z=(p.get("zip")||"").replace(/\\D/g,"").slice(0,5);` +
  `if(z.length===5)sessionStorage.setItem(${JSON.stringify(BALLOT_ZIP_STORAGE_KEY)},z);` +
  `p.delete("zip");var n=p.toString();` +
  `history.replaceState(null,"",location.pathname+location.search+(n?"#"+n:""));` +
  `}catch(e){}})()</script>`;

/** Exported ballot documents, including a trailing-slash index and a redirect stub. */
export function isBallotHtml(rel: string): boolean {
  const posix = rel.split("\\").join("/");
  return /^ballot(?:\/[a-z]{2})?(?:\/index\.html|\.html)$/i.test(posix);
}

export function readBallotZip(): string {
  try {
    const zip = (sessionStorage.getItem(BALLOT_ZIP_STORAGE_KEY) ?? "").replace(/\D/g, "").slice(0, 5);
    return zip.length === 5 ? zip : "";
  } catch {
    return "";
  }
}

/** A five-digit ZIP replaces the stored value. Any other string removes it. */
export function writeBallotZip(zip: string): void {
  try {
    if (/^\d{5}$/.test(zip)) sessionStorage.setItem(BALLOT_ZIP_STORAGE_KEY, zip);
    else sessionStorage.removeItem(BALLOT_ZIP_STORAGE_KEY);
  } catch {
    // Private mode can reject storage. The ballot still opens without narrowing.
  }
}
