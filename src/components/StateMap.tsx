import { US_MAP_PATHS, US_MAP_VIEW } from "@/data/usMapPaths";

/** Clickable state hubs. Links leave the frame when this map is embedded. */
export function StateMap() {
  return (
    <svg
      viewBox={`0 0 ${US_MAP_VIEW.width} ${US_MAP_VIEW.height}`}
      role="img"
      aria-label="Map of the United States linking to each state hub for November 3, 2026"
      className="h-auto w-full"
    >
      {US_MAP_PATHS.map((state) => (
        <a key={state.code} href={`/states/${state.code}/`} target="_top">
          <path d={state.d} className="fill-navy stroke-white hover:fill-navy-mid" strokeWidth={0.8}>
            <title>{state.name}</title>
          </path>
        </a>
      ))}
    </svg>
  );
}
