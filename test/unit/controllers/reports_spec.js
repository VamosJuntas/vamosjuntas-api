import HttpStatus from 'http-status-codes';
import sinon from 'sinon';
import Report from '../../../src/models/report';
import controller from '../../../src/controllers/reports';

describe('controllers:reports', () => {
  function createReqParams() {
    return {
      geolocation: [-30.057389, -51.174544],
      category: 'lorem',
      date: '07/02/2016'
    };
  }

  function createReportDocument() {
    return {
      _id: '123lorem',
      __v: 0,
      geolocation: [-30.057389, -51.174544],
      category: 'lorem',
      date: '07/02/2016',
      createdAt: '2016-07-09T00:28:43.306Z',
      updatedAt: '2016-07-09T00:28:43.306Z'
    };
  }

  describe('.create', () => {
    context('valid', () => {
      let req, res, report, saveAsyncPromise;

      beforeEach(() => {
        report = createReportDocument();

        saveAsyncPromise = Promise.resolve(report);
        sinon.stub(Report.prototype, 'saveAsync').returns(saveAsyncPromise);

        req = {
          params: createReqParams()
        }

        res = {
          send: sinon.spy()
        }
      });

      afterEach(() => {
        Report.prototype.saveAsync.restore();
      });

      it('should call res.send with 201 and report args', () => {
        controller.create(req, res);
        return expect(saveAsyncPromise).to.be.fulfilled.then(() => {
          expect(res.send).to.be.calledWith(HttpStatus.CREATED, report);
        });
      });
    });

    context('invalid', () => {
      let req, next, mongooseError, saveAsyncPromise;

      beforeEach(() => {
        mongooseError = new Error('validation error');
        saveAsyncPromise = Promise.reject(mongooseError);
        sinon.stub(Report.prototype, 'saveAsync').returns(saveAsyncPromise);

        let params = createReqParams();
        delete params.geolocation;
        req = {
          params: params
        };

        next = sinon.spy();
      });

      afterEach(() => {
        Report.prototype.saveAsync.restore();
      });

      it('should call next with error data if mongoose validation fails', () => {
        controller.create(req, {}, next);
        return expect(saveAsyncPromise).to.be.rejected.then(() => {
          expect(next).to.be.calledWith(mongooseError);
        });
      });
    });
  });

  describe('.show', () => {
    context('found', () => {
      let req, res, findByGeolocationPromise;

      beforeEach(() => {
        sinon.spy(Report, 'findByGeolocation');
      });

      it('should call Report.findByGeolocation', () => {
        expect(Report.findByGeolocation).to.be.called;
      });
    });

    context('not found', () => {
      let req, res, findByGeolocationPromise;
    });
  });
});
