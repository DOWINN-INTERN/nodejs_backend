// IMPORT PATH
const path = require('path');

// IMPORT EXPRESS JS
const express = require('express');

// IMPORT SHOP CONTROLLER
const shopController = require('../controllers/shop');

// IMPORT AUTHENTICATION MIDDLEWARE/CONTROLLER
const isAuth = require('../middleware/is-auth');

// EXPRESS ROUTER OBJECT
const router = express.Router();

// GET METHOD => "/" => User Main Page Display
router.get('/', shopController.getIndex);

// GET METHOD => "/products" => User Products (ALL) Page Display
router.get('/products', shopController.getProducts);

// GET METHOD => "/products/productId" => User Product (1) Details Page Display
router.get('/products/:productId', shopController.getProduct);

// GET METHOD => "/cart" => User Product Cart Page Display
router.get('/cart', isAuth, shopController.getCart);

// POST METHOD => "/cart" => User Add To Cart SEND REQUEST
router.post('/cart', isAuth, shopController.postCart);

// POST METHOD => "/cart-delete-item" => User Delete Cart Item SEND REQUEST
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// POST METHOD => "/create-order" => User Proceed Order SEND REQUEST
router.post('/create-order', isAuth, shopController.postOrder);

// GET METHOD => "/orders" => User Orders (ALL) Page Display
router.get('/orders', isAuth, shopController.getOrders);

// GET METHOD => "/orders/orderId" => User Order (1) Page Display
router.get('/orders/:orderId', isAuth, shopController.getInvoice);

module.exports = router;
