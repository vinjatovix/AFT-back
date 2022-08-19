const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Character = require("../../../../src/models/Character");
const random = require("../../../shared/random");

const getUrl = id => `/api/v1/character/${id}`;
const _id = random.mongoId().toString();

describe("Character module - delete", () => {
  beforeEach(() => {
    CommonRepository.findOneAndDelete = jest.fn(async (_, payload) => payload);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a character", async () => {
    const { status } = await httpRequest("DEL", getUrl(_id));

    expect(status).toBe(204);
    expect(CommonRepository.findOneAndDelete).toHaveBeenCalledWith(Character, { _id }, "userTest", undefined);
  });

  it("should fail because aft.user is not valid role", async () => {
    const { status, body } = await httpRequest("DEL", getUrl(_id), null, "user");

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
