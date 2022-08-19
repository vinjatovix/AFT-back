const { getCtxOptions } = require("../common/shared");
const CommonController = require("../common/controller");
const Service = require("./service");
const CharacterController = CommonController(Service);

const findByBookId = async (ctx, next) => {
  const { select, populate } = getCtxOptions(ctx);
  ctx.body = await Service.findByBookId(ctx.params.id, ctx.state.userData.username, {
    populate,
    select
  });
  await next();
};

module.exports = {
  ...CharacterController,
  findByBookId
};
