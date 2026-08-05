const express = require('express');
const {
  createReview,
  getAllReviews,
  deleteReview,
  editReview,
  setIds,
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

router.route('/:id').delete(deleteReview).patch(editReview);

module.exports = router;
