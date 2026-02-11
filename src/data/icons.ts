import iconMap from "./icon-map.json";

type IconName = keyof typeof iconMap;
type IconVariant = "BLACK" | "WHITE";

function getIconPath(
	name: IconName,
	{ variant = "BLACK" }: { variant?: IconVariant } = {},
): string {
	const entry = iconMap[name];
	const [vol, file] = entry.split("/");
	return `/assets/${vol}/${variant}/${file}.svg`;
}

export { getIconPath };
export type { IconName, IconVariant };
