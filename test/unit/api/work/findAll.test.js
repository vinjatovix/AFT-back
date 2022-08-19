const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Work = require("../../../../src/models/Work");
const random = require("../../../shared/random");

const getUrl = qs => `/api/v1/work?${qs}`;

describe("Character module - findAll", () => {
  beforeEach(() => {
    CommonRepository.findByQuery = jest.fn().mockReturnValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find all characters with query strings", async () => {
    const sceneId = random.mongoId().toString();

    const { status } = await httpRequest("GET", getUrl(`include=full-scene&filter[scene]=${sceneId}`));

    expect(status).toBe(200);
    expect(CommonRepository.findByQuery).toHaveBeenCalledWith(Work, { scene: sceneId }, "userTest", {
      json: true,
      populate: [
        { path: "scene", populate: [{ path: "characters", populate: [] }] },
        { path: "character", populate: [{ path: "book", populate: [] }] }
      ]
    });
  });
});
