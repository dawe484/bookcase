const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'register'
    },
    date: {
      type: Date,
      default: Date.now
    },
    userImage: {
      type: String
    },
    realName: {
      type: String
    },
    birthdate: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    statistics: {
      type: [String]
    },
    reading: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'books'
    },
    read: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'books'
    },
    goingToRead: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'books'
    },
    favouriteBooks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'books'
    },
    eBookcase: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'books'
    },
    wantToBorrow: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'books'
    },
    favouriteAuthors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'authors'
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('user', UserSchema);
