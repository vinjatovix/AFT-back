const mongoose = require("mongoose");
const { DB } = require("../messages");
const logger = require("../service/logger");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;
const password = encodeURIComponent(DB_PASSWORD);

const base = `${DB_USER}:${password}@${DB_HOST}/${DB_DATABASE}`;

const connectionString = `mongodb+srv://${base}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true });
    logger.info({ message: DB.CONNECTION.OK });
  } catch ({ message }) {
    logger.error({ message });
  }
};

module.exports = { connectDB };
