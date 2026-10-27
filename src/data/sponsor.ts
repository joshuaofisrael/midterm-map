/**
 * Election-night sponsorship. One value, `ELECTION_NIGHT_SPONSOR`.
 *
 * `null` shows the "Advertise here" booking slot.
 * An object replaces that slot with "Sponsored by {name}".
 *
 * #10b981 fails 3:1 against the page background. #059669 clears that for the
 * border. White text on #059669 is about 3.8:1, short of 4.5:1, so the button
 * uses #047857 (about 5.5:1 with white).
 */

export type ElectionNightSponsor = {
  /** Advertiser name. The banner reads "Sponsored by {name}". */
  name: string;
  /** https URL the banner opens. */
  url: string;
  /** One short line of ad copy. */
  copy: string;
  /**
   * Optional logo. Prefer a file in public/, such as "/sponsors/acme.png".
   * An https URL also works; that host then sees the image request.
   */
  image?: string;
};

/** Set this object to sell the slot. `null` keeps the booking slot. */
export const ELECTION_NIGHT_SPONSOR: ElectionNightSponsor | null = null;

export const SPONSOR_CHECKOUT_URL = "https://buy.stripe.com/bJe14o4A8dEBe870jKb3r1U";

export const SPONSOR_SLOT_COPY =
  "Your ad here on election night: one exclusive sponsor, 3–6 Nov 2026, $1,000.";

export const SPONSOR_COLORS = {
  border: "#059669",
  background: "#ecfdf5",
  text: "#065f46",
  button: "#047857",
  buttonText: "#ffffff",
} as const;

/** Reserved row height, in px. Same for the open slot and the sold banner. */
export const SPONSOR_SLOT_MIN_HEIGHT = 76;

const HTTPS_URL = /^https:\/\/\S+$/i;
const IMAGE_SRC = /^(?:https:\/\/\S+|\/\S+)$/i;

/**
 * The sold banner, or null when the booking slot should show.
 * A blank field, a non-https URL, or a bad image path keeps the slot unsold.
 */
export function activeSponsor(
  config: ElectionNightSponsor | null = ELECTION_NIGHT_SPONSOR,
): ElectionNightSponsor | null {
  if (!config) return null;
  const name = config.name.trim();
  const url = config.url.trim();
  const copy = config.copy.trim();
  if (!name || !copy || !HTTPS_URL.test(url)) return null;
  const image = config.image?.trim() ?? "";
  if (image && !IMAGE_SRC.test(image)) return null;
  return image ? { name, url, copy, image } : { name, url, copy };
}
