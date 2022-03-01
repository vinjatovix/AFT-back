const Koa = require("koa");
const koaLogger = require("koa-logger-winston");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const logger = require("./logger");
const { errorHandler } = require("../middlewares");
const bookRouter = require("../api/book/router").routes();

const service = new Koa();

service.use(koaLogger(logger)).use(json()).use(bodyParser()).use(errorHandler).use(bookRouter);

module.exports = service;
