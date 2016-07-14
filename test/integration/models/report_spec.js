import Report from '../../../src/models/report';

describe('models:report', () => {
  before((done) => {
    const REPORT_FAR_AWAY = {
      geolocation: [-30.032154, -51.237322],
      category: 'lorem3',
      date: '07/07/2016'
    };

    const REPORTS = [
      {
        geolocation: [-30.059595, -51.171933],
        category: 'lorem1',
        date: '07/07/2016'
      },
      {
        geolocation: [-30.059595, -51.171945],
        category: 'lorem2',
        date: '07/07/2016'
      },
      REPORT_FAR_AWAY
    ];

    Report.createAsync(REPORTS)
      .then(() => {
        done();
      });
  });

  after((done) => {
    Report.removeAsync({})
      .then(() => {
        done();
      });
  });

  describe('.findByGeolocation', () => {
    it('should find reports near of 10m by default', () => {
      return expect(Report.findByGeolocation([-30.059595, -51.171933]))
        .to
        .eventually
        .have
        .lengthOf(2);
    });
  });
});
