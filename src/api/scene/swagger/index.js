const { get, post, del, put } = require("../../common/swagger");
const { SceneSchema, responses } = require("./schemas");

const SceneTag = { name: "scene", description: "Scene" };
const security = [{ bearerAuth: [] }];

const postScene = {
  ...post(SceneSchema, SceneSchema),
  tags: [SceneTag.name],
  summary: "Add a new scene to the collection",
  operationId: "addScene",
  responses: responses.postScene,
  security
};

const getScene = {
  ...get(SceneSchema, { select: true, include: true, filter: true }),
  tags: [SceneTag.name],
  summary: "Get all scenes",
  operationId: "getScene",
  responses: responses.getScene,
  security
};

const getSceneBySlug = {
  ...get(SceneSchema, { slug: true, select: true, include: true }),
  tags: [SceneTag.name],
  summary: "Get a scene by slug",
  operationId: "getSceneBySlug",
  responses: responses.getSceneBySlug,
  security
};

const patchScene = {
  ...put(SceneSchema, SceneSchema, { slug: true, include: true }, SceneSchema),

  tags: [SceneTag.name],
  summary: "Update a scene",

  operationId: "updateScene",
  responses: responses.patchScene,
  security
};

const deleteScene = {
  ...del({ slug: true }),
  tags: [SceneTag.name],
  summary: "Delete a scene",
  operationId: "deleteScene",
  security
};

module.exports = {
  SceneSchema,
  SceneTag: SceneTag,
  SceneRoutes: { get: getScene, post: postScene },
  sceneSlugRoutes: { get: getSceneBySlug, patch: patchScene, delete: deleteScene }
};
