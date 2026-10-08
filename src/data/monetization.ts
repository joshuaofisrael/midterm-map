/**
 * Central monetization config for Map the Midterms.
 *
 * Every component reads from here and renders nothing when its value is empty,
 * so a feature turns on only when its id or URL is filled in below.
 * Rules: strictly nonpartisan, no campaign or PAC money, free tools only.
 */

/** Stripe Payment Link (Joshua Israel Ventures LLC live account), one-time pay-what-you-want tip. */
export const STRIPE_TIP_URL: string = "https://buy.stripe.com/6oUbJ29Us0RP3tt2rSb3q37";

export type EmailSignupConfig = {
  /** Provider display name, e.g. "Kit", "Buttondown", "MailerLite". Empty until configured. */
  provider: string;
  /** Provider privacy policy URL, shown in the privacy policy once configured. */
  providerPrivacyUrl: string;
  /**
   * Form POST action. Examples:
   *  Kit:        https://app.kit.com/forms/<FORM_ID>/subscriptions   (emailField "email_address")
   *  Buttondown: https://buttondown.com/api/emails/embed-subscribe/<USERNAME> (emailField "email")
   *  MailerLite: https://assets.mailerlite.com/jsonp/<ACCOUNT>/forms/<FORM_ID>/subscribe (emailField "fields[email]")
   * Empty string keeps the signup hidden everywhere.
   */
  action: string;
  /** Name attribute of the email input expected by the provider. */
  emailField: string;
  /** Extra hidden inputs the provider needs (e.g. Buttondown "embed": "1"). */
  hiddenFields: Record<string, string>;
};

export const EMAIL_SIGNUP: EmailSignupConfig = {
  provider: "Kit",
  providerPrivacyUrl: "https://kit.com/privacy",
  action: "https://app.kit.com/forms/10018291/subscriptions",
  emailField: "email_address",
  hiddenFields: {},
};

export type AffiliateConfig = {
  /** Amazon Associates (US) tracking tag, e.g. "mapthemidterms-20". Empty = no Amazon links. */
  amazonTag: string;
  /** Bookshop.org affiliate id (numeric). Empty = no Bookshop links. */
  bookshopId: string;
};

export const AFFILIATE: AffiliateConfig = {
  amazonTag: "",
  bookshopId: "",
};

export const tipJarEnabled = (): boolean => STRIPE_TIP_URL.trim().length > 0;
export const emailSignupEnabled = (): boolean => EMAIL_SIGNUP.action.trim().length > 0;
export const affiliateEnabled = (): boolean =>
  AFFILIATE.amazonTag.trim().length > 0 || AFFILIATE.bookshopId.trim().length > 0;
