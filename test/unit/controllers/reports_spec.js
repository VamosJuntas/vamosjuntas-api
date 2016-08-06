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
    }).should.notify(done)
  })
})
