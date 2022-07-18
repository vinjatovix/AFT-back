const Scene = require("../../../models/Scene");
const { createMetadata } = require("../../common/shared");
const {
  makeExample,
  notFoundResponse,
  duplicatedResponse,
  unauthorizedResponse,
  badRequestResponse
} = require("../../common/swagger");
const { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_OK, HTTP_NOT_FOUND, HTTP_CONFLICT, HTTP_UNAUTHORIZED, HTTP_NO_CONTENT } =
  require("../../../service/httpStatusCodes").httpStatusCodes;

const SceneModel = Scene.jsonSchema();

const SceneSchema = {
  ...SceneModel,
  example: {
    name: "18 - Me voy",
    description: "Fernando se va de una ciudad a otra",
    location: "Ciudad de la Muerte",
    time: "1:00",
    characters: ["62c095d61e84f6931450d14a"]
  }
};

const CreatedSceneExample = {
  _id: "62227589817ba593cd7631a9",
  ...SceneSchema.example,
  metadata: createMetadata("GOD")
};

const responses = {
  unauthorized: { [HTTP_UNAUTHORIZED]: unauthorizedResponse },
  notFound: { [HTTP_NOT_FOUND]: makeExample("Not Found", notFoundResponse("62c062af519e0805cbdeefaa", "Character")) },
  badRequest: { [HTTP_BAD_REQUEST]: makeExample("Bad Request", badRequestResponse("Character", "name")) },
  conflict: { [HTTP_CONFLICT]: makeExample("Conflict", duplicatedResponse("characters", "name")) }
};

module.exports = {
  SceneSchema,
  responses: {
    getScenes: {
      [HTTP_OK]: makeExample("Get Scenes", [CreatedSceneExample]),
      ...responses.unauthorized
    },
    postScene: {
      [HTTP_CREATED]: makeExample("Scene created", CreatedSceneExample),
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.unauthorized
    },
    getSceneBySlug: {
      [HTTP_OK]: makeExample("Scene found", CreatedSceneExample),
      ...responses.notFound,
      ...responses.unauthorized
    },
    patchScene: {
      [HTTP_OK]: makeExample("Scene updated", CreatedSceneExample),
      ...responses.notFound,
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.unauthorized
    },
    deleteScene: {
      [HTTP_NO_CONTENT]: makeExample("Scene deleted", {}),
      ...responses.unauthorized
    }
  }
};
