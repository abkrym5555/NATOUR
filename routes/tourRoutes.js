const express = require('express');
const {
  creatNewTour,
  deleteTour,
  editTour,
  getAllTours,
  getTourById,
  checkId,
} = require('../controllers/tourControllers');

const route = express.Router();

route.param('id', checkId);

route.route('/').get(getAllTours).post(creatNewTour);
route.route('/:id').get(getTourById).patch(editTour).delete(deleteTour);

module.exports = route;
