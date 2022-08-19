const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Book = require("../../../../src/models/Book");
const random = require("../../../shared/random");

const getUrl = _slug => `/api/v1/book/${_slug}`;

const slug = random.name();
const name = random.name();

describe("Book module - update", () => {
  beforeEach(() => {
    CommonRepository.findOneAndUpdate = jest.fn(async (_Model, _query, payload) => {
      return payload;
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a book", async () => {
    const { status } = await httpRequest("PATCH", getUrl(slug), {
      name
    });

    expect(status).toBe(200);
    expect(CommonRepository.findOneAndUpdate).toHaveBeenCalledWith(
      Book,
      { name: slug },
      { name },
      "userTest",
      expect.any(Object)
    );
  });

  it("should fail because aft.user is not valid role", async () => {
    const { status, body } = await httpRequest("PATCH", getUrl(slug), { name }, "user");

    expect(status).toBe(403);
    expect(body).toMatchObject({
      module: "authorization",
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed",
      status: 403
    });
  });
});
