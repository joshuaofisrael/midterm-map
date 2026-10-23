/**
 * Fail the build if the public inbox address is present anywhere in out/.
 * README, docs, and local scripts may still name it. The shipped site may not.
 */
import { spawnSync } from "node:child_process";

const needle = "joshuaofisrael@gmail.com";
const result = spawnSync("grep", ["-R", "-I", "-F", "-l", needle, "out"], { encoding: "utf8" });

if (result.status === 0) {
  console.error("inbox address found in the export:");
  console.error(result.stdout.trim());
  process.exit(1);
}

if (result.status === 1) {
  console.log("export: inbox address not present");
  process.exit(0);
}

console.error(result.stderr || `grep exited ${result.status}`);
process.exit(result.status ?? 1);
