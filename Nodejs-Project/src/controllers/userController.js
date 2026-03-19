const userService = require("../services/userService");
const generateToken = require("../utils/generateToken");
const asyncWrapper = require("../utils/asyncWrapper");
const sendResponse = require("../utils/response");

//get all users
const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await userService.getAllUsers();
  sendResponse(res, 200, "Users fetched successfully", users);
});

//register new user
const registerUser = asyncWrapper(async (req, res, next) => {
  const newUser = await userService.registerUser(req.body);

  sendResponse(res, 201, "User created successfully", newUser);
});

//login user
const loginUser = asyncWrapper(async (req, res, next) => {
  const user = await userService.loginUser(req.body.email, req.body.password);

  sendResponse(res, 200, "Login successful", user);
});

//update user
const updateUser = asyncWrapper(async (req, res, next) => {
  // Prevent no admin users from changing their role
  if (req.body.role && req.user.role != "admin") {
    return next(new AppError("cannot change account roles", 403, "fail"));
  }
  const updatedUser = await userService.updateUser(req.params.userId, req.body);

  sendResponse(res, 200, "user updated successfully", updatedUser);
});

//delete user
const deleteUser = asyncWrapper(async (req, res, next) => {
  
  const deletedUser = await userService.deleteUser(req.params.userId);

  sendResponse(res, 200, "user deleted successfully", deletedUser);
});

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
