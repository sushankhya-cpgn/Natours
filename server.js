const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((con) => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Listening');
});
