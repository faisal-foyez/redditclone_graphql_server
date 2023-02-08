const { Schema, model } = require('mongoose');

const SubredditSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  topic: String,


})

module.exports = model('Subreddits', SubredditSchema);