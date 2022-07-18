const random = require("../../../shared/random");
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
      description: random.word(),
      character: ObjectId(),
      actionUnits: [{ order: 0, action: random.word() }],
      previousCircumstances: [random.word()],
      animal: random.word(),
      referent: random.word()
    };
    const { status } = await httpRequest("PATCH", getUrl(work.name), work);

    expect(status).toBe(200);
  });

  it("should update even if role is aft.user", async () => {
    const work = {
      scene: ObjectId(),
      description: random.word(),
      character: ObjectId(),
      actionUnits: [{ order: 0, action: random.word() }],
      previousCircumstances: [random.word()],
      animal: random.word(),
      referent: random.word()
    };
    const { status } = await httpRequest("PATCH", getUrl(work.name), work, "user");

    expect(status).toBe(200);
  });
});
