const fs = require('fs');
const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const User = require('../models/userModel');
const filterObj = require('../utils/filterObj');
const { deleteOne, editOne, getOne, getAll } = require('./handlerFactory');

const getAllUsers = getAll(User);

const updateMe = catchAsyncError(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );

  const filterBody = filterObj(req.body, 'name', 'email');

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

const deleteMe = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(202).json({
    status: 'success',
    data: null,
  });
});

const addNewUser = catchAsyncError(async (req, res, next) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
});

const getUserById = getOne(User);

const editUser = editOne(User);

const deleteUser = deleteOne(User);

module.exports = {
  getAllUsers,
  addNewUser,
  getUserById,
  editUser,
  deleteUser,
  updateMe,
  deleteMe,
};
