import restify from 'restify';
import config from './config';
import mongoose from './libs/mongoose';
import requestValidator from './middlewares/request_validator';
import reportsController from './controllers/reports';
import reportSchemas from './controllers/schemas/reports';
import logger from './libs/request_logger';

dbConnect();

let app = restify.createServer({
  name: 'VamosJuntas',
  log: logger
});

app.use(restify.queryParser());
app.use(restify.bodyParser());

app.get('/_health', (req, res) => {
  return res.send(200, { ok: true });
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
