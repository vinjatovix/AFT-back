const { createToken } = require("../../services/authorization");
const { throwAftError } = require("../../services/throwAftError");
const { HTTP_CREATED, HTTP_OK } = require("../../service/httpStatusCodes").httpStatusCodes;
const Service = require("./service");

const authenticate = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  ctx.state.userData = await Service.login(username, password);
  await next();
};

const createUser = async (ctx, next) => {
  const { username, roles } = await Service.create(ctx.request.body, ctx.state.userData.username);
  ctx.body = { username, roles };
  ctx.status = HTTP_CREATED;
  await next();
};

const updateUser = async (ctx, next) => {
  const { username, roles } = await Service.update(ctx.request.body, ctx.state.userData.username);
  ctx.body = { username, roles };
  ctx.status = HTTP_OK;
  await next();
};

const generateToken = async (ctx, next) => {
  try {
    const { username, roles } = ctx.state.userData;
    ctx.body = createToken(username, roles);
  } catch (error) {
    throwAftError();
  }
  await next();
};
const getCredentials = ctx => (ctx.body = ctx.state.userData);

module.exports = {
  authenticate,
  createUser,
  updateUser,
  generateToken,
  getCredentials
};
