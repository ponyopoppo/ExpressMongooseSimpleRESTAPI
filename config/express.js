import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import routes from '../server/routes/index.route';
import config from './config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(helmet());
app.use(cors());
app.use('/api', routes);
app.use((req, res, next) => next('API not found'));
app.use((err, req, res, next) => {
  res.status(400).json({ error: err });
  console.error("error", JSON.stringify(err, null, 2));
});

export default app;
