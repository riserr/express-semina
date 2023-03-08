const {
  createEvents,
  getAllEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
} = require("../../../service/mongoose/events");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createEvents(req);

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
    const result = await getAllEvents(req);

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
    const result = await getOneEvents(req);

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
    const result = await updateEvents(req);

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
    await deleteEvents(req);

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "nama event berhasil dihapus",
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
