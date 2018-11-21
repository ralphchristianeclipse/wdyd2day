import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import axios from 'axios';
import app from './app';
const request = options => axios(options).then(res => res.data);
const typeDefs = importSchema('schema.graphql');

const resolvers = {
  Query: {
    posts: async () =>
      await request({
        url: 'https://jsonplaceholder.typicode.com/posts'
      })
  },
  Mutation: {
    postAdd: async (_root, { data }) => {}
  }
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers
});

export default apollo;
