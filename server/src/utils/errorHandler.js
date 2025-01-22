const logger = require("../config/logger.config");
const BaseError = require("../errors/base.error");
const { StatusCodes } = require("http-status-codes");

function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    // This is for known errors
    logger.error("An error occurred", err);
    return res.status(err.statusCode).json({
      status: "failure",
      message: err.message,
      error: err.details,
      data: {},
    });
  }

  // This is for unhandled errors
  logger.error("An unhandled error occurred", err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "failure",
    message: "Internal Server Error",
    error: "Something went wrong",
    data: {},
  });
}

module.exports = errorHandler;
