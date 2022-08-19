const httpRequest = require("../../../fixtures/httpRequest")();
const CommonRepository = require("../../../../src/api/common/repository");
const Work = require("../../../../src/models/Work");
const random = require("../../../shared/random");

const getUrl = id => `/api/v1/work/${id}`;

const _id = random.mongoId().toString();

const DEFAULT_WORK = {
  scene: random.mongoId().toString(),
  description: random.word(),
  character: random.mongoId().toString(),
  actionUnits: [{ order: 0, action: random.word() }],
  previousCircumstances: [random.word()],
  animal: random.word(),
  referent: random.word()
};

describe("Work module - update", () => {
  beforeEach(() => {
    CommonRepository.findOneAndUpdate = jest.fn(async (_, payload) => payload);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a valid work", async () => {
    const { status } = await httpRequest("PATCH", getUrl(_id), DEFAULT_WORK);

    expect(CommonRepository.findOneAndUpdate).toHaveBeenCalledWith(
      Work,
      { _id },
      DEFAULT_WORK,
      "userTest",
      expect.any(Object)
    );

    expect(status).toBe(200);
  });

  it("should update even if role is aft.user", async () => {
    const { status } = await httpRequest("PATCH", getUrl(_id), DEFAULT_WORK, "user");

    expect(status).toBe(200);
  });
});
