import type { ReactNode } from "react";
import { HouseAd } from "@/components/HouseAd";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ state: string; county: string }>;
}) {
  const { state, county } = await params;
  return (
    <>
      <HouseAd path={`/cities/${state}/county/${county}`} />
      {children}
    </>
  );
}
