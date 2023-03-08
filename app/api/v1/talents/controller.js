const {
  createTalents,
  getAllTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
} = require("../../../service/mongoose/talents");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createTalents(req);

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

const find = async (req, res, next) => {
  try {
    const result = await getOneTalents(req);

    res.status(StatusCodes.OK).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTalents(req);

    res.status(StatusCodes.OK).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await deleteTalents(req);

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "nama pembicara berhasil dihapus",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
