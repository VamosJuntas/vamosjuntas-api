import sinon from 'sinon'
import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import controller from '../../../src/controllers/reports'
import Report from '../../../src/models/report'

chai.use(chaiAsPromised)
chai.should()

describe('Reports Controller', function() {
  it('should create a new Report and return success', function(done) {
    var mock = {
      next: sinon.spy(),
      response: { send: sinon.spy() },
      request: {
        params: {
          address: "Avenida Ipiranga, 2265",
          geolocation: {
            latitude: 10,
            longitude: 20
          },
          category: "Roubo",
          date: "10/10/2016"
        }
      }
    };
    var success = Promise.resolve();
    sinon.stub(Report, 'create').returns(success)
    controller.create(mock.request, mock.response, mock.next);

    success.should.be.fulfilled.then(function () {
        assert(mock.response.send.calledWith(201), 'response.send was never called')
        assert(mock.next.calledOnce, 'next was never called')
        Report.create.restore()
    }).should.notify(done)
  })

  it('should return failure when can not create a new report', function(done) {
    var mock = {
      next: sinon.spy(),
      response: { send: sinon.spy() },
      request: {
        params: {
          geolocation: {
            latitude: 10,
            longitude: 20
          },
          category: "Roubo",
          date: "10/10/2016"
        }
      }
    };
    var failure = Promise.reject();
    sinon.stub(Report, 'create').returns(failure)
    controller.create(mock.request, mock.response, mock.next);

    failure.should.be.rejected.then(function () {
        assert(mock.response.send.calledWith(500), 'response.send was never called')
        assert(mock.next.calledOnce, 'next was never called')
        Report.create.restore()
    }).should.notify(done)
  })

  describe('.show', () => {
    context('found', () => {
      let req, res, nextSpy, findByGeolocationPromise;

      beforeEach(() => {
        sinon.spy(Report, 'findByGeolocation');

        req = {
          params: {
            geolocation: '-30.057389,-51.174544'
          }
        };

        nextSpy = sinon.spy();
      });

      afterEach(() => {
        Report.findByGeolocation.restore();
      });

      it('should call Report.findByGeolocation', () => {
        controller.show(req, {}, nextSpy);
        expect(Report.findByGeolocation).to.be.called;
      });
    });
  });
});
