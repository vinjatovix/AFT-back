const KoaRouter = require("koa-router");
const { pagination, filter, include, validateBody, selectFields } = require("../../middlewares");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const Controller = require("./controller");

const workRouter = new KoaRouter();

workRouter
  .prefix("/api/v1/work")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, include, filter, selectFields, pagination, Controller.findAll)
  .post("/", authAnyRole, include, validateBody, Controller.create)
  .get("/:slug", authAnyRole, include, selectFields, Controller.findBySlug)
  .patch("/:slug", authAnyRole, include, validateBody, Controller.findOneAndUpdate)
  .del("/:slug", authEditor, Controller.findOneAndDelete);

module.exports = workRouter;
