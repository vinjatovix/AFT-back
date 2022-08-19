const CommonController = require("../common/controller");
const Service = require("./service");
const BookController = CommonController(Service);

module.exports = {
  ...BookController
};
