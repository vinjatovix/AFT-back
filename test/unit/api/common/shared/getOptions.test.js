const { getOptions } = require("../../../../../src/api/common/shared");

describe("getOptions", () => {
  it("should match the given options", () => {
    const options = getOptions({
      select: ["_id", "name", "author"],
      lean: true,
      populate: [{ path: "book", select: ["name"] }]
    });

    expect(options).toMatchObject({
      select: "_id name author",
      session: null,
      populate: [{ path: "book", select: ["name"] }],
      sort: null,
      lean: true
    });
  });
});
