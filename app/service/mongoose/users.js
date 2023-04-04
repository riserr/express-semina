const User = require("../../api/v1/users/model");
const Organizer = require("../../api/v1/organizers/model");
const { getRoles } = require("../mongoose/roles");
const { BadRequestError } = require("../../errors");
const { pwRoot } = require("../../config");

const createOwner = async (req) => {
  //create organizers
  const { organizer, email, password, confirmPassword, name, role, verCode } =
    req.body;
  if (password !== confirmPassword) throw new BadRequestError("INVALID");
  if (verCode !== pwRoot) throw new BadRequestError("INVALID");

  const roles = await getRoles(role);

  const organizerCheck = await Organizer.findOne({ organizer });
  if (organizerCheck) throw new BadRequestError("Organizer sudah ada");

  const organizers = await Organizer.create({ organizer });

  //create organizers and get organizers id
  const result = await User.create({
    email,
    name,
    password,
    role: roles._id,
    organizer: organizers._id,
  });

  delete result._doc.password;

  return result;
};

const createOrganizer = async (req) => {
  //create organizers
  const { organizer, email, password, confirmPassword, name, role } = req.body;
  if (password !== confirmPassword)
    throw new BadRequestError("password dan confirm password tidak cocok");

  const roles = await getRoles(role);

  const organizerCheck = await Organizer.findOne({ organizer });
  if (organizerCheck) throw new BadRequestError("Organizer sudah ada");

  const organizers = await Organizer.create({ organizer });

  //create organizers and get organizers id
  const result = await User.create({
    email,
    name,
    password,
    role: roles._id,
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

  const roles = await getRoles(role);

  //create users and get organizers id
  const result = await User.create({
    email,
    name,
    password,
    role: roles._id,
    organizer: req.user.organizer,
  });

  delete result._doc.password;

  return result;
};

const getAllUsers = async (req) => {
  const result = await User.find(req)
    .populate({ path: "role", select: "_id role" })
    .populate({ path: "organizer", select: "_id organizer" })
    .select("_id name email role organizer");
  return result;
};

module.exports = {
  createOwner,
  createOrganizer,
  createUser,
  getAllUsers,
};
