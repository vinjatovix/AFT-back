const Repository = require("./repository");

const create = async (payload, user) => Repository.create(payload, user);
const findAll = async options => Repository.findByQuery({}, { lean: true, ...options });

module.exports = { create, findAll };
