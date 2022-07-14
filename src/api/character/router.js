const KoaRouter = require("koa-router");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const { filter } = require("../../middlewares/filter");
const { include } = require("../../middlewares/include");
const Controller = require("./controller");

const characterRouter = new KoaRouter();

characterRouter
  .prefix("/api/v1/character")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, include, filter, Controller.findAll)
  .post("/", authEditor, include, Controller.create)
  .get("/:slug", authAnyRole, include, Controller.findBySlug)
  .patch("/:slug", authEditor, include, Controller.findOneAndUpdate)
  .del("/:slug", authEditor, Controller.findOneAndDelete)
  .get("/book/:id", authAnyRole, include, filter, Controller.findByBookId);

module.exports = characterRouter;
