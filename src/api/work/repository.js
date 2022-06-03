const Work = require("../../models/Work");
const CommonRepository = require("../common/repository");

const create = (payload, user, options) => CommonRepository.create(Work, payload, user, options);

const findByQuery = (query, options) => CommonRepository.findByQuery(Work, query, options);

const findById = (_id, options) => CommonRepository.findByQuery(Work, { _id }, options);

const findOneAndUpdate = (_id, payload, user, options) =>
  CommonRepository.findOneAndUpdate(Work, { _id }, payload, user, options);

const findOneAndDelete = (_id, user, options) => CommonRepository.findOneAndDelete(Work, { _id }, user, options);

module.exports = { create, findByQuery, findOneAndUpdate, findOneAndDelete, findById };
