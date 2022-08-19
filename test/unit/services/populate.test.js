const { getPopulateOptions } = require("../../../src/services/populate");

describe("Populate Service", () => {
  describe("getPopulateOptions", () => {
    it("should return populate array with a single path if include has only one property", async () => {
      const populate = getPopulateOptions(["character"]);
      expect(populate).toHaveLength(1);
      expect(populate).toEqual(
        expect.arrayContaining([
          {
            path: "character",
            populate: [{ path: "book", populate: [] }]
          }
        ])
      );
    });

    it("should return populate array with a single path if include is an array", async () => {
      const populate = getPopulateOptions(["full-scene"]);
      expect(populate).toHaveLength(2);
      expect(populate).toEqual(
        expect.arrayContaining([
          {
            path: "scene",
            populate: [
              {
                path: "characters",
                populate: []
              }
            ]
          },
          {
            path: "character",
            populate: [{ path: "book", populate: [] }]
          }
        ])
      );
    });

    it("should return populate array with multiple paths if include has multiple fields", async () => {
      const populate = getPopulateOptions(["characters", "scene"]);
      expect(populate).toHaveLength(2);
      expect(populate).toEqual(
        expect.arrayContaining([
          { path: "characters", populate: [] },
          {
            path: "scene",
            populate: [{ path: "characters", populate: [] }]
          }
        ])
      );
    });

    it("should return populate array with paths across multiple levels if the field has multiple levels", async () => {
      const populate = getPopulateOptions(["scene.characters.book"]);
      expect(populate).toHaveLength(1);
      expect(populate).toEqual(
        expect.arrayContaining([
          {
            path: "scene",
            populate: [
              {
                path: "characters",
                populate: [{ path: "book", populate: [] }]
              }
            ]
          }
        ])
      );
    });
  });
});
