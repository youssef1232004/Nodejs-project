const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const validateRequest = require("../middlewares/validateHandler");
const {
  productValidationRules,
  productQueryRules,
  productIdRule,
  createProductRules,
} = require("../utils/validations/productValidations");
const upload = require("../middlewares/uploadImage");
const verifyToken = require("../middlewares/verifyToken");
const { isAdmin } = require("../middlewares/authHandler");

router.get(
  "/",
  productQueryRules,
  validateRequest,
  productController.getAllProducts,
);

router.get(
  "/:productId",
  productIdRule,
  validateRequest,
  productController.getProductById,
);

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createProductRules,
  validateRequest,
  productController.createProduct,
);

router.put(
  "/:productId",
  verifyToken,
  isAdmin,
  upload.single("image"),
  productIdRule,
  productValidationRules,
  validateRequest,
  productController.updateProduct,
);

router.delete(
  "/:productId",
  verifyToken,
  isAdmin,
  productIdRule,
  validateRequest,
  productController.deleteProduct,
);

module.exports = router;
