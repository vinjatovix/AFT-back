const Character = require("../../models/Character");
const CommonRepository = require("../common/repository");
const { getQueryBySlug, getUniqueIdentifiers } = require("../common/swagger/schemas");

const create = (payload, user, options) => CommonRepository.create(Character, payload, user, options);

const findByQuery = (query, options) => CommonRepository.findByQuery(Character, query, options);

const findBySlug = (slug, user, options) =>
  CommonRepository.findOneByQuery(Character, getQueryBySlug(slug, getUniqueIdentifiers(Character)), user, options);

const findOneAndUpdate = (slug, payload, user, options) =>
  CommonRepository.findOneAndUpdate(
    Character,
    getQueryBySlug(slug, getUniqueIdentifiers(Character)),
    payload,
    user,
    options
  );

const findOneAndDelete = (slug, user, options) =>
  CommonRepository.findOneAndDelete(Character, getQueryBySlug(slug, getUniqueIdentifiers(Character)), user, options);

const remove = (ids, user, options) => CommonRepository.remove(Character, { _id: { $in: ids } }, user, options);

module.exports = { create, findByQuery, findOneAndUpdate, findOneAndDelete, findBySlug, remove };
