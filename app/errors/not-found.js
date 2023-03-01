//Import http-status-codes
const { StatusCodes } = require("http-status-codes");

//Import CustomAPIError from ./custom-api-error.js
const CustomAPIError = require("./custom-api-error");

//Create class NotFound with CustomAPIError extend
class NotFound extends CustomAPIError {
  constructor(message) {
    super(message);
    //Give status code number
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
