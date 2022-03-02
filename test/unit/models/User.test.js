const { createMetadata } = require("../../../src/api/common/shared");
const User = require("../../../src/models/User");
const { allowedRoles } = require("../../../config/cfg.json").aft;

const username = "anyName";
const password = "veryHardEncryptedPassword";
const metadata = createMetadata("devUser");

describe("User model", () => {
  it("should be a valid User", async () => {
    const user = new User({ username, roles: allowedRoles, password, metadata });
    await expect(user.validate()).resolves.toBeUndefined();
  });

  it("should reject an invalid User role", async () => {
    const user = new User({ username, roles: ["badRole"], password, metadata });
    await expect(user.validate()).rejects.toThrowError({
      message: "User validation failed: roles.0: Validator failed for path `roles.0` with value `badRole`"
    });
  });
});
