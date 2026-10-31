import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Byline } from "@/components/Byline";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contentUpdatedLabel } from "@/lib/contentDate";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How to watch election night 2026: TV start times",
  description:
    "Start times for election night coverage of the November 3, 2026 midterms on NBC, CBS, ABC, CNN, Fox News, MS Now, C-SPAN, NewsNation, and BBC News, in Eastern time and UK time.",
  path: "/election-night-tv",
});

const TV_INSIDER = {
  name: "TV Insider, “Election Night 2026: How to Watch the Midterm Results Live” (October 30, 2026)",
  url: "https://www.tvinsider.com/1300360/election-night-2026-how-to-watch-midterm-results/",
};

type Row = {
  network: string;
  program: string;
  et: string;
  uk: string;
  notes: string;
  source: { name: string; url: string };
};

/** UK on GMT from October 25 and US on EST from November 1, so UK time = ET + 5 hours. */
const ROWS: Row[] = [
  {
    network: "CNN",
    program: "Election Night in America",
    et: "4 p.m. Tue",
    uk: "9 p.m. Tue",
    notes: "Jake Tapper and Anderson Cooper anchor from Washington. John Berman and Kate Bolduan take over from New York at 2 a.m. ET (7 a.m. UK).",
    source: TV_INSIDER,
  },
  {
    network: "C-SPAN",
    program: "Election night results",
    et: "4 p.m. Tue",
    uk: "9 p.m. Tue",
    notes: "C-SPAN carries results and candidate speeches without commercials. C-SPAN2 and C-SPAN3 carry two outside live shows.",
    source: TV_INSIDER,
  },
  {
    network: "NBC",
    program: "Decision ’26",
    et: "5 p.m. Tue to 6 a.m. Wed",
    uk: "10 p.m. Tue to 11 a.m. Wed",
    notes: "Most local NBC stations join at 6:30 p.m. ET (11:30 p.m. UK). Peacock coverage also starts at 5 p.m. ET, with a multiview screen from 5:30 p.m. ET.",
    source: {
      name: "NBC News press release (October 22, 2026)",
      url: "https://nbcuniversalnewsgroup.com/nbcnews/2026/10/22/decision-26-nbc-news-presents-its-most-extensive-midterm-election-coverage-ever-with-record-13-hours-of-live-broadcast-programming-and-24-7-updates-and-analysis-across-dig/",
    },
  },
  {
    network: "CBS News (streaming)",
    program: "Election 2026: The Nerd Show",
    et: "5 p.m. Tue",
    uk: "10 p.m. Tue",
    notes: "A results and data program on CBS News digital platforms, ahead of the network broadcast.",
    source: TV_INSIDER,
  },
  {
    network: "Fox News Channel",
    program: "FOX News Democracy 26",
    et: "6 p.m. Tue",
    uk: "11 p.m. Tue",
    notes: "Bret Baier and Martha MacCallum anchor. Fox Business simulcasts from 6 p.m. ET Tuesday to 6 a.m. ET Wednesday (11 a.m. UK).",
    source: {
      name: "Fox News Media press release (October 22, 2026)",
      url: "https://www.foxnews.com/press/2026/10/fox-news-media-to-present-live-multiplatform-coverage-surrounding-the-2026-midterm-elections",
    },
  },
  {
    network: "MS Now",
    program: "We the People",
    et: "6 p.m. Tue",
    uk: "11 p.m. Tue",
    notes: "Rachel Maddow leads. A late team takes over at 2 a.m. ET (7 a.m. UK).",
    source: TV_INSIDER,
  },
  {
    network: "BBC News",
    program: "US midterms coverage",
    et: "6:30 p.m. Tue",
    uk: "11:30 p.m. Tue",
    notes: "Clive Myrie presents from Washington.",
    source: TV_INSIDER,
  },
  {
    network: "ABC",
    program: "ABC News Election Night: Vote 2026",
    et: "7 p.m. Tue to 2 a.m. Wed",
    uk: "Midnight to 7 a.m. Wed",
    notes: "David Muir anchors.",
    source: TV_INSIDER,
  },
  {
    network: "CBS",
    program: "America Decides: Election 2026",
    et: "7 p.m. Tue",
    uk: "Midnight Wed",
    notes: "Tony Dokoupil and Norah O’Donnell anchor.",
    source: TV_INSIDER,
  },
  {
    network: "NewsNation",
    program: "Decision Desk 2026: Election Night in America",
    et: "7 p.m. Tue",
    uk: "Midnight Wed",
    notes: "Race calls come from Decision Desk HQ.",
    source: TV_INSIDER,
  },
];

export default function ElectionNightTvPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Live results", path: "/live" },
          { name: "How to watch election night", path: "/election-night-tv" },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/live", label: "Live results" },
          { label: "How to watch election night" },
        ]}
      />
      <PageHeader
        eyebrow="Election night"
        title="How to watch election night 2026"
        lede="When each TV network and stream starts its coverage of the Tuesday, November 3, 2026 midterm elections. Times are Eastern (ET), with UK time alongside."
      >
        <Byline />
      </PageHeader>
      <ContentTrust updated={contentUpdatedLabel("/election-night-tv")} pagePath="/election-night-tv" />

      <section className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Times at a glance</h2>
        <p className="mt-2">
          US clocks go back on Sunday, November 1, so election night runs on Eastern Standard Time.
          UK readers on GMT should add five hours to each Eastern time. Coverage that starts at 7
          p.m. ET begins at midnight in London.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2 pr-3">Network</th>
                <th className="py-2 pr-3">Program</th>
                <th className="py-2 pr-3">Starts (ET)</th>
                <th className="py-2 pr-3">UK (GMT)</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.network} className="border-b border-line align-top">
                  <td className="py-2 pr-3 font-medium">{row.network}</td>
                  <td className="py-2 pr-3">{row.program}</td>
                  <td className="py-2 pr-3">{row.et}</td>
                  <td className="py-2 pr-3">{row.uk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Network by network</h2>
        {ROWS.map((row) => (
          <div key={row.network} className="rounded-xl border border-line bg-paper-card p-4">
            <h3 className="font-semibold">
              {row.network}: {row.program}
            </h3>
            <p className="mt-1">
              {row.et} ET ({row.uk} UK). {row.notes}
            </p>
            <p className="mt-1 text-ink-muted">
              Source:{" "}
              <a className="text-navy underline" href={row.source.url} rel="noopener noreferrer">
                {row.source.name}
              </a>
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Before you tune in</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Schedules can change on the night. Check the network’s own listings before you watch.</li>
          <li>
            Networks make their own race projections. Those calls are not official results. States
            count and certify the votes, often days or weeks later.
          </li>
          <li>
            Poll closing times are set by each state. The first polls close at 6 p.m. local time in
            parts of Indiana and Kentucky.
          </li>
          <li>Streaming options and prices vary by provider. We list only what the networks have announced.</li>
        </ul>
        <p className="mt-3">
          Unofficial figures from state election offices appear on our{" "}
          <Link className="font-medium text-navy underline" href="/live">
            election night results page
          </Link>{" "}
          after polls close, and race by race on the{" "}
          <Link className="font-medium text-navy underline" href="/results">
            results tracker
          </Link>
          . Map the Midterms does not call races.
        </p>
      </section>

      <section className="text-sm leading-6 text-ink-muted">
        <h2 className="font-serif text-lg font-semibold text-ink">Sources</h2>
        <p className="mt-2">
          NBC and Fox News times are from those networks’ own announcements. The other times are as
          reported by{" "}
          <a className="text-navy underline" href={TV_INSIDER.url} rel="noopener noreferrer">
            TV Insider
          </a>{" "}
          on October 30, 2026. CNN also posted its plans in the{" "}
          <a
            className="text-navy underline"
            href="https://cnnpressroom.blogs.cnn.com/2026/10/28/cnn-to-provide-immersive-multi-platform-coverage-of-the-2026-midterm-elections/"
            rel="noopener noreferrer"
          >
            CNN Pressroom
          </a>
          .
        </p>
      </section>
    </div>
  );
}
