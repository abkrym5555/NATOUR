const Tour = require('../models/tourModel');

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // result: tours.length,
    data: {
      // tours,
    },
  });
};

const getTourById = (req, res) => {
  // const tourId = +req.params.id;
  // const targetTour = tours.find((tur) => tur.id === tourId);
  res.status(200).json({
    status: 'success',
    data: {
      // tour: targetTour,
    },
  });
};

const creatNewTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      // tour: newTour,
    },
  });
};

const editTour = (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      // tour: upTour,
    },
  });
};

const deleteTour = (req, res) => {
  res.status(404).end('can not delete in the file');
};

module.exports = {
  getAllTours,
  getTourById,
  creatNewTour,
  editTour,
  deleteTour,
};
