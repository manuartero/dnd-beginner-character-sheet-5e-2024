export type IconVariant = "BLACK" | "WHITE";

export const GOLD_ICON = "vol1/icon-vol1_63";

export function resolveIconPath(
  pseudoPath: string,
  { variant = "BLACK" }: { variant?: IconVariant } = {},
): string {
  const [vol, file] = pseudoPath.split("/");
  return `/assets/${vol}/${variant}/${file}.svg`;
}
