const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");
const { BadRequestError, NotFoundError } = require("../../errors");

const router = require("express").Router();
const { create } = require("../../api/v1/images/controller");
const upload = require("../../middlewares/multer");

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  await checkingImage(image);

  const check = await Talents.findOne({ name });

  if (check) throw new BadRequestError("Terdapat duplikat nama pembicara");

  const result = await Talents.create({ name, image, role });

  return result;
};

const getAllTalents = async (req) => {
  const { name, role } = req.query;

  let condition = {};

  if (name) {
    condition = {
      ...condition,
      name: { $regex: name, $options: "i" },
    };
  }

  if (role) {
    condition = {
      ...condition,
      role: { $regex: role, $options: "i" },
    };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role range");

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  await checkingImage(image);

  const check = await Talents.findOne({
    name,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Terdapat duplikat nama pembicara");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, image, role },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findByIdAndRemove(id);

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`);

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`);

  return result;
};

module.exports = {
  createTalents,
  getAllTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalents,
};
