const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');

const makeToken = (id) => {
  return jwt.sign({ data: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const signUp = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = makeToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

const logIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide email and password!', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new AppError('Incorrect email or password', 401));

  const passIsCorrect = await user.checkPassword(password, user.password);
  if (!passIsCorrect)
    return next(new AppError('Incorrect email or password', 401));

  const token = makeToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

module.exports = { signUp, logIn };
