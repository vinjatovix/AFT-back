const CharacterRepository = require("../character/repository");
const WorkRepository = require("../work/repository");
const SceneRepository = require("../scene/repository");
const { throwAftError } = require("../../services/throwAftError");
const { withTransaction } = require("../../db/helpers");
const Repository = require("./repository");

const create = async (payload, user) => Repository.create(payload, user);

const findAll = async (filter, user, options) => Repository.findByQuery(filter, user, { lean: true, ...options });

const findBySlug = async (slug, user, options) => Repository.findBySlug(slug, user, { lean: true, ...options });

const findOneAndUpdate = async (slug, payload, user, options) =>
  Repository.findOneAndUpdate(slug, payload, user, { ...options, json: true });

const findOneAndDelete = async (slug, user, options) => {
  const { _id: bookId } = await Repository.findBySlug(slug, user, { json: true, ...options });
  const characterIds = await _getCharacterIdsByBookId(bookId, user);
  const workIds = await _getWorkIdsByCharacterIds(characterIds, user, options);
  if (workIds.length) {
    throwAftError("CONSUMED_BOOK", { replace: { id: bookId, consumers: workIds.join(", ") } });
  }

  return _removeWithSession(slug, characterIds, user, options);
};

const _getWorkIdsByCharacterIds = async (characters, user, options) =>
  (await WorkRepository.findByQuery({ character: { $in: characters } }, user, { json: true, ...options })).map(
    ({ _id }) => _id
  );

const _getCharacterIdsByBookId = async (bookId, user) =>
  (await CharacterRepository.findByQuery({ book: bookId }, user, { json: true })).map(({ _id }) => _id);

const _removeWithSession = (slug, characterIds, user, options) =>
  withTransaction(async session => {
    if (characterIds.length) {
      const sceneIds = await _getSceneIdsByCharacterIds(characterIds, user, options);
      sceneIds.length && (await SceneRepository.remove(sceneIds, user, { session }));
      await CharacterRepository.remove(characterIds, user, { session, ...options });
    }
    await Repository.findOneAndDelete(slug, user, { session, ...options });
  });

const _getSceneIdsByCharacterIds = async (characterIds, user, options) =>
  (await SceneRepository.findByQuery({ character: { $in: characterIds } }, user, { json: true, ...options })).map(
    ({ _id }) => _id
  );

module.exports = { create, findAll, findBySlug, findOneAndUpdate, findOneAndDelete };
