import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SPONSOR_CHECKOUT_URL } from "@/data/sponsor";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Advertise on election night",
  description: `One exclusive banner on ${SITE.name}, 3–6 November 2026, for $1,000. Non-political businesses only. Ads are reviewed. Traffic is not guaranteed.`,
  path: "/advertise",
});

export default function AdvertisePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Advertise", path: "/advertise" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Advertise" }]} />
      <PageHeader
        eyebrow="Sponsorship"
        title="Advertise on election night"
        lede={`One exclusive banner across ${SITE.name}, from 3 November 2026 at 00:00 Eastern Time (ET) through 6 November 2026 at 23:59 Eastern Time (ET). The price is $1,000.`}
      />
      <div className="prose-legal">
        <p>The banner is reviewed before it runs and labelled Sponsored. Traffic is not guaranteed.</p>

        <h2>What the slot is</h2>
        <p>
          One sponsor for the whole run. The banner sits directly under the top banner on the
          homepage, the election-night page, the results page, and each state results page. It is
          the same banner on each of those pages. The slot is not rotated and is not shared.
        </p>
        <ul>
          <li>Starts 3 November 2026 at 00:00 ET.</li>
          <li>Ends 6 November 2026 at 23:59 ET.</li>
          <li>One exclusive sponsor.</li>
        </ul>

        <h2>Who can advertise</h2>
        <p>Non-political businesses only.</p>
        <p>
          We do not accept this ad from candidates, campaigns, political parties, PACs,
          ballot-measure committees, or issue advocacy.
        </p>

        <h2>Review and refund</h2>
        <p>
          Ads are reviewed before they run. An approved ad is labelled Sponsored. If the ad is not
          approved, you receive a full refund.
        </p>

        <h2>Traffic</h2>
        <p>
          Traffic is not guaranteed. This page does not state a visitor count, an impression count,
          or a click count. The placement named above is the placement.
        </p>

        <h2>Pay $1,000</h2>
        <p>
          The button opens Stripe checkout for $1,000. Payment does not skip review. Send the
          business name, the link, one line of copy, and an optional image through the{" "}
          <Link href="/contact">contact form</Link>. If the ad is not approved, the refund is the
          full $1,000.
        </p>
        <p>
          <a className="sponsor-pay" href={SPONSOR_CHECKOUT_URL} rel="noopener noreferrer" target="_blank">
            Pay $1,000
          </a>
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this slot go through the <Link href="/contact">contact form</Link>. See
          also the <Link href="/advertising">advertising disclosure</Link>.
        </p>
      </div>
    </div>
  );
}
