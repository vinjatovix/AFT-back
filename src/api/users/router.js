const KoaRouter = require("koa-router");
const { getCredentials, tokenAuth, authAdmin } = require("../../middlewares/authorization");
const Controller = require("./controller");

const usersRouter = new KoaRouter();

usersRouter.prefix("/api/v1/user").use(tokenAuth, getCredentials).get("/", authAdmin, Controller.findAll);

module.exports = usersRouter;
