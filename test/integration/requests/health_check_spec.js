import app from '../../../src/app';

describe('GET /_health', () => {
  it('should respond with 200', (done) => {
    request(app)
      .get('/_health')
      .expect(200, done);
  });

  it('should body contains ok', (done) => {
    request(app)
      .get('/_health')
      .expect({
        ok: true
      }, done);
  });
});
