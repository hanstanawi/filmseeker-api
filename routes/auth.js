const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const { body } = require('express-validator');
const User = require('../models/User');

router.put(
  '/signup',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email address already exists');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('firstName').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty(),
  ],
  authController.signUp
);

router.post('/login', authController.login);

module.exports = router;