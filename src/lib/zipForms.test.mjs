import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// A ZIP form submitted before hydration does a native GET. Without a name the ZIP is
// not serialised into the query string, so it never reaches the address, host logs, or ad scripts.
test("ZIP forms have no named fields", () => {
  for (const file of ["src/components/BallotLookup.tsx", "src/components/ZipPlaceSearch.tsx"]) {
    const src = readFileSync(file, "utf8");
    assert.doesNotMatch(src, /\bname="(zip|state)"/, file);
  }
});
