const { encryptPassword, validatePassword } = require("../../../src/services/passwordEncryption");

describe("passwordEncryption", () => {
  it("should correctly encrypt a password", async () => {
    const pass = encryptPassword("1234");
    await validatePassword("1234", pass);
    expect(pass).not.toBe("1234");
  });

  it("should fail to validate a password", async () => {
    const pass = encryptPassword("1234");
    try {
      await validatePassword("12345", pass);
    } catch (error) {
      expect(error).toMatchObject({
        module: "authorization",
        code: "E2",
        id: "INVALID_CREDENTIALS",
        message: "Unauthorized. Are you logged in?",
        status: 401
      });
    }
  });
});
