//Import model from /categories/model.js
const Categories = require("./model");

const {
  createCategories,
  getAllCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require("../../../service/mongoose/categories");

const { StatusCodes } = require("http-status-codes");

//Create function create
const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);

    //Give response to client
    res.status(StatusCodes.CREATED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    //If mistakes happen use NEXT method so Express can process the error
    next(err);
  }
};

//Create function index for list categories
const index = async (req, res, next) => {
  try {
    //Find categories on MongoDB
    const result = await getAllCategories(req);

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

//Create function findbyid
const find = async (req, res, next) => {
  try {
    //Find categories on MongoDB by field_id
    const result = await getOneCategories(req);

    //Give respond to client
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
    const result = await updateCategories(req);

    //Give respond to client
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
    await deleteCategories(req);

    //Give respond to client
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "kategori berhasil dihapus",
    });
  } catch (err) {
    next(err);
  }
};

//Export functions
module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
