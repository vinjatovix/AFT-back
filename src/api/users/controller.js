const { getCtxOptions } = require("../common/shared");
const Service = require("./service");

const findAll = async (ctx, next) => {
  const { filter, sort, pagination } = getCtxOptions(ctx);
  ctx.body = await Service.findAll(filter, ctx.state.userData.username, {
    sort,
    pagination
  });
  await next();
};

module.exports = {
  findAll
};
