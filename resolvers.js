const mongoose = require('mongoose');

module.exports = {
  Query: {
    //Subreddit queries///////////////////////
    async getSubreddits(_, __, { Subreddit }) {
      const subreddits = await Subreddit.find()
      return subreddits
    },
    async getSubreddit(_, { subredditId }, { Subreddit }) {
      const subreddit = await Subreddit.findById(subredditId)
      return subreddit
    },
    async getSubredditListByTopic(_, { topic }, { Subreddit }) {
      console.log(topic);
      const subredditByTopic = await Subreddit.find({ topic })
      return subredditByTopic;
    },
    async getSubredditListLimit(_, { limit }, { Subreddit }) {
      const subreddits = await Subreddit.find().sort({ created_at: -1 }).limit(limit);
      return subreddits;
    },
    ////////////////////////////////////////////

    //Post queries///////////////////////
    async getPosts(_, __, { Post }) {
      const posts = await Post.find().sort({ created_at: -1 })
      return posts
    },
    async getPost(_, { postId }, { Post }) {
      const post = await Post.findById(postId)
      return post
    },
    async getPostsByTopic(_, { topic }, { Post, Subreddit }) {
      const subreddit = await Subreddit.findOne({ topic })

      const posts = await Post.find({ subreddit_id: subreddit.id }).sort({ created_at: -1 })
      return posts;
    },
    ////////////////////////////////////////////

    //Comment queries///////////////////////
    async getComments(_, __, { Comment }) {
      const comments = await Comment.find().sort({ created_at: -1 })
      return comments
    },
    async getComment(_, { commentId }, { Comment }) {
      const comment = await Comment.findById(commentId)
      return comment
    },
    ////////////////////////////////////////////

    //Vote queries///////////////////////
    async getVotes(_, __, { Vote }) {
      const votes = await Vote.find()
      return votes
    },
    async getVote(_, { voteId }, { Vote }) {
      const vote = await Vote.findById(voteId)
      return vote
    },
    async getVotesByPostId(_, { postId }, { Vote }) {
      const votes = await Vote.find({ post_id: postId }).sort({ created_at: -1 })
      return votes;
    }
    ////////////////////////////////////////////

  },
  Mutation: {
    //Subreddit Mutations //////////////////////////////////////
    async insertSubreddit(_, { topic }, { Subreddit }) {
      const subreddit = new Subreddit({
        topic: topic
      })
      const savedSubReddit = await subreddit.save();
      return savedSubReddit
    },
    async updateSubreddit(_, { input: { id, topic } }, { Subreddit }) {
      const updatedSubreddit = await Subreddit.findByIdAndUpdate(id, { topic: topic })
      return updatedSubreddit;
    },
    async deleteSubreddit(_, { id }, { Subreddit }) {
      const deletedSubreddit = await Subreddit.findByIdAndDelete(id)
      return deletedSubreddit;
    },
    /////////////////////////////////////////////////////////////

    //Post Mutations/////////////////////////////////////////////////////////////
    async insertPost(_, { input: { title, body, image, username, subreddit_id } }, { Post }) {
      console.log(subreddit_id);
      const post = new Post({
        title,
        body,
        image,
        username,
        subreddit_id
      })
      const savedPost = await post.save();
      return savedPost
    },
    async updatePost(_, { input: { id, title = undefined, body = undefined, image = undefined, username = undefined, subreddit_id = undefined } }, { Post }) {
      const updatedPost = await Post.findByIdAndUpdate(id, { title, body, image, username, subreddit_id })
      return updatedPost;
    },
    async deletePost(_, { id }, { Post }) {
      const deletedPost = await Post.findByIdAndDelete(id)
      return deletedPost;
    },
    /////////////////////////////////////////////////////////////

    //Comment Mutations/////////////////////////////////////////////////////////////
    async insertComment(_, { input: { post_id, text, username } }, { Comment }) {
      const comment = new Comment({
        post_id,
        text,
        username
      })
      const savedComment = await comment.save();
      return savedComment
    },
    async updateComment(_, { input: { id, post_id = undefined, text = undefined, username = undefined } }, { Comment }) {
      const updatedComment = await Comment.findByIdAndUpdate(id, { post_id, text, username })
      return updatedComment;
    },
    async deleteComment(_, { id }, { Comment }) {
      const deletedComment = await Comment.findByIdAndDelete(id)
      return deletedComment;
    },
    /////////////////////////////////////////////////////////////

    //Comment Mutations/////////////////////////////////////////////////////////////
    async insertVote(_, { input: { post_id, upvote, username } }, { Vote }) {
      const vote = new Vote({
        post_id,
        upvote,
        username
      })
      const savedVote = await vote.save();
      return savedVote
    },
    async updateVote(_, { input: { id, post_id = undefined, upvote = undefined, username = undefined } }, { Vote }) {
      const updatedVote = await Vote.findByIdAndUpdate(id, { post_id, upvote, username })
      return updatedVote;
    },
    async deleteVote(_, { id }, { Vote }) {
      const deletedVote = await Vote.findByIdAndDelete(id)
      return deletedVote;
    },
    async castVote(_, { input: { id, post_id = undefined, upvote = undefined, username = undefined } }, { Vote }) {
      id = id || new mongoose.Types.ObjectId();
      const updatedVote = await Vote.findOneAndUpdate({ username, post_id }, { post_id, upvote, username }, { upsert: true, new: true, setDefaultsOnInsert: true })
      return updatedVote;
    },
    /////////////////////////////////////////////////////////////
  },
  Subreddit: {
    id(root, __, ctx) {
      return root._id
    },
    async posts(root, __, { Post }) {
      return (await Post.find({ subreddit_id: root.id }))
    }
  },
  Post: {
    id(root, __, ctx) {
      return root._id
    },
    async subreddit(root, __, { Subreddit }) {
      const subreddit = await Subreddit.findOne({ _id: root.subreddit_id })
      return subreddit;
    },
    async comments(root, __, { Comment }) {
      console.log(root);
      const comments = (await Comment.find({ post_id: root._id }).sort({ created_at: -1 }));
      return comments;
    },
    async votes(root, __, { Vote }) {
      const votes = (await Vote.find({ post_id: root.post_id }));
      return votes;
    }
  },
  Comment: {
    id(root, __, ctx) {
      return root._id
    },
    async post(root, __, { Post }) {
      const post = (await Post.findById(root.post_id))
      return post;
    }
  },
  Vote: {
    id(root, __, ctx) {
      return root._id
    },
    async post(root, __, { Post }) {
      const post = (await Post.findById(root.post_id))
      return post
    }
  }
}