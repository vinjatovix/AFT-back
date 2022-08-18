const { HTTP_CONFLICT } = require("../../service/httpStatusCodes").httpStatusCodes;

module.exports = {
  valid: code => /^E4[1-9]/.test(code),
  module: "book",
  errors: rep => [
    {
      code: "E41",
      id: "CONSUMED_BOOK",
      message: `Document (${rep.id}) is being consumed by: (${rep.consumers})`,
      viewMessage: "Document is being consumed by another entity",
      viewName: rep.id,
      status: HTTP_CONFLICT
    }
  ]
};
