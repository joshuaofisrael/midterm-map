import { contestsForPlace, candidateFile } from "@/data/candidates/load";
import type { PlaceRecord } from "@/data/places/load";

export function CityCandidates({ code, place }: { code: string; place: PlaceRecord }) {
  const file = candidateFile(code);
  if (!file) return null;

  if (file.status === "unpublished") {
    return (
      <section>
        <h2>2026 general election candidates</h2>
        <p>
          Candidates for this state are not yet listed on this site. Check the official state
          election office below.
        </p>
      </section>
    );
  }

  const { contests, houseBasis } = contestsForPlace(code, place);

  return (
    <section>
      <h2>2026 general election candidates</h2>
      {houseBasis === "bef" ? (
        <p>
          U.S. House contests follow the <a href="/sources/#house-120">120th block assignment</a>.
        </p>
      ) : null}
      {houseBasis === "unchanged" ? (
        <p>
          U.S. House contests follow the <a href="/sources/#house-119">119th district numbers</a>.
        </p>
      ) : null}
      {contests.map((contest) => (
        <div key={`${contest.kind}-${contest.district ?? "statewide"}-${contest.office}`}>
          <h3>{contest.office}</h3>
          <ol>
            {contest.candidates.map((candidate, index) => (
              <li key={`${index}-${candidate.name}-${candidate.party}`}>
                {candidate.party ? `${candidate.name} — ${candidate.party}` : candidate.name}
              </li>
            ))}
          </ol>
        </div>
      ))}
      {file.sources.map((item) => (
        <p key={item.url}>
          Source:{" "}
          <a href={item.url} rel="noopener noreferrer">
            {item.name}
          </a>
          {item.accessed ? ` · accessed ${item.accessed}` : ""}
        </p>
      ))}
    </section>
  );
}
