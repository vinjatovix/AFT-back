const httpRequest = require("../../../fixtures/httpRequest")();
const Repository = require("../../../../src/api/work/repository");
const getUrl = id => `/api/v1/work/${id}`;

describe("Work module - delete", () => {
  beforeEach(() => {
    Repository.findOneAndDelete = jest.fn(async payload => {
      return payload;
    });
  });
  it("should delete a work", async () => {
    const { status } = await httpRequest("DEL", getUrl("uno"));
    expect(status).toBe(204);
  });

  it("should fail if role is not valid", async () => {
    const { status, body } = await httpRequest("DEL", getUrl("uno"), null, "user");
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
