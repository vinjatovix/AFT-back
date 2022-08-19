const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Character = require("../../../../src/models/Character");
const random = require("../../../shared/random");

const getUrl = id => `/api/v1/character/${id}`;

const _id = random.mongoId().toString();
const name = random.name();

describe("Character module - update", () => {
  beforeEach(() => {
    CommonRepository.findOneAndUpdate = jest.fn(async (_, payload) => {
      return payload;
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a character", async () => {
    const { status } = await httpRequest("PATCH", getUrl(_id), { name });

    expect(status).toBe(200);
    expect(CommonRepository.findOneAndUpdate).toHaveBeenCalledWith(
      Character,
      { _id: _id },
      { name },
      "userTest",
      expect.any(Object)
    );
  });

  it("should fail because aft.user is not valid role", async () => {
    const { status, body } = await httpRequest("PATCH", getUrl(_id), { name }, "user");

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
