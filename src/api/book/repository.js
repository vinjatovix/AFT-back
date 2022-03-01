const Book = require("../../models/Book");
const CommonRepository = require("../common/repository");

const create = (payload, user, options) => CommonRepository.create(Book, payload, user, options);

module.exports = { create };
