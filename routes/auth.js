// IMPORT EXPRESS JS
const express = require('express');

// EXPRESS JS VALIDATOR
const { check, body } = require('express-validator');

// IMPORT AUTHENTICATION CONTROLLER
const authController = require('../controllers/auth');

// IMPORT USER SCHEMA DB/TABLE
const User = require('../models/user');

// EXPRESS ROUTER OBJECT
const router = express.Router();

// GET METHOD => "/login" => User Login Page Display
router.get('/login', authController.getLogin);

// GET METHOD => "/signup" => User Signup Page Display
router.get('/signup', authController.getSignup);

// POST METHOD => "/login" => User Login SEND REQUEST
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);

// POST METHOD => "/signup" => User Signup SEND REQUEST
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],
  authController.postSignup
);

// POST METHOD => "/logout" => User Logout SEND REQUEST
router.post('/logout', authController.postLogout);

// GET METHOD => "/reset" => User Reset Password Page Display
router.get('/reset', authController.getReset);

// POST METHOD => "/reset" => User Reset Password SEND REQUEST
router.post('/reset', authController.postReset);

// GET METHOD => "/reset/token" => User Reset Token Page Display
router.get('/reset/:token', authController.getNewPassword);

// POST METHOD => "/new-password" => User New Password SEND REQUEST
router.post('/new-password', authController.postNewPassword);

module.exports = router;
