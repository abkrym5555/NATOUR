const fs = require('fs');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const User = require('../models/userModel');

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

module.exports = { getAllUsers, addNewUser, getUserById, editUser, deleteUser };
