const Repository = require("./repository");

const create = async (payload, user, options) => Repository.create(payload, user, options);

const findAll = async (filter, options) => Repository.findByQuery(filter, { lean: true, ...options });

const findBySlug = async (slug, user, options) =>
  Repository.findBySlug(slug, user, { lean: true, ...options, exists: true });

const findByBookId = async (bookId, options) => Repository.findByQuery({ book: bookId }, { lean: true, ...options });

const findOneAndUpdate = async (slug, payload, user, options) =>
  Repository.findOneAndUpdate(slug, payload, user, options);

const findOneAndDelete = async (slug, user, options) => Repository.findOneAndDelete(slug, user, options);

module.exports = { create, findAll, findOneAndUpdate, findOneAndDelete, findBySlug, findByBookId };
