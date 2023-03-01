//Import CustomAPIError
const CustomAPIError = require("./custom-api-error");

//Import BadRequest
const BadRequestError = require("./bad-request");

//Import NotFound
const NotFoundError = require("./not-found");

//Export module
module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
};
