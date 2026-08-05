const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/aptFeatures');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');
const { path } = require('../app');
const { deleteOne, editOne, createOne } = require('./handlerFactory');

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};

const getAllTours = catchAsyncError(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .selectFields()
    .paginate();
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

const getTourById = catchAsyncError(async (req, res, next) => {
  const targetTour = await Tour.findById(req.params.id).populate('reviews');

  if (!targetTour) {
    return new AppError('No tour found with this id ', 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: targetTour,
    },
  });
});

const creatNewTour = createOne(Tour);

const editTour = editOne(Tour);

const deleteTour = deleteOne(Tour);

const getTourStats = catchAsyncError(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: {
          $sum: '$ratingsQuantity',
        },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: {
          $avg: '$price',
        },
        minPrice: {
          $min: '$price',
        },
        maxPrice: {
          $max: '$price',
        },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

const getMonthlyPlan = catchAsyncError(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numToursStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { numToursStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
module.exports = {
  getAllTours,
  getTourById,
  creatNewTour,
  editTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
};
