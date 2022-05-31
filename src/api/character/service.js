const Repository = require("./repository");

const create = async (payload, user) => Repository.create(payload, user);

const findAll = async options => Repository.findByQuery({}, { lean: true, ...options });

const findById = async (modelId, options) => Repository.findById(modelId, { lean: true, ...options });

const findOneAndUpdate = async (modelId, payload, user, options) =>
  Repository.findOneAndUpdate(modelId, payload, user, options);

const findOneAndDelete = async (modelId, user, options) => Repository.findOneAndDelete(modelId, user, options);

module.exports = { create, findAll, findOneAndUpdate, findOneAndDelete, findById };
