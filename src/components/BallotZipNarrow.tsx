"use client";

import { useEffect, useState } from "react";
import { districtNumber } from "@/data/candidates/district";

type PlaceHit = [string, string, string];
type DistrictHit = [string, string];
type ZipRow = { p?: PlaceHit[]; d?: DistrictHit[] };

function zipFromHash(): string {
  const raw = window.location.hash.replace(/^#/, "");
  const zip = new URLSearchParams(raw).get("zip") ?? "";
  return zip.replace(/\D/g, "").slice(0, 5);
}

/**
 * Hides U.S. House and local blocks that the Census ZCTA file does not list for
 * the ZIP in the address hash. The ZIP stays in the browser.
 */
export function BallotZipNarrow({ stateCode }: { stateCode: string }) {
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    const root = document.getElementById("ballot-candidates");
    if (!root) return;
    let cancelled = false;

    const houses = () => [...root.querySelectorAll<HTMLElement>("[data-house-district]")];
    const places = () => [...root.querySelectorAll<HTMLElement>("[data-place-slug]")];
    const counties = () => [...root.querySelectorAll<HTMLElement>("[data-county-places]")];
    const showAll = () => {
      for (const el of [...houses(), ...places(), ...counties()]) el.hidden = false;
    };

    async function apply() {
      const zip = zipFromHash();
      if (!/^\d{5}$/.test(zip)) {
        showAll();
        if (!cancelled) setNote(null);
        return;
      }
      try {
        const response = await fetch(`/zcta/${zip.slice(0, 3)}.json`);
        if (!response.ok) throw new Error(String(response.status));
        const file = (await response.json()) as Record<string, ZipRow>;
        if (cancelled) return;
        const row = file[zip];
        if (!row) {
          showAll();
          setNote(
            `The Census ZCTA relationship files have no record for ${zip}. Every stored contest stays listed.`,
          );
          return;
        }
        const districtNums = new Set(
          (row.d ?? [])
            .filter((district) => district[0] === stateCode)
            .map((district) => districtNumber(district[1]))
            .filter(Boolean),
        );
        const slugs = new Set(
          (row.p ?? []).filter((place) => place[0] === stateCode).map((place) => place[1]),
        );
        if (districtNums.size === 0 && slugs.size === 0) {
          showAll();
          setNote(
            `ZIP ${zip} has no Census place or congressional district in ${stateCode} on the relationship file. Every stored contest stays listed.`,
          );
          return;
        }
        if (districtNums.size > 0) {
          for (const el of houses()) {
            el.hidden = !districtNums.has(el.dataset.houseDistrict || "");
          }
        } else {
          for (const el of houses()) el.hidden = false;
        }
        if (slugs.size > 0) {
          for (const el of places()) {
            const slug = el.dataset.placeSlug || "";
            el.hidden = slug.length > 0 && !slugs.has(slug);
          }
          for (const el of counties()) {
            const listed = (el.dataset.countyPlaces || "").split(" ").filter(Boolean);
            el.hidden = listed.length > 0 && !listed.some((slug) => slugs.has(slug));
          }
        } else {
          for (const el of [...places(), ...counties()]) el.hidden = false;
        }
        const labels = [...districtNums]
          .sort((a, b) => Number(a) - Number(b))
          .map((district) => (district === "0" ? "at large" : `Congressional District ${district}`));
        setNote(
          labels.length > 0
            ? `ZIP ${zip} narrows U.S. House contests to ${labels.join(", ")} using the Census ZCTA relationship file on this site. Statewide contests stay listed. Local contests stay listed when a Census place in that ZIP is in the county or city.`
            : `ZIP ${zip} matches Census places in ${stateCode}. U.S. House contests stay listed because that ZIP has no congressional district row in this state.`,
        );
      } catch {
        if (cancelled) return;
        showAll();
        setNote("The Census relationship file for that ZIP prefix did not load. Every stored contest stays listed.");
      }
    }

    void apply();
    window.addEventListener("hashchange", apply);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", apply);
    };
  }, [stateCode]);

  if (!note) return null;
  return (
    <p className="mt-3 text-sm leading-6" role="status">
      {note}
    </p>
  );
}
