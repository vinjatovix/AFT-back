const User = require("../../models/User");
const CommonRepository = require("../common/repository");

const create = (payload, user, options) => CommonRepository.create(User, payload, user, options);

const findOneByQuery = (query, user, options) => CommonRepository.findOneByQuery(User, query, user, options);

const findOneAndUpdate = (query, payload, user, options) =>
  CommonRepository.findOneAndUpdate(User, query, payload, user, options);

module.exports = { create, findOneByQuery, findOneAndUpdate };
