const Repository = require("./repository");

const create = async (payload, user, options) => Repository.create(payload, user, options);

const findAll = async (filter, options) => Repository.findByQuery(filter, { lean: true, ...options });

const findById = async (id, user, options) => Repository.findById(id, user, { lean: true, ...options, exists: true });

const findOneAndUpdate = async (id, payload, user, options) => Repository.findOneAndUpdate(id, payload, user, options);

const findOneAndDelete = async (id, user, options) => Repository.findOneAndDelete(id, user, options);

module.exports = { create, findAll, findById, findOneAndUpdate, findOneAndDelete };
