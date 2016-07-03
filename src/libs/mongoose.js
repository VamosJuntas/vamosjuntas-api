import Promise from 'bluebird';
import mongoose from 'mongoose';

export default Promise.promisifyAll(mongoose);
