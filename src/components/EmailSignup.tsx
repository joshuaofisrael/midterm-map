import Link from "next/link";
import { EMAIL_SIGNUP, emailSignupEnabled } from "@/data/monetization";

/**
 * "Election night results alert" signup. Plain HTML POST to the configured
 * provider (Kit, Buttondown, MailerLite...). No scripts, no tracking.
 * Renders nothing until EMAIL_SIGNUP.action is set.
 */
export function EmailSignup() {
  if (!emailSignupEnabled()) return null;
  return (
    <section
      id="results-alert"
      aria-labelledby="results-alert-heading"
      className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6"
    >
      <h2 id="results-alert-heading" className="font-serif text-lg font-semibold">
        Election night results alert
      </h2>
      <form action={EMAIL_SIGNUP.action} method="post" className="mt-3 space-y-3">
        {Object.entries(EMAIL_SIGNUP.hiddenFields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
        <div className="flex flex-wrap gap-2">
          <label htmlFor="results-alert-email" className="sr-only">
            Email address
          </label>
          <input
            id="results-alert-email"
            type="email"
            name={EMAIL_SIGNUP.emailField}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="min-w-[14rem] flex-1 rounded-md border border-line bg-white px-3 py-2"
          />
          <button
            type="submit"
            className="rounded-md bg-navy px-4 py-2 font-semibold text-white hover:bg-navy-deep"
          >
            Sign up
          </button>
        </div>
        <label className="flex items-start gap-2 text-xs leading-5 text-ink-muted">
          {/* No name attribute: the consent box is enforced by the browser and not sent to the provider. */}
          <input type="checkbox" required className="mt-1" />
          <span>
            Get one email with links to official results on election night (Nov 3, 2026) and
            occasional site updates. You will get a confirmation email first. Unsubscribe anytime.
            See our <Link className="underline" href="/privacy">Privacy Policy</Link>.
          </span>
        </label>
      </form>
    </section>
  );
}
