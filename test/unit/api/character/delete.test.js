const httpRequest = require("../../../fixtures/httpRequest")();
const Repository = require("../../../../src/api/character/repository");
const getUrl = id => `/api/v1/character/${id}`;

describe("Character module - delete", () => {
  beforeEach(() => {
    Repository.findOneAndDelete = jest.fn(async payload => {
      return payload;
    });
  });

  it("should delete a character", async () => {
    const id = "uno";

    const { status } = await httpRequest("DEL", getUrl(id));

    expect(status).toBe(204);
  });

  it("should fail because aft.user is not valid role", async () => {
    const id = "uno";

    const { status, body } = await httpRequest("DEL", getUrl(id), null, "user");

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
