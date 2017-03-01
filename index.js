import mongoose from 'mongoose';
import util from 'util';

import config from './config/config';
import app from './config/express';

const mongoUri = `${config.mongo.host}:${config.mongo.port}`;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

mongoose.set('debug', (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
});

app.listen(config.port, () => {
  console.log(`server started on port ${config.port} (${config.env})`);
});

export default app;
