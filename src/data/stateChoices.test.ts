import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { STATE_CHOICES } from "./stateChoices.ts";
import { STARTER_STATES } from "./states.ts";

test("state choices match the hub list without the long profiles", () => {
  assert.deepEqual(
    STATE_CHOICES.map((state) => ({ code: state.code, name: state.name })),
    STARTER_STATES.map((state) => ({ code: state.code, name: state.name })),
  );
  const source = readFileSync(new URL("./stateChoices.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /officialElectionOffice|summary:/);
});
