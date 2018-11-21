import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://10.65.22.13:3001/graphql'
});

export default client;
