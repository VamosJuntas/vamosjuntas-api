import merge from 'lodash/merge';

const ENV = process.env.NODE_ENV || 'development';

export default merge(require('./default.json'), require(`./${ENV}.json`));

