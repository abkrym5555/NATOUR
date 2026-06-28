const express = require('express');
const morgan = require('morgan');
const app = express();
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

// middleware to make req body readable
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
