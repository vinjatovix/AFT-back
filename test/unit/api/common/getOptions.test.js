const { getOptions } = require("../../../../src/api/common/shared/getOptions");

describe("getOptions", () => {
  it("should match the given options", () => {
    const options = getOptions({
      select: ["_id", "name", "author"],
      lean: true,
      populate: [{ path: "content", select: ["thumbnail"] }]
    });
    expect(options).toMatchObject({
      select: "_id name author",
      session: null,
      populate: [{ path: "content", select: ["thumbnail"] }],
      sort: null,
      lean: true
    });
  });
});
