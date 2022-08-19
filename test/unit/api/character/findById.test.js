const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Character = require("../../../../src/models/Character");
const random = require("../../../shared/random");

const getUrl = (id, qs = "") => `/api/v1/character/${id}${qs}`;

const _id = random.mongoId().toString();

describe("Character module - find", () => {
  beforeEach(() => {
    CommonRepository.findOneByQuery = jest.fn().mockReturnValue({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find character by id", async () => {
    const { status } = await httpRequest("GET", getUrl(_id, "?include=book"));

    expect(status).toBe(200);
    expect(CommonRepository.findOneByQuery).toHaveBeenCalledWith(Character, { _id }, "userTest", {
      lean: true,
      populate: [{ path: "book", populate: [] }],
      exists: true
    });
  });
});
