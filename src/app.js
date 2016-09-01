import restify from 'restify';
import config from './config';
import mongoose from './libs/mongoose';
import requestValidator from './middlewares/request_validator';
import reportsController from './controllers/reports';
import reportSchemas from './controllers/schemas/reports';

dbConnect();

let app = restify.createServer({
  name: 'VamosJuntas'
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

function dbConnect() {
  const DB = `${config.mongoose.db}`;

  mongoose.connect(DB, (err) => {
    if (err) {
      console.log('mongodb connection error', err);
    }
  });
}

export default app;

