const logger = require("../../../service/logger");

const loggerInfo = (options, modelName, user, operation, query, payload = {}) => {
  if (!options || !options.session) {
    logger.info(`${modelName} '${JSON.stringify(query)}' ${operation} by ${user}.
    ${JSON.stringify(payload)}.`);
  }
};

module.exports = { loggerInfo };
