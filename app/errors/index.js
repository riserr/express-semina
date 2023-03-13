//Import CustomAPIError
const CustomAPIError = require("./custom-api-error");

//Import BadRequest
const BadRequestError = require("./bad-request");

//Import NotFound
const NotFoundError = require("./not-found");

//Import Unauthenticated
const UnauthenticatedError = require("./unauthenticated");

//Import Unauthorized
const UnauthorizedError = require("./unauthorized");

//Export module
module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
