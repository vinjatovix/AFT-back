require("dotenv").config();
const { createToken, verifyToken, isAdmin, anyRole } = require("../../../src/services/authorization");
const { allowedRoles } = require("../../../config/cfg.json").aft;

describe("authorization", () => {
  it("should create a jwt token", () => {
    const { token } = createToken("userTest", allowedRoles);
    expect(token).toBeDefined();
  });

  it("should verify a valid token", () => {
    const { token } = createToken("userTest", allowedRoles);
    verifyToken(token);
  });

  it("should fail with code E4 for invalid role in token", () => {
    const { token } = createToken("userTest", [""]);
    try {
      verifyToken(token);
    } catch (error) {
      expect(error).toMatchObject({
        module: "authorization",
        code: "E4",
        id: "INVALID_ROLE",
        message: "Role not allowed",
        status: 403
      });
    }
  });

  it("should fail with code E3 for an invalid token", () => {
    try {
      verifyToken("invalidtoken");
    } catch (error) {
      expect(error).toMatchObject({
        module: "authorization",
        code: "E3",
        id: "INVALID_TOKEN",
        message: "You are not authorized to perform this action. Check your credentials with the admin.",
        status: 401
      });
    }
  });

  it("should fail with code E1 for no token", () => {
    try {
      verifyToken(null);
    } catch (error) {
      expect(error).toMatchObject({
        module: "authorization",
        code: "E1",
        id: "TOKEN_REQUIRED",
        message: "Unauthorized. Are you logged in?",
        status: 401
      });
    }
  });
  it("should fail with code E4 for non admin role", () => {
    try {
      isAdmin({ roles: ["other"] });
    } catch (error) {
      expect(error).toMatchObject({
        module: "authorization",
        code: "E4",
        id: "INVALID_ROLE",
        message: "Role not allowed",
        status: 403
      });
    }
  });
  it("should fail with code E4 for non editor role", () => {
    try {
      isAdmin({ roles: ["other"] });
    } catch (error) {
      expect(error).toMatchObject({
        module: "authorization",
        code: "E4",
        id: "INVALID_ROLE",
        message: "Role not allowed",
        status: 403
      });
    }
  });
  it("should fail with code E4 for non allowed role", () => {
    try {
      anyRole({ roles: ["other"] });
    } catch (error) {
      expect(error).toMatchObject({
        module: "authorization",
        code: "E4",
        id: "INVALID_ROLE",
        message: "Role not allowed",
        status: 403
      });
    }
  });
});
