const { throwError } = require("../../db");
const { addConflictIdToError, createMetadata, getOptions, loggerInfo } = require("./shared");

const create = (Model, payload, user = "WIPuser", options = {}) => {
  const { populate } = getOptions(options);
  const metadata = payload.metadata || createMetadata(user);

  return new Model({
    ...payload,
    metadata
  })
    .save(options)
    .then(model => {
      loggerInfo(options, Model.modelName, user, "create", model._id, payload);
      return Model.populate(model, populate || []);
    })
    .catch(error => addConflictIdToError(Model, error, payload.name))
    .catch(throwError);
};

module.exports = { create };
