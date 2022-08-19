const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Scene = require("../../../../src/models/Scene");
const random = require("../../../shared/random");

const getUrl = id => `/api/v1/scene/${id}`;

const _id = random.mongoId().toString();

const DEFAULT_SCENE = {
  description: random.word(),
  location: random.word(),
  time: random.word(),
  characters: [random.mongoId().toString()]
};

describe("Scene module - update", () => {
  beforeEach(() => {
    CommonRepository.findOneAndUpdate = jest.fn(async (_, payload) => {
      return payload;
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a scene", async () => {
    const { status } = await httpRequest("PATCH", getUrl(_id), DEFAULT_SCENE);

    expect(status).toBe(200);
    expect(CommonRepository.findOneAndUpdate).toHaveBeenCalledWith(
      Scene,
      { _id },
      DEFAULT_SCENE,
      "userTest",
      expect.any(Object)
    );
  });

  it("should fail because aft.user is not a valid role", async () => {
    const { status, body } = await httpRequest("PATCH", getUrl(_id), DEFAULT_SCENE, "user");

    expect(status).toBe(403);
    expect(body).toMatchObject({
      module: "authorization",
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed"
    });
  });
});
