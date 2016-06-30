import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'supertest';

chai.use(chaiAsPromised);

global.expect = chai.expect;
global.request = request;

