const { version, license, name, description, author } = require("../../../package.json");
const { HOST } = process.env;

const {
  UserSchema,
  UserTag,
  AuthenticationTag,
  loginUser,
  postUser,
  updateUserPassword,
  getCredentials,
  getUsers
} = require("../../api/users/swagger");

const { BookSchema, BookTag, BookRoutes, bookSlugRoutes } = require("../../api/book/swagger");
const { CharacterSchema, CharacterTag, CharacterRoutes, characterSlugRoutes } = require("../../api/character/swagger");
const { WorkSchema, WorkTag, WorkRoutes, workSlugRoutes } = require("../../api/work/swagger");
const { SceneSchema, SceneTag, SceneRoutes, sceneSlugRoutes } = require("../../api/scene/swagger");

const more = {
  name,
  description: "API para control AFT",
  externalDocs: {
    description: "Find out more",
    url: "https://www.instagram.com/adestramentoactoralft"
  }
};

const info = {
  title: `${name.toUpperCase()} Back`,
  description,
  termsOfService: "http://swagger.io/terms/",
  contact: {
    email: author
  },
  license: {
    name: license
    // url: ""
  },
  version
};

module.exports = {
  Swagger: {
    routePrefix: "/doc",
    swaggerOptions: {
      spec: {
        openapi: "3.0.1",
        info,
        servers: [{ url: `${HOST}api/v1` }],
        security: { bearerAuth: [] },
        tags: [more, AuthenticationTag, UserTag, BookTag, CharacterTag, WorkTag, SceneTag],
        paths: {
          "/authentication/login": loginUser,
          "/credentials": getCredentials,
          "/authentication/signIn": postUser,
          "/authentication/updatePassword": updateUserPassword,
          "/user": getUsers,
          "/book": BookRoutes,
          "/book/{slug}": bookSlugRoutes,
          "/character": CharacterRoutes,
          "/character/{slug}": characterSlugRoutes,
          "/work": WorkRoutes,
          "/work/{slug}": workSlugRoutes,
          "/scene": SceneRoutes,
          "/scene/{slug}": sceneSlugRoutes
        },
        components: {
          securitySchemes: {
            bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
          },
          schemas: {
            Book: BookSchema,
            User: UserSchema,
            Character: CharacterSchema,
            Work: WorkSchema,
            Scene: SceneSchema
          }
        }
      }
    }
  }
};
