"use client";

import { useSearchParams } from "next/navigation";
import { SITE } from "@/data/site";

/** Paths this site actually uses. Rejects anything that could break a mailto body. */
function safeReportPath(value: string | null): string | null {
  if (!value) return null;
  if (value.length > 200) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  if (!/^\/[A-Za-z0-9/_-]*$/.test(value)) return null;
  return value;
}

export function ReportedPageNote() {
  const path = safeReportPath(useSearchParams().get("url"));
  if (!path) return null;

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `${SITE.emailSubject} Error report`,
  )}&body=${encodeURIComponent(`Page: ${path}\n\nWhat should be corrected:\n`)}`;

  return (
    <p>
      You are reporting an error on <strong>{path}</strong>.{" "}
      <a href={mailto}>Email this report</a>. The message includes that page address.
    </p>
  );
}
