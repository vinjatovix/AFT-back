const {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_UNAUTHORIZED
} = require("../../service/httpStatusCodes").httpStatusCodes;

module.exports = {
  valid: code => /^E2[0-9][1-9]/.test(code),
  module: "mongoose",
  errors: rep => [
    {
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: [rep.message],
      status: HTTP_BAD_REQUEST
    },
    {
      code: "E202",
      id: "MONGO_WRITING_ERROR",
      message: "There is a conflict in writing the document",
      errors: [rep.message],
      _id: rep._id,
      status: HTTP_CONFLICT
    },
    {
      code: "E203",
      id: "MONGO_ERROR",
      message: "Database error",
      errors: [rep.message],
      status: HTTP_INTERNAL_SERVER_ERROR
    },
    {
      code: "E204",
      id: "MONGO_UNAUTHORIZED",
      message: "Authorization error",
      errors: [rep.message],
      status: HTTP_UNAUTHORIZED
    }
  ]
};
