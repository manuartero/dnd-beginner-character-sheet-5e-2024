import { backgrounds } from "./backgrounds";

describe("backgrounds.get()", () => {
  it("returns an entry with the nested originFeat sub-object", () => {
    const artisan = backgrounds.get({ id: "artisan" });
    expect(artisan.id).toBe("artisan");
    expect(artisan.originFeat.id).toBeTruthy();
    expect(artisan.originFeat.name).toBeTruthy();
    expect(artisan.originFeat.description).toBeTruthy();
  });

  it("throws on unknown background", () => {
    expect(() =>
      backgrounds.get({ id: "astronaut" as unknown as "artisan" }),
    ).toThrow(/Unknown background/);
  });
});

describe("backgrounds.find()", () => {
  it("returns an entry for a known background", () => {
    expect(backgrounds.find({ id: "soldier" })?.id).toBe("soldier");
  });

  it("returns undefined for unknown background", () => {
    expect(backgrounds.find({ id: "astronaut" })).toBeUndefined();
  });
});

describe("backgrounds.list()", () => {
  it("returns all 16 backgrounds", () => {
    expect(backgrounds.list()).toHaveLength(16);
  });

  it("every entry carries its .id and resolved originFeat sub-object", () => {
    for (const entry of backgrounds.list()) {
      expect(entry.id).toBeTruthy();
      expect(entry.originFeat.id).toBeTruthy();
      expect(entry.originFeat.name).toBeTruthy();
      expect(entry.originFeat.description).toBeTruthy();
    }
  });
});

describe("backgrounds.icon()", () => {
  it("returns the resolved icon path for a given background", () => {
    expect(backgrounds.icon({ id: "artisan" })).toBe(
      "/assets/vol5/BLACK/icon-vol5_70.svg",
    );
  });

  it("honors the variant option", () => {
    expect(backgrounds.icon({ id: "artisan", variant: "WHITE" })).toBe(
      "/assets/vol5/WHITE/icon-vol5_70.svg",
    );
  });
});
