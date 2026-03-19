const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (categoryId) => {
  const categoryItem = await Category.findById(categoryId);
  if (!categoryItem) {
    throw new AppError("Category not found", 404, "fail");
  }
  return categoryItem;
};

const createCategory = async (name) => {
  return await Category.create({ name });
};

const updateCategory = async (categoryId, name) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    { name },
    { new: true }
  );
  if (!updatedCategory) {
    throw new AppError("Category not found", 404, "fail");
  }
  return updatedCategory;
};

const deleteCategory = async (categoryId) => {
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  if (!deletedCategory) {
    throw new AppError("Category not found", 404, "fail");
  }
  return deletedCategory;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};