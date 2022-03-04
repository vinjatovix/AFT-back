const { makeExample } = require("../../common/swagger");
const { HTTP_BAD_REQUEST, HTTP_CREATED } = require("../../../service/httpStatusCodes").httpStatusCodes;

const BookSchema = { type: "object", properties: { name: { type: "string" }, author: { type: "string" } } };

const CreatedBookExample = {
  _id: "62227589817ba593cd7631a9",
  name: "Inventos",
  author: "Eugenio Tarconi",
  metadata: {
    createdAt: "2022-03-04T20:24:41.718Z",
    createdBy: "userAdmin",
    updatedAt: "2022-03-04T20:24:41.718Z",
    updatedBy: "userAdmin"
  }
};

const BadRequestCreateExample = {
  status: HTTP_BAD_REQUEST,
  code: "E201",
  errors: ["Book validation failed: author: Path `author` is required."]
};

module.exports = {
  BookSchema,
  responses: {
    postBook: {
      [HTTP_CREATED]: makeExample("Book created", CreatedBookExample),
      [HTTP_BAD_REQUEST]: makeExample("Bad request", BadRequestCreateExample)
    }
  }
};
