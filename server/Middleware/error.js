const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Server Error';

  if (err.name === 'CastError') {
    err = new ErrorHandler(`Resource not found. ${err.path} is invalid`, 404);
  }

  if (err.code == 11000) {
    err = new ErrorHandler(
      'This email is already registered. Please login',
      400
    );
  }

  //Wrong jwt token
  if (err.name === 'JsonWebTokenError') {
    err = new ErrorHandler(`Invalid token, try again`, 400);
  }

  // JWT Expired
  if (err.name === 'TokenExpiredError') {
    err = new ErrorHandler(`token is expired, try again`, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
