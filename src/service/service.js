const Koa = require("koa");

const koaLogger = require("koa-logger-winston");
const logger = require("./logger");

const { koaSwagger } = require("koa2-swagger-ui");
const { Swagger } = require("./swagger");

const json = require("koa-json");
const bodyParser = require("koa-bodyparser");

const { errorHandler } = require("../middlewares");

const authRouter = require("../api/authentication/router").routes();
const bookRouter = require("../api/book/router").routes();

const service = new Koa();

service
  .use(koaLogger(logger))
  .use(koaSwagger(Swagger))
  .use(json())
  .use(bodyParser())
  .use(errorHandler)
  .use(authRouter)
  .use(bookRouter);

module.exports = service;
