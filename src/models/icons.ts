export type IconVariant = "BLACK" | "WHITE";

export function resolveIconPath(
  pseudoPath: string,
  { variant = "BLACK" }: { variant?: IconVariant } = {},
): string {
  const [vol, file] = pseudoPath.split("/");
  return `/assets/${vol}/${variant}/${file}.svg`;
}
