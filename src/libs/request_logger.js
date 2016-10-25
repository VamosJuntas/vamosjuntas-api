import bunyan from 'bunyan';
import restify from 'restify';

export default bunyan.createLogger({
  name: 'request-logger',
  serializers: restify.bunyan.serializers
});
