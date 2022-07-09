const httpRequest = require("../../../fixtures/httpRequest")();
const Repository = require("../../../../src/api/scene/repository");
const getUrl = slug => `/api/v1/scene/${slug}`;

describe("Scene module - delete", () => {
  beforeEach(() => {
    Repository.findOneAndDelete = jest.fn(async payload => {
      return payload;
    });
  });

  it("should delete a scene", async () => {
    const { status } = await httpRequest("DEL", getUrl("uno"));

    expect(status).toBe(204);
  });

  it("should fail because aft.user is not valid role", async () => {
    const { status, body } = await httpRequest("DEL", getUrl("uno"), null, "user");

    expect(status).toBe(403);
    expect(body).toMatchObject({
      module: "authorization",
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed",
      status: 403,
    });
  });
});
