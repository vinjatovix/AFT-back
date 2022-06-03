const faker = require("faker");
const { ObjectId } = require("mongoose").Types;
const httpRequest = require("../../../fixtures/httpRequest")();
const Repository = require("../../../../src/api/work/repository");

const getUrl = id => `/api/v1/work/${id}`;

describe("Work module - update", () => {
  beforeEach(() => {
    Repository.findOneAndUpdate = jest.fn(async payload => {
      return payload;
    });
  });

  it("should update a valid work", async () => {
    const work = {
      scene: ObjectId(),
      description: faker.random.word(),
      character: ObjectId(),
      actionUnits: [faker.random.word()],
      previousCircumstances: [faker.random.word()],
      animal: faker.random.word(),
      referent: faker.random.word()
    };
    const { status } = await httpRequest("PATCH", getUrl(work.name), work);

    expect(status).toBe(200);
  });

  it("should update even if role is aft.user", async () => {
    const work = {
      scene: ObjectId(),
      description: faker.random.word(),
      character: ObjectId(),
      actionUnits: [faker.random.word()],
      previousCircumstances: [faker.random.word()],
      animal: faker.random.word(),
      referent: faker.random.word()
    };
    const { status } = await httpRequest("PATCH", getUrl(work.name), work, "user");

    expect(status).toBe(200);
  });
});
