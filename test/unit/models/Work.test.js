const { ObjectId } = require("mongoose").Types;
const { createMetadata } = require("../../../src/api/common/shared");
const Work = require("../../../src/models/Work");
const faker = require("faker");

describe("Work model", () => {
  it("should be a valid Work", async () => {
    const work = new Work({
      scene: ObjectId(),
      description: faker.random.word(),
      character: ObjectId(),
      actionUnits: [faker.random.word().repeat(3)],
      previousCircumstances: faker.random.word(),
      animal: faker.random.word(),
      referent: faker.random.word(),
      metadata: createMetadata("user")
    });
    await expect(work.validate()).resolves.toBeUndefined();
  });

  it("should fails because scene is not an object id", async () => {
    const work = new Work({
      scene: ["string"],
      description: faker.random.word(),
      character: ObjectId(),
      actionUnits: [faker.random.word().repeat(3)],
      previousCircumstances: faker.random.word(),
      animal: faker.random.word(),
      referent: faker.random.word(),
      metadata: createMetadata("user")
    });
    await expect(work.validate()).rejects.toThrow(
      'Work validation failed: scene: Cast to ObjectId failed for value "[ \'string\' ]" (type Array) at path "scene"'
    );
  });

  it("should fail because character is not an object id", async () => {
    const work = new Work({
      scene: ObjectId(),
      description: faker.random.word(),
      character: "string",
      actionUnits: [faker.random.word().repeat(3)],
      previousCircumstances: faker.random.word(),
      animal: faker.random.word(),
      referent: faker.random.word(),
      metadata: createMetadata("user")
    });
    await expect(work.validate()).rejects.toThrow(
      "Work validation failed: character: Cast to ObjectId failed for value \"string\" (type string) at path \"character\""
    );
  });
});
