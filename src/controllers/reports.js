import HttpStatus from 'http-status-codes';
import Report from '../models/report';
import geolocationParser from '../libs/parse_geolocation';

function show(req, res, next) {
  const POINT = geolocationParser(req.params.geolocation);
  Report.findByGeolocation(POINT)
    .then((reports) => {
      return res.send(HttpStatus.OK, reports);
    })
    .catch((err) => {
      return next(err);
    });
}

function create(req, res, next) {
  let report = new Report(req.body);
  report.saveAsync()
    .then((document) => {
      return res.send(HttpStatus.CREATED, document);
    })
    .catch((err) => {
      return next(err);
    });
}

export default { show, create };

