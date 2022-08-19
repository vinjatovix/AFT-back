module.exports = {
  selectFields: async (ctx, next) => {
    const { fields } = ctx.query || {};
    if (fields) {
      ctx.state.select = fields.split(",");
    }

    await next();
  }
};
