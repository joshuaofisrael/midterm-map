import { Suspense } from "react";
import { absoluteUrl, SITE } from "@/data/site";
import { ReportedPageField } from "@/components/ReportedPageField";

/** FormSubmit endpoint. Static export, so this is a plain HTML POST form. */
export const CONTACT_FORM_ACTION = `https://formsubmit.co/${SITE.email}`;
export const FORMSUBMIT_URL = "https://formsubmit.co/";
export const FORMSUBMIT_PRIVACY = "https://formsubmit.co/privacy.pdf";

const inputClass = "mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-ink";

export function ContactForm() {
  return (
    <form
      action={CONTACT_FORM_ACTION}
      method="POST"
      className="not-prose my-6 rounded-xl border border-line bg-paper-card p-5 shadow-card"
    >
      <input type="hidden" name="_subject" value={`New message from ${SITE.name} (mapthemidterms.com)`} />
      <input type="hidden" name="_next" value={absoluteUrl("/contact/thanks")} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="Site" value={SITE.name} />
      <Suspense fallback={null}>
        <ReportedPageField />
      </Suspense>
      {/* Honeypot: hidden from people; bots that fill it are dropped by FormSubmit. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <div className="grid gap-4">
        <label className="block text-sm">
          <span className="font-medium text-ink">Name</span>
          <input type="text" name="name" required maxLength={200} autoComplete="name" className={inputClass} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Email</span>
          <input type="email" name="email" required maxLength={320} autoComplete="email" className={inputClass} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Message</span>
          <textarea name="message" required rows={6} maxLength={5000} className={inputClass} />
        </label>
        <div>
          <button
            type="submit"
            className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-deep"
          >
            Send message
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-muted">
        Messages are delivered to {SITE.legalName} by email through FormSubmit, a third-party form
        service. See the <a className="underline" href="/privacy/#contact-form">privacy policy</a>.
        Please do not include Social Security numbers, voter ID numbers, or photos of ballots.
      </p>
    </form>
  );
}
