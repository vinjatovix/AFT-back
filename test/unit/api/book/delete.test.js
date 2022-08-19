const httpRequest = require("../../../fixtures/httpRequest")();
const CharacterRepository = require("../../../../src/api/character/repository");
const WorkRepository = require("../../../../src/api/work/repository");
const SceneRepository = require("../../../../src/api/scene/repository");
const CommonRepository = require("../../../../src/api/common/repository");
const Character = require("../../../../src/models/Character");
const Scene = require("../../../../src/models/Scene");
const Book = require("../../../../src/models/Book");
const random = require("../../../shared/random");

const getUrl = slug => `/api/v1/book/${slug}`;
const getId = () => random.mongoId().toString();

const DEL = "DEL";
const bookId = getId();
const charId = getId();
const sceneId = getId();
const USER = "userTest";

describe("Book module - delete", () => {
  beforeEach(() => {
    CommonRepository.findByQuery = jest.fn(Model => {
      let res = [];
      if (Model === Character) {
        res = [{ _id: charId }];
      }
      if (Model === Scene) {
        res = [{ _id: sceneId }];
      }

      return res;
    });
    CommonRepository.findOneByQuery = jest.fn().mockReturnValue({ _id: bookId });
    CommonRepository.remove = jest.fn().mockReturnValue({});
    CommonRepository.findOneAndDelete = jest.fn().mockReturnValue({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete related characters and scenes with session when removing a book", async () => {
    const session = {
      session: expect.any(Object)
    };

    const { status } = await httpRequest(DEL, getUrl(bookId));

    expect(status).toBe(204);
    expect(CommonRepository.remove).toHaveBeenCalledTimes(2);
    expect(CommonRepository.remove).toHaveBeenNthCalledWith(1, Scene, { _id: { $in: [sceneId] } }, USER, session);
    expect(CommonRepository.remove).toHaveBeenNthCalledWith(2, Character, { _id: { $in: [charId] } }, USER, session);
    expect(CommonRepository.findOneAndDelete).toHaveBeenCalledWith(Book, { _id: bookId }, USER, session);
  });

  it("should not call CharacterRepository nor SceneRepository to remove if there are not chars related", async () => {
    CharacterRepository.findByQuery = jest.fn().mockReturnValue([]);
    const removeCharsSpy = jest.spyOn(CharacterRepository, "remove");
    const removeScenesSpy = jest.spyOn(SceneRepository, "remove");

    const { status } = await httpRequest(DEL, getUrl(bookId));

    expect(status).toBe(204);
    expect(removeCharsSpy).not.toHaveBeenCalled();
    expect(removeScenesSpy).not.toHaveBeenCalled();
  });

  it("should fail because aft.user is not valid role", async () => {
    const { status, body } = await httpRequest(DEL, getUrl(bookId), null, "user");

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

    const { status, body } = await httpRequest(DEL, getUrl(bookId));

    expect(status).toBe(409);
    expect(body).toMatchObject({
      module: "book",
      code: "E41",
      id: "CONSUMED_BOOK",
      message: `Document (${bookId}) is being consumed by: (${workId})`,
      viewMessage: "Document is being consumed by another entity",
      viewName: bookId
    });
  });
});
