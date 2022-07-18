const KoaRouter = require("koa-router");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const { filter } = require("../../middlewares/filter");
const { include } = require("../../middlewares/include");
const { validateBody } = require("../../middlewares/validateBody");
const Controller = require("./controller");

const sceneRouter = new KoaRouter();

sceneRouter
  .prefix("/api/v1/scene")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, include, filter, Controller.findAll)
  .post("/", authEditor, include, validateBody, Controller.create)
  .get("/:slug", authAnyRole, include, Controller.findBySlug)
  .patch("/:slug", authEditor, include, validateBody, Controller.findOneAndUpdate)
  .del("/:slug", authEditor, Controller.findOneAndDelete);

module.exports = sceneRouter;
