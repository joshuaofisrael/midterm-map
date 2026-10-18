import { SiteJsonLd } from "@/components/SiteJsonLd";
import { SiteShell } from "@/components/SiteShell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteJsonLd />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
