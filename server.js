const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
// START SERVER
app.listen(port, () => {
  console.log('server is running now ');
});
