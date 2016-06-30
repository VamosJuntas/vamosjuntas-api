import app from '../../src/app';

describe('Health Check', () => {
  it('should respond with 200', (done) => {
    request(app)
      .get('/_health')
      .expect(200, done);
  });

  it('should body contains ok text', (done) => {
    request(app)
      .get('/_health')
      .expect({
        online: true
      }, done);
  });
});
