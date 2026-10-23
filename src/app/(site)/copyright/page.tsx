import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { LEGAL } from "@/data/legalEntity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Copyright and corrections",
  description:
    `Copyright, content use, DMCA notices, and the corrections policy for ${SITE.name}, operated by Joshua Israel Ventures LLC. Notices and error reports go through the contact form.`,
  path: "/copyright",
});

export default function CopyrightPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Copyright and corrections", path: "/copyright" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Copyright and corrections" }]} />
      <PageHeader
        eyebrow={`Last updated ${SITE.policyLastUpdated}`}
        title="Copyright and corrections"
        lede={`What you may do with ${SITE.name}, how to send a copyright notice, and how to report an error.`}
      />
      <div className="prose-legal">
        <p>
          {SITE.name} is owned and operated by <strong>{LEGAL.legalName}</strong>, a {LEGAL.entityType}.{" "}
          {LEGAL.brandNote} These rules sit alongside the <Link href="/terms">terms of use</Link>.
        </p>

        <h2>Copyright</h2>
        <p>
          Site design and original text are owned by {LEGAL.legalName} unless a page says otherwise.
          That includes the selection and arrangement of material on a page, and the wording we write.
          Candidate names, party labels, and dates copied from a public election-office list are facts
          from that list. Our decision to include them, and the sentences around them, are ours.
        </p>
        <p>
          Candidate photos are used under the public-domain status or Creative Commons license shown in
          each photo credit and in the <a href="/ATTRIBUTION.md">image attribution list</a>. Those photos
          stay under their own licenses. We do not grant you any license in a photo beyond what that
          photo’s license already allows. Official election materials remain the property and
          responsibility of the offices that publish them.
        </p>

        <h2>What you may do with the content</h2>
        <ul>
          <li>You may link to any public page on {SITE.name}.</li>
          <li>
            You may quote a short passage for commentary, criticism, news reporting, or teaching, with
            credit to {SITE.name} and a link to the page.
          </li>
          <li>
            You may not copy pages, the design, or the compilation to build a competing site, republish
            them as your own, or suggest that {LEGAL.legalName} endorses you, a candidate, or a party.
          </li>
          <li>
            Candidate, party, office, and geographic names appear for identification only. Using them
            here does not give you a right to use them in a way that implies endorsement or affiliation.
          </li>
        </ul>

        <h2>Copyright notices (DMCA)</h2>
        <p>
          If you believe material on this site infringes a copyright you own or are authorized to act
          for, send a notice through the <Link href="/contact">contact form</Link>. Put “Copyright
          notice” in the message. The form is the notice process. This page does not publish an email
          address. A paper notice can be mailed to {LEGAL.legalName}, {LEGAL.mailingAddress}.
        </p>
        <p>A notice we can act on should include all of the following:</p>
        <ul>
          <li>Your name, and the email address you enter on the form so we can reply</li>
          <li>Identification of the copyrighted work you claim is infringed</li>
          <li>The page address of the material, and a description that lets us find it</li>
          <li>
            A statement that you have a good-faith belief the use is not authorized by the copyright
            owner, its agent, or the law
          </li>
          <li>
            A statement, under penalty of perjury, that the notice is accurate and that you are the
            copyright owner or are authorized to act for the owner
          </li>
          <li>Your physical or electronic signature (your full name typed on the form is enough)</li>
        </ul>
        <p>
          We review notices and remove or correct material where appropriate. If a notice is incomplete,
          we may ask you for the missing part before we act. The site has no user accounts and no
          comments. Where the law calls for it, we will stop hosting material after a valid notice and
          we will not restore it for a person who repeatedly infringes.
        </p>
        <p>
          This page does not say that {LEGAL.legalName} has registered a designated agent with the U.S.
          Copyright Office. Send the notice through the contact form anyway, and we will review it.
        </p>

        <h2>If your material was removed</h2>
        <p>
          If you believe we removed or changed material because of a mistake or misidentification, use
          the <Link href="/contact">contact form</Link> and put “Copyright counter-notice” in the
          message. Include the page address, a description of what was removed, your name and the email
          address on the form, a statement under penalty of perjury that you have a good-faith belief
          the material was removed by mistake or misidentification, and your consent to the jurisdiction
          of the federal court in the judicial district where your address is located (or, if you are
          outside the United States, any judicial district in which {LEGAL.legalName} may be found) and
          to accept service of process from the person who sent the original notice. We will review it
          and restore material where the law requires.
        </p>

        <h2>Other concerns</h2>
        <p>
          For a privacy request, use the contact form as the <Link href="/privacy">privacy policy</Link>{" "}
          describes. For a photo-credit or other rights concern that is not a copyright notice, use the
          contact form with the page address and a description of the material.
        </p>

        <h2>Corrections policy</h2>
        <h3>How to report an error</h3>
        <p>
          Use the <Link href="/contact">contact form</Link>. “Report an error” links on fact pages open
          that form with the page address filled in. Tell us what is wrong and, if you have one, the
          public source that shows the correction. Please do not send Social Security numbers, voter ID
          numbers, photos of ballots, or other sensitive identity documents.
        </p>
        <h3>What we do with a report</h3>
        <p>
          We review the report. If it shows that something we published is wrong, we correct the page.
          We do not promise to use a requester’s wording, to publish the request itself, or to change a
          sentence that accurately quotes the source it cites. A difference of opinion, a forecast, or a
          rating that matches the outlet we name is not an error in our text.
        </p>
        <h3>How corrections are logged</h3>
        <p>
          We do not keep a separate public corrections log. When we change a fact page, the new text
          replaces the old text, and the “Last updated” line on that page shows the date stored for that
          page’s facts. The report itself is kept with the contact-form records described in the{" "}
          <Link href="/privacy">privacy policy</Link>. It is not posted on the site.
        </p>

        <h2>Contact</h2>
        <p>
          {LEGAL.legalName}. Mailing address: {LEGAL.mailingAddress}.{" "}
          <Link href="/contact">Contact</Link>. See also the <Link href="/terms">terms of use</Link> and
          the <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}
