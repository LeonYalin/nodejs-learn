const debug = require('debug')('globalErrorHandler');

function globalErrorHandler(err, req, res, next) {
  debug(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err);
}

module.exports = globalErrorHandler;
