const getFilterOptions = filter => {
  const convertedFilter = _convertToDotNotation(filter);

  return Object.entries(convertedFilter).reduce((adaptedFilter, [field, value]) => {
    const convertedValue = _convertValue(value);
    if (field.includes("|")) {
      return {
        ...adaptedFilter,
        ...{ $or: field.split("|").map(name => ({ [name]: convertedValue })) }
      };
    }

    return {
      ...adaptedFilter,
      [field]: convertedValue
    };
  }, {});
};

const _convertToDotNotation = (obj, currentName) =>
  Object.entries(obj).reduce((newObj, [name, value]) => {
    const newField = currentName ? `${currentName}.${name}` : name;
    if (value && typeof value === "object") {
      return {
        ...newObj,
        ..._convertToDotNotation(value, newField)
      };
    }
    return {
      ...newObj,
      [newField]: value
    };
  }, {});

const generateRegex = string =>
  string
    .split(" ")
    .map(word => `(?=.*(${word}))`)
    .join("");

const _convertValue = value => {
  switch (_getOperator(value)) {
    case "":
      return { $exists: true };
    case "!":
      return { $exists: false };
    case ",":
      return { $in: value.split(",").map(item => item.trim()) };
    case "~":
      return { $regex: generateRegex(value.slice(1)), $options: "/ig" };
    case "!~":
      return { $not: { $regex: generateRegex(value.slice(2)), $options: "/ig" } };
    case ">":
      return { $gt: value.slice(1) };
    case "<":
      return { $lt: value.slice(1) };
    case ">=":
      return { $gte: value.slice(2) };
    case "<=":
      return { $lte: value.slice(2) };
    case "<>":
      return { $ne: value.slice(2) };
    default:
      return value;
  }
};

const _getOperator = value => {
  if (!value) {
    return "";
  }
  if (value.includes(",")) {
    return ",";
  }
  if (["=", ">", "~"].includes(value.slice(1, 2))) {
    return value.slice(0, 2);
  }
  return value.slice(0, 1);
};

module.exports = {
  getFilterOptions
};
