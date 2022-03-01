const { dbErrors } = require("../../../db");

const addConflictIdToError = async (Model, error, name) => {
  if (name && error && error.code === dbErrors.CONFLICT) {
    const model = await Model.findOne({ name });
    if (model) {
      error._id = model._id;
    }
  }
  throw error;
};

module.exports = { addConflictIdToError };
