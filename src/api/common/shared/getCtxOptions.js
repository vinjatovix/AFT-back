const getCtxOptions = ctx => {
  const { filter = {}, select, pagination, populate } = ctx.state || {};
  const { sort } = ctx.query || {};

  return {
    filter,
    select,
    pagination,
    sort,
    populate
  };
};

module.exports = { getCtxOptions };
