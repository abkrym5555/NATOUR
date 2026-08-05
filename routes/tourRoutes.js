const express = require('express');
const {
  creatNewTour,
  deleteTour,
  editTour,
  getAllTours,
  getTourById,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourControllers');
const {
  accessibleUser,
  restrictTo,
} = require('../controllers/authContoroller');
// const {
//   createReview,
//   getAllReviews,
// } = require('../controllers/reviewContoroller');

const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

// nested route
router.use('/:tourId/reviews', reviewRouter);

router.route('/tours-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').get(accessibleUser, getAllTours).post(creatNewTour);
router
  .route('/:id')
  .get(getTourById)
  .patch(editTour)
  .delete(accessibleUser, restrictTo('admin', 'lead-guide'), deleteTour);

// router
//   .route('/:tourId/reviews')
//   .post(accessibleUser, restrictTo('user'), createReview);

module.exports = router;
