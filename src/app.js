import restify from 'restify';
import config from './config';
import mongoose from './libs/mongoose';
import requestValidator from './middlewares/request_validator';
import reportsController from './controllers/reports';
import reportSchemas from './controllers/schemas/reports';
import logger from './libs/request_logger';
import cors from 'cors';

dbConnect();

let app = restify.createServer({
  name: 'VamosJuntas',
  log: logger
});

app.use(restify.queryParser());
app.use(restify.bodyParser());

app.use(cors());

app.get('/_health', (req, res) => {
  if (mongoose.connection.readyState) {
    return res.send(200, { ok: true });
  }
  return res.send(500, { ok: false });
});

app.get('/reports/:geolocation', reportsController.show);

app.post(
  '/reports',
  requestValidator(reportSchemas.create),
  reportsController.create
);

app.pre((req, res, next) => {
  req.log.info({ req }, 'START');
  req.log.info({ res }, 'END');
  return next();
});

function dbConnect() {
  const DB = `${config.mongoose.db}`;

  mongoose.connect(DB, (err) => {
    if (err) {
      console.log('mongodb connection error', err);
    }
  });
}

export default app;
