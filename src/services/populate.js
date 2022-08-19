const getPopulateOptions = fields => {
  let paths = [];

  fields.forEach(field => {
    const populateObject = {};
    field.split(".").reduce((populateLevel, fieldLevel, index) => {
      const populate = _mapFieldToPath(fieldLevel);
      if (index && Array.isArray(populate)) {
        populateObject.populate = populate.map(item => ({ ...populateLevel, populate: item }));
        return populateObject;
      }
      populateLevel.populate = populate;
      return populateLevel.populate;
    }, populateObject);

    paths = [
      ...paths,
      ...(Array.isArray(populateObject.populate) ? populateObject.populate : [populateObject.populate])
    ];
  });
  const populateMap = {};
  paths.forEach(path => _getFieldsInPath(populateMap, path));

  return _getPopulateValues(populateMap);
};

const _getFieldsInPath = (populateMap, path) => {
  if (path) {
    populateMap[path.path] = populateMap[path.path] || { ...path, populate: {} };
    if (path.populate) {
      _getFieldsInPath(populateMap[path.path].populate, path.populate);
    }
  }
};

const _getPopulateValues = populatesMap => {
  return Object.values(populatesMap).map(populate => ({
    ...populate,
    populate: _getPopulateValues(populate.populate)
  }));
};

const _mapFieldToPath = fieldLevel => {
  switch (fieldLevel) {
    case "character":
      return {
        path: "character",
        select: ["-metadata"],
        populate: {
          path: "book",
          select: ["-metadata"]
        }
      };
    case "scene":
      return {
        path: "scene",
        select: ["-metadata"],
        populate: {
          path: "characters",
          select: ["-metadata", "-book"]
        }
      };
    default:
      return { path: fieldLevel, select: ["-metadata"] };
  }
};

module.exports = { getPopulateOptions };
