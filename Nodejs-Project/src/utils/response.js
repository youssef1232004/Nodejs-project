const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    status: "success",
    message: message,
    data: data,
    errors: null,
  });
};

module.exports = sendResponse;
