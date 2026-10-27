import type { ReactNode } from "react";
import { HouseAd } from "@/components/HouseAd";

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
      {children}
      <HouseAd path={`/results/state/${state}`} />
    </>
  );
}
