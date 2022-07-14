const querystring = require("querystring");
const qs = require("qs");
const { getFilterOptions } = require("../services/filter");

module.exports = {
  filter: async (ctx, next) => {
    const { filter } = qs.parse(querystring.stringify(ctx.query));
    if (filter) {
      ctx.state.filter = getFilterOptions(filter);
    }

    await next();
  }
};
