const { get, post, del, put } = require("../../common/swagger");
const { CharacterSchema, responses } = require("./schemas");

const CharacterTag = { name: "character", description: "Characters" };
const security = [{ bearerAuth: [] }];

const postCharacter = {
  ...post(CharacterSchema, CharacterSchema),
  tags: [CharacterTag.name],
  summary: "Add a new character to the collection",
  operationId: "addCharacter",
  responses: responses.postCharacter,
  security
};

const getCharacters = {
  ...get(CharacterSchema, { select: true, include: true, filter: true }),
  tags: [CharacterTag.name],
  summary: "Get all characters",
  operationId: "getCharacters",
  responses: responses.getCharacters,
  security
};

const getCharacterBySlug = {
  ...get(CharacterSchema, { slug: true, select: true, include: true }),
  tags: [CharacterTag.name],
  summary: "Get a character by slug",
  operationId: "getCharacterBySlug",
  responses: responses.getCharacterBySlug,
  security
};

const patchCharacter = {
  ...put(CharacterSchema, CharacterSchema, { slug: true, include: true }, CharacterSchema),
  tags: [CharacterTag.name],
  summary: "Update a character",
  operationId: "updateCharacter",
  responses: responses.patchCharacter,
  security
};

const deleteCharacter = {
  ...del({ slug: true }),
  tags: [CharacterTag.name],
  summary: "Delete a character",
  operationId: "deleteCharacter",
  security
};

module.exports = {
  CharacterSchema,
  CharacterTag,
  CharacterRoutes: { get: getCharacters, post: postCharacter },
  characterSlugRoutes: { get: getCharacterBySlug, patch: patchCharacter, delete: deleteCharacter }
};
