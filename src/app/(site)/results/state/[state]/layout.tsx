import type { ReactNode } from "react";
import { HouseAd } from "@/components/HouseAd";
import { SponsorSlot } from "@/components/SponsorSlot";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  return (
    <>
      <HouseAd path={`/results/state/${state}`} />
      <SponsorSlot />
      {children}
    </>
  );
}
