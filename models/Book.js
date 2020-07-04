const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
  {
    urlTitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    series: {
      type: String,
    },
    seriesNumber: {
      type: Number,
    },
    formats: {
      type: [String],
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    bookCover: {
      type: String,
      // required: true
    },
    bookCoverAuthor: {
      type: String,
    },
    ilustration: {
      type: String,
    },
    bookStatus: {
      type: String,
      required: true,
    },
    yearOfPublication: {
      type: Number,
    },
    publisher: {
      type: String,
    },
    originalTitle: {
      type: String,
      required: true,
    },
    yearOfPublicationOriginal: {
      type: Number,
    },
    translator: {
      type: String,
    },
    youtube: {
      type: String,
    },
    // description
    annotation: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
    // bookComments: {
    //   type: schema Comment - udelat
    // }
    // bookEditions: {
    //   type: schema BookEdition - udelat
    // },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'author',
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('book', BookSchema);
