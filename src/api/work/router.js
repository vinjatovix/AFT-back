const KoaRouter = require("koa-router");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const { filter } = require("../../middlewares/filter");
const { include } = require("../../middlewares/include");
const { validateBody } = require("../../middlewares/validateBody");
const Controller = require("./controller");

const workRouter = new KoaRouter();

workRouter
  .prefix("/api/v1/work")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, include, filter, Controller.findAll)
  .post("/", authAnyRole, include, validateBody, Controller.create)
  .get("/:slug", authAnyRole, include, Controller.findBySlug)
  .patch("/:slug", authAnyRole, include, validateBody, Controller.findOneAndUpdate)
  .del("/:slug", authEditor, Controller.findOneAndDelete);

module.exports = workRouter;
