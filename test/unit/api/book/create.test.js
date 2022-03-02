const httpRequest = require("../../../fixtures/httpRequest")();
const Book = require("../../../../src/models/Book");
const Repository = require("../../../../src/api/book/repository");
const validateModel = require("../../../fixtures/validateModel");
const getUrl = () => `/api/v1/book`;

jest.mock("../../../../src/db/connectDB", () => ({
  connectDB: () => true
}));

const name = "Uno";
const author = "Dos";

describe("Book module - create", () => {
  beforeEach(() => {
    Repository.create = jest.fn(async (payload, user) => {
      await validateModel(Book, payload, user);
      return payload;
    });
  });

  it("should create a book", async () => {
    const { status, body } = await httpRequest("POST", getUrl(), {
      name,
      author
    });
    expect(status).toBe(201);
    expect(body).toMatchObject({ name, author });
  });

  it("should fail validation cause no author is provided", async () => {
    const { status, body } = await httpRequest("POST", getUrl(), {
      name: "uno"
    });
    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: ["Book validation failed: author: Path `author` is required."],
      status: 400,
      level: "error"
    });
  });

  it("should fail validation cause no name is provided", async () => {
    const { status, body } = await httpRequest("POST", getUrl(), {
      author: "uno"
    });
    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: ["Book validation failed: name: Path `name` is required."],
      status: 400,
      level: "error"
    });
  });
});
