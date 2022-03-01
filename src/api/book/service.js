const Repository = require("./repository");

const create = async (payload, user) => {
  return Repository.create(payload, user);
};

module.exports = { create };
