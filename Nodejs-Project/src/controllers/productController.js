const productService = require("../services/productService");
const { matchedData } = require("express-validator");
const asyncWrapper = require("../utils/asyncWrapper");
const sendResponse = require("../utils/response");


// get all products with pagination, filtering, and sorting
const getAllProducts = asyncWrapper(async (req, res, next) => {
  // Extract just needed query parameters
  const validatedQuery = matchedData(req, { locations: ["query"] });
  const products = await productService.getAllProducts(
    validatedQuery,
    req.query,
  );
  sendResponse(res, 200, "Products fetched successfully", products);
});


// get a single product by ID
const getProductById = asyncWrapper(async (req, res, next) => {
  const productItem = await productService.getProductById(req.params.productId);
  sendResponse(res, 200, "Product fetched successfully", productItem);
});


// create a new product
const createProduct = asyncWrapper(async (req, res, next) => {
  const productData = {
    name: req.body.name,
    price: req.body.price,
    categoryId: req.body.categoryId,
    stock: req.body.stock,
    image: req.file.path,
  };
  const newProduct = await productService.createProduct(productData);
  sendResponse(res, 201, "Product created successfully", newProduct);
});


// update an existing product
const updateProduct = asyncWrapper(async (req, res, next) => {
  const updateData = {
    name: req.body.name,
    price: req.body.price,
    categoryId: req.body.categoryId,
    stock: req.body.stock,
  };
  if (req.file) updateData.image = req.file.path;

  const updatedProduct = await productService.updateProduct(
    req.params.productId,
    updateData,
  );
  sendResponse(
    res,
    200,
    `${updatedProduct.name} is updated successfully`,
    updatedProduct,
  );
});


const deleteProduct = asyncWrapper(async (req, res, next) => {
  const deletedProduct = await productService.deleteProduct(
    req.params.productId,
  );
  sendResponse(
    res,
    200,
    `${deletedProduct.name} is deleted successfully`,
    deletedProduct,
  );
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
