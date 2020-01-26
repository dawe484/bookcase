const mongoose = require('mongoose');

const AwardSchema = mongoose.Schema(
  {
    urlAwardTitle: {
      type: String
    },
    awardTitle: {
      type: String,
      required: true
    },
    awardCategory: {
      type: String,
      required: true
    },
    awardType: {
      type: String
    },
    awardAnnotation: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('award', AwardSchema);
