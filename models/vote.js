const { Schema, model } = require('mongoose');

const VoteSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now()
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Posts'
  },
  upvote: Boolean,
  username: String
})

module.exports = model('Votes', VoteSchema);