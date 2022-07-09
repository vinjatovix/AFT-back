const KoaRouter = require("koa-router");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const Controller = require("./controller");

const characterRouter = new KoaRouter();

characterRouter
  .prefix("/api/v1/character")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, Controller.findAll)
  .get("/:id", authAnyRole, Controller.findById)
  .post("/", authEditor, Controller.create)
  .patch("/:id", authEditor, Controller.findOneAndUpdate)
  .del("/:id", authEditor, Controller.findOneAndDelete)
  .get("/book/:id", authAnyRole, Controller.findByBookId);

module.exports = characterRouter;
