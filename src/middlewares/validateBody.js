const { throwAftError } = require("../services/throwAftError");

module.exports = {
  validateBody: async (ctx, next) => {
    if (!ctx.request.body || !Object.keys(ctx.request.body).length) {
      throwAftError("BODY_INVALID", { requestBody: ctx.request.body });
    }
    await next();
  }
};
