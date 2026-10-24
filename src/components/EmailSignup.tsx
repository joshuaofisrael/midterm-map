import { CONTACT_FORM_ACTION } from "@/data/contact";
import { absoluteUrl } from "@/data/site";
import Link from "next/link";

const inputClass = "min-w-[14rem] flex-1 rounded-md border border-line bg-white px-3 py-2";

/**
 * Election-night updates. Posts to the same FormSubmit alias as the contact form.
 * The inbox address is not in the form action. The consent box starts unchecked.
 */
export function EmailSignup({ prominent = false }: { prominent?: boolean } = {}) {
  return (
    <section
      id="election-updates"
      aria-labelledby="election-updates-heading"
      className={
        prominent
          ? "rounded-xl border-2 border-navy bg-paper-card p-5 text-sm leading-6 shadow-sm"
          : "rounded-xl border border-line bg-paper-card p-5 text-sm leading-6"
      }
    >
      <h2
        id="election-updates-heading"
        className={prominent ? "font-serif text-xl font-semibold" : "font-serif text-lg font-semibold"}
      >
        Get election-night updates
      </h2>
      <p className="mt-1 text-ink-muted">
        One email address, used only to send election updates for November 3, 2026. You can ask us to remove it.
      </p>
      <form action={CONTACT_FORM_ACTION} method="POST" className="relative mt-3 space-y-3">
        <input type="hidden" name="_subject" value="Election-night updates signup from Map the Midterms" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value={absoluteUrl("/updates/thanks")} />
        <input type="hidden" name="form" value="election-night-updates" />
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label>
            Company
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <label htmlFor="election-updates-email" className="sr-only">
            Email address
          </label>
          <input
            id="election-updates-email"
            type="email"
            name="email"
            required
            maxLength={320}
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
          <button type="submit" className="rounded-md bg-navy px-4 py-2 font-semibold text-white hover:bg-navy-deep">
            Sign up
          </button>
        </div>
        <label className="flex items-start gap-2 text-xs leading-5 text-ink-muted">
          <input type="checkbox" name="consent" value="yes" required className="mt-1" />
          <span>
            I agree to receive election-night updates by email. This address is collected only to send
            election updates and can be removed on request. See the{" "}
            <Link className="underline" href="/privacy/#election-updates">
              privacy policy
            </Link>
            .
          </span>
        </label>
      </form>
    </section>
  );
}
