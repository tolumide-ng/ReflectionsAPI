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

    it('should respond with a 404 status code, if there are no reflections', (done) => {
        chai.request('http://localhost:3000')
        .get('/api/v1/reflections')
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            res.body.should.have.property('message');
            done();
        })
    })

    it('should respond with a 404 status code if specified id is not found', (done) => {
        chai.request('http://localhost:3000')
        .get('/api/v1/reflections/:id')
        .end((err, res) => {
            expect(res).to.have.status(404);
            done();
        })
    })

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

    

    it('should respond with a 200 status code if there are reflections', (done) => {
        chai.request('http://localhost:3000')
        .post('/api/v1/reflections')
        .set('Accept', 'application/json')
        .send({success: 'Positive', lowPoint: '4', takeAway: 'lessons'})
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            const id = res.body.data[0].id;
            console.log(id);
            console.log(res.body.data);
            
            
            chai.request('http://localhost:3000')
            .get('/api/v1/reflections')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                
                
                /* it('should respond with a 200 status code if specified id is found', (done) => { */
                    //although checking for the existence of the specified id, it was placed here
                    //to obtain the id number of the intitailly created reflection stored in the const (id)
                    chai.request('http://localhost:3000')
                    .get(`/api/v1/reflections/${id}`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    })
                /* }) */
            })
        })
    })


    

    
})