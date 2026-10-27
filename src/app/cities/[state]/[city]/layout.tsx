import type { ReactNode } from "react";
import { CityChrome } from "@/components/CityChrome";

export default async function CityPlaceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  return <CityChrome path={`/cities/${state}/${city}`}>{children}</CityChrome>;
}
