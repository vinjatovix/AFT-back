const general = require("./general");
const mongoose = require("./mongoose");

const configModules = [general, mongoose];

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
