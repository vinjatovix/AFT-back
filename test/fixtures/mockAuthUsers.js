const userWithAllPermissions = {
  username: "userTest",
  roles: ["aft.admin", "aft.editor", "aft.user"]
};
const editorUser = {
  username: "editor",
  roles: ["aft.editor", "aft-user"]
};
const user = {
  username: "user",
  roles: ["aft.user"]
};

module.exports = {
  allPermissions: userWithAllPermissions,
  editor: editorUser,
  user: user
};
