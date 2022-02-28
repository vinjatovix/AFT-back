const mongoose = require("mongoose");
const { DB } = require("../messages");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_REPLICA_SET } = process.env;
const password = encodeURIComponent(DB_PASSWORD);
const connectionString = `mongodb://${DB_USER}:${password}@${DB_HOST}/?replicaSet=${DB_REPLICA_SET}`;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true });
    console.log({ message: DB.CONNECTION.OK });
  } catch ({ message }) {
    console.log({ message });
  }
};

module.exports = connectDB;
