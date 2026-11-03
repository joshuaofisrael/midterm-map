import Link from "next/link";

/** Cloudflare Worker that stores signups in D1 (one list for both election sites, tagged by site). */
export const EMAIL_SIGNUP_ENDPOINT = "https://election-signups.joshofisrael.workers.dev/subscribe";

const STATES: [string, string][] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"],
  ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"],
  ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"],
  ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"],
  ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"],
  ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"],
  ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"],
  ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"],
  ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];

const field = "min-w-0 rounded-md border border-line bg-white px-3 py-2 text-base text-ink";

/**
 * Plain HTML form (no client JS). Posts to the Worker, which validates, rate-limits,
 * stores the address and redirects back to /updates/thanks/.
 */
export function EmailSignup({ prominent = false, state }: { prominent?: boolean; state?: string } = {}) {
  return (
    <section
      id="election-updates"
      aria-labelledby="election-updates-heading"
      className={`my-6 rounded-xl bg-paper-card p-5 text-sm leading-6 ${prominent ? "border-2 border-navy" : "border border-line"}`}
    >
      <h2 id="election-updates-heading" className="font-serif text-lg font-semibold">
        Get final results for your state by email
      </h2>
      <form action={EMAIL_SIGNUP_ENDPOINT} method="POST" className="relative mt-3">
        <input type="hidden" name="consent" value="yes" />
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="election-updates-email" className="sr-only">Email address</label>
          <input
            id="election-updates-email"
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            className={`${field} sm:flex-1`}
          />
          <label htmlFor="election-updates-state" className="sr-only">State (optional)</label>
          <select id="election-updates-state" name="state" defaultValue={state ?? ""} className={field}>
            <option value="">State (optional)</option>
            {STATES.map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
          <button type="submit" className="rounded-md bg-navy px-4 py-2 font-semibold text-white hover:bg-navy-deep">
            Sign up
          </button>
        </div>
        <p className="mt-2 text-xs leading-5 text-ink-muted">
          We&apos;ll email election results and updates. Unsubscribe anytime.{" "}
          <Link className="underline" href="/privacy/#election-updates">Privacy policy</Link>
        </p>
      </form>
    </section>
  );
}
