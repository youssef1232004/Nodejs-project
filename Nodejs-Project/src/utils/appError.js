class AppError extends Error {
  constructor(message, statusCode, statusText, valErrors = null) {
    super(message);

    this.statusCode = statusCode;
    this.statusText = statusText;
    this.errors = valErrors;
  }
}

module.exports = AppError;
