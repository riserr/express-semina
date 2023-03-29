const User = require("../../api/v1/users/model");
const Organizer = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
  //create organizers
  const { organizer, email, password, confirmPassword, name, role } = req.body;
  if (password !== confirmPassword)
    throw new BadRequestError("password dan confirm password tidak cocok");

  const organizers = await Organizer.create({ organizer });

  //create organizers and get organizers id
  const result = await User.create({
    email,
    name,
    password,
    role,
    organizer: organizers._id,
  });

  delete result._doc.password;

  return result;
};

const createUser = async (req) => {
  //create organizers
  const { email, password, confirmPassword, name, role } = req.body;
  if (password !== confirmPassword)
    throw new BadRequestError("password dan confirm password tidak cocok");

  //create users and get organizers id
  const result = await User.create({
    email,
    name,
    password,
    role,
    organizer: req.user.organizer,
  });

  delete result._doc.password;

  return result;
};

const getAllUsers = async (req) => {
  const result = await User.find(req).select("_id name email role organizer");
  return result;
};

module.exports = {
  createOrganizer,
  createUser,
  getAllUsers,
};
