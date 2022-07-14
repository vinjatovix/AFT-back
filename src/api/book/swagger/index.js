const { get, post, del, put } = require("../../common/swagger");
const { BookSchema, responses } = require("./schemas");

const BookTag = { name: "book", description: "Books to Work on" };
const security = [{ bearerAuth: [] }];

const postBook = {
  ...post(BookSchema, BookSchema, {}, { include: true }),
  tags: ["book"],
  summary: "Add a new book to the collection",
  operationId: "addBook",
  responses: responses.postBook,
  security
};

const getBooks = {
  ...get(BookSchema, { include: true, filter: true, select: true }),
  tags: ["book"],
  summary: "Get all books",
  operationId: "getBooks",
  responses: responses.getBooks,
  security
};

const getBookBySlug = {
  ...get(BookSchema, { slug: true, select: true, include: true }),
  tags: ["book"],
  summary: "Get a book by slug",
  operationId: "getBookBySlug",
  responses: responses.getBookBySlug,
  security
};

const patchBook = {
  ...put(BookSchema, BookSchema, { slug: true, include: true }, BookSchema),
  tags: ["book"],
  summary: "Update a book",
  operationId: "updateBook",
  responses: responses.patchBook,
  security
};

const deleteBook = {
  ...del({ slug: true }),
  tags: ["book"],
  summary: "Delete a book",
  operationId: "deleteBook",
  security
};

module.exports = {
  BookSchema,
  BookRoutes: { get: getBooks, post: postBook },
  bookSlugRoutes: { get: getBookBySlug, patch: patchBook, delete: deleteBook },
  BookTag
};
