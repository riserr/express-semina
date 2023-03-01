//Import http-status-codes
const { StatusCodes } = require("http-status-codes");

//Import CustomAPIError from ./custom-api-error.js
const CustomAPIError = require("./custom-api-error");

//Create class BadRequest with CustomAPIError extend
class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    //Give status code number
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
