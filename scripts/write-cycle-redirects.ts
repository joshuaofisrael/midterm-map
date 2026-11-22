/**
 * Replace dated 2026-cycle HTML with the same redirect stub the place prune uses.
 * Runs after next build and before the consent-head stamp.
 */
import fs from "node:fs";
import path from "node:path";
import { cycleRedirects } from "../src/lib/cycleRedirects.ts";

const root = process.cwd();
const outDir = path.join(root, "out");
const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mapthemidterms.com").replace(/\/+$/, "");

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function redirectHtml(targetPath: string, label: string, canonicalUrl: string): string {
  const href = escapeHtml(targetPath);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(label)}</title>
<link rel="canonical" href="${escapeHtml(canonicalUrl)}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${href}">
</head>
<body>
<p><a href="${href}">${escapeHtml(label)}</a></p>
<script>location.replace(${JSON.stringify(targetPath)});</script>
</body>
</html>
`;
}

let written = 0;
for (const row of cycleRedirects()) {
  const rel = row.path.replace(/^\/+|\/+$/g, "");
  const dir = path.join(outDir, rel);
  const htmlPath = path.join(dir, "index.html");
  fs.mkdirSync(dir, { recursive: true });
  const canonicalPath = row.target.split("#")[0];
  const canonical = `${base}${canonicalPath.endsWith("/") ? canonicalPath : `${canonicalPath}/`}`;
  fs.writeFileSync(htmlPath, redirectHtml(row.target, row.label, canonical));
  const flight = path.join(dir, "index.txt");
  if (fs.existsSync(flight)) fs.unlinkSync(flight);
  written += 1;
}

console.log(`Cycle redirects: ${written} HTML stubs.`);
