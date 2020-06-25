const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema(
  {
    urlAuthorName: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    pseudonym: [
      {
        type: String,
      },
    ],
    birthdate: {
      type: String,
    },
    deathdate: {
      type: String,
    },
    nationality: {
      type: String,
    },
    portraitAuthorName: {
      type: String,
    },
    portraitAuthorLink: {
      type: String,
    },
    portraitAuthorLicense: {
      type: String,
    },
    portraitAuthorLicenseLink: {
      type: String,
    },
    portrait: {
      type: String,
    },
    resumeSource: {
      type: String,
    },
    resume: {
      type: String,
    },
    website: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    wikipedia: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    book: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
      },
    ],
    award: {
      type: [
        {
          award: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'award',
          },
          yearOfAward: {
            type: Number,
            // required: true
          },
          book: {
            type: String,
            // required: true
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('author', AuthorSchema);
