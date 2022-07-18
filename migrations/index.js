const { database, config, up: migrationUp } = require("migrate-mongo");
const logger = require("../src/service/logger");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_REPLICA_SET, NODE_ENV } = process.env;
const password = encodeURIComponent(DB_PASSWORD);

const base = `${DB_USER}:${password}@${DB_HOST}/${DB_DATABASE}`;

const connectionString =
  NODE_ENV === "development"
    ? `mongodb://${base}?authSource=${DB_DATABASE}&ssl=false&replicaSet=${DB_REPLICA_SET}`
    : `mongodb+srv://${base}?retryWrites=true&w=majority`;

const version = require("../package.json").version;
const configs = require("../config/cfg.json");

config.set({
  mongodb: {
    url: connectionString,
    databaseName: DB_DATABASE,
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
      migrated.forEach(fileName => logger.info(`CHANGELOG: ${fileName}`));
    } catch ({ message }) {
      logger.error({ message });
    } finally {
      await client.close();
    }
  }
};

module.exports = { up };
