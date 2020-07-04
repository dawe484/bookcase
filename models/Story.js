const mongoose = require('mongoose');

const StorySchema = mongoose.Schema(
  {
    urlStoryTitle: {
      type: String,
    },
    storyTitle: {
      type: String,
      required: true,
    },
    storySeries: {
      type: String,
    },
    storySeriesNumber: {
      type: Number,
    },
    storyGenres: {
      type: String,
      required: true,
    },
    storyLanguage: {
      type: String,
      required: true,
    },
    storyPages: {
      type: Number,
      required: true,
    },
    storyYearOfPublish: {
      type: String,
    },
    storyOriginalTitle: {
      type: String,
    },
    storyAnnotation: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'author',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('award', StorySchema);
