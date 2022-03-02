const Repository = require("./repository");

const create = async (payload, user) => Repository.create(payload, user);

module.exports = { create };
