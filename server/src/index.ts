import app from './app';
import apollo from './apollo';
import jsonServer from './json';
import http from 'http';

const { PORT = 3001, JSON_PORT = 3002 } = process.env;

const logServerStart = () =>
  console.log(`Server started at http://localhost:${PORT}`);

const server = http.createServer(app);

apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(server);

app.listen(PORT, logServerStart);

jsonServer.listen(JSON_PORT, () =>
  console.log(`JSON Server started at http://localhost:${JSON_PORT}`)
);
