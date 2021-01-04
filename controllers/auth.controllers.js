const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @description Sign up a new user
 * @method put
 * @access public
 */
exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  const { email, firstName, lastName, password } = req.body;
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed. Entered data is incorrect');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    const savedUser = await user.save();
    res.status(201).json({
      message: 'User signed up successfully',
      token,
      userId: savedUser._id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * @description Login a user
 * @method post
 * @access public
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error(
        'A user with this email address could not be found'
      );
      error.statusCode = 404;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password');
      error.statusCode = 401;
      throw err;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Logged in successfully',
      token,
      userId: user._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};