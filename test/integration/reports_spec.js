import app from '../../src/app';

describe('POST /reports', () => {
  context('invalid', () => {
    it('should respond with 400 if geolocation is missing', (done) => {
      request(app)
        .post('/reports')
        .send({
          category: 'lorem',
          date: '06/06/2016'
        })
        .expect(400, done);
    });

    it('should respond with 400 if category is missing', (done) => {
      request(app)
        .post('/reports')
        .send({
          geolocation: [1, 2],
          date: '06/06/2016'
        })
        .expect(400, done);
    });

    it('should respond with 400 if date is missing', (done) => {
      request(app)
        .post('/reports')
        .send({
          geolocation: [1, 2],
          category: 'lorem'
        })
        .expect(400, done);
    });
  });

  context('valid', () => {
    it('should respond with 201', (done) => {
      request(app)
        .post('/reports')
        .send({
          geolocation: [1, 2],
          category: 'lorem',
          date: '06/06/2016'
        })
        .expect(201, done);
    });
  });
});
