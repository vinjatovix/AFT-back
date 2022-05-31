const { ObjectId } = require("mongoose").Types;
const { createMetadata } = require("../../../src/api/common/shared");
const Character = require("../../../src/models/Character");
const faker = require("faker");

describe("Character model", () => {
  it("should be a valid Book", async () => {
    const character = new Character({
      name: faker.random.word(),
      book: ObjectId(),
      center: "mental",
      metadata: createMetadata("user")
    });
    await expect(character.validate()).resolves.toBeUndefined();
  });

  it("should fail if no name is provided", async () => {
    const character = new Character({
      book: ObjectId(),
      center: "mental",
      metadata: createMetadata("user")
    });
    await expect(character.validate()).rejects.toThrow("Character validation failed: name: Path `name` is required.");
  });

  it("should fail if no book is provided", async () => {
    const character = new Character({
      name: faker.random.word(),
      center: "mental",
      metadata: createMetadata("user")
    });
    await expect(character.validate()).rejects.toThrow("Character validation failed: book: Path `book` is required.");
  });

  it("should fail if center is not valid", async () => {
    const character = new Character({
      name: faker.random.word(),
      book: ObjectId(),
      center: "oniric",
      metadata: createMetadata("user")
    });
    await expect(character.validate()).rejects.toThrow(
      "Character validation failed: center: `oniric` is not a valid enum value for path `center`."
    );
  });

  it("should fail if center is not provided", async () => {
    const character = new Character({
      name: faker.random.word(),
      book: ObjectId(),
      metadata: createMetadata("user")
    });

    await expect(character.validate()).rejects.toThrow(
      "Character validation failed: center: Path `center` is required."
    );
  });
});
