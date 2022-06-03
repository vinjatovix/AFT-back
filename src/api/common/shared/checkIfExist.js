const { throwAftError } = require("../../../services/throwAftError");

const checkIfExist = (doc, query, method, modelName) => {
  const id = typeof query === "object" ? Object.values(query)[0] : query;
  if (!doc) throwAftError("MODEL_NOT_FOUND", { replace: { modelName, id }, method, modelName, id });
};

module.exports = { checkIfExist };
