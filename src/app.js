import restify from 'restify';

let app = restify.createServer({
  name: 'VamosJuntas'
});

app.get('/', (req, res) => {
  return res.json({ online: true });
});

export default app;

