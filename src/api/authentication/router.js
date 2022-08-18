const KoaRouter = require("koa-router");
const { tokenAuth, getCredentials, authAdmin, authAnyRole } = require("../../middlewares/authorization");
const Controller = require("./controller");

const authRouter = new KoaRouter();

authRouter
  .prefix("/api/v1")
  .get("/credentials", tokenAuth, getCredentials, Controller.getCredentials)
  .post("/authentication/login", Controller.authenticate, authAnyRole, Controller.generateToken)
  .post("/authentication/signIn", tokenAuth, getCredentials, authAdmin, Controller.createUser)
  .patch("/authentication/updatePassword", tokenAuth, getCredentials, authAnyRole, Controller.updateUser);

module.exports = authRouter;
