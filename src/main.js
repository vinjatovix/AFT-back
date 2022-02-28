const { service } = require("./service/service");
const test = require("./middlewares/test");
const connectDB = require("./db");

const { PORT } = process.env;

connectDB();

service.use(test).listen(PORT);
