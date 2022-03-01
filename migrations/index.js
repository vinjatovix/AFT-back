const { database, config, up: migrationUp } = require("migrate-mongo");
const logger = require("../src/service/logger");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_REPLICA_SET } = process.env;

const connectionString = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?replicaSet=${DB_REPLICA_SET}`;
const version = require("../package.json").version;
const configs = require("../config/cfg.json");

config.set({
  mongodb: {
    url: connectionString,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: `migrations/${version}`,
  changelogCollectionName: "changelog"
});

const up = async () => {
  if (configs.migrations) {
    const { db, client } = await database.connect();
    try {
      const migrated = await migrationUp(db, client);
      migrated.forEach(fileName => logger.info(`Migrated: ${fileName}`));
    } catch ({ message }) {
      logger.error({ message });
    } finally {
      await client.close();
    }
  }
};

module.exports = { up };
