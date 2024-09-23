class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'limit', 'sort', 'filter'];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query.find(JSON.parse(queryString));
    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      this.query = this.query.sort(this.queryStr.sort.split(',').join(' '));
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this;
  }

  pagination() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skipDocs = (page - 1) * limit;
    if (this.queryStr.page) {
      this.query = this.query.skip(skipDocs).limit(limit);
    }
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      this.query = this.query.select(this.queryStr.fields.split(',').join(' '));
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
}

module.exports = APIFeatures;
