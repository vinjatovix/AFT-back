const CommonController = require("../common/controller");
const Service = require("./service");
const SceneController = CommonController(Service);

module.exports = {
  ...SceneController
};
