import iconMap from "../data/icon-map.json";

export type IconName = keyof typeof iconMap;
export type IconVariant = "BLACK" | "WHITE";

export function getIconPath(
  name: IconName,
  { variant = "BLACK" }: { variant?: IconVariant } = {},
) {
  const entry = iconMap[name];
  const [vol, file] = entry.split("/");
  return `/assets/${vol}/${variant}/${file}.svg`;
}
