const httpRequest = require("../../../fixtures/httpRequest")();
const validateModel = require("../../../fixtures/validateModel");
const Character = require("../../../../src/models/Character");
const CommonRepository = require("../../../../src/api/common/repository");
const random = require("../../../shared/random");

const getUrl = () => `/api/v1/character`;

const DEFAULT_CHARACTER = {
  name: random.name(),
  gender: random.arrayElement(["male", "female"]),
  description: random.description(),
  center: random.arrayElement(["mental", "emotional", "instintive"]),
  book: random.mongoId().toString()
};

describe("Character module - create", () => {
  beforeEach(() => {
    CommonRepository.create = jest.fn(async (CharacterModel, payload, user) => {
      await validateModel(CharacterModel, payload, user);
      return payload;
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fail with error code E32", async () => {
    const { status, body } = await httpRequest("POST", getUrl());

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "general",
      code: "E32",
      id: "BODY_INVALID",
      status: 400
    });
  });

  it("should create a character", async () => {
    const { status, body } = await httpRequest("POST", getUrl(), DEFAULT_CHARACTER);

    expect(status).toBe(201);
    expect(body).toMatchObject(DEFAULT_CHARACTER);
    expect(CommonRepository.create).toHaveBeenCalledWith(Character, DEFAULT_CHARACTER, "userTest", expect.any(Object));
  });

  it("should fail validation cause no name was provided", async () => {
    const char = { ...DEFAULT_CHARACTER };
    delete char.name;

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
    const char = { ...DEFAULT_CHARACTER, center: random.word() };

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
    const char = { ...DEFAULT_CHARACTER, book: random.word() };

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
    const { status, body } = await httpRequest("POST", getUrl(), DEFAULT_CHARACTER, "user");

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
