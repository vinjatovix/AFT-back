const CharacterRepository = require("../character/repository");
const WorkRepository = require("../work/repository");
const SceneRepository = require("../scene/repository");
const { throwAftError } = require("../../services/throwAftError");
const { withTransaction } = require("../../db/helpers");
const Repository = require("./repository");

const create = async (payload, user) => Repository.create(payload, user);

const findAll = async options => Repository.findByQuery({}, { lean: true, ...options });

const findBySlug = async (slug, options) => Repository.findBySlug(slug, { lean: true, ...options });

const findOneAndUpdate = async (slug, payload, user, options) =>
  Repository.findOneAndUpdate(slug, payload, user, { ...options, json: true });

const findOneAndDelete = async (slug, user, options) => {
  const { _id: bookId } = await Repository.findBySlug(slug, { json: true, ...options });
  const characterIds = await _getCharacterIdsByBookId(bookId);
  const workIds = await _getWorkIdsByCharacterIds(characterIds, options);
  if (workIds.length) {
    throwAftError("CONSUMED_BOOK", { replace: { id: bookId, consumers: workIds.join(", ") } });
  }

  return _removeWithSession(slug, characterIds, user, options);
};

const _getWorkIdsByCharacterIds = async (characters, options) =>
  (await WorkRepository.findByQuery({ character: { $in: characters } }, { json: true, ...options })).map(
    ({ _id }) => _id
  );

const _getCharacterIdsByBookId = async bookId =>
  (await CharacterRepository.findByQuery({ book: bookId }, { json: true })).map(({ _id }) => _id);

const _removeWithSession = (slug, characterIds, user, options) =>
  withTransaction(async session => {
    if (characterIds.length) {
      const sceneIds = await _getSceneIdsByCharacterIds(characterIds, options);
      sceneIds.length && (await SceneRepository.remove(sceneIds, user, { session }));
      await CharacterRepository.remove(characterIds, user, { session, ...options });
    }
    await Repository.findOneAndDelete(slug, user, { session, ...options });
  });

const _getSceneIdsByCharacterIds = async (characterIds, options) =>
  (await SceneRepository.findByQuery({ character: { $in: characterIds } }, { json: true, ...options })).map(
    ({ _id }) => _id
  );

module.exports = { create, findAll, findBySlug, findOneAndUpdate, findOneAndDelete };
