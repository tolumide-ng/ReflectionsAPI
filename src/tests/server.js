import server from '../../server';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

/* Test for a request to the root of project */

describe('/GET request to the localhost', () => {
  it('should respond with 200 status code and json body', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
