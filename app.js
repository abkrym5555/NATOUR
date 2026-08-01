const express = require('express');
const morgan = require('morgan');
const expRateLimit = require('express-rate-limit');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

const limiter = expRateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// middleware to make req body readable
app.use(express.json());

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`The ${req.originalUrl} not found `, 404));
});

// error middleware
app.use(globalErrorHandler);
module.exports = app;
