const Repository = require("./repository");

const findAll = async options => Repository.findByQuery({}, { lean: true, ...options });

module.exports = { findAll };
