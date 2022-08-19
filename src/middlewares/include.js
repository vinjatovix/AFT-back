const { getPopulateOptions } = require("../services/populate.js");

module.exports = {
  include: async (ctx, next) => {
    const { include } = ctx.query || {};
    ctx.state.populate = include ? getPopulateOptions(include.replace(/\s/g, "").split(",")) : null;
    await next();
  }
};
