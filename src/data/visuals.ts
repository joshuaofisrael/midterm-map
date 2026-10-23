/**
 * Shared photographs for the homepage, state hubs, and article pages.
 * Files live once under public/visuals and are not copied onto city pages.
 * Each file is under 150 KB. Width and height match the encoded pixels.
 */
export type VisualAsset = {
  id: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  webp: string;
  avif: string;
  prompt: string;
};

export const VISUALS = {
  pollingPlace: {
    id: "polling-place",
    alt: "Empty polling place with a metal ballot box, a privacy voting booth, and an I Voted sticker on the box.",
    caption: "Generic photograph. No voters are present. Not a specific precinct and not an official ballot.",
    width: 1200,
    height: 675,
    webp: "/visuals/polling-place.webp",
    avif: "/visuals/polling-place.avif",
    prompt:
      "Photorealistic documentary photograph of an empty American polling place interior, shot on a 35mm lens with overhead fluorescent light. A metal ballot box with a narrow slot sits beside a folding privacy voting booth that holds a blank unmarked sheet of paper and a pen. Beige walls, wood floor, one folding table. No people, no faces, no hands, no reflections of people, no flags, no party logos, no candidate names, no readable text, no cartoons, no illustration, no painting style.",
  },
  civicBuilding: {
    id: "civic-building",
    alt: "Empty limestone civic building with columns, a wide plaza, and no flags or signs.",
    caption: "Generic civic building. Not a photograph of a specific state capitol.",
    width: 1200,
    height: 675,
    webp: "/visuals/civic-building.webp",
    avif: "/visuals/civic-building.avif",
    prompt:
      "Photorealistic architectural photograph of a generic American neoclassical civic building exterior, pale limestone columns and wide empty stone steps, overcast daylight, damp plaza, bare deciduous trees. No flags, no seals, no state names, no signage, no readable text, no people, no crowds, no cars close to the camera, no protest, no event. Documentary photography, sharp stone, not an illustration and not a painting.",
  },
  pollingSign: {
    id: "polling-sign",
    alt: "Yard sign reading Polling Place in front of a brick civic building with a dark glass door.",
    caption: "Generic photograph of polling-place signage. Not a specific precinct.",
    width: 1200,
    height: 675,
    webp: "/visuals/polling-sign.webp",
    avif: "/visuals/polling-sign.avif",
    prompt:
      "Photorealistic photograph of a closed suburban brick municipal building door with a white yard sign in front that reads exactly POLLING PLACE in plain black capital letters. The glass is dark and empty. No person inside, no silhouette, no reflection of a person, no flag, no party signs, no candidate names, no crowd. Overcast daylight, empty sidewalk, documentary photo, not a cartoon and not an illustration.",
  },
} as const satisfies Record<string, VisualAsset>;

/**
 * Slot left empty on purpose. Generated Capitol frames included distant people,
 * so no file is shipped. Drop WebP and AVIF here later if a clean frame exists.
 */
export const UNFILLED_VISUALS = [
  {
    id: "us-capitol",
    width: 1200,
    height: 675,
    webp: "/visuals/us-capitol.webp",
    avif: "/visuals/us-capitol.avif",
    prompt:
      "Photorealistic architectural photograph of the United States Capitol exterior in daylight, empty foreground and empty steps, zero people anywhere in the frame including distant figures, no crowds, no flags, no banners, no vehicles, no protest, no event. Documentary photography, sharp stone, not an illustration, not a painting, not a cartoon.",
  },
] as const;
