/**
 * Original editorial copy. A paragraph is a list of strings and links so a
 * source can sit on the words it supports. Word counts use the visible label,
 * not the URL.
 */

export type Inline = string | { t: string; href: string };

export type EssaySource = {
  name: string;
  url: string;
};

export type Essay = {
  /** Site path, no trailing slash. Home is "/". */
  path: string;
  kicker: string;
  title: string;
  /** Long date stored with the section. Also feeds the page "Last updated" line. */
  updated: string;
  paragraphs: Inline[][];
  related: { href: string; label: string }[];
  sources: EssaySource[];
};

/** Day these explainers and previews were written. */
export const ESSAY_UPDATED = "October 27, 2026";

export function inlineText(parts: Inline[]): string {
  return parts.map((part) => (typeof part === "string" ? part : part.t)).join("");
}

export function essayPlainText(essay: Pick<Essay, "paragraphs">): string {
  return essay.paragraphs.map((paragraph) => inlineText(paragraph)).join("\n");
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function essayWordCount(essay: Pick<Essay, "paragraphs">): number {
  return countWords(essayPlainText(essay));
}

/** Parse `[label](href)` into inline parts. The label is the visible text. */
export function rich(input: string): Inline[] {
  const parts: Inline[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of input.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(input.slice(last, index));
    parts.push({ t: match[1], href: match[2] });
    last = index + match[0].length;
  }
  if (last < input.length) parts.push(input.slice(last));
  return parts.length > 0 ? parts : [input];
}
