const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Scene = require("../../../../src/models/Scene");
const random = require("../../../shared/random");

const getUrl = (id, qs = "") => `/api/v1/scene/${id}${qs}`;

describe("Scene module - find", () => {
  beforeEach(() => {
    CommonRepository.findOneByQuery = jest.fn().mockReturnValue({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find scene by id", async () => {
    const _id = random.mongoId().toString();

    const { status } = await httpRequest("GET", getUrl(_id, "?include=characters"));

    expect(status).toBe(200);
    expect(CommonRepository.findOneByQuery).toHaveBeenCalledWith(Scene, { _id }, "userTest", {
      lean: true,
      populate: [{ path: "characters", populate: [] }],
      exists: true
    });
  });
});
