const User = require("../../models/User");
const CommonRepository = require("../common/repository");

const findByQuery = (query, options) =>
  CommonRepository.findByQuery(User, query, { ...options, select: ["_id", "username", "roles", "metadata", "group"] });

module.exports = { findByQuery };
