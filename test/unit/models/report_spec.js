import sinon from 'sinon';
import Report from '../../../src/models/report';

describe('models:report', () => {
  describe('schema', () => {
    it('should have geolocation property', () => {
      expect(Report.schema.paths).to.have.property('geolocation');
    });

    it('should have category property', () => {
      expect(Report.schema.paths).to.have.property('category');
    });

    it('should have date property', () => {
      expect(Report.schema.paths).to.have.property('date');
    });

    it('should set timestamps option equals to true', () => {
      expect(Report.schema.options.timestamps).to.be.true;
    });
  });

  describe('validations', () => {
    it('should be invalid if geolocation is empty', (done) => {
      let report = new Report({
        category: 'lorem',
        date: '07/02/2016'
      });
      expect(report.validateAsync()).to.be.rejected.and.notify(done);
    });

    it('should be invalid if category is empty', (done) => {
      let report = new Report({
        geolocation: [-30.057389, -51.174544],
        date: '07/02/2016'
      });
      expect(report.validateAsync()).to.be.rejected.and.notify(done);
    });

    it('should be invalid if latitude is bigger than 90', (done) => {
      let report = new Report({
        geolocation: [91, -51.174544],
        category: 'lorem',
        date: '07/02/2016'
      });
      expect(report.validateAsync()).to.be.rejected.and.notify(done);
    });

    it('should be invalid if latitude is lesser than -90', (done) => {
      let report = new Report({
        geolocation: [-91, -51.174544],
        category: 'lorem',
        date: '07/02/2016'
      });
      expect(report.validateAsync()).to.be.rejected.and.notify(done);
    });

    it('should be invalid if longitude is bigger than 180', (done) => {
      let report = new Report({
        geolocation: [-30.057389, 181],
        category: 'lorem',
        date: '07/02/2016'
      });
      expect(report.validateAsync()).to.be.rejected.and.notify(done);
    });

    it('should be invalid if longitude is lesser than -180', (done) => {
      let report = new Report({
        geolocation: [-30.057389, -181],
        category: 'lorem',
        date: '07/02/2016'
      });
      expect(report.validateAsync()).to.be.rejected.and.notify(done);
    });
  });

  describe('.findByGeolocation', () => {
    beforeEach(() => {
      sinon.spy(Report, 'find');
    });

    afterEach(() => {
      Report.find.restore();
    });

    it('should set $near query type', () => {
      Report.findByGeolocation([90, 180]);
      expect(Report.find).to.be.calledWith({
        geolocation: {
          $near: [90, 180],
          $maxDistance: 10
        }
      });
    });

    it('should set $maxDistance query type if passed', () => {
      Report.findByGeolocation([90, 180], 300);
      expect(Report.find).to.be.calledWith({
        geolocation: {
          $near: [90, 180],
          $maxDistance: 300
        }
      });
    });
  });
});
