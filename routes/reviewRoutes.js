const express = require('express');
const {
  createReview,
  getAllReviews,
  deleteReview,
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

router.route('/:id').delete(deleteReview);

module.exports = router;
