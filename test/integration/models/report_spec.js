import Report from '../../../src/models/report';

describe('models:report', () => {
  before((done) => {
    const REPORT_FAR_AWAY = {
      geolocation: [-30.0613321,-51.163035],
      category: 'Hospital',
      date: '07/07/2016'
    };

    const REPORTS = [
      {
        geolocation: [-30.0599919,-51.1736128],
        category: 'Biblioteca',
        date: '07/07/2016'
      },
      {
        geolocation: [-30.0598603,-51.1743538],
        category: 'Marista',
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
    it('should find reports near of 1000m by default', () => {
      return expect(Report.findByGeolocation([-30.0598649,-51.1721652]))
        .to
        .eventually
        .have
        .lengthOf(2);
    });
  });
});
