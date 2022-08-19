const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Work = require("../../../../src/models/Work");
const random = require("../../../shared/random");

const getUrl = (id, qs = "") => `/api/v1/work/${id}${qs}`;

describe("Work module - find", () => {
  beforeEach(() => {
    CommonRepository.findOneByQuery = jest.fn().mockReturnValue({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find work by id", async () => {
    const _id = random.mongoId().toString();

    const { status } = await httpRequest("GET", getUrl(_id, "?include=scene"));

    expect(status).toBe(200);
    expect(CommonRepository.findOneByQuery).toHaveBeenCalledWith(Work, { _id }, "userTest", {
      json: true,
      populate: [{ path: "scene", populate: [{ path: "characters", populate: [] }] }]
    });
  });
});
