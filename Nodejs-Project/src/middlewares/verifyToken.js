const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    return next(new AppError("token is required", 401, "fail"));
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    req.user = decodedToken;

    next();
  } catch (error) {
    return next(new AppError("invalid token", 403, "fail"));
  }
};

module.exports = verifyToken;
