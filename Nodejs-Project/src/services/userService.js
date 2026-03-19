const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const generateToken = require("../utils/generateToken");

//get all users from database
const getAllUsers = async () => {
  return await Users.find({});
};

//register new user in database and return token
const registerUser = async (userData) => {
  // Check if user with the same email already exists
  if (await Users.findOne({ email: userData.email })) {
    throw new AppError("User already exists", 409, "fail");
  }
  const hashedPass = await bcrypt.hash(userData.password, 10);

  const newUser = await Users.create({
    name: userData.name,
    email: userData.email,
    password: hashedPass,
    address: userData.address,
  });

  // Generate token with user ID and role
  const token = generateToken({
    id: newUser._id,
    role: newUser.role,
  });

  const { password, ...userWithoutPass } = newUser.toObject();

  
  const payload = {
    user: userWithoutPass,
    token: token,
  };

  return payload;
};


//login user and return token
const loginUser = async (email, password) => {
  
  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("user doesnt exist", 401, "fail");
  }

  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    throw new AppError("Invalid email or password", 401, "fail");
  }
  user.password = undefined;

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  const payload = {
    user: user,
    token: token,
  };

  return payload;
};

//update user data in database
const updateUser = async (userId, updateData) => {
  if (updateData.email) {
    const checkExistingUser = await Users.findOne({
      email: updateData.email,
      _id: { $ne: userId },
    });

    if (checkExistingUser) {
      throw new AppError("This email is already used", 409, "fail");
    }
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const updatedUser = await Users.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new AppError("user not found", 404, "fail");
  }

  return updatedUser;
};

//delete user from database
const deleteUser = async (userId) => {
  const deletedUser = await Users.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new AppError("user not found", 404, "fail");
  }

  return deletedUser;
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
