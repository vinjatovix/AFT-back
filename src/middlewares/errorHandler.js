const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    res = {
      message: (error.errors && error.errors[0]) || error.message,
      details: { ...error }
    };
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = res;
  }
};
module.exports = { errorHandler };
