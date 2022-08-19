const { httpStatusCodes } = require("../../service/httpStatusCodes");
const Service = require("./service");

const create = async (ctx, next) => {
  const { select, populate } = ctx.state || {};
  ctx.body = await Service.create(ctx.request.body, ctx.state.userData.username, {
    populate,
    select
  });
  ctx.status = httpStatusCodes.HTTP_CREATED;
  await next();
};

const findAll = async (ctx, next) => {
  const { sort } = ctx.query || {};
  const { filter = {}, select, pagination, populate } = ctx.state || {};
  ctx.body = await Service.findAll(filter, { populate, sort, select, pagination });
  await next();
};

const findBySlug = async (ctx, next) => {
  const { select, populate } = ctx.state || {};
  ctx.body = await Service.findBySlug(ctx.params.slug, { populate, select });
  await next();
};

const findOneAndUpdate = async (ctx, next) => {
  const { select, populate } = ctx.state || {};
  ctx.body = await Service.findOneAndUpdate(ctx.params.slug, ctx.request.body, ctx.state.userData.username, {
    populate,
    select
  });
  ctx.status = httpStatusCodes.HTTP_OK;
  await next();
};

const findOneAndDelete = async (ctx, next) => {
  ctx.body = await Service.findOneAndDelete(ctx.params.slug, ctx.state.userData.username);
  ctx.status = httpStatusCodes.HTTP_NO_CONTENT;
  await next();
};

module.exports = {
  create,
  findAll,
  findBySlug,
  findOneAndUpdate,
  findOneAndDelete
};
