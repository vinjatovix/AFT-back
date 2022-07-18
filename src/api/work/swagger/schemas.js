const Work = require("../../../models/Work");
const { createMetadata } = require("../../common/shared");
const {
  makeExample,
  unauthorizedResponse,
  notFoundResponse,
  badRequestResponse,
  duplicatedResponse
} = require("../../common/swagger");
const { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_OK, HTTP_NOT_FOUND, HTTP_CONFLICT, HTTP_UNAUTHORIZED, HTTP_NO_CONTENT } =
  require("../../../service/httpStatusCodes").httpStatusCodes;

const WorkModel = Work.jsonSchema();

const WorkSchema = {
  ...WorkModel,
  example: {
    scene: "62227589817ba593cd7631a9",
    character: "62227589817ba593cd7632a1",
    actionUnits: [
      { order: 0, action: "Relajarse" },
      { order: 1, action: "disimular" },
      { order: 2, action: "despachar" }
    ],
    previousCircumstances: ["El hombre estaba en la cama", "Jane se había ido al mercado"],
    animal: "Cobra Zombie",
    referent: "Mi prima Andrea"
  }
};

const CreatedWorkExample = {
  _id: "62227589817ba593cd7631a9",
  ...WorkSchema.example,
  metadata: createMetadata("GOD")
};

const responses = {
  unauthorized: { [HTTP_UNAUTHORIZED]: unauthorizedResponse },
  notFound: { [HTTP_NOT_FOUND]: makeExample("Not Found", notFoundResponse("62c062af519e0805cbdeefaa", "Work")) },
  badRequest: { [HTTP_BAD_REQUEST]: makeExample("Bad Request", badRequestResponse("Work", "scene")) },
  conflict: { [HTTP_CONFLICT]: makeExample("Conflict", duplicatedResponse("works", "scene")) }
};

module.exports = {
  WorkSchema,
  responses: {
    getWorks: {
      [HTTP_OK]: makeExample("Get Works", [CreatedWorkExample]),
      ...responses.unauthorized
    },
    postWork: {
      [HTTP_CREATED]: makeExample("Work created", CreatedWorkExample),
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.unauthorized
    },
    getWorkBySlug: {
      [HTTP_OK]: makeExample("Work found", CreatedWorkExample),
      ...responses.notFound,
      ...responses.unauthorized
    },
    patchWork: {
      [HTTP_OK]: makeExample("Work updated", CreatedWorkExample),
      ...responses.notFound,
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.unauthorized
    },
    deleteWork: {
      [HTTP_NO_CONTENT]: makeExample("Work deleted", CreatedWorkExample)
    }
  }
};
