const logger = require("../service/logger");

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error.message);
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = { error: error.message, ...error };
  }
};
module.exports = { errorHandler };
