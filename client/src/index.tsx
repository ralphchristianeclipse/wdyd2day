import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import client from './apollo';

const Loading = () => <div>Loading...</div>;

const Root = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </ApolloHooksProvider>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
