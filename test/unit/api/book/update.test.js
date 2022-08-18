const httpRequest = require("../../../fixtures/httpRequest")();
const Repository = require("../../../../src/api/book/repository");
const getUrl = slug => `/api/v1/book/${slug}`;

describe("Book module - update", () => {
  beforeEach(() => {
    Repository.findOneAndUpdate = jest.fn(async payload => {
      return payload;
    });
  });
  it("should update a book", async () => {
    const slug = "uno";

    const { status } = await httpRequest("PATCH", getUrl(slug), {
      name: "Uno"
    });

    expect(status).toBe(200);
  });

  it("should fail because aft.user is not valid role", async () => {
    const slug = "uno";

    const { status, body } = await httpRequest("PATCH", getUrl(slug), { name: "Uno" }, "user");

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
