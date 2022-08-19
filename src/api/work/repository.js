const Work = require("../../models/Work");
const CommonRepository = require("../common/repository");
const { getQueryBySlug, getUniqueIdentifiers } = require("../common/swagger/schemas");

const UniqueIdentifiers = getUniqueIdentifiers(Work);

const create = (payload, user, options) => CommonRepository.create(Work, payload, user, options);

const findByQuery = (query, user, options) => CommonRepository.findByQuery(Work, query, user, options);

const findBySlug = (slug, user, options) =>
  CommonRepository.findOneByQuery(Work, getQueryBySlug(slug, UniqueIdentifiers), user, options);

const findOneAndUpdate = (slug, payload, user, options) =>
  CommonRepository.findOneAndUpdate(Work, getQueryBySlug(slug, UniqueIdentifiers), payload, user, options);

const findOneAndDelete = (slug, user, options) =>
  CommonRepository.findOneAndDelete(Work, getQueryBySlug(slug, UniqueIdentifiers), user, options);

module.exports = { create, findByQuery, findOneAndUpdate, findOneAndDelete, findBySlug };
