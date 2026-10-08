import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${SITE.name}, a brand of ${SITE.legalName}, by email for corrections, privacy requests, and questions.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Contact" }]} />
      <PageHeader
        eyebrow="Contact"
        title={`Contact ${SITE.name}`}
        lede={`${SITE.name} is owned and operated by ${SITE.legalName}.`}
      />
      <div className="prose-legal">
        <p>
          Email <a href={contactMailto()}>{SITE.email}</a>. This reaches{" "}
          {SITE.legalName}, the company that owns and operates {SITE.name}.
          There is no contact form; we reply by email.
        </p>
        <h2>What to include</h2>
        <ul>
          <li>Corrections: the page address and the correction, with a source if you have one</li>
          <li>Privacy requests: put “Privacy request” in the subject line</li>
          <li>Copyright or image concerns: the page address and a description of the material</li>
        </ul>
        <p>
          Please do not send Social Security numbers, voter ID numbers, photos
          of ballots, or other sensitive documents.
        </p>
        <h2>Election questions</h2>
        <p>
          We are not an election office. For your registration, ballot,
          polling place, or deadlines, contact your state or county election
          office, or start at{" "}
          <a href={SITE.voteGovUrl} rel="noopener noreferrer">Vote.gov</a>.
        </p>
        <p>
          See also the <Link href="/terms">terms of use</Link>,{" "}
          <Link href="/privacy">privacy policy</Link>, and{" "}
          <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}
