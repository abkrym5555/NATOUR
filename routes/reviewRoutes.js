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

router.use(accessibleUser);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setIds, createReview);

router
  .route('/:id')
  .delete(restrictTo('user', 'admin'), deleteReview)
  .patch(restrictTo('user', 'admin'), editReview)
  .get(getReview);

module.exports = router;
