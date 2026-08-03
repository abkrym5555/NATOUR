const catchAsyncError = require('../utils/catchAsyncError');
const Review = require('../models/reviewModel');

const createReview = catchAsyncError(async (req, res, next) => {
  const review = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    tour: req.body.tourId,
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
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

module.exports = { createReview, getAllReviews };
