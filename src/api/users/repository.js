const User = require("../../models/User");
const CommonRepository = require("../common/repository");

const findByQuery = (query, user, options) =>
  CommonRepository.findByQuery(User, query, user, {
    ...options,
    select: ["_id", "username", "roles", "metadata", "group"]
  });

module.exports = { findByQuery };
