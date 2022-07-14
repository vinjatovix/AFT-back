const faker = require("faker");
const httpRequest = require("../../../fixtures/httpRequest")();
const Book = require("../../../../src/models/Book");
const Repository = require("../../../../src/api/book/repository");
const validateModel = require("../../../fixtures/validateModel");
const { BookSchema } = require("../../../../src/api/book/swagger");
const getUrl = () => `/api/v1/book`;

jest.mock("../../../../src/db/connectDB", () => ({
  connectDB: () => true
}));

const name = faker.name.firstName();
const author = faker.name.firstName();
const description = faker.lorem.sentence();

describe("Book module - create", () => {
  beforeEach(() => {
    Repository.create = jest.fn(async (payload, user) => {
      await validateModel(Book, payload, user);
      return payload;
    });
  });

  it("swagger example should pass", async () => {
    const example = BookSchema.example;
    const { status, body } = await httpRequest("POST", getUrl(), {
      ...example
    });

    expect(status).toBe(201);
    expect(body).toMatchObject({ ...BookSchema.example });
  });

  it("should fail validation cause no author is provided", async () => {
    const { status, body } = await httpRequest("POST", getUrl(), {
      name,
      description
    });
    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: ["Book validation failed: author: Path `author` is required."],
      status: 400
    });
  });

  it("should fail validation cause no name is provided", async () => {
    const { status, body } = await httpRequest("POST", getUrl(), {
      author,
      description
    });
    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: ["Book validation failed: name: Path `name` is required."],
      status: 400
    });
  });

  it("sould fail because no description is provided", async () => {
    const { status, body } = await httpRequest("POST", getUrl(), {
      name,
      author
    });
    expect(status).toBe(400);
    expect(body).toMatchObject({
      module: "mongoose",
      code: "E201",
      id: "MONGO_VALIDATION_ERROR",
      message: "Mongoose validation error",
      errors: ["Book validation failed: description: Path `description` is required."],
      status: 400
    });
  });

  it("should fail because aft.user is not a valid role", async () => {
    const { status, body } = await httpRequest(
      "POST",
      getUrl(),
      {
        name,
        author
      },
      "user"
    );

    expect(status).toBe(403);
    expect(body).toMatchObject({
      module: "authorization",
      code: "E4",
      id: "INVALID_ROLE",
      message: "Role not allowed",
      status: 403
    });
  });
});
