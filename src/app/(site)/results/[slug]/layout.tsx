import type { ReactNode } from "react";
import { HouseAd } from "@/components/HouseAd";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      {children}
      <HouseAd path={`/results/${slug}`} />
    </>
  );
}
