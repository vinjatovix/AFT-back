const { throwError } = require("../../db");
const {
  addConflictIdToError,
  createMetadata,
  getOptions,
  loggerInfo,
  updatedMetadata,
  toJSON,
  checkIfExist
} = require("./shared");
const { defaultLimit } = require("../../../config/cfg.json");

const create = (Model, payload, user, options = {}) => {
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

const findByQuery = (Model, query, options = { lean: true }) => {
  const { select, populate, lean, sort, limit = defaultLimit, skip } = getOptions(options);

  return Model.find(query)
    .select(select)
    .populate(populate)
    .sort(sort || "-metadata.updatedAt")
    .limit(limit || Number(options.limit))
    .skip(skip)
    .lean(lean)
    .exec()
    .catch(throwError);
};

const findOneByQuery = (Model, query, options = { lean: true }) => {
  const { select, populate, lean, session, sort } = getOptions(options);
  return Model.findOne(query)
    .select(select)
    .lean(lean)
    .populate(populate)
    .sort(sort)
    .session(session)
    .then(doc => (options.exists ? checkIfExist(doc, query, "find", Model.modelName) : doc))
    .catch(throwError);
};

const findOneAndUpdate = (Model, query, payload, user, options = {}) => {
  const metadata = updatedMetadata(user, payload.metadata);
  delete payload.metadata;
  return Model.findOneAndUpdate(
    query,
    { ...payload, $set: { ...(payload.$set || {}), ...metadata } },
    { new: true, runValidators: true, ...options }
  )
    .then(doc => {
      checkIfExist(doc, JSON.stringify(query), "find", Model.modelName);
      loggerInfo(options, Model.modelName, user, "findOneAndUpdate", query, payload);
      return options.json ? toJSON(doc) : doc;
    })
    .catch(error => throwError(error, { query, name: Model.modelName }));
};

const findOneAndDelete = (Model, query, user, options = {}) => {
  return Model.findOneAndDelete(query, { ...options, user })
    .then(doc => {
      loggerInfo(options, Model.modelName, user, "removeOne", query);
      return options.json ? toJSON(doc) : doc;
    })
    .catch(error => throwError(error, { query, name: Model.modelName }));
};

module.exports = { create, findByQuery, findOneByQuery, findOneAndUpdate, findOneAndDelete };
