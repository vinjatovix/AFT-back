const Repository = require("./repository");

const create = async (payload, user) => Repository.create(payload, user);

const findAll = async (filter, options) => Repository.findByQuery(filter, { json: true, ...options });

const findBySlug = async (slug, options) => Repository.findBySlug(slug, { json: true, ...options });

const findOneAndUpdate = async (slug, payload, user, options) =>
  Repository.findOneAndUpdate(slug, payload, user, options);

const findOneAndDelete = async (slug, user, options) => Repository.findOneAndDelete(slug, user, options);

module.exports = { create, findAll, findBySlug, findOneAndUpdate, findOneAndDelete };
