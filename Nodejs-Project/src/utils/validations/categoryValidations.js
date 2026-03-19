const { body, param } = require("express-validator");

const categoryValidationRules = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .not()
    .isNumeric()
    .withMessage("Category name cannot be just numbers")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters"),
];

const categoryIdRule = [
  param("categoryId")
    .isMongoId()
    .withMessage("The Category ID provided in the URL is not a valid format"),
];

module.exports = {
  categoryValidationRules,
  categoryIdRule,
};
