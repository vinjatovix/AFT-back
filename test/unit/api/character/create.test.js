const { ObjectId } = require("mongoose").Types;
const random = require("../../../shared/random");
const httpRequest = require("../../../fixtures/httpRequest")();
const Character = require("../../../../src/models/Character");
const Repository = require("../../../../src/api/character/repository");
const validateModel = require("../../../fixtures/validateModel");

const getUrl = () => `/api/v1/character`;

jest.mock("../../../../src/db/connectDB", () => ({
  connectDB: () => true
}));

describe("Character module - create", () => {
  beforeEach(() => {
    Repository.create = jest.fn(async (payload, user) => {
      await validateModel(Character, payload, user);
      return payload;
    });
  });

  it("should create a character", async () => {
    const char = {
      name: random.name(),
      gender: random.arrayElement(["male", "female"]),
      description: random.description(),
      center: random.arrayElement(["mental", "emotional", "instintive"]),
      book: ObjectId()
    };
    const { status, body } = await httpRequest("POST", getUrl(), char);

    expect(status).toBe(201);
    expect(body).toMatchObject(char);
  });

  it("should fail validation cause no name was provided", async () => {
    const char = {
      gender: random.arrayElement(["male", "female"]),
      description: random.description(),
      center: random.arrayElement(["mental", "emotional", "instintive"]),
      book: ObjectId()
    };

    const { status, body } = await httpRequest("POST", getUrl(), char);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: ["Character validation failed: name: Path `name` is required."],
      status: 400
    });
  });

  it("should fail validation cause center is not valid", async () => {
    const char = {
      name: random.word(),
      gender: random.arrayElement(["male", "female"]),
      description: random.description(),
      center: random.word(),
      book: ObjectId()
    };

    const { status, body } = await httpRequest("POST", getUrl(), char);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: [
        `Character validation failed: center: \`${char.center}\` is not a valid enum value for path \`center\`.`
      ],
      status: 400
    });
  });

  it("should fail validation cause book is not an id", async () => {
    const char = {
      name: random.word(),
      gender: random.arrayElement(["male", "female"]),
      description: random.description(),
      center: random.arrayElement(["mental", "emotional", "instintive"]),
      book: random.word()
    };

    const { status, body } = await httpRequest("POST", getUrl(), char);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error"
    });
  });

  it("should fail because aft.user is not valid role", async () => {
    const char = {
      name: random.word(),
      gender: random.arrayElement(["male", "female"]),
      description: random.description(),
      center: random.arrayElement(["mental", "emotional", "instintive"]),
      book: random.word()
    };

    const { status, body } = await httpRequest("POST", getUrl(), char, "user");

    expect(status).toBe(403);
    expect(body).toMatchObject({
      module: "authorization",
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed",
      status: 403
    });
  });
});
