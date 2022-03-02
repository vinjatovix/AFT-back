const KoaRouter = require("koa-router");
const { authEditor, tokenAuth, getCredentials } = require("../../middlewares/authorization");
const Controller = require("./controller");

const bookRouter = new KoaRouter();

bookRouter.prefix("/api/v1/book").use(tokenAuth, getCredentials).post("/", authEditor, Controller.create);

module.exports = bookRouter;
