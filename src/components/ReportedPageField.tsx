"use client";

import { useSearchParams } from "next/navigation";

/** Adds the reported page path to contact form submissions when /contact/?url=... is used. */
export function ReportedPageField() {
  const value = useSearchParams().get("url");
  if (!value || value.length > 200 || !/^\/[A-Za-z0-9/_-]*$/.test(value) || value.startsWith("//")) {
    return null;
  }
  return <input type="hidden" name="Reported page" value={value} />;
}
