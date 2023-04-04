const Roles = require("../../api/v1/roles/model");

const getRoles = async (role) => {
  let checkRoles = await Roles.findOne({ role });
  if (!checkRoles) {
    checkRoles = await Roles.create({ role });
  }
  return checkRoles;
};

module.exports = {
  getRoles,
};
