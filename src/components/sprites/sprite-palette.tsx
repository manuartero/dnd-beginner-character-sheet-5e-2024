import { RowList, rowListStyles } from "elements";

type PaletteColor = {
  hex: string;
};

type SpritePaletteProps = {
  colors: PaletteColor[];
};

export function SpritePalette({ colors }: SpritePaletteProps) {
  return (
    <RowList
      title="Palette"
      ariaLabel="color palette"
      items={colors.map((color, index) => ({ index, item: color }))}
      renderItem={(color) => (
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
        </>
      )}
    />
  );
}
