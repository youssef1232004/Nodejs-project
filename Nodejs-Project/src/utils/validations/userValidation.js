const { body } = require("express-validator");

const addressValidationRules = [
  body("address.governorate")
    .optional()
    .not()
    .isNumeric()
    .withMessage("governorate must be text"),
  body("address.city")
    .optional()
    .not()
    .isNumeric()
    .withMessage("city must be text"),
  body("address.neighborhood")
    .optional()
    .not()
    .isNumeric()
    .withMessage("neighborhood must be text"),

  body("address.street")
    .optional()
    .not()
    .isNumeric()
    .withMessage("street must be text"),
  
];

const userValidationRules = [
  body("name")
    .notEmpty()
    .withMessage("User name is required")
    .not()
    .isNumeric()
    .withMessage("User name must be a text")
    .isLength({ min: 3, max: 100 })
    .withMessage("User name must be between 3 and 100 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
    ...addressValidationRules,
];

const [, emailRules, passwordRules] = userValidationRules;

const loginValidationRules = [emailRules, passwordRules];

const userIdRule = [
  param("userId")
    .isMongoId()
    .withMessage("The User ID provided in the URL is not a valid format"),
];

const updateUserRules = [
  body("name")
    .optional()
    .not()
    .isNumeric()
    .withMessage("User name must be a text")
    .isLength({ min: 3, max: 100 })
    .withMessage("User name must be between 3 and 100 characters"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
      ...addressValidationRules,
];

module.exports = {
  userValidationRules,
  loginValidationRules,
  userIdRule,
  updateUserRules,
};
