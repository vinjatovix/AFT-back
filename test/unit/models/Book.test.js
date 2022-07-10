const { createMetadata } = require("../../../src/api/common/shared");
const Book = require("../../../src/models/Book");

describe("Book model", () => {
  it("should be a valid Book", async () => {
    const book = new Book({
      _id: "5ccadc4295bd1464f2d59446",
      name: "Closer",
      author: "some author",
      description: "some description",
      metadata: createMetadata("user")
    });
    await expect(book.validate()).resolves.toBeUndefined();
  });

  it("should fail if no name is provided", async () => {
    const book = new Book({
      _id: "5ccadc4295bd1464f2d59446",
      author: "some author",
      description: "some description",
      metadata: createMetadata("user")
    });
    await expect(book.validate()).rejects.toThrow("Book validation failed: name: Path `name` is required.");
  });

  it("should fail if no author is provided", async () => {
    const book = new Book({
      _id: "5ccadc4295bd1464f2d59446",
      name: "closer",
      description: "some description",
      metadata: createMetadata("user")
    });
    await expect(book.validate()).rejects.toThrow("Book validation failed: author: Path `author` is required.");
  });

  it("should fail if no description is provided", async () => {
    const book = new Book({
      _id: "5ccadc4295bd1464f2d59446",
      name: "closer",
      author: "some author",
      metadata: createMetadata("user")
    });
    await expect(book.validate()).rejects.toThrow(
      "Book validation failed: description: Path `description` is required."
    );
  });
});
