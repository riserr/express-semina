const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");
const { BadRequestError, NotFoundError } = require("../../errors");

const createTalents = async (req) => {
  const { name, job, image } = req.body;

  await checkingImage(image);

  const check = await Talents.findOne({ name, organizer: req.user.organizer });

  if (check) throw new BadRequestError("Terdapat duplikat nama pembicara");

  const result = await Talents.create({
    name,
    job,
    image,
    organizer: req.user.organizer,
  });

  return result;
};

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = {
      ...condition,
      name: { $regex: keyword, $options: "i" },
    };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name job image");

  if (!result.length)
    throw new NotFoundError(`Tidak ada pembicara dengan keyword ${keyword}`);

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name job range");

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, job, image } = req.body;

  await checkingImage(image);

  const check = await Talents.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });

  if (check) throw new BadRequestError("Terdapat duplikat nama pembicara");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, job, image, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOneAndDelete({
    _id: id,
    organizer: req.user.organizer,
  });

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
