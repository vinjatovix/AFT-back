const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Character = require("../../../../src/models/Character");
const random = require("../../../shared/random");

const getUrl = (qs = "") => `/api/v1/character${qs}`;

describe("Character module - findAll", () => {
  beforeEach(() => {
    CommonRepository.findByQuery = jest.fn().mockReturnValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find all characters with query strings", async () => {
    const bookId = random.mongoId().toString();

    const { status } = await httpRequest(
      "GET",
      getUrl(`?filter[book]=${bookId}&sort=-name&page[limit]=1&page[skip]=0&fields=name,description&include=book`)
    );

    expect(status).toBe(200);
    expect(CommonRepository.findByQuery).toHaveBeenCalledWith(Character, { book: bookId }, "userTest", {
      lean: true,
      pagination: { skip: 0, limit: 1 },
      populate: [
        {
          path: "book",
          populate: []
        }
      ],
      select: ["name", "description"],
      sort: "-name"
    });
  });
});
