import { CandidateContestList } from "@/components/CandidateContestList";
import { candidateFile, contestsForPlace } from "@/data/candidates/load";
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

  const { contests: allContests, houseBasis } = contestsForPlace(code, place);
  const contests = allContests.filter((contest) => contest.kind === "house");

  return (
    <section>
      <h2>Who is on the ballot</h2>
      <p>
        Statewide contests (U.S. Senate, governor and other statewide offices) are on the{" "}
        <a href={`/ballot/${code}`}>full {code} ballot list</a>. The U.S. House district for this place
        is below; local contests follow.
      </p>      {houseBasis === "bef" ? (
        <p>
          U.S. House contests follow the <a href="/sources/#house-120">120th block assignment</a>.
        </p>
      ) : null}
      {houseBasis === "unchanged" ? (
        <p>
          U.S. House contests follow the <a href="/sources/#house-119">119th district numbers</a>.
        </p>
      ) : null}
      <CandidateContestList contests={contests} variant="city" />
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
