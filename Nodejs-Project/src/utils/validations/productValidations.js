const { body, query, param } = require("express-validator");


const productValidationRules = [
  body("name")
    .optional()
     .not()
    .isNumeric()
    .withMessage("Product name must be a text string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Product name must be between 3 and 100 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("categoryId")
    .optional()
    .isMongoId()
    .withMessage("Category ID must be a valid MongoDB ObjectId"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),
];

const productQueryRules = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID filter format"),

  query("search")
    .optional()
    .isString()
    .withMessage("Search query must be text"),

  query("inStock")
    .optional()
    .isIn(["true", "false"])
    .withMessage('inStock filter must be specifically "true" or "false"'),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("minPrice cannot be negative"),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("maxPrice cannot be negative"),

  query("sort")
    .optional()
    .isIn(["price", "-price", "name", "-name","stock","-stock","createdAt", "-createdAt"])
    .withMessage(
      "Invalid sort parameter. Use price, -price, name, -name, etc.",
    ),
  ,
];

const productIdRule = [
  param("productId")
    .isMongoId()
    .withMessage("The Product ID provided in the URL is not a valid format"),
];


const createProductRules = [
  ...productValidationRules, 
  body('image').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Product image is required');
    }
    return true; 
  })
];

module.exports = {
  productValidationRules,
  patchProductRules,
  productQueryRules,
  productIdRule,
  createProductRules,
};
