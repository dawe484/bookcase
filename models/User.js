const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  justReading: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'books'
  },
  alreadyRead: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'books'
  },
  favouriteBooks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'books'
  },
  favouriteAuthors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'authors'
  },
  eBookshelf: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'books'
  },
  wantToRead: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'books'
  },
});

module.exports = mongoose.model('user', UserSchema);
