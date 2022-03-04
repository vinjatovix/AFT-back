const { BookSchema, responses } = require("./schemas");

const BookTag = { name: "book", description: "Books to Work on" };

const postBook = {
  tags: ["book"],
  summary: "Add a new book to the collection",
  operationId: "addBook",
  requestBody: {
    description: "book name that needs to be added to the store",
    content: {
      "application/json": { schema: BookSchema }
    },
    required: true
  },
  responses: responses.postBook,
  "x-codegen-request-body-name": "body"
};

module.exports = { BookSchema, BookRoutes: { post: postBook }, BookTag };
