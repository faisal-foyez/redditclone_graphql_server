const { ApolloServer } = require('apollo-server')
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const db = require('./db');


require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return { ...db }
  }
})

mongoose.connect(process.env.DB_CONNECT)
  .then(() => {
    console.log('connected');
    server.listen(4000).then(({ url }) => {
      console.log(`server ready at ${url}`)
    })
  })