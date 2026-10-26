import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Message sent",
  description: `Thank you for contacting ${SITE.name}. Your message was sent to the ${SITE.name} team.`,
  path: "/contact/thanks",
});

export default function ContactThanksPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
          { name: "Message sent", path: "/contact/thanks" },
        ])}
      />
      <Breadcrumbs
        items={[{ href: "/", label: "Home" }, { href: "/contact", label: "Contact" }, { label: "Message sent" }]}
      />
      <PageHeader eyebrow="Contact" title="Thank you" lede="Your message was sent." />
      <div className="prose-legal">
        <p className="rounded-xl border border-line border-t-4 border-t-navy bg-paper-card p-5 shadow-card">
          Thank you for contacting {SITE.name}. Your message was delivered to the {SITE.name} team by
          email, and we reply by email. If you need to add anything, use the{" "}
          <Link href="/contact">contact form</Link> again.
        </p>
        <p>
          For your registration, ballot, polling place, or deadlines, contact your state or county
          election office, or start at <a href={SITE.voteGovUrl} rel="noopener noreferrer">Vote.gov</a>.
        </p>
        <p>
          <Link href="/">Back to the map</Link>
        </p>
      </div>
    </div>
  );
}
