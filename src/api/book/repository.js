const Book = require("../../models/Book");
const CommonRepository = require("../common/repository");

const create = (payload, user, options) => CommonRepository.create(Book, payload, user, options);
const findByQuery = (query, options) => CommonRepository.findByQuery(Book, query, options);

module.exports = { create, findByQuery };
