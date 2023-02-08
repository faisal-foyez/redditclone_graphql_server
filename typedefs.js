const gql = require('graphql-tag')

module.exports = gql`
  type Comment{
    id: ID!
    created_at: String!
    post: Post!
    text: String!
    username: String!
  }

  type Post{
    id: ID!
    created_at: String!
    title: String!
    body: String!
    image: String!
    username: String!
    subreddit:Subreddit!
    comments:[Comment!]!
    votes:[Vote!]! 
  }

  type Subreddit{ 
    id:ID!
    created_at: String!
    topic: String!
    posts:[Post!]!
  }

  type Vote{
    id:ID!
    created_at: String!
    post: Post
    upvote: Boolean
    username: String
  }

  input SubredditUpdateInput{
    id:String
    topic:String!
  } 

  input postInput{
    id:String
    title:String
    body:String
    image:String
    username:String
    subreddit_id:String
  } 

  input commentInput{
    id: String
    post_id: String!
    text: String!
    username: String!
  }

  input voteInput {
    id:String
    post_id: String
    upvote: Boolean
    username: String 
  }

  type Query{  
    #Subreddit queries
    getSubreddits:[Subreddit]!
    getSubreddit(subredditId:String!):Subreddit
    getSubredditListByTopic(topic:String!): [Subreddit!]!
    getSubredditListLimit(limit:Int!):[Subreddit]!
    ############################################
 
    #Post queries
    getPosts:[Post]!
    getPost(postId:String!):Post!
    getPostsByTopic(topic:String!):[Post]!
    ############################################
    
    #Comment queries
    getComments:[Comment]!
    getComment(commentId:String!):Comment!
    ############################################

    #Vote queries
    getVotes:[Vote]!
    getVote(voteId:String!):Vote!
    getVotesByPostId(postId:String!):[Vote]!
    ############################################
  } 

  type Mutation{
    #Subreddit Mutations
    insertSubreddit(topic:String!): Subreddit!
    updateSubreddit(input:SubredditUpdateInput): Subreddit!
    deleteSubreddit(id:String!):Subreddit!
    ############################################

    #Post Mutations
    insertPost(input:postInput): Post!
    updatePost(input:postInput): Post!
    deletePost(id:String!):Post!
    ############################################

    #Comment Mutations
    insertComment(input:commentInput): Comment!
    updateComment(input:commentInput): Comment!
    deleteComment(id:String!):Comment!
    ############################################

    #Vote Mutations 
    insertVote(input:voteInput): Vote! 
    updateVote(input:voteInput): Vote!
    deleteVote(id:String!):Vote!
    castVote(input:voteInput): Vote! 
    ############################################
  } 

`