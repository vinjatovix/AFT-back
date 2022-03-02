const { httpStatusCodes } = require("../../service/httpStatusCodes");
const Service = require("./service");

const create = async (ctx, next) => {
  ctx.body = await Service.create(ctx.request.body, ctx.state.userData.username);
  ctx.status = httpStatusCodes.HTTP_CREATED;
  await next();
};

const findAll = async (ctx, next) => {
  ctx.body = await Service.findAll();
  await next();
};
module.exports = {
  create,
  findAll
};
