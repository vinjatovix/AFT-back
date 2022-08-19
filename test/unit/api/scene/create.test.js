const httpRequest = require("../../../fixtures/httpRequest")();
const validateModel = require("../../../fixtures/validateModel");
const CommonRepository = require("../../../../src/api/common/repository");
const Scene = require("../../../../src/models/Scene");
const random = require("../../../shared/random");

const getUrl = () => `/api/v1/scene`;

const DEFAULT_SCENE = {
  name: random.word(),
  description: random.word(),
  location: random.word(),
  time: random.word(),
  characters: [random.mongoId().toString()]
};

describe("Scene module - create", () => {
  beforeEach(() => {
    CommonRepository.create = jest.fn(async (SceneModel, payload, user) => {
      await validateModel(SceneModel, payload, user);
      return payload;
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a scene", async () => {
    const scene = { ...DEFAULT_SCENE };

    const { status, body } = await httpRequest("POST", getUrl(), scene);

    expect(status).toBe(201);
    expect(body).toMatchObject(scene);
    expect(CommonRepository.create).toHaveBeenCalledWith(Scene, scene, "userTest", expect.any(Object));
  });

  it("should fail validation cause no name was provided", async () => {
    const scene = { ...DEFAULT_SCENE };
    delete scene.name;

    const { status, body } = await httpRequest("POST", getUrl(), scene);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: ["Scene validation failed: name: Path `name` is required."],
      status: 400
    });
  });

  it("should fail validation for characters with invalid object ids", async () => {
    const scene = { ...DEFAULT_SCENE, characters: [random.word()] };

    const { status, body } = await httpRequest("POST", getUrl(), scene);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      status: 400
    });
  });

  it("should fails because aft.user is not a valid role", async () => {
    const { status, body } = await httpRequest("POST", getUrl(), DEFAULT_SCENE, "user");

    expect(status).toBe(403);
    expect(body).toMatchObject({
      module: "authorization",
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed"
    });

    expect(CommonRepository.create).not.toHaveBeenCalled();
  });
});
