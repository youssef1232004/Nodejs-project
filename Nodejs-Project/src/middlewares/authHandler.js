const AppError = require("../utils/appError");

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    next(new AppError("access denied", 403, "fail"));
  }
};

const isSameUserORisAdmin = (req, res, next) => {
  const isSame = req.user.id == req.params.userId;
  const isUserAdmin = req.user.role == "admin";

  if (isSame || isUserAdmin) {
    next();
  } else {
    next(new AppError("Access denied", 403, "fail"));
  }
};

module.exports = { isAdmin, isSameUserORisAdmin };