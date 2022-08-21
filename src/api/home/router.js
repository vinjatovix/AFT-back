const KoaRouter = require("koa-router");

const homeRouter = new KoaRouter();

homeRouter.get("/", async ctx => {
  ctx.redirect(process.env.FRONTEND_URL);
});

module.exports = homeRouter;
