const httpRequest = require("../../../fixtures/httpRequest")();
const Repository = require("../../../../src/api/book/repository");
const CharacterRepository = require("../../../../src/api/character/repository");
const WorkRepository = require("../../../../src/api/work/repository");
const SceneRepository = require("../../../../src/api/scene/repository");
const CommonRepository = require("../../../../src/api/common/repository");
const random = require("../../../shared/random");

const getUrl = slug => `/api/v1/book/${slug}`;
const getId = () => random.mongoId().toString();

const DEL = "DEL";
const ID = getId();
const USER = "userTest";

const removeCharsSpy = jest.spyOn(CharacterRepository, "remove");
const removeScenesSpy = jest.spyOn(SceneRepository, "remove");

describe("Book module - delete", () => {
  beforeEach(() => {
    CommonRepository.remove = jest.fn();
    CommonRepository.findByQuery = jest.fn().mockReturnValue([{ _id: getId() }]);
    Repository.findBySlug = jest.fn().mockResolvedValue({ _id: ID });
    Repository.findOneAndDelete = jest.fn();
    WorkRepository.findByQuery = jest.fn().mockReturnValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete related characters and scenes when removing a book", async () => {
    const { status } = await httpRequest(DEL, getUrl(ID));

    expect(status).toBe(204);
    expect(removeCharsSpy).toHaveBeenCalledWith([expect.any(String)], USER, expect.any(Object));
    expect(removeScenesSpy).toHaveBeenCalledWith([expect.any(String)], USER, expect.any(Object));
  });

  it("should not call CharacterRepository nor SceneRepository to remove if there are not chars related", async () => {
    CharacterRepository.findByQuery = jest.fn().mockReturnValue([]);

    const { status } = await httpRequest(DEL, getUrl(ID));

    expect(status).toBe(204);
    expect(removeCharsSpy).not.toHaveBeenCalled();
    expect(removeScenesSpy).not.toHaveBeenCalled();
  });

  it("should fail because aft.user is not valid role", async () => {
    const { status, body } = await httpRequest(DEL, getUrl(ID), null, "user");

    expect(status).toBe(403);
    expect(body).toMatchObject({
      module: "authorization",
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed",
      status: 403
    });
  });

  it("should fail with code E41 if book has related works", async () => {
    const workId = getId();
    WorkRepository.findByQuery = jest.fn().mockReturnValue([{ _id: workId }]);

    const { status, body } = await httpRequest(DEL, getUrl(ID));

    expect(status).toBe(409);
    expect(body).toMatchObject({
      module: "book",
      code: "E41",
      id: "CONSUMED_BOOK",
      message: `Document (${ID}) is being consumed by: (${workId})`,
      viewMessage: "Document is being consumed by another entity",
      viewName: ID
    });
  });
});
