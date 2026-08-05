const { deleteOne, editOne, createOne } = require('./handlerFactory');
const catchAsyncError = require('../utils/catchAsyncError');
const Review = require('../models/reviewModel');

//middleware for create review
const setIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.tour) req.body.tourId = req.params.tourId;
  next();
};

const createReview = createOne(Review);

const getAllReviews = catchAsyncError(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) {
    filter = { tour: req.params.tourId };
  }
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

const deleteReview = deleteOne(Review);

const editReview = editOne(Review);

module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
  editReview,
  setIds,
};
