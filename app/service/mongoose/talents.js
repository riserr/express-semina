const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = {};

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
    .select("_id name role image");

  return result;
};

module.exports = {
  getAllTalents,
};
