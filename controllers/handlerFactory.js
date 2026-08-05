const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');

const deleteOne = (model) =>
  catchAsyncError(async (req, res, next) => {
    const delDoc = await model.findOneAndDelete({ _id: req.params.id });
    if (!delDoc) {
      return new AppError('No model found with this id ', 404);
    }
    res.status(200).json({
      status: 'success',
      deletedDoc: delDoc,
    });
  });

const editOne = (model) =>
  catchAsyncError(async (req, res, next) => {
    const editDoc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!editDoc) {
      return new AppError('No document found with this id ', 404);
    }
    return res.status(200).json({
      status: 'success',
      data: {
        editedDoc: editDoc,
      },
    });
  });

const createOne = (model) =>
  catchAsyncError(async (req, res, next) => {
    const newDoc = await model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newDoc,
      },
    });
  });

module.exports = { deleteOne, editOne, createOne };
