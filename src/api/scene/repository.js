const Scene = require("../../models/Scene");
const CommonRepository = require("../common/repository");

const create = (payload, user, options) => CommonRepository.create(Scene, payload, user, options);

const findByQuery = (query, user, options) => CommonRepository.findByQuery(Scene, query, user, options);

const findById = (_id, user, options) => CommonRepository.findOneByQuery(Scene, { _id }, user, options);

const findOneAndUpdate = (_id, payload, user, options) =>
  CommonRepository.findOneAndUpdate(Scene, { _id }, payload, user, options);

const findOneAndDelete = (_id, user, options) => CommonRepository.findOneAndDelete(Scene, { _id }, user, options);

const remove = (ids, user, options) => CommonRepository.remove(Scene, { _id: { $in: ids } }, user, options);

module.exports = { create, findByQuery, findById, findOneAndUpdate, findOneAndDelete, remove };
