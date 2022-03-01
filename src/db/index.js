const { throwError } = require("./throwError");
const { connectDB } = require("./connectDB");
const { dbErrors } = require("./dbErrors");

module.exports = { connectDB, throwError, dbErrors };
