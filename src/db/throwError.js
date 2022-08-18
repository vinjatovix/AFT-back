const mongoose = require("mongoose");
const { throwAftError } = require("../services/throwAftError");
const { connectDB } = require("./connectDB");
const { dbErrors } = require("./dbErrors");

const throwError = (error, info) => {
  if (!mongoose.connection.readyState) {
    connectDB();
  }

  const code = error.code || dbErrors.BAD_REQUEST;
  const message = error.errmsg || error.message || error;
  const mongoInfo = {
    _id: error._id,
    code: error.code,
    driver: error.driver,
    name: error.name
  };
  if (code === dbErrors.UNAUTHORIZED) {
    throwAftError("MONGO_UNAUTHORIZED", {
      replace: { message },
      info,
      mongoInfo
    });
  }
  if (code === dbErrors.CONFLICT) {
    throwAftError("MONGO_WRITING_ERROR", {
      replace: { message, _id: error._id },
      info,
      mongoInfo
    });
  }
  if (code === dbErrors.BAD_REQUEST) {
    throwAftError("MONGO_VALIDATION_ERROR", {
      replace: { message },
      info,
      mongoInfo
    });
  }
  if (error.id) {
    throw error;
  }
  throwAftError("MONGO_ERROR", { replace: { message }, info, mongoInfo });
};
module.exports = { throwError };
