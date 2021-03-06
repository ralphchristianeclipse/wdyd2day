import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import resolvers from './resolvers';
import models from './models';

const typeDefs = importSchema('schema.graphql');

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  },
  debug: true,
  subscriptions: {
    onConnect() {
      console.log('HEY');
      return { data: 'test' };
    }
  }
});

export default apollo;
