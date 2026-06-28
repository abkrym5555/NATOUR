const port = 3000;
const express = require('express');
const morgan = require('morgan');
const app = express();
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

// middleware to make req body readable
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

// START SERVER
app.listen(port, () => {
  console.log('server is running now ');
});
