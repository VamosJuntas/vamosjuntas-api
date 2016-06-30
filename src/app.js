import restify from 'restify';

let app = restify.createServer({
  name: 'VamosJuntas'
});

app.get('/_health', (req, res) => {
  return res.send(200, { online: true });
});

export default app;

