import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { CONTACT_FORM_ACTION, FORMSUBMIT_ALIAS } from "../data/contact.ts";
import { FOOTER_LEGAL_LINKS } from "../data/site.ts";

const INBOX = "joshuaofisrael@gmail.com";

test("contact form posts to the FormSubmit alias, not an inbox", () => {
  assert.equal(CONTACT_FORM_ACTION, `https://formsubmit.co/${FORMSUBMIT_ALIAS}`);
  assert.match(FORMSUBMIT_ALIAS, /^[a-f0-9]{32}$/);
  assert.doesNotMatch(CONTACT_FORM_ACTION, /@/);
  assert.doesNotMatch(CONTACT_FORM_ACTION, /gmail/i);
});

test("contact form source uses the alias constant and a honeypot", () => {
  const source = readFileSync(new URL("../components/ContactForm.tsx", import.meta.url), "utf8");
  assert.match(source, /CONTACT_FORM_ACTION/);
  assert.match(source, /name="_honey"/);
  assert.doesNotMatch(source, /formsubmit\.co\/[^"'`\s]*@/i);
  assert.doesNotMatch(source, new RegExp(INBOX.replace(".", "\\.")));
});

test("shipped source does not include the inbox address", () => {
  const root = new URL("..", import.meta.url);
  const hits: string[] = [];
  for (const dir of ["app", "components", "data", "lib"]) {
    walk(new URL(dir, root).pathname, hits);
  }
  assert.deepEqual(hits, []);
});

function walk(dir: string, hits: string[]) {
  for (const name of readdirSync(dir)) {
    if (name === "contactEndpoint.test.ts") continue;
    const full = path.join(dir, name);
    const info = statSync(full);
    if (info.isDirectory()) {
      walk(full, hits);
      continue;
    }
    if (!/\.(tsx?|jsx?|mjs|css)$/.test(name)) continue;
    if (readFileSync(full, "utf8").includes(INBOX)) hits.push(full);
  }
}

test("shared footer legal links include Contact", () => {
  assert.ok(FOOTER_LEGAL_LINKS.some((item) => item.href === "/contact" && item.label === "Contact"));
});
