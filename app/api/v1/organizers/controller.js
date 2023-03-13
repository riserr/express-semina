const { createOrganizer } = require("../../../service/mongoose/users");

const { StatusCodes } = require("http-status-codes");

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

module.exports = {
  createCMSOrganizer,
};
