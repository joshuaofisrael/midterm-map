"use client";

import { useEffect, useState } from "react";
import { HOUSE_METER, SENATE_METER } from "@/data/chamberMeters";
import { chamberCounts, subscribeLive, type LiveSnapshot } from "@/lib/liveFeed";
import { ControlMeter } from "./ControlMeter";

/** House and Senate needles. They read the same static JSON as the live results list. */
export function LiveNeedles() {
  const [snapshot, setSnapshot] = useState<LiveSnapshot>({ payload: null, now: null, stale: false });

  useEffect(() => subscribeLive(setSnapshot), []);

  const chambers = snapshot.payload?.chambers;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ControlMeter meter={HOUSE_METER} counts={chamberCounts(chambers?.house)} />
      <ControlMeter meter={SENATE_METER} counts={chamberCounts(chambers?.senate)} />
    </div>
  );
}
