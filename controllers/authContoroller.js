const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');
const SendEmail = require('../utils/email');
const sendEmail = require('../utils/email');

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
    role: req.body.role,
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

const accessibleUser = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];

  if (!token) return next(new AppError('You are not logged in!', 401));

  const validToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(validToken.data);
  if (!currentUser)
    return next(new AppError('this user is no longer exist', 401));

  if (currentUser.changedPasswordAfter(validToken.iat))
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );

  req.user = currentUser;

  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(roles.includes(req.user.role));
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );

    next();
  };
};

const forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError('this user is not exist ', 404));
  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${resetToken}`;

  try {
    const options = {
      to: user.email,
      subject: 'Your password reset token',
      text: `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}`,
    };
    await sendEmail(options);

    res.status(200).json({
      status: 'success',
      message: 'token sent to ur email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});
const resetPassword = catchAsyncError(async (req, res, next) => {
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError('invalid token '), 400);

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = makeToken(user._id);

  res.status(200).json({
    status: 'success',
    message: 'password reset successfully',
    token,
  });
});
module.exports = {
  signUp,
  logIn,
  accessibleUser,
  restrictTo,
  forgetPassword,
  resetPassword,
};
