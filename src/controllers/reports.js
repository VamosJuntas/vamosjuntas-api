import HttpStatus from 'http-status-codes';
import Report from '../models/report';

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

export default { create };

