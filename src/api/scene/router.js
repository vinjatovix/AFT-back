const KoaRouter = require("koa-router");
const { include, filter, pagination, validateBody, selectFields } = require("../../middlewares");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const Controller = require("./controller");

const sceneRouter = new KoaRouter();

sceneRouter
  .prefix("/api/v1/scene")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, include, filter, selectFields, pagination, Controller.findAll)
  .post("/", authEditor, include, validateBody, Controller.create)
  .get("/:id", authAnyRole, include, selectFields, Controller.findById)
  .patch("/:id", authEditor, include, validateBody, Controller.findOneAndUpdate)
  .del("/:id", authEditor, Controller.findOneAndDelete);

module.exports = sceneRouter;
