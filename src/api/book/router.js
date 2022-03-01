const KoaRouter = require("koa-router");
const Controller = require("./controller");

const bookRouter = new KoaRouter();

bookRouter.prefix("/api/v1/book").post("/", Controller.create);

module.exports = bookRouter;
