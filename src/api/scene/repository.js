const Scene = require("../../models/Scene");
const CommonRepository = require("../common/repository");
const { getQueryBySlug, getUniqueIdentifiers } = require("../common/swagger/schemas");

const UniqueIdentifiers = getUniqueIdentifiers(Scene);

const create = (payload, user, options) => CommonRepository.create(Scene, payload, user, options);

const findByQuery = (query, options) => CommonRepository.findByQuery(Scene, query, options);

const findBySlug = (slug, options) =>
  CommonRepository.findBySlug(Scene, getQueryBySlug(slug, UniqueIdentifiers), options);

const findOneAndUpdate = (slug, payload, user, options) =>
  CommonRepository.findOneAndUpdate(Scene, getQueryBySlug(slug, UniqueIdentifiers), payload, user, options);

const findOneAndDelete = (slug, user, options) =>
  CommonRepository.findOneAndDelete(Scene, getQueryBySlug(slug, UniqueIdentifiers), user, options);

const remove = (ids, user, options) => CommonRepository.remove(Scene, { _id: { $in: ids } }, user, options);

module.exports = { create, findByQuery, findBySlug, findOneAndUpdate, findOneAndDelete, remove };
