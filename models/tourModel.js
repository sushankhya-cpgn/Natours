const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      maxlength: [40, 'A tour name must have less or equal than 40 characters'],
      minlength: [
        10,
        'A tour name must have greater than or equal than 10 characters',
      ],
    },
    slug: String,
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    secretTour: {
      type: Boolean,
      default: false,
      select: false,
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy,medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 1,
      min: [1, 'Rating must me above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount must be less than original price',
      },
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre('save', function (next) {
  console.log('Will save document...');
  console.log(this);
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();

  next();
});
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  console.log(docs);
  next();
});
tourSchema.pre('aggregate', function (next) {
  console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
