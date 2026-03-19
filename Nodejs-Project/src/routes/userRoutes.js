const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validateRequest = require("../middlewares/validateHandler");
const {
  userValidationRules,
  loginValidationRules,
  userIdRule,
  updateUserRules,
} = require("../utils/validations/userValidation");
const verifyToken = require("../middlewares/verifyToken");
const { isAdmin, isSameUserORisAdmin } = require("../middlewares/authHandler");

router.get("/", verifyToken, isAdmin, userController.getAllUsers);

router.post(
  "/register",
  userValidationRules,
  validateRequest,
  userController.registerUser,
);

router.post(
  "/login",
  loginValidationRules,
  validateRequest,
  userController.loginUser,
);

router.put(
  "/:userId",
  verifyToken,
  isSameUserORisAdmin,
  userIdRule,
  updateUserRules,
  validateRequest,
  userController.updateUser,
);

router.delete(
  "/:userId",
  verifyToken,
  isSameUserORisAdmin,
  userIdRule,
  validateRequest,
  userController.deleteUser,
);

module.exports = router;
