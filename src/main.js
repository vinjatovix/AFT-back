const migrations = require("../migrations");
const service = require("./service/service");
const { connectDB } = require("./db");

const { PORT } = process.env;

migrations.up();
connectDB();

service.listen(PORT);
