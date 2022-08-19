const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Book = require("../../../../src/models/Book");

const getUrl = (qs = "") => `/api/v1/book${qs}`;

describe("Character module - findAll", () => {
  beforeEach(() => {
    CommonRepository.findByQuery = jest.fn().mockReturnValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find all books with query strings", async () => {
    const { status } = await httpRequest(
      "GET",
      getUrl("?filter[updatedBy|createdBy]=userTest&sort=-name&page[limit]=1&page[skip]=0&fields=name,description")
    );

    expect(status).toBe(200);
    expect(CommonRepository.findByQuery).toHaveBeenCalledWith(
      Book,
      { $or: [{ updatedBy: "userTest" }, { createdBy: "userTest" }] },
      "userTest",
      { lean: true, pagination: { limit: 1, skip: 0 }, populate: null, select: ["name", "description"], sort: "-name" }
    );
  });
});
