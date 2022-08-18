const { ObjectId } = require("mongoose").Types;
const random = require("../../../shared/random");
const httpRequest = require("../../../fixtures/httpRequest")();
const Repository = require("../../../../src/api/scene/repository");

const getUrl = slug => `/api/v1/scene/${slug}`;

describe("Scene module - update", () => {
  beforeEach(() => {
    Repository.findOneAndUpdate = jest.fn(async payload => {
      return payload;
    });
  });

  it("should update a scene", async () => {
    const scene = {
      description: random.word(),
      location: random.word(),
      time: random.word(),
      characters: [ObjectId()]
    };
    const { status } = await httpRequest("PATCH", getUrl(scene.name), scene);

    expect(status).toBe(200);
  });

  it("should fail because aft.user is not a valid role", async () => {
    const scene = {
      description: random.word(),
      location: random.word(),
      time: random.word(),
      characters: [ObjectId()]
    };
    const { status, body } = await httpRequest("PATCH", getUrl(scene.name), scene, "user");

    expect(status).toBe(403);
    expect(body).toMatchObject({
      module: "authorization",
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed"
    });
  });
});
