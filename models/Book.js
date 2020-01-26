const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
  {
    urlTitle: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    isbn: {
      type: String,
      required: true
    },
    series: {
      type: String
    },
    seriesNumber: {
      type: Number
    },
    formats: {
      type: [String],
      required: true
    },
    genres: {
      type: [String],
      required: true
    },
    language: {
      type: String,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
    bookCover: {
      type: String
    },
    bookCoverAuthor: {
      type: String
    },
    ilustration: {
      type: String
    },
    bookStatus: {
      type: String,
      required: true
    },
    publishDate: {
      type: String
    },
    publisher: {
      type: String
    },
    originalTitle: {
      type: String
    },
    translator: {
      type: String
    },
    youtube: {
      type: String
    },
    annotation: {
      type: String
    },
    // bookComments: {
    //   type: schema Comment - udelat
    // }
    // bookEditions: {
    //   type: schema BookEdition - udelat
    // },
    date: {
      type: Date,
      default: Date.now
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('book', BookSchema);
