const KoaRouter = require("koa-router");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const Controller = require("./controller");

const bookRouter = new KoaRouter();

bookRouter
  .prefix("/api/v1/book")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, Controller.findAll)
  .get("/:slug", authAnyRole, Controller.findBySlug)
  .post("/", authEditor, Controller.create)
  .patch("/:slug", authEditor, Controller.findOneAndUpdate)
  .del("/:slug", authEditor, Controller.findOneAndDelete);

module.exports = bookRouter;
