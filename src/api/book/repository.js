const Book = require("../../models/Book");
const CommonRepository = require("../common/repository");
const { getQueryBySlug, getUniqueIdentifiers } = require("../common/swagger/schemas");

const UniqueIdentifiers = getUniqueIdentifiers(Book);

const create = (payload, user, options) => CommonRepository.create(Book, payload, user, options);

const findByQuery = (query, options) => CommonRepository.findByQuery(Book, query, options);

const findBySlug = (slug, options) =>
  CommonRepository.findOneByQuery(Book, getQueryBySlug(slug, UniqueIdentifiers), options);

const findOneAndUpdate = (slug, payload, user, options) =>
  CommonRepository.findOneAndUpdate(Book, getQueryBySlug(slug, UniqueIdentifiers), payload, user, options);

const findOneAndDelete = (slug, user, options) =>
  CommonRepository.findOneAndDelete(Book, getQueryBySlug(slug, UniqueIdentifiers), user, options);

module.exports = { create, findByQuery, findBySlug, findOneAndUpdate, findOneAndDelete };
