const { version, license, name, description, author } = require("../../../package.json");
const { HOST, PORT } = process.env;

const { BookSchema, BookRoutes, BookTag } = require("../../api/book/swagger");

const ApiInfo = {
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

const more = {
  name,
  description: "API para control AFT",
  externalDocs: {
    description: "Find out more",
    url: "https://www.instagram.com/adestramentoactoralft"
  }
};

module.exports = {
  Swagger: {
    routePrefix: "/doc",
    swaggerOptions: {
      spec: {
        openapi: "3.0.1",
        info: ApiInfo,
        servers: [{ url: `http://${HOST}:${PORT}/api/v1` }],
        security: { BearerAuth: [] },
        tags: [more, BookTag],
        paths: { "/book": BookRoutes },
        components: {
          securitySchemes: { BearerAuth: { type: "http", scheme: "bearer" } },
          schemas: { Book: BookSchema }
        }
      }
    }
  }
};
