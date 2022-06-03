const faker = require("faker");
const { ObjectId } = require("mongoose").Types;
const httpRequest = require("../../../fixtures/httpRequest")();
const Scene = require("../../../../src/models/Scene");
const Repository = require("../../../../src/api/scene/repository");
const validateModel = require("../../../fixtures/validateModel");

const getUrl = () => `/api/v1/scene`;

describe("Scene module - create", () => {
  beforeEach(() => {
    Repository.create = jest.fn(async (payload, user) => {
      await validateModel(Scene, payload, user);
      return payload;
    });
  });

  it("should create a scene", async () => {
    const scene = {
      name: faker.random.word(),
      description: faker.random.word(),
      location: faker.random.word(),
      time: faker.random.word(),
      characters: [ObjectId()]
    };
    const { status, body } = await httpRequest("POST", getUrl(), scene);

    expect(status).toBe(201);
    expect(body).toMatchObject(scene);
  });

  it("should fail validation cause no name was provided", async () => {
    const scene = {
      description: faker.random.word(),
      location: faker.random.word(),
      time: faker.random.word(),
      characters: [ObjectId()]
    };

    const { status, body } = await httpRequest("POST", getUrl(), scene);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: ["Scene validation failed: name: Path `name` is required."],
      status: 400,
      level: "error"
    });
  });

  it("should fail validation for characters with invalid object ids", async () => {
    const scene = {
      name: faker.random.word(),
      description: faker.random.word(),
      location: faker.random.word(),
      time: faker.random.word(),
      characters: [ObjectId(), "invalid"]
    };

    const { status, body } = await httpRequest("POST", getUrl(), scene);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      status: 400,
      level: "error"
    });
  });

  it("should fails because aft.user is not a valid role", async () => {
    const scene = {
      name: faker.random.word(),
      description: faker.random.word(),
      location: faker.random.word(),
      time: faker.random.word(),
      characters: [ObjectId()]
    };

    const { status, body } = await httpRequest("POST", getUrl(), scene, "user");

    expect(status).toBe(403);
    expect(body).toMatchObject({
      module: "authorization",
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed",
      level: "error"
    });

    expect(Repository.create).not.toHaveBeenCalled();
  });
});
