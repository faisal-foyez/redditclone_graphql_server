const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Posts'
  },
  text: String,
  username: String
})

module.exports = model('Comments', CommentSchema);