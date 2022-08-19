const KoaRouter = require("koa-router");
const { include, filter, pagination, validateBody, selectFields } = require("../../middlewares");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const Controller = require("./controller");

const bookRouter = new KoaRouter();

bookRouter
  .prefix("/api/v1/book")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, include, filter, selectFields, pagination, Controller.findAll)
  .post("/", authEditor, include, validateBody, Controller.create)
  .get("/:slug", authAnyRole, include, selectFields, Controller.findBySlug)
  .patch("/:slug", authEditor, include, validateBody, Controller.findOneAndUpdate)
  .del("/:slug", authEditor, Controller.findOneAndDelete);

module.exports = bookRouter;
