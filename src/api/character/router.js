const KoaRouter = require("koa-router");
const { include, filter, pagination, validateBody, selectFields } = require("../../middlewares");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const Controller = require("./controller");

const characterRouter = new KoaRouter();

characterRouter
  .prefix("/api/v1/character")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, include, filter, selectFields, pagination, Controller.findAll)
  .post("/", authEditor, include, validateBody, Controller.create)
  .get("/:id", authAnyRole, include, selectFields, Controller.findById)
  .patch("/:id", authEditor, include, validateBody, Controller.findOneAndUpdate)
  .del("/:id", authEditor, Controller.findOneAndDelete)
  .get("/book/:id", authAnyRole, include, filter, selectFields, Controller.findByBookId);

module.exports = characterRouter;
