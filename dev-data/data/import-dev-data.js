const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: '../../config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => console.log(con.connection));

const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));
console.log(tours);

if (process.argv[2] === 'loadData') {
  (async function loaddata() {
    try {
      await Tour.create(tours);
    } catch (err) {
      console.log(err);
    }
  })();
} else if (process.argv[2] === 'deleteData') {
  (async function deletedata() {
    try {
      await Tour.deleteMany();
    } catch (err) {
      console.log(err);
    }
  })();
}
