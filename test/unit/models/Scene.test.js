const { ObjectId } = require("mongoose").Types;
const { createMetadata } = require("../../../src/api/common/shared");
const Scene = require("../../../src/models/Scene");
const random = require("../../shared/random");

describe("Scene model", () => {
  it("should be a valid scene", async () => {
    const scene = new Scene({
      name: random.word(),
      description: random.word(),
      location: random.word(),
      time: random.word(),
      characters: [ObjectId()],
      metadata: createMetadata("user")
    });
    await expect(scene.validate()).resolves.toBeUndefined();
  });

  it("should throw validation error cast character to object id", async () => {
    const scene = new Scene({
      name: random.word(),
      description: random.word(),
      location: random.word(),
      time: random.word(),
      characters: ["string"],
      metadata: createMetadata("user")
    });
    await expect(scene.validate()).rejects.toThrow(
      'Scene validation failed: characters.0: Cast to [ObjectId] failed for value "[ \'string\' ]" (type string) at path "characters.0"'
    );
  });

  it("should throw validation error because scene has no name", async () => {
    const scene = new Scene({
      description: random.word(),
      location: random.word(),
      time: random.word(),
      characters: [ObjectId()],
      metadata: createMetadata("user")
    });
    await expect(scene.validate()).rejects.toThrow("Scene validation failed: name: Path `name` is required.");
  });
});
