import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { describe, it } = require('mocha');
//const should = chai.should();
const expect = chai.expect;

//Test for a request to the root of project

describe('/GET request to the localhost', () => {
  it('should respond with 200 status code and have property called message', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.have.property('message');
        done();
      });
  });
});
