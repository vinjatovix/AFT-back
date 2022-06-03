const Repository = require("./repository");

const create = async (payload, user) => Repository.create(payload, user);

const findAll = async options => Repository.findByQuery({}, { lean: true, ...options });

const findById = async (_id, options) => Repository.findByQuery({ _id }, { lean: true, ...options });

const findOneAndUpdate = async (_id, payload, user, options) =>
  Repository.findOneAndUpdate(_id, payload, user, options);

const findOneAndDelete = async (_id, user, options) => Repository.findOneAndDelete(_id, user, options);

module.exports = { create, findAll, findById, findOneAndUpdate, findOneAndDelete };
