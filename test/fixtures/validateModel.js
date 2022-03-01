const { createMetadata } = require("../../src/api/common/shared");
const { throwError } = require("../../src/db");

const validateModel = async (Model, payload, user) => {
  const metadata = payload.metadata ? payload.metadata : createMetadata(user);
  const model = new Model({ ...payload, metadata });
  await model.validate().catch(error => {
    throwError({ code: -400, message: error.message });
  });
  return true;
};

module.exports = validateModel;
