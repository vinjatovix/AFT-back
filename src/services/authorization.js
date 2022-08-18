const jwt = require("jsonwebtoken");
const { allowedRoles } = require("../../config/cfg.json").aft;
const { throwAftError } = require("./throwAftError");

const secret = process.env.SECRET;
const expiresIn = +process.env.EXPIRES || 300000;

const createToken = (username, roles) => {
  const payload = { username, roles };
  const token = jwt.sign(payload, secret, { expiresIn });
  return {
    token,
    user: { username, roles }
  };
};

const verifyToken = token => {
  if (!token) {
    throwAftError("TOKEN_REQUIRED");
  }
  try {
    const user = jwt.verify(token.replace("Bearer ", ""), secret);
    if (!user.roles.some(rol => allowedRoles.includes(rol))) {
      throwAftError("INVALID_ROLE");
    }
    return {
      username: user.username,
      roles: user.roles
    };
  } catch (error) {
    if (error.code === "E4") throw error;
    throwAftError("INVALID_TOKEN");
  }
};

const hasRole = (user, role) => {
  if (!user.roles || (user.roles.length && !user.roles.includes(role))) {
    throwAftError("INVALID_ROLE");
  }
};
const anyRole = user => {
  if (!user.roles.some(rol => allowedRoles.includes(rol))) {
    throwAftError("INVALID_ROLE");
  }
};

module.exports = {
  createToken,
  verifyToken,
  anyRole,
  isAdmin: user => hasRole(user, "aft.admin"),
  isEditor: user => hasRole(user, "aft.editor")
};
