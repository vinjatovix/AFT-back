const authorization = require("./authorization");
const general = require("./general");
const mongoose = require("./mongoose");
const book = require("./book");

const configModules = [authorization, general, mongoose, book];

const errorValidation = {};

const getErrors = (moduleErrors, info) => {
  errorValidation[moduleErrors.module] = moduleErrors.valid;
  return moduleErrors.errors(info).map(err => ({
    module: moduleErrors.module,
    ...err
  }));
};

const errorCodes = info => configModules.reduce((errors, conf) => [...errors, ...getErrors(conf, info)], []);

module.exports = { errorCodes, errorValidation };
