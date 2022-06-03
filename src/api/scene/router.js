const KoaRouter = require("koa-router");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const Controller = require("./controller");

const sceneRouter = new KoaRouter();

sceneRouter
  .prefix("/api/v1/scene")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, Controller.findAll)
  .get("/:slug", authAnyRole, Controller.findBySlug)
  .post("/", authEditor, Controller.create)
  .patch("/:slug", authEditor, Controller.findOneAndUpdate)
  .del("/:slug", authEditor, Controller.findOneAndDelete);

module.exports = sceneRouter;
