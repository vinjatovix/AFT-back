const { ObjectId } = require("mongoose").Types;
const httpRequest = require("../../../fixtures/httpRequest")();
const Work = require("../../../../src/models/Work");
const Repository = require("../../../../src/api/work/repository");
const validateModel = require("../../../fixtures/validateModel");
const { createMetadata } = require("../../../../src/api/common/shared");
const random = require("../../../shared/random");

const getUrl = () => `/api/v1/work`;

describe("Work module - create", () => {
  beforeEach(() => {
    Repository.create = jest.fn(async (payload, user) => {
      await validateModel(Work, payload, user);
      return payload;
    });
  });

  it("should create a work", async () => {
    const work = {
      scene: ObjectId(),
      description: random.word(),
      character: ObjectId(),
      actionUnits: [{ order: 0, action: random.word() }],
      previousCircumstances: [random.word()],
      animal: random.word(),
      referent: random.word()
    };
    const { status, body } = await httpRequest("POST", getUrl(), work);

    expect(status).toBe(201);
    expect(body).toMatchObject(work);
  });

  it("should fail validation cause no scene was provided", async () => {
    const work = {
      description: random.word(),
      character: ObjectId(),
      actionUnits: [{ order: 0, action: random.word() }],
      previousCircumstances: [random.word()],
      animal: random.word(),
      referent: random.word()
    };
    const { status, body } = await httpRequest("POST", getUrl(), work);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: ["Work validation failed: scene: Path `scene` is required."],
      status: 400
    });
  });

  it("should fail because scene is and invalid object id", async () => {
    const work = {
      scene: "invalid",
      description: random.word(),
      character: ObjectId(),
      actionUnits: [{ order: 0, action: random.word() }],
      previousCircumstances: [random.word()],
      animal: random.word(),
      referent: random.word()
    };
    const { status, body } = await httpRequest("POST", getUrl(), work);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      status: 400
    });
  });

  it("should fail because character is an invalid object id", async () => {
    const work = {
      scene: ObjectId(),
      description: random.word(),
      character: "invalid",
      actionUnits: [{ order: 0, action: random.word() }],
      previousCircumstances: [random.word()],
      animal: random.word(),
      referent: random.word()
    };

    const { status, body } = await httpRequest("POST", getUrl(), work);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      status: 400
    });
  });

  it("should work even if role is aft.user", async () => {
    const work = {
      scene: ObjectId(),
      description: random.word(),
      character: ObjectId(),
      actionUnits: [{ order: 0, action: random.word() }],
      previousCircumstances: [random.word()],
      animal: random.word(),
      referent: random.word(),
      aftUser: "invalid"
    };

    const { status } = await httpRequest("POST", getUrl(), work, "user");

    expect(status).toBe(201);
  });
});
