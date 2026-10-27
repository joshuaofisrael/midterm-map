import type { ReactNode } from "react";
import { HouseAd } from "@/components/HouseAd";
import { SponsorSlot } from "@/components/SponsorSlot";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <HouseAd path="/live" />
      <SponsorSlot />
      {children}
    </>
  );
}
