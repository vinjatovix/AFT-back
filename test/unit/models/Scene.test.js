const { ObjectId } = require("mongoose").Types;
const { createMetadata } = require("../../../src/api/common/shared");
const Scene = require("../../../src/models/Scene");
const random = require("../../shared/random");

const DEFAULT_SCENE = {
  order: 1,
  book: random.mongoId().toString(),
  name: random.word(),
  description: random.word(),
  location: random.word(),
  time: random.word(),
  characters: [ObjectId()],
  metadata: createMetadata("user")
};

describe("Scene model", () => {
  it("should be a valid scene", async () => {
    const scene = new Scene(DEFAULT_SCENE);

    await expect(scene.validate()).resolves.toBeUndefined();
  });

  it("should throw validation error cast character to object id", async () => {
    const scene = new Scene({
      ...DEFAULT_SCENE,
      characters: ["string"]
    });

    await expect(scene.validate()).rejects.toThrow(
      'Scene validation failed: characters.0: Cast to [ObjectId] failed for value "[ \'string\' ]" (type string) at path "characters.0"'
    );
  });

  it("should throw validation error because scene has no name", async () => {
    const scene = new Scene({ ...DEFAULT_SCENE, name: undefined });

    await expect(scene.validate()).rejects.toThrow("Scene validation failed: name: Path `name` is required.");
  });

  it("should throw validation error because scene has no book", async () => {
    const scene = new Scene({ ...DEFAULT_SCENE, book: undefined });

    await expect(scene.validate()).rejects.toThrow("Scene validation failed: book: Path `book` is required.");
  });

  it("should throw validation error because scene has no location", async () => {
    const scene = new Scene({ ...DEFAULT_SCENE, location: undefined });

    await expect(scene.validate()).rejects.toThrow("Scene validation failed: location: Path `location` is required.");
  });

  it("should throw validation error because scene has no time", async () => {
    const scene = new Scene({ ...DEFAULT_SCENE, time: undefined });

    await expect(scene.validate()).rejects.toThrow("Scene validation failed: time: Path `time` is required.");
  });

  it("should throw validation error because scene has no description", async () => {
    const scene = new Scene({ ...DEFAULT_SCENE, description: undefined });

    await expect(scene.validate()).rejects.toThrow(
      "Scene validation failed: description: Path `description` is required."
    );
  });

  it("should throw validation error because scene has no metadata", async () => {
    const scene = new Scene({ ...DEFAULT_SCENE, metadata: undefined });

    await expect(scene.validate()).rejects.toThrow("Scene validation failed: metadata: Path `metadata` is required.");
  });
});
