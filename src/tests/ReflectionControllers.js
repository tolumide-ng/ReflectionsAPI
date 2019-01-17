import chai from 'chai';
import chaiHttp from 'chai-http';
import reflectionControllers from '../controllers/Reflection';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
const assert = require('chai').assert;

const reflectionDetails = {
  success: 'Yes',
  lowPoint: 2,
  takeAway: 'Work for it',
};

describe('Handle all request to the reflection api controller', () => {
  it('should respond with a 404 status code, if there are no reflections', (done) => {
    chai.request('http://localhost:3000')
      .get('/api/v1/reflections')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });

  // Search for a specific reflection(specified reflection does not exist)
  it('should respond with a 404 status code if specified id is not found', (done) => {
    chai.request('http://localhost:3000')
      .get('/api/v1/reflections/:id')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should respond with a 201 request and return an array', (done) => {
    chai.request('http://localhost:3000')
      .post('/api/v1/reflections')
      .set('Accept', 'application/json')
      .send({ success: 'Positive', lowPoint: '4', takeAway: 'lessons' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        done();
      });
  });

  // Update a non-existing reflection
  it('should respond with a 404 Not found status code', (done) => {
    chai.request('http://localhost:3000')
      .put('/api/v1/reflections/29589p46092')
      .set('Accept', 'application/json')
      .send({ success: 'Positive', lowPoint: '4', takeAway: 'lessons' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        done();
      });
  });

  // Test case for a delete request to a non-existing reflection ID
  it('should respond with a 404 Not found status code if ID specified for delete request is not present', (done) => {
    chai.request('http://localhost:3000')
      .delete('/api/v1/reflections/29589p46092')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should respond with a 400 request and return json method', (done) => {
    chai.request('http://localhost:3000')
      .post('/api/v1/reflections')
      .set('Accept', 'application/json')
      .send({ lowPoint: '6' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        done();
      });
  });


  it('should respond with a 200 status code if there are reflections', (done) => {
    chai.request('http://localhost:3000')
      .post('/api/v1/reflections')
      .set('Accept', 'application/json')
      .send({ success: 'Positive', lowPoint: '4', takeAway: 'lessons' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        const id = res.body.data[0].id;


        chai.request('http://localhost:3000')
          .get('/api/v1/reflections')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);


            /* it('should respond with a 200 status code if specified id is found', (done) => { */
            // although checking for the existence of the specified id, it was placed here
            // to obtain the id number of the intitailly created reflection stored in the const (id)
            chai.request('http://localhost:3000')
              .get(`/api/v1/reflections/${id}`)
              .end((err, res) => {
                expect(res).to.have.status(200);

                // Handle a successful PUT (update) request
                chai.request('http://localhost:3000')
                  .put(`/api/v1/reflections/${id}`)
                  .set('Accept', 'application/json')
                  .send({ success: 'Ramos', lowPoint: '6', takeAway: 'Ovie' })
                  .end((err, res) => { /*
                            expect(res).to.have.property('data'); */
                    expect(res).to.have.status(200);
                    res.should.be.an('Object');

                    // test case for a successful delete request i.e. an existing id
                    chai.request('http://localhost:3000')
                      .delete(`/api/v1/reflections/${id}`)
                      .set('Accept', 'application/json')
                      .end((err, res) => {
                        expect(res).to.have.status(204);
                        done();
                      });
                  });
              });
            /* }) */
          });
      });
  });
});
