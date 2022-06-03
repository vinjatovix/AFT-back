const KoaRouter = require("koa-router");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const Controller = require("./controller");

const workRouter = new KoaRouter();

workRouter
  .prefix("/api/v1/work")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, Controller.findAll)
  .get("/:id", authAnyRole, Controller.findById)
  .post("/", authAnyRole, Controller.create)
  .patch("/:id", authAnyRole, Controller.findOneAndUpdate)
  .del("/:id", authEditor, Controller.findOneAndDelete);

module.exports = workRouter;
