const fs = require('fs');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const User = require('../models/userModel');
const filterObj = require('../utils/filterObj');

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

const updateMe = catchAsyncError(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );

  const filterBody = filterObj(req.body, 'name', 'email');
  console.log(filterBody);

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

const addNewUser = catchAsyncError(async (req, res, next) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
});
const getUserById = catchAsyncError(async (req, res, next) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
});
const editUser = catchAsyncError(async (req, res, next) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
});
const deleteUser = catchAsyncError(async (req, res, next) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
});

module.exports = {
  getAllUsers,
  addNewUser,
  getUserById,
  editUser,
  deleteUser,
  updateMe,
};
