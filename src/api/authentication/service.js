const { withTransaction } = require("../../db/helpers.js");
const { throwAftError } = require("../../services/throwAftError.js");
const { encryptPassword, validatePassword } = require("../../services/passwordEncryption");
const Repository = require("./repository");

const create = async (model, user, options) => {
  try {
    return withTransaction(async session => _createWithSession(model, user, { session, lean: true, ...options }));
  } catch (error) {
    throw error;
  }
};

const _createWithSession = async ({ username, password, roles }, user, options) =>
  Repository.create({ username, password: encryptPassword(password), roles }, user, options);

const login = async (username, password) => {
  const dbUser = await Repository.findOneByQuery({ username }, { select: ["password", "roles"], lean: true });
  if (!dbUser) {
    throwAftError("INVALID_CREDENTIALS");
  }
  await validatePassword(password, dbUser.password);

  return { username, roles: dbUser.roles };
};

const update = async (model, user, options) => {
  try {
    return withTransaction(async session => _updateWithSession(model, user, { session, lean: true, ...options }));
  } catch (error) {
    throw error;
  }
};

const _updateWithSession = async ({ password, newPassword, repeatNewPassword }, username, options) => {
  if (!(password && newPassword && repeatNewPassword && newPassword === repeatNewPassword)) {
    throwAftError("DATA_INVALID");
  }
  const { password: dbPassword } = await Repository.findOneByQuery({ username }, { select: ["password"], lean: true });
  await validatePassword(password, dbPassword);
  const res = await Repository.findOneAndUpdate(
    { username },
    { password: encryptPassword(newPassword), metadata: { updatedAt: new Date(), updatedBy: username } },
    username,
    options
  );
  delete res.password;

  return res;
};

module.exports = { create, login, update };
