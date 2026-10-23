import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { CONTACT_FORM_ACTION, FORMSUBMIT_ALIAS } from "../data/contact.ts";
import { FOOTER_LEGAL_LINKS } from "../data/site.ts";

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
  assert.doesNotMatch(source, /joshuaofisrael@gmail\.com/);
});

test("shared footer legal links include Contact", () => {
  assert.ok(FOOTER_LEGAL_LINKS.some((item) => item.href === "/contact" && item.label === "Contact"));
});
