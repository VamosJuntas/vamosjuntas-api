import jsonSchema from 'jsonschema';

export default function(schema) {
  return function(req, res, next) {
    if (jsonSchema.validate(req.params, schema).valid) {
      return next();
    }

    return res.send(400, {
      error: {
        message: 'Bad Request'
      }
    });
  }
}

