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

module.exports = { deleteOne };
