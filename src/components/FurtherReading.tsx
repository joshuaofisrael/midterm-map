import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AFFILIATE, affiliateEnabled } from "@/data/monetization";
import { FURTHER_READING, isbn10From13 } from "@/data/furtherReading";

function amazonUrl(isbn13: string): string | null {
  const tag = AFFILIATE.amazonTag.trim();
  const asin = isbn10From13(isbn13);
  if (!tag || !asin) return null;
  return `https://www.amazon.com/dp/${asin}/?tag=${encodeURIComponent(tag)}`;
}

function bookshopUrl(isbn13: string): string | null {
  const id = AFFILIATE.bookshopId.trim();
  if (!id) return null;
  return `https://bookshop.org/a/${encodeURIComponent(id)}/${isbn13}`;
}

/**
 * Nonpartisan civics reading list with affiliate links. Renders nothing until
 * an Amazon tag or Bookshop.org id is set in src/data/monetization.ts.
 */
export function FurtherReading() {
  if (!affiliateEnabled()) return null;
  return (
    <section
      id="further-reading"
      aria-labelledby="further-reading-heading"
      className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6"
    >
      <h2 id="further-reading-heading" className="font-serif text-lg font-semibold">
        Further reading
      </h2>
      <p className="mt-1 text-ink-muted">
        Books on the Constitution, elections, and Congress, chosen to cover more than one point of
        view. Listing a book is not an endorsement of its arguments.
      </p>
      <div className="mt-3">
        <AffiliateDisclosure />
      </div>
      <ul className="mt-3 space-y-3">
        {FURTHER_READING.map((book) => {
          const amazon = amazonUrl(book.isbn13);
          const bookshop = bookshopUrl(book.isbn13);
          return (
            <li key={book.isbn13}>
              <p>
                <cite className="font-semibold not-italic">{book.title}</cite>, {book.authors}
              </p>
              <p className="text-ink-muted">{book.note}</p>
              <p className="mt-1 flex gap-3">
                {bookshop && (
                  <a className="text-navy hover:underline" href={bookshop} rel="sponsored noopener" target="_blank">
                    Bookshop.org
                  </a>
                )}
                {amazon && (
                  <a className="text-navy hover:underline" href={amazon} rel="sponsored noopener" target="_blank">
                    Amazon
                  </a>
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
