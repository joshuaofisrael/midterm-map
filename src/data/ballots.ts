import type { BallotSection, StateCode } from "./types";
import { getState } from "./states";
import { racesForState } from "./races";

const DEMO = true as const;

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
        "Federal offices that may appear depend on the 2026 cycle and your congressional district. This is a structured sample, not your official ballot.",
      contests: [
        senate
          ? {
              id: `${code}-senate`,
              heading: "U.S. Senate",
              kind: "federal",
              raceSlug: senate.slug,
              isDemo: DEMO,
              lines: [
                "Class 2 Senate seat is on the 2026 cycle in this state.",
                "Candidate names below on the race guide are demo placeholders.",
                "Your official ballot lists only qualified nominees.",
              ],
            }
          : {
              id: `${code}-senate-none`,
              heading: "U.S. Senate",
              kind: "federal",
              isDemo: DEMO,
              lines: [
                "No Class 2 (2026) U.S. Senate seat is scheduled for this state.",
                "A special election would appear only if official authorities call one.",
              ],
            },
        {
          id: `${code}-house`,
          heading: house ? `U.S. House (${house.shortTitle} example)` : "U.S. House",
          kind: "federal",
          raceSlug: house?.slug,
          isDemo: DEMO,
          lines: [
            "Your House district is assigned by official maps and your registered address.",
            house
              ? `${house.shortTitle} is a sample district page on this site — not a claim that it is your district.`
              : "Open your county sample ballot for the district number.",
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
              isDemo: DEMO,
              lines: [
                "This state has a 2026 gubernatorial election on the regular calendar.",
                "Lieutenant governor pairing, if any, follows state law and the official ballot.",
              ],
            }
          : {
              id: `${code}-governor-none`,
              heading: "Governor",
              kind: "statewide",
              isDemo: DEMO,
              lines: [
                state?.hasGovernor2026
                  ? "See official sources for this office."
                  : "The governor’s office is not on the regular 2026 ballot in this state.",
              ],
            },
        {
          id: `${code}-other-statewide`,
          heading: "Other statewide offices",
          kind: "statewide",
          isDemo: DEMO,
          lines: [
            "Secretary of state, attorney general, and similar offices vary by state and cycle.",
            "This MVP does not enumerate every row office. Check the official sample ballot.",
          ],
        },
      ],
    },
    {
      kind: "legislature",
      title: "State legislature",
      intro:
        "State Senate and State House / Assembly districts are address-specific. Map the Midterms does not assign your legislative district in this MVP.",
      contests: [
        {
          id: `${code}-leg`,
          heading: "State Senate and State House / Assembly",
          kind: "legislature",
          isDemo: DEMO,
          lines: [
            "District numbers and names appear on your official sample ballot.",
            "Some seats are not on the ballot every cycle.",
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
          isDemo: DEMO,
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
          isDemo: DEMO,
          lines: [
            "If measures qualify, official ballot titles and summaries control.",
            "This section is a reminder to read the official pamphlet or sample ballot.",
            ...(state?.sampleBallotNotes ?? []),
          ],
        },
      ],
    },
  ];
}
