const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Work = require("../../../../src/models/Work");
const random = require("../../../shared/random");

const getUrl = id => `/api/v1/work/${id}`;

const _id = random.mongoId().toString();

describe("Work module - delete", () => {
  beforeEach(() => {
    CommonRepository.findOneAndDelete = jest.fn(async (_, payload) => {
      return payload;
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a work", async () => {
    const { status } = await httpRequest("DEL", getUrl(_id));

    expect(status).toBe(204);
    expect(CommonRepository.findOneAndDelete).toHaveBeenCalledWith(Work, { _id }, "userTest", undefined);
  });

  it("should fail if role is not valid", async () => {
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
