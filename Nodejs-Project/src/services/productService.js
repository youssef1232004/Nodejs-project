const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");
const cloudinary = require("cloudinary").v2;

const getAllProducts = async (valQuery, queryParams) => {
  const filter = {};
  const limit = queryParams.limit || 5;
  const page = queryParams.page || 1;
  const skip = (page - 1) * limit;

  if (valQuery.category) filter.categoryId = queryParams.category;
  if (valQuery.search)
    filter.name = { $regex: queryParams.search, $options: "i" };

  if (valQuery.inStock == "true") {
    filter.stock = { $gt: 0 };
  } else if (queryParams.inStock == "false") {
    filter.stock = 0;
  }

  if (valQuery.minPrice || valQuery.maxPrice) {
    filter.price = {};
    if (queryParams.minPrice) filter.price.$gte = Number(queryParams.minPrice);
    if (queryParams.maxPrice) filter.price.$lte = Number(queryParams.maxPrice);
  }

  let filterdProducts = Product.find(filter)
    .populate("categoryId", "name")
    .limit(limit)
    .skip(skip);

  if (valQuery.sort) {
    filterdProducts = filterdProducts.sort(queryParams.sort);
  }

  return await filterdProducts;
};

const getProductById = async (productId) => {
  const productItem = await Product.findById(productId).populate(
    "categoryId",
    "name",
  );
  if (!productItem) throw new AppError("Product not found", 404, "fail");
  return productItem;
};

const createProduct = async (productData) => {
  if (!(await Category.findById(productData.categoryId))) {
    throw new AppError("Category not found", 404, "fail");
  }
  return await Product.create(productData);
};

const updateProduct = async (productId, updateData) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true, runValidators: true },
  ).populate("categoryId", "name");

  if (!updatedProduct) throw new AppError("Product not found", 404, "fail");
  return updatedProduct;
};

const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) throw new AppError("Product not found", 404, "fail");

  if (deletedProduct.image) {
    const publicId = deletedProduct.image
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  }
  return deletedProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
