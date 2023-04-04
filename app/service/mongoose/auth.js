const User = require("../../api/v1/users/model");
const Role = require("../../api/v1/roles/model");
const { BadRequestError, UnauthenticatedError } = require("../../errors");
const { createJWT, createTokenUser } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("please provide email and password");

  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("invalid credentials");

  const role = await Role.findOne({ _id: user.role });

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ payload: createTokenUser(user, role) });
  return token;
};

module.exports = { signin };
