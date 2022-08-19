const KoaRouter = require("koa-router");
const { authAnyRole, authEditor, getCredentials, tokenAuth } = require("../../middlewares/authorization");
const { filter } = require("../../middlewares/filter");
const { include } = require("../../middlewares/include");
const { validateBody } = require("../../middlewares/validateBody");
const Controller = require("./controller");

const characterRouter = new KoaRouter();

characterRouter
  .prefix("/api/v1/character")
  .use(tokenAuth, getCredentials)
  .get("/", authAnyRole, include, filter, Controller.findAll)
  .post("/", authEditor, include, validateBody, Controller.create)
  .get("/:id", authAnyRole, include, Controller.findById)
  .patch("/:id", authEditor, include, Controller.findOneAndUpdate)
  .del("/:id", authEditor, Controller.findOneAndDelete)
  .get("/book/:id", authAnyRole, include, filter, Controller.findByBookId);

module.exports = characterRouter;
