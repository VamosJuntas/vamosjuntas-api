import restify from 'restify';
import requestValidator from './middlewares/request_validator';
import reportsController from './controllers/reports';
import reportSchemas from './controllers/schemas/reports';

let app = restify.createServer({
  name: 'VamosJuntas'
});

app.use(restify.queryParser());
app.use(restify.bodyParser());

app.get('/_health', (req, res) => {
  return res.send(200, { online: true });
});

app.post('/reports', requestValidator(reportSchemas.create), reportsController.create);

export default app;

