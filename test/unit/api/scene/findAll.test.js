const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Scene = require("../../../../src/models/Scene");
const random = require("../../../shared/random");

const getUrl = qs => `/api/v1/scene?${qs}`;

describe("Character module - findAll", () => {
  beforeEach(() => {
    CommonRepository.findByQuery = jest.fn().mockReturnValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find all characters with query strings", async () => {
    const id1 = random.mongoId().toString();
    const id2 = random.mongoId().toString();
    const include = random.word();
    const filter = random.word();

    const { status } = await httpRequest(
      "GET",
      getUrl(
        `include=${include}&filter[${filter}]=${id1},${id2}&page[limit]=1&page[skip]=0&fields=name,description&sort=-name`
      )
    );

    expect(status).toBe(200);
    expect(CommonRepository.findByQuery).toHaveBeenCalledWith(Scene, { [filter]: { $in: [id1, id2] } }, "userTest", {
      lean: true,
      pagination: { skip: 0, limit: 1 },
      populate: [{ path: include, populate: [] }],
      select: ["name", "description"],
      sort: "-name"
    });
  });
});
