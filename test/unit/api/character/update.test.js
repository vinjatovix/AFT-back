const httpRequest = require("../../../fixtures/httpRequest")();
const Repository = require("../../../../src/api/character/repository");
const getUrl = id => `/api/v1/character/${id}`;

describe("Character module - update", () => {
  beforeEach(() => {
    Repository.findOneAndUpdate = jest.fn(async payload => {
      return payload;
    });
  });

  it("should update a character", async () => {
    const id = "uno";

    const { status } = await httpRequest("PATCH", getUrl(id), {
      name: "Uno"
    });

    expect(status).toBe(200);
  });

  it("should fail because aft.user is not valid role", async () => {
    const id = "uno";

    const { status, body } = await httpRequest("PATCH", getUrl(id), { name: "Uno" }, "user");

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
