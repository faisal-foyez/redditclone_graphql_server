const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now()
  },
  title: String,
  body: String,
  image: String,
  username: String,
  subreddit_id: {
    type: Schema.Types.ObjectId,
    ref: 'Subreddits'
  }
})

module.exports = model('Posts', PostSchema);