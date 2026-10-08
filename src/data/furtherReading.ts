/**
 * Nonpartisan civics and elections reading list for the "Further reading" box.
 * Titles, authors, and ISBN-13s were checked against Open Library on October 8, 2026.
 * Chosen for balance: founding-era arguments on both sides, classic political
 * science, and histories of the Constitution and the Electoral College.
 */
export type ReadingItem = {
  title: string;
  authors: string;
  note: string;
  isbn13: string;
};

export const FURTHER_READING: ReadingItem[] = [
  {
    title: "The Federalist Papers",
    authors: "Alexander Hamilton, James Madison, and John Jay",
    note: "The 1787–88 essays arguing for ratification of the Constitution.",
    isbn13: "9780451528810",
  },
  {
    title: "The Anti-Federalist Papers and the Constitutional Convention Debates",
    authors: "Ralph Ketcham (editor)",
    note: "The opposing case against ratification, with convention notes.",
    isbn13: "9780451528841",
  },
  {
    title: "Democracy in America",
    authors: "Alexis de Tocqueville",
    note: "A classic 1830s study of American democratic life and institutions.",
    isbn13: "9780140447606",
  },
  {
    title: "America’s Constitution: A Biography",
    authors: "Akhil Reed Amar",
    note: "A clause-by-clause history of how the Constitution was written and amended.",
    isbn13: "9780812972726",
  },
  {
    title: "Why Do We Still Have the Electoral College?",
    authors: "Alexander Keyssar",
    note: "A history of the Electoral College and two centuries of debate over it.",
    isbn13: "9780674660151",
  },
  {
    title: "Congress: The Electoral Connection",
    authors: "David R. Mayhew",
    note: "A political science classic on how elections shape what members of Congress do.",
    isbn13: "9780300105872",
  },
];

/** ISBN-13 (978 prefix) to ISBN-10, which Amazon uses as the book ASIN. */
export function isbn10From13(isbn13: string): string | null {
  if (!/^978\d{10}$/.test(isbn13)) return null;
  const core = isbn13.slice(3, 12);
  let sum = 0;
  for (let i = 0; i < 9; i += 1) sum += (10 - i) * Number(core[i]);
  const check = (11 - (sum % 11)) % 11;
  return core + (check === 10 ? "X" : String(check));
}
