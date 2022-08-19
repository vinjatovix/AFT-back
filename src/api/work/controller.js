const CommonController = require("../common/controller");
const Service = require("./service");
const WorkController = CommonController(Service);

module.exports = {
  ...WorkController
};
