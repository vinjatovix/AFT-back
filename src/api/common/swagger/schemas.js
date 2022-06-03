const MetadataSchema = {
  type: "object",
  properties: {
    createdAt: { type: "string" },
    createdBy: { type: "string" },
    updatedAt: { type: "string" },
    updatedBy: { type: "string" }
  }
};

const patternId = "^[0-9a-fA-F]{24}$";
const patternName = "^[a-zA-Z0-9-._](?!.*::)[a-zA-Z0-9-._:]*[a-zA-Z0-9-._]$";

const getQueryBySlug = function (slug, UniqueIdentifiers) {
  if (new RegExp(patternId).test(slug)) {
    return { _id: slug };
  }
  const filter = UniqueIdentifiers.map(attribute => ({ [attribute]: slug }));

  return filter.length > 1 ? { $or: filter } : filter[0];
};

const getUniqueIdentifiers = Model => Object.keys(Model.schema.obj).filter(key => Model.schema.obj[key].unique);

module.exports = { MetadataSchema, patternId, patternName, getQueryBySlug, getUniqueIdentifiers };
