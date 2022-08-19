const qs = require("qs");

module.exports = {
  pagination: async (ctx, next) => {
    const { page } = qs.parse(new URLSearchParams(ctx.query).toString());
    if (page && page.limit) {
      ctx.state.pagination = {
        skip: Number(page.offset || 0),
        limit: Number(page.limit)
      };
    }

    await next();
  }
};
