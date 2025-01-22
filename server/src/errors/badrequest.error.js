const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends BaseError {
  constructor(propertyName, details) {
    super(
      "Bad Request Error",
      StatusCodes.BAD_REQUEST,
      `Invalid structure for ${propertyName}`,
      details
    );
  }
}

module.exports = BadRequest;
