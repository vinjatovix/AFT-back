const Koa = require("koa");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const { errorHandler } = require("../middlewares");

const bookRouter = require("../api/book/router").routes();

const service = new Koa();

service.use(json()).use(bodyParser()).use(errorHandler).use(bookRouter);

module.exports = service;
