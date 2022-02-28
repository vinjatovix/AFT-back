const { throwError } = require("../../../src/db/throwError");

jest.mock("../../../src/db", () => ({
  connectDB: () => true
}));

describe("throwError", () => {
  it("should fail with code E204 and status 401 in case of mongo error code 13", () => {
    expect(
      (() => {
        try {
          throwError({ code: 13 });
        } catch (error) {
          return error;
        }
      })()
    ).toMatchObject({
      module: "mongoose",
      code: "E204",
      status: 401
    });
  });
  it("should fail with code E202 and status 409 in case of mongo error code 11000", () => {
    expect(
      (() => {
        try {
          throwError({ code: 11000 });
        } catch (error) {
          return error;
        }
      })()
    ).toMatchObject({
      module: "mongoose",
      code: "E202",
      status: 409
    });
  });
  it("should fail with code E201 and status 400 in case of mongo error code -400", () => {
    expect(
      (() => {
        try {
          throwError({ code: -400 });
        } catch (error) {
          return error;
        }
      })()
    ).toMatchObject({
      module: "mongoose",
      code: "E201",
      status: 400
    });
  });
});
