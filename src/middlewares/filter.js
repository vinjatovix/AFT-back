const qs = require("qs");
const { getFilterOptions } = require("../services/filter");

module.exports = {
  filter: async (ctx, next) => {
    const { filter } = qs.parse(new URLSearchParams(ctx.query).toString());
    if (filter) {
      ctx.state.filter = getFilterOptions(filter);
    }

    await next();
  }
};
