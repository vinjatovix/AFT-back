const httpRequest = require("../../../fixtures/httpRequest")();
const Repository = require("../../../../src/api/book/repository");
const getUrl = slug => `/api/v1/book/${slug}`;

describe("Book module - delete", () => {
  beforeEach(() => {
    Repository.findOneAndDelete = jest.fn(async () => true);
  });

  it("should delete a book", async () => {
    const slug = "uno";

    const { status } = await httpRequest("DEL", getUrl(slug));

    expect(status).toBe(204);
  });

  it("should fail because aft.user is not valid role", async () => {
    const slug = "uno";

    const { status, body } = await httpRequest("DEL", getUrl(slug), null, "user");

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
