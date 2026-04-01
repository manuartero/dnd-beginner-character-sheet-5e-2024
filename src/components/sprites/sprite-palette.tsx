import { RowList, rowListStyles } from "elements";

type PaletteColor = {
  hex: string;
};

type GlobalPaletteEntry = {
  hex: string;
  sprites: Record<string, number>;
};

type SpritePaletteProps = {
  colors: PaletteColor[];
  globalPalette: GlobalPaletteEntry[];
};

export function SpritePalette({ colors, globalPalette }: SpritePaletteProps) {
  const globalMap = new Map(
    globalPalette.map((e) => [e.hex.toUpperCase(), e.sprites]),
  );

  return (
    <RowList
      title="Palette"
      ariaLabel="color palette"
      items={colors.map((color, index) => ({ index, item: color }))}
      renderItem={(color) => {
        const sharedWith = globalMap.get(color.hex.toUpperCase()) ?? {};
        const isShared = Object.keys(sharedWith).length > 1;

        return (
          <>
            <div
              style={{
                width: 48,
                height: 48,
                background: color.hex,
                border: "1px solid #ccc",
                flexShrink: 0,
              }}
            />
            <span className={rowListStyles.name}>{color.hex}</span>
            {isShared ? (
              <span style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {Object.keys(sharedWith).map((sprite) => (
                  <span
                    key={sprite}
                    style={{
                      fontSize: 11,
                      padding: "1px 6px",
                      borderRadius: 10,
                      background: "#e8f4e8",
                      color: "#2d6a2d",
                      border: "1px solid #b2d8b2",
                    }}
                  >
                    {sprite}
                  </span>
                ))}
              </span>
            ) : (
              <span
                style={{
                  fontSize: 11,
                  padding: "1px 6px",
                  borderRadius: 10,
                  background: "#fdf3e3",
                  color: "#8a5c1a",
                  border: "1px solid #f0d4a0",
                }}
              >
                unique
              </span>
            )}
          </>
        );
      }}
    />
  );
}
