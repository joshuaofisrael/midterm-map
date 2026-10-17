import { SourceLines, uniqueCitations } from "@/components/SourceLines";
import {
  ballotExtra,
  contestsForDistricts,
  sldFor,
  type BallotAnnotation,
  type BallotContest,
} from "@/data/ballot/load";
import {
  amendment17Citation,
  constitutionCitation,
  uscSection1Citation,
  uscSection7Citation,
} from "@/data/ballotSources";
import { contestsForPlace, candidateFile, type CandidateContest } from "@/data/candidates/load";
import {
  cd120BefCitation,
  congressionalBoundariesCitation,
  countyCitation,
  districtCitation,
  sldLowerCitation,
  sldUpperCitation,
} from "@/data/censusSources";
import { COUNTY_DIRECTORIES } from "@/data/countyDirectories";
import { electionOfficeFor } from "@/data/electionOffices";
import type { PlaceRecord } from "@/data/places/load";
import type { Citation } from "@/data/types";

const READ = "October 17, 2026";

export function CityBallot({ code, place }: { code: string; place: PlaceRecord }) {
  const file = candidateFile(code);
  if (!file) return null;
  const extra = ballotExtra(code);
  const sld = sldFor(place.geoid);
  const { contests, houseBasis } = contestsForPlace(code, place);
  const house = contests.filter((contest) => contest.kind === "house");
  const senate = contests.filter((contest) => contest.kind === "senate");
  const governor = contests.filter((contest) => contest.kind === "governor");
  const upper = contestsForDistricts(extra?.upper, sld?.u);
  const lower = contestsForDistricts(extra?.lower, sld?.l);
  const local = extra?.local?.[place.geoid] ?? [];
  const directory = COUNTY_DIRECTORIES[code];
  const office = electionOfficeFor(code);
  const sources: Citation[] = [...file.sources];
  if (house.length > 0 && houseBasis === "bef") sources.push(cd120BefCitation, countyCitation);
  if (house.length > 0 && houseBasis === "unchanged") sources.push(congressionalBoundariesCitation, districtCitation);
  if (house.length > 0 || file.status === "unpublished") sources.push(uscSection7Citation);
  if (house.length > 0 || (file.status === "unpublished" && code !== "DC" && code !== "PR")) {
    sources.push(constitutionCitation);
  }
  if (senate.length > 0) sources.push(amendment17Citation, uscSection1Citation);
  if (sld?.u?.length) sources.push(sldUpperCitation);
  if (sld?.l?.length) sources.push(sldLowerCitation);
  if (!sld) sources.push(sldUpperCitation, sldLowerCitation);
  if (local.length === 0) {
    if (directory) {
      sources.push({ name: directory.label, url: directory.href, accessed: READ });
    } else {
      sources.push({ name: office.office.label, url: office.office.href, accessed: READ });
    }
  }

  const showFederalRule = house.length > 0 || file.status === "unpublished";

  return (
    <section className="max-w-3xl">
      <h2 className="font-serif text-2xl font-semibold">2026 ballot</h2>
      {extra?.date ? <p className="mt-4 text-sm leading-6">{extra.date.text}</p> : null}
      {file.status === "unpublished" ? (
        <p className="mt-4 text-sm leading-6">Official candidate list not yet published</p>
      ) : (
        <p className="mt-4 text-sm leading-6">
          For a state or local contest in this section that does not print a term, the sources read
          do not state the term length. Where a contest does not label an incumbent, the list does
          not label an incumbent and does not state that the seat is open. The sources read do not
          describe the duties of state or local offices in this section.
        </p>
      )}

      {showFederalRule ? (
        <FederalRule code={code} hasHouseContest={house.length > 0} unpublished={file.status === "unpublished"} />
      ) : null}
      {houseBasis === "bef" && house.length > 0 ? (
        <p className="mt-4 text-sm leading-6">
          U.S. House contests below are the ones on the official list for each 120th Congressional
          District whole-block assignment that covers this place.
        </p>
      ) : null}
      {houseBasis === "unchanged" && house.length > 0 ? (
        <p className="mt-4 text-sm leading-6">
          U.S. House contests below are the ones on the official list for each 119th Congress
          district number in the relationship file for this place. The Census Bureau states that
          this jurisdiction&apos;s congressional boundaries had no changes from the 2024 cycle for
          the 2026 election.
        </p>
      ) : null}
      {house.map((contest) => (
        <ContestBlock key={contest.office} code={code} contest={fromCandidate(contest)} note={extra?.annotations[contest.office]} />
      ))}

      {senate.length > 0 ? (
        <p className="mt-4 text-sm leading-6">
          The Seventeenth Amendment states that the Senate is composed of two Senators from each
          state, elected by the people thereof, for six years. 2 U.S.C. § 1 states that a United
          States Senator is elected at the regular election, next preceding the expiration of the
          term, at which a Representative to Congress is regularly by law to be chosen.
        </p>
      ) : null}
      {senate.map((contest) => (
        <ContestBlock key={contest.office} code={code} contest={fromCandidate(contest)} note={extra?.annotations[contest.office]} />
      ))}
      {governor.map((contest) => (
        <ContestBlock key={contest.office} code={code} contest={fromCandidate(contest)} note={extra?.annotations[contest.office]} />
      ))}
      {extra?.statewide.map((contest) => (
        <ContestBlock key={contest.office} code={code} contest={contest} />
      ))}

      <LegislativeNames geoid={place.geoid} upper={sld?.u} lower={sld?.l} />
      {upper.length + lower.length > 0 ? (
        <p className="mt-4 text-sm leading-6">
          The official list includes the following contests for district numbers that match the
          Census names above.
        </p>
      ) : null}
      {[...upper, ...lower].map((contest) => (
        <ContestBlock key={contest.office} code={code} contest={contest} />
      ))}

      {local.length > 0 ? (
        <>
          <h3 className="mt-6 text-base font-semibold">Local races</h3>
          {local.map((contest) => (
            <ContestBlock key={`${contest.office}-${contest.district ?? ""}`} code={code} contest={contest} local />
          ))}
        </>
      ) : (
        <LocalFallback code={code} counties={place.counties} />
      )}

      <p className="mt-4 text-sm leading-6">
        The sources read do not state the page where official results will be posted.
      </p>
      <SourceLines sources={uniqueCitations(sources)} />
    </section>
  );
}

function FederalRule({
  code,
  hasHouseContest,
  unpublished,
}: {
  code: string;
  hasHouseContest: boolean;
  unpublished: boolean;
}) {
  if (code === "PR") {
    return (
      <p className="mt-4 text-sm leading-6">
        The Census district name for this place, when the relationship file has one, is on this
        page under Census facts. The sources read do not describe the Resident Commissioner&apos;s
        duties or term. 2 U.S.C. § 7, as read, sets an election day for Representatives and
        Delegates and does not name the Resident Commissioner.
      </p>
    );
  }
  if (code === "DC") {
    return (
      <p className="mt-4 text-sm leading-6">
        2 U.S.C. § 7 establishes the Tuesday next after the first Monday in November, in every
        even-numbered year, as the day for the election of Representatives and Delegates to the
        Congress. The sources read do not describe the Delegate&apos;s duties or term.
      </p>
    );
  }
  if (!hasHouseContest && !unpublished) return null;
  return (
    <p className="mt-4 text-sm leading-6">
      The Constitution vests the legislative powers it grants in a Congress consisting of a Senate
      and a House of Representatives. It states that the House is composed of Members chosen every
      second year by the people of the several states. 2 U.S.C. § 7 establishes the Tuesday next
      after the first Monday in November, in every even-numbered year, as the day for the election
      of Representatives and Delegates to the Congress.
    </p>
  );
}

function fromCandidate(contest: CandidateContest): BallotContest {
  return {
    office: contest.office,
    key: contest.district,
    candidates: contest.candidates,
  };
}

function ContestBlock({
  code,
  contest,
  note,
  local,
}: {
  code: string;
  contest: BallotContest;
  note?: BallotAnnotation;
  local?: boolean;
}) {
  const term = note?.term || contest.term;
  const incumbentLine = note?.incumbentLine || contest.incumbentLine;
  const marks = note?.marks?.length
    ? note.marks
    : contest.candidates.filter((candidate) => candidate.mark);
  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold">{contest.office}</h3>
      {local && contest.district ? (
        <p className="mt-2 text-sm leading-6">District column: {contest.district}.</p>
      ) : null}
      {term ? (
        <p className="mt-2 text-sm leading-6">
          {code === "NE" ? "The list's Term column prints" : "The list's Office Term column prints"} {term}.
        </p>
      ) : null}
      {contest.seats ? (
        <p className="mt-2 text-sm leading-6">The list&apos;s Number of Seats column prints {contest.seats}.</p>
      ) : null}
      {incumbentLine ? (
        <p className="mt-2 text-sm leading-6">The list prints Incumbent: {incumbentLine}.</p>
      ) : null}
      {marks.length > 0 ? (
        <p className="mt-2 text-sm leading-6">
          The list&apos;s {code === "NE" ? "Incumbency Status" : "Incumbent"} column prints{" "}
          {marks.map((mark) => `${mark.name} ${mark.mark}`).join("; ")}.
        </p>
      ) : null}
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6">
        {contest.candidates.map((candidate, index) => (
          <li key={`${index}-${candidate.name}-${candidate.party}`}>
            {candidate.party ? `${candidate.name} — ${candidate.party}` : candidate.name}
          </li>
        ))}
      </ol>
    </div>
  );
}

function LegislativeNames({
  geoid,
  upper,
  lower,
}: {
  geoid: string;
  upper?: string[];
  lower?: string[];
}) {
  if (!upper?.length && !lower?.length) {
    return (
      <p className="mt-4 text-sm leading-6">
        The 2024 state legislative district relationship files do not include place code {geoid}.
      </p>
    );
  }
  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold">Census state legislative districts</h3>
      <p className="mt-2 text-sm leading-6">
        The 2024 relationship files assign this place, counting only overlaps with land area
        greater than zero. A name in the file is not, by itself, a statement that the seat is on
        the 2026 ballot.
      </p>
      {upper?.length ? (
        <p className="mt-2 text-sm leading-6">Upper chamber: {upper.join("; ")}.</p>
      ) : null}
      {lower?.length ? (
        <p className="mt-2 text-sm leading-6">Lower chamber: {lower.join("; ")}.</p>
      ) : null}
    </div>
  );
}

function LocalFallback({ code, counties }: { code: string; counties: string[] }) {
  const directory = COUNTY_DIRECTORIES[code];
  const office = electionOfficeFor(code);
  const countyLabel = counties.length > 1 ? "Census counties" : "Census county";
  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold">Local races</h3>
      <p className="mt-2 text-sm leading-6">Local races: no official listing found yet</p>
      <p className="mt-2 text-sm leading-6">
        {countyLabel}: {counties.join("; ")}.{" "}
        {directory ? (
          <>
            <a className="text-navy hover:underline" href={directory.href}>
              {directory.label}
            </a>
            .
          </>
        ) : (
          <>
            No county election-office page was read for {counties.length > 1 ? "these counties" : "this county"}.{" "}
            <a className="text-navy hover:underline" href={office.office.href}>
              {office.office.label}
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}
