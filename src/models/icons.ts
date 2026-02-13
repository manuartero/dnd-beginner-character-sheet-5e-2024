import iconMap from "../data/icon-map.json";

export type IconName = keyof typeof iconMap;
export type IconVariant = "BLACK" | "WHITE";

export function resolveIconPath(
  pseudoPath: string,
  { variant = "BLACK" }: { variant?: IconVariant } = {},
): string {
  const [vol, file] = pseudoPath.split("/");
  return `/assets/${vol}/${variant}/${file}.svg`;
}

export function getIconPath(
  name: IconName,
  { variant = "BLACK" }: { variant?: IconVariant } = {},
) {
  return resolveIconPath(iconMap[name], { variant });
}
