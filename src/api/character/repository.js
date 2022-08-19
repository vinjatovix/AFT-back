const Character = require("../../models/Character");
const CommonRepository = require("../common/repository");

const create = (payload, user, options) => CommonRepository.create(Character, payload, user, options);

const findByQuery = (query, options) => CommonRepository.findByQuery(Character, query, options);

const findById = (_id, user, options) => CommonRepository.findOneByQuery(Character, { _id }, user, options);

const findOneAndUpdate = (_id, payload, user, options) =>
  CommonRepository.findOneAndUpdate(Character, { _id }, payload, user, options);

const findOneAndDelete = (_id, user, options) => CommonRepository.findOneAndDelete(Character, { _id }, user, options);

const remove = (ids, user, options) => CommonRepository.remove(Character, { _id: { $in: ids } }, user, options);

module.exports = { create, findByQuery, findOneAndUpdate, findOneAndDelete, findById, remove };
