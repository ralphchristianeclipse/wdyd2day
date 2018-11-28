import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';

const HOST = 'localhost:3001';

const cache = new InMemoryCache();

const linkHTTP = new HttpLink({
  uri: `http://${HOST}/graphql`
});

const linkWS = new WebSocketLink({
  uri: `ws://${HOST}/graphql`,
  options: {
    reconnect: true,
    connectionParams: (...args) => {
      console.log('Sending Connection Params');
      return {
        token: localStorage.getItem('token')
      };
    },
    lazy: true
  }
});

const isSubscriptionOperation = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
};

const connectionLink = split(isSubscriptionOperation, linkWS, linkHTTP);

const link = ApolloLink.from([connectionLink]);

const client = new ApolloClient({
  link,
  cache
});

export default client;
