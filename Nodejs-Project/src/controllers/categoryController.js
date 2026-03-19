const categoryService = require("../services/categoryService");
const asyncWrapper = require("../utils/asyncWrapper");
const sendResponse = require("../utils/response");

const getAllCategories = asyncWrapper(async (req, res, next) => {
  const categories = await categoryService.getAllCategories();
  sendResponse(res, 200, "Categories fetched successfully", categories);
});

const getCategoryById = asyncWrapper(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const categoryItem = await categoryService.getCategoryById(categoryId);
  sendResponse(res, 200, "Category found", categoryItem);
});

const createCategory = asyncWrapper(async (req, res, next) => {
  const newCategory = await categoryService.createCategory(req.body.name);
  sendResponse(res, 201, "Category created successfully", newCategory);
});

const updateCategory = asyncWrapper(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const updatedCategory = await categoryService.updateCategory(
    categoryId,
    req.body.name,
  );
  sendResponse(res, 200, "Category updated successfully", updatedCategory);
});

const deleteCategory = asyncWrapper(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const deletedCategory = await categoryService.deleteCategory(categoryId);
  sendResponse(res, 200, "Category deleted successfully", deletedCategory);
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
