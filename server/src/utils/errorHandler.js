const logger = require('../config/logger.config');
const BaseError = require('../errors/base.error');
const { StatusCodes } = require('http-status-codes');

function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      status: "failure",
      msg: err.message,
      error: err.details,
      data: {}, // This is to ensure that the response always has a data key but because this is an exception, it will be empty
    });
  }

  // This is for unhandled errors
  logger.error("An unhandled error occurred", err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "failure",
    msg: 'Internal Server Error',
    error: 'Something went wrong',
    data: {}, // This is to ensure that the response always has a data key but because this is an exception, it will be empty
  });
}

module.exports = errorHandler;