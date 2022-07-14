const User = require("../../../models/User");
const { createMetadata } = require("../../common/shared");
const {
  makeExample,
  unauthorizedResponse,
  notFoundResponse,
  badRequestResponse,
  duplicatedResponse
} = require("../../common/swagger");
const { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_OK, HTTP_NOT_FOUND, HTTP_CONFLICT, HTTP_UNAUTHORIZED } =
  require("../../../service/httpStatusCodes").httpStatusCodes;

const UserModel = User.jsonSchema();

const UserSchema = {
  ...UserModel,
  example: {
    username: "userDev",
    password: "123456",
    roles: ["aft.user", "aft.admin", "aft.editor"],
    group: "A Coruña"
  }
};

const LoginSchema = {
  ...UserModel,
  example: {
    username: "userDev",
    password: "123456"
  }
};

const CreatedUserExample = {
  _id: "62227589817ba593cd7631a9",
  ...UserSchema.example,
  metadata: createMetadata("GOD")
};

delete CreatedUserExample.password;

const credentialsSchema = {
  type: "object",
  description: "The user information",
  properties: {
    username: {
      type: "string"
    },
    roles: {
      type: "array",
      description: "The list of the user application roles",
      items: {
        type: "string"
      }
    }
  }
};

const passOptions = {
  minLength: 6,
  maxLength: 20,
  pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,20}$"
};
const updatePasswordSchema = {
  type: "object",
  description: "The user information",
  properties: {
    password: {
      type: "string",
      description: "The user password",
      ...passOptions
    },
    newPassword: {
      type: "string",
      description: "The user new password",
      ...passOptions
    },
    repeatNewPassword: {
      type: "string",
      description: "The user new password",
      ...passOptions
    }
  }
};

const responses = {
  unauthorized: { [HTTP_UNAUTHORIZED]: makeExample("Unauthorized", unauthorizedResponse()) },
  notFound: { [HTTP_NOT_FOUND]: makeExample("Not Found", notFoundResponse("62c062af519e0805cbdeefaa", "User")) },
  badRequest: { [HTTP_BAD_REQUEST]: makeExample("Bad Request", badRequestResponse("User", "username")) },
  conflict: { [HTTP_CONFLICT]: makeExample("Conflict", duplicatedResponse("users", "username")) }
};

module.exports = {
  UserSchema,
  LoginSchema,
  updatePasswordSchema,
  credentialsSchema,
  responses: {
    getUsers: {
      [HTTP_OK]: makeExample("Get Users", [CreatedUserExample]),
      ...responses.unauthorized
    },
    postUser: {
      [HTTP_CREATED]: makeExample("User created", CreatedUserExample),
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.unauthorized
    },
    patchUser: {
      [HTTP_OK]: makeExample("User updated", CreatedUserExample),
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.notFound,
      ...responses.unauthorized
    },
    getUserByUsername: {
      [HTTP_OK]: makeExample("Get User by Username", CreatedUserExample),
      ...responses.notFound,
      ...responses.unauthorized
    },
    login: {
      [HTTP_OK]: makeExample("Login", CreatedUserExample),
      ...responses.unauthorized
    },
    updateUser: {
      [HTTP_OK]: makeExample("User updated", CreatedUserExample),
      ...responses.badRequest,
      ...responses.conflict,
      ...responses.notFound,
      ...responses.unauthorized
    },
    getCredentials: {
      [HTTP_OK]: makeExample("Get credentials", credentialsSchema),
      ...responses.notFound,
      ...responses.unauthorized
    }
  }
};
