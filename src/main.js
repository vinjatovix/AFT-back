const service = require("./service/service");
const { connectDB } = require("./db");

const { PORT } = process.env;

connectDB();

service.listen(PORT);
