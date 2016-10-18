import logger from '../../../src/libs/request_logger';

describe('libs:request_logger', () => {

  it('should be a bunyan Logger', () => {
    expect(logger.constructor.name).to.equal('Logger');
  });

  it('should have request-logger name', () => {
    expect(logger.fields.name).to.equal('request-logger');
  });

  it('should have request-logger name', () => {
    expect(logger.fields.name).to.equal('request-logger');
  });

  it('should have restify serializers', () => {
    expect(logger.serializers.req).to.be.a('function');
    expect(logger.serializers.res).to.be.a('function');
    expect(logger.serializers.client_req).to.be.a('function');
    expect(logger.serializers.client_res).to.be.a('function');
  });

});
