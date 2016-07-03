const ENV_VARS = process.env;
const ENV = ENV_VARS.NODE_ENV || 'development';

export default {
  env: ENV,
  mongoose: {
    db: ENV_VARS.VAMOSJUNTAS_DATABASE_URL || 'mongodb://127.0.0.1/vamosjuntas'
  }
}

