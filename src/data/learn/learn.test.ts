import assert from "node:assert/strict";
import test from "node:test";
import { LEARN_ARTICLES } from "./articles.ts";
import { essayWordCount } from "../essays/text.ts";
import { learnArticleJsonLd } from "../../lib/learnSchema.ts";

const BANNED = [/will win/i, /going to win/i, /we predict/i, /projected winner/i, /Joshua Israel/];

test("learn library is 10 to 20 original explainers", () => {
  assert.ok(LEARN_ARTICLES.length >= 10);
  assert.ok(LEARN_ARTICLES.length <= 20);
  const slugs = new Set(LEARN_ARTICLES.map((article) => article.slug));
  assert.equal(slugs.size, LEARN_ARTICLES.length);
});

test("each explainer is 300 to 600 words, with a short description and real sources", () => {
  for (const article of LEARN_ARTICLES) {
    const words = essayWordCount(article);
    assert.ok(words >= 300 && words <= 600, `${article.slug} is ${words} words`);
    assert.ok(article.description.length <= 160, `${article.slug} description is ${article.description.length}`);
    assert.ok(article.sources.length >= 2, article.slug);
    assert.ok(article.faqs.length >= 2, article.slug);
    for (const slug of article.related) {
      assert.ok(LEARN_ARTICLES.some((item) => item.slug === slug), `${article.slug} related ${slug}`);
    }
    const plain = JSON.stringify(article);
    for (const pattern of BANNED) assert.equal(pattern.test(plain), false, `${article.slug} ${pattern}`);
  }
});

test("explainer schema names the editorial team and not a person", () => {
  const data = learnArticleJsonLd(LEARN_ARTICLES[0]);
  const article = data["@graph"].find((node) => node["@type"] === "Article");
  assert.ok(article);
  const author = article.author as { name: string; "@type": string };
  assert.equal(author.name, "Map the Midterms Editorial Team");
  assert.equal(author["@type"], "Organization");
  assert.equal(JSON.stringify(data).includes("Person"), false);
  assert.equal(article?.dateModified, "2026-10-27");
});
