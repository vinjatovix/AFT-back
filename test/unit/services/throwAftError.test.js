const { throwAftError } = require("../../../src/services/throwAftError");

const id = "someId";
const modelName = "someModel";
const message = "errorMessage";

describe("throwAftError", () => {
  describe("General errors", () => {
    it("should fail with code E31 and status 404 in case of model not found", () => {
      expect(
        (() => {
          try {
            throwAftError("MODEL_NOT_FOUND", { replace: { id, modelName } });
          } catch (error) {
            return error;
          }
        })()
      ).toMatchObject({
        module: "general",
        code: "E31",
        id: "MODEL_NOT_FOUND",
        message: `Document (${id}) does not exist in Model (${modelName})`,
        viewMessage: "The view doesn't exist.",
        viewName: id,
        status: 404
      });
    });

    it("should fail with code E32 and status 400 in case of invalid request body", () => {
      expect(
        (() => {
          try {
            throwAftError("BODY_INVALID");
          } catch (error) {
            return error;
          }
        })()
      ).toMatchObject({
        module: "general",
        code: "E32",
        id: "BODY_INVALID",
        message: "The request has a wrong format.",
        status: 400
      });
    });

    it("should fail with code E33 and status 422 in case of invalid data", () => {
      expect(
        (() => {
          try {
            throwAftError("DATA_INVALID", { replace: { errors: [message] } });
          } catch (error) {
            return error;
          }
        })()
      ).toMatchObject({
        module: "general",
        code: "E33",
        id: "DATA_INVALID",
        message: "The request has a wrong property.",
        errors: [message],
        status: 422
      });
    });
  });
  describe("Mongoose Errors", () => {
    it("should fail with code E201 and status 400 in case of mongo validation error", () => {
      expect(
        (() => {
          try {
            throwAftError("MONGO_VALIDATION_ERROR", { replace: { message } });
          } catch (error) {
            return error;
          }
        })()
      ).toMatchObject({
        module: "mongoose",
        code: "E201",
        id: "MONGO_VALIDATION_ERROR",
        message: "Mongoose validation error",
        errors: [message],
        status: 400
      });
    });
    it("should fail with code E202 and status 409 in case of mongo writing error", () => {
      expect(
        (() => {
          try {
            throwAftError("MONGO_WRITING_ERROR", { replace: { message, _id: id } });
          } catch (error) {
            return error;
          }
        })()
      ).toMatchObject({
        module: "mongoose",
        code: "E202",
        id: "MONGO_WRITING_ERROR",
        message: "There is a conflict in writing the document",
        errors: [message],
        _id: id,
        status: 409
      });
    });

    it("should fail with code E203 and status 500 in case of unknown mongo error", () => {
      expect(
        (() => {
          try {
            throwAftError("MONGO_ERROR", { replace: { message } });
          } catch (error) {
            return error;
          }
        })()
      ).toMatchObject({
        module: "mongoose",
        code: "E203",
        id: "MONGO_ERROR",
        message: "Database error",
        errors: [message],
        status: 500
      });
    });

    it("should fail with code E204 and status 401 in case of mongo unauthorized operation", () => {
      expect(
        (() => {
          try {
            throwAftError("MONGO_UNAUTHORIZED", { replace: { message } });
          } catch (error) {
            return error;
          }
        })()
      ).toMatchObject({
        module: "mongoose",
        code: "E204",
        id: "MONGO_UNAUTHORIZED",
        message: "Authorization error",
        errors: [message],
        status: 401
      });
    });
  });
});
