import { STRIPE_TIP_URL, tipJarEnabled } from "@/data/monetization";

export const TIP_SMALL_PRINT =
  "Tips are paid to Joshua Israel Ventures LLC through Stripe. They are not political contributions and are not tax-deductible. Map the Midterms is not affiliated with any campaign, party or PAC.";

/** "Keep this map free" tip jar. Renders nothing until STRIPE_TIP_URL is set. */
export function TipJar() {
  if (!tipJarEnabled()) return null;
  return (
    <aside
      id="tip-jar"
      aria-labelledby="tip-jar-heading"
      className="rounded-xl border border-line bg-paper-tint p-5 text-sm leading-6"
    >
      <h2 id="tip-jar-heading" className="font-serif text-lg font-semibold">
        Keep this map free
      </h2>
      <p className="mt-1 text-ink-muted">
        Map the Midterms is free and independent. If it helped you, you can leave a tip.
      </p>
      <p className="mt-3">
        <a
          href={STRIPE_TIP_URL}
          target="_blank"
          rel="noopener"
          className="inline-block rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-deep"
        >
          Leave a tip
        </a>
      </p>
      <p className="mt-3 text-xs leading-5 text-ink-muted">{TIP_SMALL_PRINT}</p>
    </aside>
  );
}
