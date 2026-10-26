import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ReportedPageNote } from "@/components/ReportedPageNote";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${SITE.name} with the contact form. Error reports are welcome, and corrections are made promptly.`,
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
        lede={`Questions, corrections, and error reports for ${SITE.name}.`}
      />
      <div className="prose-legal">
        <p>
          Use the form below. It reaches the {SITE.name} team. We reply by email.
        </p>
        <h2>Contact form</h2>
        <ContactForm />
        <h2>Error reports</h2>
        <p>
          Error reports are welcome. Use the form, include the page address and what should be
          corrected, and add a source if you have one. Corrections are made promptly.
        </p>
        <Suspense fallback={null}>
          <ReportedPageNote />
        </Suspense>
        <h2>What to include</h2>
        <ul>
          <li>Corrections and error reports: the page address and the correction, with a source if you have one</li>
          <li>Privacy requests: put “Privacy request” in the subject line</li>
          <li>
            Copyright notices and image concerns: the page address and a description of the material.
            The notice elements are on the <Link href="/copyright">copyright and corrections</Link> page.
          </li>
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
          <Link href="/privacy">privacy policy</Link>, the{" "}
          <Link href="/disclaimer">disclaimer</Link>, the{" "}
          <Link href="/copyright">copyright and corrections</Link> page, and the{" "}
          <Link href="/advertising">advertising disclosure</Link>.
        </p>
      </div>
    </div>
  );
}
