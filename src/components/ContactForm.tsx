import { Suspense } from "react";
import { CONTACT_FORM_ACTION } from "@/data/contact";
import { absoluteUrl, SITE } from "@/data/site";
import { LEGAL } from "@/data/legalEntity";
import { ReportedPageField } from "@/components/ReportedPageField";

export { CONTACT_FORM_ACTION, FORMSUBMIT_PRIVACY, FORMSUBMIT_URL } from "@/data/contact";

const inputClass = "mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-ink";

export function ContactForm() {
  return (
    <form
      action={CONTACT_FORM_ACTION}
      method="POST"
      className="relative not-prose my-6 rounded-xl border border-line bg-paper-card p-5 shadow-card"
    >
      <input type="hidden" name="_subject" value={`New message from ${SITE.name} (mapthemidterms.com)`} />
      <input type="hidden" name="_next" value={absoluteUrl("/contact/thanks")} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="Site" value={SITE.name} />
      <Suspense fallback={null}>
        <ReportedPageField />
      </Suspense>
      {/* Honeypot: off-screen, ignored by people; FormSubmit drops the submission if it is filled. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
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
        We use your name, email, and message only to reply, to correct an error you report, or to
        handle a privacy request. We do not add you to a mailing list. FormSubmit, a third-party
        service, emails the message to {LEGAL.legalName}. See the{" "}
        <a className="underline" href="/privacy/#contact-form">
          privacy policy
        </a>
        . Please do not include Social Security numbers, voter ID numbers, or photos of ballots.
      </p>
    </form>
  );
}
