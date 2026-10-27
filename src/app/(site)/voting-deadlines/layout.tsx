import type { ReactNode } from "react";
import { HouseAd } from "@/components/HouseAd";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <HouseAd path="/voting-deadlines" />
      {children}
    </>
  );
}
