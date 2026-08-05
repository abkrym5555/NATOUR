const express = require('express');
const {
  createReview,
  getAllReviews,
} = require('../controllers/reviewContoroller');
const {
  accessibleUser,
  restrictTo,
} = require('../controllers/authContoroller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(accessibleUser, restrictTo('user'), createReview);

module.exports = router;
