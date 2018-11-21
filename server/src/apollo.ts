import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import axios from 'axios';
import app from './app';
axios.defaults.baseURL = 'http://localhost:3002';
const request = options => axios(options).then(res => res.data);

const typeDefs = importSchema('schema.graphql');

const resolvers = {
  Post: {
    user: ({ id }) => ({
      id: 1,
      name: 'Ralph',
      email: 'ralph.eclipse@quantrics.com'
    })
  },
  Query: {
    posts: async () =>
      request({
        url: '/posts'
      })
  },
  Mutation: {
    postCreate: async (_root, { data }) =>
      request({
        method: 'post',
        url: '/posts',
        data
      }),
    postUpdate: async (_root, { id, data }) =>
      request({
        method: 'post',
        url: `/posts/${id}`,
        data
      }),
    postDelete: async (_root, { id }) =>
      request({
        method: 'delete',
        url: `/posts/${id}`
      })
  }
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers
});

export default apollo;
