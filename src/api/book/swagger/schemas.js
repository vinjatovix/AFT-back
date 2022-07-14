const Book = require("../../../models/Book");
const { createMetadata } = require("../../common/shared");
const {
  makeExample,
  unauthorizedResponse,
  notFoundResponse,
  badRequestResponse,
  duplicatedResponse
} = require("../../common/swagger");
const { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_OK, HTTP_NOT_FOUND, HTTP_CONFLICT, HTTP_UNAUTHORIZED } =
  require("../../../service/httpStatusCodes").httpStatusCodes;

const BookModel = Book.jsonSchema();

const BookSchema = {
  ...BookModel,
  example: {
    name: "Inventos",
    author: "Eugenio Tarconi",
    img: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    description: "Obra guapa"
  }
};

const CreatedBookExample = {
  _id: "62227589817ba593cd7631a9",
  ...BookSchema.example,
  metadata: createMetadata("GOD")
};

const responses = {
  unauthorized: { [HTTP_UNAUTHORIZED]: makeExample("Unauthorized", unauthorizedResponse()) },
  notFound: { [HTTP_NOT_FOUND]: makeExample("Not Found", notFoundResponse("62c062af519e0805cbdeefaa", "Book")) },
  badRequest: { [HTTP_BAD_REQUEST]: makeExample("Bad Request", badRequestResponse("Book", "author")) },
  conflict: { [HTTP_CONFLICT]: makeExample("Conflict", duplicatedResponse("books", "name")) }
};

module.exports = {
  BookSchema,
  responses: {
    getBooks: {
      [HTTP_OK]: makeExample("Get Books", [CreatedBookExample]),
      ...responses.unauthorized
    },
    postBook: {
      [HTTP_CREATED]: makeExample("Book created", CreatedBookExample),
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.unauthorized
    },
    patchBook: {
      [HTTP_OK]: makeExample("Book updated", CreatedBookExample),
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.notFound,
      ...responses.unauthorized
    },
    getBookBySlug: {
      [HTTP_OK]: makeExample("Get Book by Slug", CreatedBookExample),
      ...responses.notFound,
      ...responses.unauthorized
    }
  }
};
