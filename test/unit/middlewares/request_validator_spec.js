import sinon from 'sinon';
import validator from '../../../src/middlewares/request_validator';

describe('middlewares:request_validator', () => {
  const SCHEMA = {
    "type": "object",
    "properties": {
      "foo": {
        "type": "string"
      }
    }
  };

  context('invalid', () => {
    let req, res;

    beforeEach(() => {
      req = {
        params: {
          'foo': 123
        }
      };

      res = {
        send: sinon.spy()
      };
    });

    it('should call res.send with status 400 and json error data', () => {
      let nextSpy = sinon.spy();
      let middleware = validator(SCHEMA);
      middleware(req, res, nextSpy);
      expect(nextSpy).to.not.have.been.called;
      expect(res.send).to.have.been.calledWith(400, {
        error: {
          message: 'Bad Request'
        }
      });
    });
  });

  context('valid', () => {
    let req, res;

    beforeEach(() => {
      req = {
        params: {
          'foo': 'bar'
        }
      };

      res = {
        send: sinon.spy()
      };
    });

    it('should call next', () => {
      let nextSpy = sinon.spy();
      let middleware = validator(SCHEMA);
      middleware(req, res, nextSpy);
      expect(res.send).to.not.have.been.called;
      expect(nextSpy).to.have.been.called;
    });
  });
});

