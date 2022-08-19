const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Book = require("../../../../src/models/Book");
const random = require("../../../shared/random");

const getUrl = (slug, qs = "") => `/api/v1/book/${slug}${qs}`;

describe("Character module - find", () => {
  beforeEach(() => {
    CommonRepository.findOneByQuery = jest.fn().mockReturnValue({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find book by slug", async () => {
    const name = random.name();
    const { status } = await httpRequest("GET", getUrl(name));

    expect(status).toBe(200);
    expect(CommonRepository.findOneByQuery).toHaveBeenCalledWith(Book, { name }, "userTest", {
      lean: true,
      populate: null
    });
  });
});
