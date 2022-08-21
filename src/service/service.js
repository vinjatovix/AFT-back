const Koa = require("koa");
const cors = require("@koa/cors");
const koaLogger = require("koa-logger-winston");
const { koaSwagger } = require("koa2-swagger-ui");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const { errorHandler } = require("../middlewares");
const homeRouter = require("../api/home/router").routes();
const authRouter = require("../api/authentication/router").routes();
const bookRouter = require("../api/book/router").routes();
const characterRouter = require("../api/character/router").routes();
const sceneRouter = require("../api/scene/router").routes();
const workRouter = require("../api/work/router").routes();
const usersRouter = require("../api/users/router").routes();
const logger = require("./logger");
const { Swagger } = require("./swagger");

const service = new Koa();

service
  .use(errorHandler)
  .use(cors())
  .use(koaLogger(logger))
  .use(koaSwagger(Swagger))
  .use(json())
  .use(bodyParser())
  .use(homeRouter)
  .use(authRouter)
  .use(bookRouter)
  .use(characterRouter)
  .use(usersRouter)
  .use(sceneRouter)
  .use(workRouter);

module.exports = service;
