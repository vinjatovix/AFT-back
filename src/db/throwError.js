const mongoose = require("mongoose");
const { connectDB } = require(".");
const { throwAftError } = require("../services/throwAftError");

const throwError = (error, info) => {
  if (!mongoose.connection.readyState) {
    connectDB();
  }

  const code = error.code || -400;
  const message = error.errmsg || error.message || error;
  const mongoInfo = {
    _id: error._id,
    code: error.code,
    driver: error.driver,
    name: error.name
  };
  if (code === 13) {
    throwAftError("MONGO_UNAUTHORIZED", {
      replace: { message },
      info,
      mongoInfo
    });
  }
  if (code === 11000) {
    throwAftError("MONGO_WRITING_ERROR", {
      replace: { message, _id: error._id },
      info,
      mongoInfo
    });
  }
  if (code === -400) {
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
