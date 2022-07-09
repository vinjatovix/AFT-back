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

const findById = async (ctx, next) => {
  ctx.body = await Service.findById(ctx.params.id);
  await next();
};

const findByBookId = async (ctx, next) => {
  ctx.body = await Service.findByBookId(ctx.params.id);
  await next();
};

const findOneAndUpdate = async (ctx, next) => {
  ctx.body = await Service.findOneAndUpdate(ctx.params.id, ctx.request.body, ctx.state.userData.username);
  ctx.status = httpStatusCodes.HTTP_OK;
  await next();
};

const findOneAndDelete = async (ctx, next) => {
  ctx.body = await Service.findOneAndDelete(ctx.params.id, ctx.state.userData.username);
  ctx.status = httpStatusCodes.HTTP_NO_CONTENT;
  await next();
};

module.exports = {
  create,
  findAll,
  findById,
  findOneAndUpdate,
  findOneAndDelete,
  findByBookId
};
