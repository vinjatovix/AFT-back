const request = require("supertest");
const jwt = require("jsonwebtoken");
const service = require("../../src/service/service");
const mockUser = require("./mockAuthUsers");

const httpRequest =
  () =>
  async (method, uri, body = {}, authToken = "allPermissions") => {
    jwt.verify = jest.fn(token => {
      switch (token) {
        case "allPermissions":
          return mockUser.allPermissions;
        case "editor":
          return mockUser.editor;
        case "user":
          return mockUser.user;
        default:
          return {};
      }
    });

    const app = service.callback();

    if (method.toUpperCase() === "GET") {
      return request(app).get(uri).set("Authorization", `Bearer ${authToken}`);
    }
    if (method.toUpperCase() === "POST") {
      return request(app).post(uri).send(body).set("Authorization", `Bearer ${authToken}`);
    }
    if (method.toUpperCase() === "PUT") {
      return request(app).put(uri).send(body).set("Authorization", `Bearer ${authToken}`);
    }
    if (method.toUpperCase() === "PATCH") {
      return request(app).patch(uri).send(body).set("Authorization", `Bearer ${authToken}`);
    }
    if (method.toUpperCase() === "DEL") {
      return request(app).del(uri).set("Authorization", `Bearer ${authToken}`);
    }
  };

module.exports = httpRequest;
