import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import resolvers from './resolvers';
import models from './models';

console.log(models);
const typeDefs = importSchema('schema.graphql');

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  }
});

export default apollo;
