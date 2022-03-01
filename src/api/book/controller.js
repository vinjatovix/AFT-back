//TODO: AUTH USER
const { httpStatusCodes } = require("../../service/httpStatusCodes");
const Service = require("./service");

const create = async (ctx, next) => {
  ctx.body = await Service.create(ctx.request.body, "WIPuser");
  ctx.status = httpStatusCodes.HTTP_CREATED;
  await next();
};
module.exports = {
  create
};
