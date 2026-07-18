const mongoose = require('mongoose');
const dotenv = require('dotenv');

// handel uncaught Exception error
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('uncaughtException server shutdown');

  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successfuly'));

const port = process.env.PORT || 3000;
// START SERVER
const server = app.listen(port, () => {
  console.log('server is running now ');
});

// handel unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandledRejection server shutdown');
  server.close(() => {
    process.exit(1);
  });
});
