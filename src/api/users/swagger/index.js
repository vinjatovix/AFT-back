const { get, post, put } = require("../../common/swagger");
const { UserSchema, responses, credentialsSchema, updatePasswordSchema } = require("./schemas");

const UserTag = { name: "user", description: "App Users" };
const AuthenticationTag = { name: "authentication", description: "Authentication" };
const security = [{ bearerAuth: [] }];

const postUser = {
  ...post(UserSchema, UserSchema),
  tags: [AuthenticationTag.name],
  summary: "Add a new user to the collection",
  operationId: "addUser",
  responses: responses.postUser,
  security
};

const loginUser = {
  ...post(
    UserSchema,
    {
      type: "object",
      properties: {
        username: {
          description: "Username",
          type: "string",
          in: "formData"
        },
        password: {
          description: "Password",
          type: "string",
          format: "password",
          in: "formData"
        }
      },
      required: ["username", "password"]
    },
    {},
    UserSchema
  ),
  tags: [AuthenticationTag.name],
  summary: "Login a user",
  operationId: "login",
  responses: responses.login
};

const updateUserPassword = {
  ...put({}, updatePasswordSchema, { id: false }, credentialsSchema),
  tags: [AuthenticationTag.name],
  summary: "Update a user",
  operationId: "updateUser",
  responses: responses.updateUser,
  security
};

const getCredentials = {
  ...get(credentialsSchema),
  tags: [AuthenticationTag.name],
  summary: "Get user credentials",
  operationId: "getCredentials",
  responses: responses.getCredentials,
  security
};

const getUsers = {
  ...get(UserSchema),
  tags: ["user"],
  summary: "Get all users",
  operationId: "getUsers",
  responses: responses.getUsers,
  security
};

module.exports = {
  UserSchema,
  postUser: { post: postUser, security: [{ bearerAuth: [] }] },
  loginUser: { post: loginUser },
  updateUserPassword: { patch: updateUserPassword },
  getCredentials: { get: getCredentials },
  getUsers: { get: getUsers },
  UserTag,
  AuthenticationTag
};
