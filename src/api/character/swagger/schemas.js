const Character = require("../../../models/Character");
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

const CharacterModel = Character.jsonSchema();

const CharacterSchema = {
  ...CharacterModel,
  example: {
    name: "A Cona",
    gender: "female",
    book: "62969e2dbb8616d8493afa7f",
    description: "Dura de pelar",
    center: "instintive"
  }
};

const createdCharacterExample = {
  _id: "62227589817ba593cd7631a9",
  ...CharacterSchema.example,
  metadata: createMetadata("GOD")
};

const responses = {
  unauthorized: { [HTTP_UNAUTHORIZED]: unauthorizedResponse },
  notFound: { [HTTP_NOT_FOUND]: makeExample("Not Found", notFoundResponse("62c062af519e0805cbdeefaa", "Character")) },
  badRequest: { [HTTP_BAD_REQUEST]: makeExample("Bad Request", badRequestResponse("Character", "name")) },
  conflict: { [HTTP_CONFLICT]: makeExample("Conflict", duplicatedResponse("characters", "name")) }
};

module.exports = {
  CharacterSchema,
  responses: {
    getCharacters: {
      [HTTP_OK]: makeExample("Get Characters", [createdCharacterExample]),
      ...responses.unauthorized
    },
    postCharacter: {
      [HTTP_CREATED]: makeExample("Character created", createdCharacterExample),
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.unauthorized
    },
    getCharacterBySlug: {
      [HTTP_OK]: makeExample("Character found", createdCharacterExample),
      ...responses.notFound,
      ...responses.unauthorized
    },
    patchCharacter: {
      [HTTP_OK]: makeExample("Character updated", createdCharacterExample),
      ...responses.notFound,
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.unauthorized
    },
    deleteCharacter: {
      [HTTP_NO_CONTENT]: makeExample("Character deleted", createdCharacterExample),
      ...responses.unauthorized
    },
    getCharactersByBookId: {
      [HTTP_OK]: makeExample("Character found", [createdCharacterExample])
    }
  }
};
