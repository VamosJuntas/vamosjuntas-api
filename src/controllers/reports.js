import Report from './../models/report';

function create(request, response, next) {
  var params = {
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

export default { create };
