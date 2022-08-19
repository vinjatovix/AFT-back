const { httpStatusCodes } = require("../../service/httpStatusCodes");
const { getCtxOptions } = require("./shared");

module.exports = Service => {
  return {
    findAll: async (ctx, next) => {
      const { sort, filter = {}, select, pagination, populate } = getCtxOptions(ctx);
      ctx.body = await Service.findAll(filter, ctx.state.userData.username, {
        populate,
        sort,
        select,
        pagination
      });
      await next();
    },
    findBySlug: async (ctx, next) => {
      const { select, populate } = getCtxOptions(ctx);
      ctx.body = await Service.findBySlug(ctx.params.slug, ctx.state.userData.username, {
        populate,
        select
      });
      await next();
    },
    findById: async (ctx, next) => {
      const { select, populate } = getCtxOptions(ctx);
      ctx.body = await Service.findById(ctx.params.id, ctx.state.userData.username, {
        populate,
        select
      });
      await next();
    },
    create: async (ctx, next) => {
      const { select, populate } = getCtxOptions(ctx);
      ctx.body = await Service.create(ctx.request.body, ctx.state.userData.username, {
        populate,
        select
      });
      ctx.status = httpStatusCodes.HTTP_CREATED;
      await next();
    },
    findOneAndUpdate: async (ctx, next) => {
      const { select, populate } = getCtxOptions(ctx);
      ctx.body = await Service.findOneAndUpdate(
        ctx.params.slug || ctx.params.id,
        ctx.request.body,
        ctx.state.userData.username,
        {
          populate,
          select
        }
      );
      ctx.status = httpStatusCodes.HTTP_OK;
      await next();
    },
    findOneAndDelete: async (ctx, next) => {
      ctx.body = await Service.findOneAndDelete(ctx.params.slug || ctx.params.id, ctx.state.userData.username);
      ctx.status = httpStatusCodes.HTTP_NO_CONTENT;
      await next();
    }
  };
};
