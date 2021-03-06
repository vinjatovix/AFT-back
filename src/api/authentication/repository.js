const User = require("../../models/User");
const CommonRepository = require("../common/repository");

const create = (payload, user, options) => CommonRepository.create(User, payload, user, options);
const findOneByQuery = (query, options) => CommonRepository.findOneByQuery(User, query, options);
const findOneAndUpdate = (query, payload, user, options) =>
  CommonRepository.findOneAndUpdate(User, query, payload, user, options);

module.exports = { create, findOneByQuery, findOneAndUpdate };
