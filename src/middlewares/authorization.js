const { anyRole, isAdmin, isEditor, verifyToken } = require("../services/authorization");
const { throwAftError } = require("../services/throwAftError");

const authAdmin = async (ctx, next) => {
  isAdmin(ctx.state.userData);
  await next();
};
const authEditor = async (ctx, next) => {
  isEditor(ctx.state.userData);
  await next();
};

const authAnyRole = async (ctx, next) => {
  anyRole(ctx.state.userData);
  await next();
};

const getCredentials = async (ctx, next) => {
  const { username, roles } = ctx.state.tokenData;
  ctx.state.userData = { username, roles };
  await next();
};

const tokenAuth = async (ctx, next) => {
  try {
    const token = ctx.request.headers.authorization;
    const user = verifyToken(token);
    ctx.state.tokenData = user;
  } catch (error) {
    ctx.set("Access-Control-Expose-Headers", "X-Itx-WWW-Authenticate");
    ctx.set("X-Itx-WWW-Authenticate", "Form /authentication/login");
    throwAftError(error.id || error.message);
  }
  await next();
};

module.exports = {
  authAdmin,
  authEditor,
  authAnyRole,
  getCredentials,
  tokenAuth
};
