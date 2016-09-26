import app from '../../../src/app';

describe('/reports', () => {
  describe('GET /reports/:geolocation', () => {
    context('found', () => {
      it('should responde with 200', (done) => {
        request(app)
          .get('/reports/-30.057389,-51.174544')
          .expect(200, done);
      });
    });

    context('not found', () => {
      it('should responde with 200', (done) => {
        request(app)
          .get('/reports/-90,-180')
          .expect(200, done);
      });

      it('should render an empty array', (done) => {
        request(app)
          .get('/reports/-30.057389,-51.174544')
          .expect([], done);
      });
    });
  });

  describe('POST /reports', () => {
    context('invalid', () => {
      it('should respond with 400 if geolocation is missing', (done) => {
        request(app)
          .post('/reports')
          .send({
            address: 'Avenida Ipiranga, 201',
            category: 'lorem',
            date: '06/06/2016'
          })
          .expect(400, done);
      });

      it('should respond with 400 if category is missing', (done) => {
        request(app)
          .post('/reports')
          .send({
            address: 'Avenida Ipiranga, 201',
            geolocation: {
              latitude: 1,
              longitude: 2
            },
            date: '06/06/2016'
          })
          .expect(400, done);
      });

      it('should respond with 400 if date is missing', (done) => {
        request(app)
          .post('/reports')
          .send({
            address: 'Avenida Ipiranga, 201',
            geolocation: {
              latitude: 1,
              longitude: 2
            },
            category: 'lorem'
          })
          .expect(400, done);
      });

      it('should respond with address is missing', (done) => {
        request(app)
          .post('/reports')
          .send({
            geolocation: {
              latitude: 1,
              longitude: 2
            },
            category: 'lorem',
            date: '06/06/2016'
          })
          .expect(400, done);
      });
    });

    context('valid', () => {
      it('should respond with 201', (done) => {
        request(app)
          .post('/reports')
          .send({
            address: 'Avenida Ipiranga, 201',
            geolocation: {
              latitude: 1,
              longitude: 2
            },
            category: 'lorem',
            date: '06/06/2016'
          })
          .expect(201, done);
      });
    });
  });
});
