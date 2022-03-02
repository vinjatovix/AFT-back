require("dotenv").config();
const { generateToken } = require("../../../../src/api/authentication/controller");

const next = jest.fn(() => {});
const ctx = {
  state: {
    userData: {
      username: "userTest",
      roles: ["aft.editor"]
    }
  }
};

describe("Authorization Controller", () => {
  describe("Generate token", () => {
    it("should return a token", async () => {
      await generateToken(ctx, next);
      expect(ctx.body.token).toEqual(expect.any(String));
    });
  });
});
