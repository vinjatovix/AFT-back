const httpRequest = require("../../../fixtures/httpRequest")();
const validateModel = require("../../../fixtures/validateModel");
const CommonRepository = require("../../../../src/api/common/repository");
const Work = require("../../../../src/models/Work");
const random = require("../../../shared/random");

const getUrl = () => `/api/v1/work`;

const DEFAULT_WORK = {
  scene: random.mongoId().toString(),
  description: random.word(),
  character: random.mongoId().toString(),
  actionUnits: [{ order: 0, action: random.word() }],
  previousCircumstances: [random.word()],
  animal: random.word(),
  referent: random.word()
};

describe("Work module - create", () => {
  beforeEach(() => {
    CommonRepository.create = jest.fn(async (WorkModel, payload, user) => {
      await validateModel(WorkModel, payload, user);
      return payload;
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a work", async () => {
    const { status, body } = await httpRequest("POST", getUrl(), DEFAULT_WORK);

    expect(status).toBe(201);
    expect(body).toMatchObject(DEFAULT_WORK);
    expect(CommonRepository.create).toHaveBeenCalledWith(Work, DEFAULT_WORK, "userTest", undefined);
  });

  it("should fail validation cause no scene was provided", async () => {
    const work = { ...DEFAULT_WORK };
    delete work.scene;

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
    const work = { ...DEFAULT_WORK, scene: random.word() };

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
    const work = { ...DEFAULT_WORK, character: random.word() };

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
    const { status } = await httpRequest("POST", getUrl(), DEFAULT_WORK, "user");

    expect(status).toBe(201);
  });
});
