const bcrypt = require("bcrypt");
const { throwAftError } = require("./throwAftError");

const encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const validatePassword = async (password, ref) => {
  if (!(await bcrypt.compare(password, ref))) {
    throwAftError("INVALID_CREDENTIALS");
  }
};

module.exports = { encryptPassword, validatePassword };
