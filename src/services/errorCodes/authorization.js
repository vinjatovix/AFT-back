const { HTTP_UNAUTHORIZED, HTTP_FORBIDDEN } = require("../../service/httpStatusCodes").httpStatusCodes;

module.exports = {
  valid: code => /^E[1-9]/.test(code),
  module: "authorization",
  errors: rep => [
    {
      code: "E1",
      id: "TOKEN_REQUIRED",
      message: "Unauthorized. Are you logged in?",
      status: HTTP_UNAUTHORIZED
    },
    {
      code: "E2",
      id: "INVALID_CREDENTIALS",
      message: "Unauthorized. Are you logged in?",
      status: HTTP_UNAUTHORIZED
    },
    {
      code: "E3",
      id: "INVALID_TOKEN",
      message: "You are not authorized to perform this action. Check your credentials with the admin.",
      status: HTTP_UNAUTHORIZED
    },
    {
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed",
      status: HTTP_FORBIDDEN
    }
  ]
};
