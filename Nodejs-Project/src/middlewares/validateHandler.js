const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => `${err.path}: ${err.msg}`);
    console.log(errors);

    return next(new AppError(
      "Validation Error",
       400,
       "fail",
       errorMessages));
  }

  next();
};

module.exports = validateRequest;
