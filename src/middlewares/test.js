const test = async (ctx, next) => {
  ctx.body = { data: "works" };
  await next();
};

module.exports = test;
