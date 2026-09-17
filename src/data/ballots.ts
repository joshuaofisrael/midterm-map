import type { BallotSection, StateCode } from "./types";
import { getState } from "./states";
import { racesForState } from "./races";

export function ballotSectionsForState(code: StateCode): BallotSection[] {
  const state = getState(code);
  const races = racesForState(code);
  const senate = races.find((race) => race.chamber === "senate");
  const governor = races.find((race) => race.chamber === "governor");
  const house = races.find((race) => race.chamber === "house");

  return [
    {
      kind: "federal",
      title: "Federal contests",
      intro:
        "Federal offices that appear depend on the 2026 cycle and your congressional district. This is a structured sketch of offices that are on the regular calendar — not your official ballot.",
      contests: [
        senate
          ? {
              id: `${code}-senate`,
              heading: "U.S. Senate (Class 2)",
              kind: "federal",
              raceSlug: senate.slug,
              lines: [
                "This state has a Class 2 U.S. Senate election on the regular 2026 cycle.",
                `Major-party nominees reported as of mid-September 2026 are listed on the ${senate.shortTitle} race guide.`,
                "Your official sample ballot lists only candidates qualified by election authorities.",
              ],
            }
          : {
              id: `${code}-senate-none`,
              heading: "U.S. Senate",
              kind: "federal",
              lines: [
                "No Class 2 (2026) U.S. Senate seat is scheduled for this state.",
                "A special election would appear only if official authorities call one.",
              ],
            },
        {
          id: `${code}-house`,
          heading: house ? `U.S. House (see ${house.shortTitle} example)` : "U.S. House",
          kind: "federal",
          raceSlug: house?.slug,
          lines: [
            "Your House district is assigned by official maps and your registered address.",
            house
              ? `${house.shortTitle} is one district this site covers in depth. It is not a claim that it is your district.`
              : "Open your county sample ballot for the district number.",
            "Use House.gov’s official lookup or your election office to confirm the district printed for your address.",
          ],
        },
      ],
    },
    {
      kind: "statewide",
      title: "Statewide offices",
      intro:
        "Governors and other statewide constitutional offices appear only when the office is on this cycle and the candidate is qualified.",
      contests: [
        governor
          ? {
              id: `${code}-governor`,
              heading: "Governor",
              kind: "statewide",
              raceSlug: governor.slug,
              lines: [
                "This state has a 2026 gubernatorial election on the regular calendar.",
                "Lieutenant-governor pairing, if any, follows state law and the official ballot.",
                `Declared major-party nominees as of mid-September 2026 are listed on the ${governor.shortTitle} race guide.`,
              ],
            }
          : {
              id: `${code}-governor-none`,
              heading: "Governor",
              kind: "statewide",
              lines: [
                state?.hasGovernor2026
                  ? "See official sources for this office."
                  : "The governor’s office is not on the regular 2026 ballot in this state.",
              ],
            },
        {
          id: `${code}-other-statewide`,
          heading: "Other statewide offices on the 2026 cycle",
          kind: "statewide",
          lines: state?.statewideOffices2026.length
            ? [
                `Offices commonly on this state’s 2026 statewide ballot include: ${state.statewideOffices2026.join("; ")}.`,
                "Not every office appears in every precinct, and vacancy or special elections can change the list.",
                "Check the official sample ballot for the qualified names in each office.",
              ]
            : [
                "Secretary of state, attorney general, and similar offices vary by state and cycle.",
                "Check the official sample ballot for every row office.",
              ],
        },
      ],
    },
    {
      kind: "legislature",
      title: "State legislature",
      intro:
        "State Senate and State House / Assembly districts are address-specific. Map the Midterms does not assign your legislative district.",
      contests: [
        {
          id: `${code}-leg`,
          heading: "State Senate and State House / Assembly",
          kind: "legislature",
          lines: [
            "District numbers and names appear on your official sample ballot.",
            "Some seats are not on the ballot every cycle (staggered Senate terms, for example).",
          ],
        },
      ],
    },
    {
      kind: "local",
      title: "County, city, school, and judicial",
      intro:
        "Local contests are the most variable part of a ballot. This site does not collect your address or precinct.",
      contests: [
        {
          id: `${code}-local`,
          heading: "Local and judicial contests",
          kind: "local",
          lines: [
            "County commission, mayor, school board, and judicial races depend on your jurisdiction.",
            "Your county or municipal election office publishes the list that applies to you.",
          ],
        },
      ],
    },
    {
      kind: "measures",
      title: "Ballot measures",
      intro:
        "Initiatives, referenda, amendments, and local questions appear only if they are certified for your ballot. We do not reprint unofficial measure text as if it were certified.",
      contests: [
        {
          id: `${code}-measures`,
          heading: "Statewide and local questions",
          kind: "measures",
          lines: [
            "If measures qualify, official ballot titles and summaries control.",
            "Read the official pamphlet or sample ballot issued by your election office.",
            ...(state?.sampleBallotNotes ?? []),
          ],
        },
      ],
    },
  ];
}
