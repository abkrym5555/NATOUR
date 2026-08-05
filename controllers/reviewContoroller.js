const {
  deleteOne,
  editOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory');
const catchAsyncError = require('../utils/catchAsyncError');
const Review = require('../models/reviewModel');

//middleware for create review
const setIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.tour) req.body.tourId = req.params.tourId;
  next();
};

const createReview = createOne(Review);

const getAllReviews = getAll(Review);

const getReview = getOne(Review);

const deleteReview = deleteOne(Review);

const editReview = editOne(Review);

module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
  editReview,
  setIds,
  getReview,
};
