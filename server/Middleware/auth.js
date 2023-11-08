const ErrorHandler = require('../utils/ErrorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');
const jwt = require('jsonwebtoken');
const User = require('../DBSchema/userSchema');

exports.isAuth = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Please login to continue', 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

// authorization of routes
exports.authorization = (...roles) => {
  return (req, res, next) => {
    console.log(roles.includes(req.user.role));

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler('You are not authorised to access this page', 403)
      );
    }
    next();
  };
};
