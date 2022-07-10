const Service = require("./service");

const findAll = async (ctx, next) => {
  ctx.body = await Service.findAll();
  await next();
};

module.exports = {
  findAll
};
