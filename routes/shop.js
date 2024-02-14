// Import Directory
const path = require('path');

// Import Express
const express = require('express');

// Import Admin Controller
const shopController = require('../controllers/shop');

// Create a new Routes
const router = express.Router();

// HTTP - SHOP PAGE
router.get('/', shopController.getIndex);

// HTTP - PRODUCTS PAGE
router.get('/products', shopController.getProducts);

// HTTP - PRODUCT DETAIL PAGE
router.get('/products/:productId', shopController.getProduct);


// HTTP - ADD TO CART PAGE
router.get('/cart', shopController.getCart);

// HTTP - AFTER ADD TO CART
router.post('/cart', shopController.postCart);

// HTTP - AFTER ADD TO CART DELETE
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// HTTP - ORDERS PAGE
router.get('/orders', shopController.getOrders);

// HTTP - CHECKOUT PAGE
router.get('/checkout', shopController.getCheckout);

module.exports = router;
