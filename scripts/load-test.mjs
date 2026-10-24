/**
 * Local load test against the static export. Do not point this at mapthemidterms.com.
 *
 *   npm run build
 *   npm run load-test
 *
 * Serves ./out on 127.0.0.1 and runs autocannon. Prints HTML and first-party JS weight first.
 */
import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createConnection } from "node:net";
import path from "node:path";
import autocannon from "autocannon";

const root = process.cwd();
const outDir = path.join(root, "out");
const port = 4173;

if (!existsSync(path.join(outDir, "index.html"))) {
  console.error("Missing out/index.html. Run npm run build first.");
  process.exit(1);
}

function kb(value) {
  return `${(value / 1024).toFixed(1)} KB`;
}

function measure(urlPath) {
  const rel = urlPath === "/" ? "index.html" : `${urlPath.replace(/^\/|\/$/g, "")}/index.html`;
  const html = readFileSync(path.join(outDir, rel));
  const text = html.toString("utf8");
  let js = 0;
  const files = [];
  for (const match of text.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
    const src = match[1];
    if (/^https?:/i.test(src)) {
      files.push({ src, size: null, thirdParty: true });
      continue;
    }
    const file = path.join(outDir, src.split("?")[0].replace(/^\//, ""));
    const size = existsSync(file) ? statSync(file).size : 0;
    js += size;
    files.push({ src, size, thirdParty: false });
  }
  return { html: html.length, js, files };
}

function exportBytes(dir) {
  let total = 0;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) total += exportBytes(full);
    else total += statSync(full).size;
  }
  return total;
}

function waitForPort() {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const tick = () => {
      const socket = createConnection({ host: "127.0.0.1", port }, () => {
        socket.end();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - started > 10000) reject(new Error("static server did not start"));
        else setTimeout(tick, 100);
      });
    };
    tick();
  });
}

function runCannon(urlPath, options) {
  return new Promise((resolve, reject) => {
    autocannon(
      {
        url: `http://127.0.0.1:${port}${urlPath}`,
        connections: options.connections,
        duration: options.duration,
        overallRate: options.overallRate,
        timeout: 10,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
  });
}

const pages = ["/", "/states/GA/", "/cities/FL/miami-city/"];
console.log("Page weight (files on disk, not compressed):");
for (const page of pages) {
  const row = measure(page);
  console.log(`  ${page} HTML ${kb(row.html)}  first-party JS ${kb(row.js)}`);
  for (const file of row.files) {
    console.log(`    ${file.thirdParty ? "third-party" : kb(file.size)}  ${file.src}`);
  }
}

const server = spawn(
  "python3",
  ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", outDir],
  { stdio: "ignore" },
);

try {
  await waitForPort();
  const targets = ["/", "/states/GA/", "/cities/FL/miami-city/", "/live/", "/live/results.json"];
  console.log("\nLocal autocannon, 10 seconds, 127.0.0.1 only:");
  for (const rate of [1, 3]) {
    console.log(`\n${rate} request/second`);
    for (const target of targets) {
      const result = await runCannon(target, { connections: 5, duration: 10, overallRate: rate });
      console.log(
        `  ${target} p50 ${result.latency.p50} ms  p99 ${result.latency.p99} ms  errors ${result.errors}  non-2xx ${result.non2xx}  requests ${result.requests.total}`,
      );
    }
  }
  console.log("\nUncapped, 10 connections, 8 seconds");
  for (const target of ["/", "/live/", "/live/results.json"]) {
    const result = await runCannon(target, { connections: 10, duration: 8 });
    console.log(
      `  ${target} ${Math.round(result.requests.average)} req/s  p99 ${result.latency.p99} ms  errors ${result.errors}`,
    );
  }
} finally {
  server.kill("SIGTERM");
}

const total = exportBytes(outDir);
const limit = 1024 * 1024 * 1024;
console.log(`\nExport size: ${(total / (1024 * 1024)).toFixed(1)} MiB (${total} bytes)`);
if (total >= limit) {
  console.error("Export is 1 GB or larger.");
  process.exit(1);
}
