import chai from 'chai';
import chaiHttp from 'chai-http';
import reflectionControllers from './../controllers/Reflection';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
const assert = require('chai').assert;

const reflectionDetails = {
    success: 'Yes',
    lowPoint: 2,
    takeAway: 'Work for it'
};

describe('Handle all request to the reflection api controller', ()=> {
    it('should respond with a 201 request and return an array', (done) => {
        chai.request('http://localhost:3000')
            .post('/api/v1/reflections')
            .set('Accept', 'application/json')
            .send({success: 'Positive', lowPoint: '4', takeAway: 'lessons'})
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                done();
            })
    })

    it('should respond with a 400 request and return json method', (done) => {
        chai.request('http://localhost:3000')
            .post('/api/v1/reflections')
            .set('Accept', 'application/json')
            .send({lowPoint: '6'})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                done();
            })
    })
})