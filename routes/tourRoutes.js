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

const route = express.Router();

route.route('/tours-stats').get(getTourStats);
route.route('/monthly-plan/:year').get(getMonthlyPlan);
route.route('/top-5-cheap').get(aliasTopTours, getAllTours);
route.route('/').get(getAllTours).post(creatNewTour);
route.route('/:id').get(getTourById).patch(editTour).delete(deleteTour);

module.exports = route;
