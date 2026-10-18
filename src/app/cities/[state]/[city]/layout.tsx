import type { ReactNode } from "react";
import { CityChrome } from "@/components/CityChrome";

export default function CityPlaceLayout({ children }: { children: ReactNode }) {
  return <CityChrome>{children}</CityChrome>;
}
