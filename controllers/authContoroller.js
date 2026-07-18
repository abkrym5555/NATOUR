const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');

const signUp = catchAsyncError(async (req, res, next) => {
  const newUser = User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

module.exports = { signUp };
