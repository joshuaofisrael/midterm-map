import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Election updates signup received",
  description: `Your request for election-night updates from ${SITE.name} was received. The address is used only to send those updates.`,
  path: "/updates/thanks",
});

export default function UpdatesThanksPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Election updates", path: "/updates/thanks" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Election updates" }]} />
      <PageHeader
        eyebrow="Election-night updates"
        title="Signup received"
        lede="We received your email address. It is collected only to send election updates, and you can ask us to remove it."
      />
      <p className="text-sm leading-6">
        To ask for removal, use the{" "}
        <Link className="font-medium text-navy underline" href="/contact">
          contact form
        </Link>
        .
      </p>
    </div>
  );
}
