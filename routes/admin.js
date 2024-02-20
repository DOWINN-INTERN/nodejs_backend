// IMPORT PATH
const path = require('path');

// IMPORT EXPRESS JS
const express = require('express');

// EXPRESS JS VALIDATOR
const { body } = require('express-validator');

// IMPORT ADMIN CONTROLLER
const adminController = require('../controllers/admin');

// IMPORT AUTHENTICATION MIDDLEWARE/CONTROLLER
const isAuth = require('../middleware/is-auth');

// EXPRESS ROUTER OBJECT
const router = express.Router();

// GET METHOD => "/admin/add-product" => Admin Add Product Page Display
router.get('/add-product', isAuth, adminController.getAddProduct);

// GET METHOD => "/admin/products" => Admin Products (ALL) Page Display
router.get('/products', isAuth, adminController.getProducts);

// POST METHOD => "/admin/add-product" => Admin Add Product SEND REQUEST
router.post(
  '/add-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);

// GET METHOD => "/edit-product/productId" => Admin Edit Product (1) Page Display
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// POST METHOD => "/admin/edit-product" => Admin Edit Product SEND REQUEST
router.post(
  '/edit-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

// POST METHOD => "/delete-product" => Admin Delete Product SEND REQUEST
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
