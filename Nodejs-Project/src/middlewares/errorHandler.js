const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const statusText = err.status;

  res.status(statusCode).json({
    status: statusText,
    message: err.message,
    data: null,
    errors: err.errors || null,
  });
};

module.exports = errorHandler;
