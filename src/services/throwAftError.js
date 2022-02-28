const { errorCodes } = require("./errorCodes");

const throwAftError = (id, { replace = {}, ...extraInfo } = {}) => {
  const error = errorCodes(replace).find(err => err.id === id);
  throw error;
};

module.exports = {
  throwAftError
};
