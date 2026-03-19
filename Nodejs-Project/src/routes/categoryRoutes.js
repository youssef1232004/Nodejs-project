const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const {
  categoryValidationRules,
  categoryIdRule,
} = require("../utils/validations/categoryValidations");
const validateRequest = require("../middlewares/validateHandler");
const verifyToken = require("../middlewares/verifyToken");
const { isAdmin } = require("../middlewares/authHandler");

router.get("/", categoryController.getAllCategories);

router.get(
  "/:categoryId",
  categoryIdRule,
  validateRequest,
  categoryController.getCategoryById,
);
router.post(
  "/",
  verifyToken,
  isAdmin,
  categoryValidationRules,
  validateRequest,
  categoryController.createCategory,
);
router.put(
  "/:categoryId",
  verifyToken,
  isAdmin,
  categoryIdRule,
  categoryValidationRules,
  validateRequest,
  categoryController.updateCategory,
);
router.delete(
  "/:categoryId/",
  verifyToken,
  isAdmin,
  categoryIdRule,
  validateRequest,
  categoryController.deleteCategory,
);

module.exports = router;
