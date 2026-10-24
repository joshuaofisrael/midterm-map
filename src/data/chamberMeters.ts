import type { ChamberMeter } from "./types";

export const HOUSE_METER: ChamberMeter = {
  chamber: "house",
  title: "U.S. House control",
  seats: 435,
  majority: 218,
  demSeats: null,
  repSeats: null,
  otherSeats: null,
  note: "Awaiting unofficial returns. Majority line (218) is a structural fact about the House, not a forecast. Map the Midterms does not certify results.",
};

export const SENATE_METER: ChamberMeter = {
  chamber: "senate",
  title: "U.S. Senate control",
  seats: 100,
  majority: 51,
  demSeats: null,
  repSeats: null,
  otherSeats: null,
  note: "Awaiting unofficial returns. 51 is shown as a simple majority marker, not a prediction. Ties and the vice presidency are constitutional facts, not called here.",
};
