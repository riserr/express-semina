const { StatusCodes } = require("http-status-codes");
const Categories = require("../../api/v1/categories/model");
const { NotFoundError, BadRequestError } = require("../../errors");

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({ name });
  if (check) throw new BadRequestError("kategori nama sudah ada");

  const result = await Categories.create({ name });

  return result;
};

const getAllCategories = async () => {
  const result = await Categories.find();

  return result;
};

const getOneCategories = async (req, res) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  //Menampilkan REsponse kosong jika mencari kategori yang tidak ada
  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id ${id}`);

  /* Berhasil Menampilkan response jika kategori tidak ada
  if (!result) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ status: "error", message: "kategori tidak ada" });
  }
  */

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Categories.findOne({ name, _id: { $ne: id } });

  if (check) throw new BadRequestError("kategori nama sudah ada");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  await result.remove();

  return result;
};

module.exports = {
  createCategories,
  getAllCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
};
