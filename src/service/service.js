const Koa = require("koa");
const json = require("koa-json");

const service = new Koa();

service.use(json());

module.exports = { service };
