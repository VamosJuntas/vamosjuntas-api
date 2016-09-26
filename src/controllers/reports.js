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

function create(request, response, next) {
  var params = {
    address: request.params.address,
    geolocation: [request.params.geolocation.latitude, request.params.geolocation.longitude],
    category: request.params.category,
    date: request.params.date
  }
  var report = Report.create(params).then(function() {
    response.send(201)
  }).catch(function() {
    response.send(500)
  });
  return next()
}

export default { show, create };
