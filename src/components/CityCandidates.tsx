import { contestsForPlace, candidateFile } from "@/data/candidates/load";
import type { PlaceRecord } from "@/data/places/load";

export function CityCandidates({ code, place }: { code: string; place: PlaceRecord }) {
  const file = candidateFile(code);
  if (!file) return null;

  if (file.status === "unpublished") {
    return (
      <section>
        <h2>Who is on the ballot</h2>
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
      <h2>Who is on the ballot</h2>
      <p>
        U.S. Senate, governor, other statewide offices, and U.S. House contests are listed when
        the stored official list includes them and the district number matches this place. State
        legislative districts are not in the place file, so those contests are not listed here.
        Local contests from an official city or county list are in the next section when this
        site has that list.
      </p>
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
