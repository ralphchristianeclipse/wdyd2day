import app from './app';
import apollo from './apollo';
import jsonServer from './json';

const { PORT = 3001, JSON_PORT = 3002 } = process.env;

const logServerStart = () =>
  console.log(`Server started at http://localhost:${PORT}`);

apollo.applyMiddleware({ app });

app.listen(PORT, logServerStart);

jsonServer.listen(JSON_PORT, () =>
  console.log(`JSON Server started at http://localhost:${JSON_PORT}`)
);
