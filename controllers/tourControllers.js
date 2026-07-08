const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const getTourById = async (req, res) => {
  try {
    const targetTour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: targetTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const creatNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const editTour = async (req, res) => {
  try {
    const upTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      status: 'success',
      data: {
        tour: upTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const delTour = await Tour.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      deletedTour: delTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  creatNewTour,
  editTour,
  deleteTour,
};
