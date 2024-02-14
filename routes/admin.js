// Import Directory
const path = require("path");

// Import Express
const express = require("express");

// Import Admin Controller
const adminController = require("../controllers/admin");

// Create a new Routes
const router = express.Router();

// HTTP - ADMIN ADD PRODUCT PAGE (ADMIN)
router.get("/admin/add-product", adminController.getAddProduct);

// HTTP - ADMIN PRODUCT PAGE (ADMIN)
router.get("/admin/products", adminController.getProducts);

// HTTP - ADMIN AFTER ADD PRODUCT (ADMIN)
router.post("/admin/add-product", adminController.postAddProduct);

// HTTP - ADMIN EDIT PRODUCT PAGE (ADMIN)
router.get("/admin/edit-product/:productId", adminController.getEditProduct);

// HTTP - ADMIN AFTER EDIT PRODUCT (ADMIN)
router.post("/admin/edit-product", adminController.postEditProduct);

// HTTP - ADMIN AFTER DELETE PRODUCT (ADMIN)
router.post("/admin/delete-product", adminController.postDeleteProduct);

module.exports = router;
