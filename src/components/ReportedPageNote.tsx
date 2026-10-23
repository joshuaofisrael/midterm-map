"use client";

import { useSearchParams } from "next/navigation";

/** Paths this site actually uses. Rejects anything that could break the report note. */
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

  return (
    <p>
      You are reporting an error on <strong>{path}</strong>. The form includes that page address.
    </p>
  );
}
