const Scene = require("../../models/Scene");
const CommonRepository = require("../common/repository");
const { getQueryBySlug, getUniqueIdentifiers } = require("../common/swagger/schemas");

const UniqueIdentifiers = getUniqueIdentifiers(Scene);

const create = (payload, user, options) => CommonRepository.create(Scene, payload, user, options);

const findByQuery = (query, options) => CommonRepository.findByQuery(Scene, query, options);

const findById = (id, user, options) =>
  CommonRepository.findOneByQuery(Scene, getQueryBySlug(id, UniqueIdentifiers), user, options);

const findOneAndUpdate = (id, payload, user, options) =>
  CommonRepository.findOneAndUpdate(Scene, getQueryBySlug(id, UniqueIdentifiers), payload, user, options);

const findOneAndDelete = (id, user, options) =>
  CommonRepository.findOneAndDelete(Scene, getQueryBySlug(id, UniqueIdentifiers), user, options);

const remove = (ids, user, options) => CommonRepository.remove(Scene, { _id: { $in: ids } }, user, options);

module.exports = { create, findByQuery, findById, findOneAndUpdate, findOneAndDelete, remove };
