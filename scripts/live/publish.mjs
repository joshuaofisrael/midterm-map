/**
 * Copy public/live/results.json onto the live-results branch.
 * The main site is a full static export. Publishing here avoids rebuilding it.
 */

import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;

if (!repo || !token) {
  console.log("GITHUB_REPOSITORY or GITHUB_TOKEN is missing. Skip publish.");
  process.exit(0);
}

const work = path.join(tmpdir(), "live-results-publish");
rmSync(work, { recursive: true, force: true });
// The token goes in a per-command header, not in the remote URL or .git/config.
const remote = `https://github.com/${repo}.git`;
const auth = [
  "-c",
  `http.https://github.com/.extraheader=AUTHORIZATION: basic ${Buffer.from(`x-access-token:${token}`).toString("base64")}`,
];

function git(args, cwd = work) {
  const needsAuth = ["clone", "push", "ls-remote", "fetch"].includes(args[0]);
  execFileSync("git", needsAuth ? [...auth, ...args] : args, { cwd, stdio: "inherit" });
}

let exists = true;
try {
  execFileSync("git", [...auth, "ls-remote", "--exit-code", "--heads", remote, "live-results"], { stdio: "ignore" });
} catch {
  exists = false;
}

if (exists) {
  git(["clone", "--branch", "live-results", "--depth", "1", remote, work], root);
} else {
  mkdirSync(work, { recursive: true });
  git(["init"], work);
  git(["checkout", "-b", "live-results"], work);
}

cpSync(path.join(root, "public/live/results.json"), path.join(work, "results.json"));
git(["add", "results.json"], work);
const status = execFileSync("git", ["status", "--porcelain"], { cwd: work, encoding: "utf8" });
if (!status.trim()) {
  console.log("results.json is unchanged. No commit.");
  process.exit(0);
}
git(["config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], work);
git(["config", "user.name", "github-actions[bot]"], work);
git(["commit", "-m", "Update unofficial election results"], work);
if (!exists) git(["remote", "add", "origin", remote], work);
git(["push", "origin", "HEAD:live-results"], work);
console.log("Pushed live-results.");
