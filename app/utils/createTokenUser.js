const createTokenUser = (user, role) => {
  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: role.role,
    organizer: user.organizer,
  };
};

module.exports = {
  createTokenUser,
};
