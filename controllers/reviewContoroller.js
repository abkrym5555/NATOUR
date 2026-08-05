const catchAsyncError = require('../utils/catchAsyncError');
const Review = require('../models/reviewModel');
const { deleteOne } = require('./handlerFactory');

const createReview = catchAsyncError(async (req, res, next) => {
  const review = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    tour: req.params.tourId || req.body.tourId,
    user: req.user.id,
  });

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

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

module.exports = { createReview, getAllReviews, deleteReview };
