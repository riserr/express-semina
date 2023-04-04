const {
  createOwner,
  createOrganizer,
  createUser,
  getAllUsers,
} = require("../../../service/mongoose/users");

const { StatusCodes } = require("http-status-codes");

const createCMSOwner = async (req, res, next) => {
  try {
    const result = await createOwner(req);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUser(req);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCMSOwner,
  createCMSOrganizer,
  createCMSUser,
  index,
};
