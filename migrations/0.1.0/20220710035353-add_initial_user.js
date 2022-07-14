const { createMetadata } = require("../../src/api/common/shared");
const logger = require("../../src/service/logger");
const { encryptPassword } = require("../../src/services/passwordEncryption");
const roles = require("../../config/cfg.json").aft.allowedRoles;

module.exports = {
  async up(db) {
    const time = +new Date();
    await db.collection("users").insertOne({
      username: process.env.ADMIN_USERNAME,
      password: encryptPassword(process.env.ADMIN_PASSWORD),
      roles,
      metadata: createMetadata("GOD")
    });

    logger.info(`Migration "add_initial_user" finished in ${+new Date() - time}ms`);
  }
};
