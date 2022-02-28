const getOptions = options => {
  const {
    select = null,
    session = null,
    populate = null,
    sort = null,
    lean,
    pagination
  } = options;
  const hasPopulation = populate && populate.some(query => query.populate);

  return {
    select: select && select.join(" "),
    session,
    populate,
    sort,
    lean: lean === undefined ? !hasPopulation : lean,
    ...pagination
  };
};

module.exports = { getOptions };
