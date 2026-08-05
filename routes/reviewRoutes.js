const express = require('express');
const {
  createReview,
  getAllReviews,
  deleteReview,
  editReview,
  setIds,
  getReview,
} = require('../controllers/reviewContoroller');
const {
  accessibleUser,
  restrictTo,
} = require('../controllers/authContoroller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(accessibleUser, restrictTo('user'), setIds, createReview);

router.route('/:id').delete(deleteReview).patch(editReview).get(getReview);

module.exports = router;
