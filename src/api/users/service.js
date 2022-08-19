const Repository = require("./repository");

const findAll = async (filter, user, options) => Repository.findByQuery(filter, user, { lean: true, ...options });

module.exports = { findAll };
