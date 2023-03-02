const Talents = require("./model");
const { getAllTalents } = require("../../../service/mongoose/talents");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    //Find categories on MongoDB
    const result = await getAllTalents(req);

    //Give respond to client
    res.status(StatusCodes.OK).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    //If mistakes happen use NEXT method so Express can process the error
    next(err);
  }
};

module.exports = {
  index,
};
