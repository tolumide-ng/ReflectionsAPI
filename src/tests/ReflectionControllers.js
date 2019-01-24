import dotenv from 'dotenv';
import chai from 'chai';
import 'babel-polyfill';
import chaiHttp from 'chai-http';
import server from '../server';


chai.use(chaiHttp);

const { describe, it } = require('mocha');


const should = chai.should();
const expect = chai.expect;
const assert = require('chai').assert;

/* if(process.env.TYPE === 'db'){  */
const postDetails = {
  success: 'Not a Tale',
  low_point: '45',
  take_away: 'Sleep is for the lazy',
};

describe('Handle all request to the psql DB reflection api controller', () => {
  it('should respond with a 201 statuscode if the request to post a reflection is successful', (done) => {
    chai.request('http://localhost:3000')
      .post('/api/v1/reflections')
      .send(postDetails)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond with a 400 Bad request status code if any of the paramateres is not filled', (done) => {
    chai.request('http://localhost:3000')
      .post('/api/v1/reflections')
      .send({ success: 'Started from the bottom', low_point: 'Broken' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        done();
      });
  });


  it('should return a 200 status code if there are reflections', (done) => {
    // get all reflections in the REFLECTIONS TABLE
    chai.request('http://localhost:3000')
      .get('/api/v1/reflections')
      .end((err, res) => {
        const id = res.body.data[0].id;
        expect(res).to.have.status(200);
        expect(res).to.be.json;


        // get a specific reflection with the ID
        chai.request('http://localhost:3000')
          .get(`/api/v1/reflections/${id}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            res.body.should.have.property('data');


            // get a none existing reflection
            chai.request('http://localhost:3000')
              .get('/api/v1/reflections/7285ykugwtu')
              .end((err, res) => {
                expect(res).to.have.status(400);


                // Update a specific reflection with the ID
                chai.request('http://localhost:3000')
                  .put(`/api/v1/reflections/${id}`)
                  .send({ success: 'Made it into Tech', low_point: 'Unbroken however' })
                  .end((err, res) => {
                    expect(res).to.have.status(200);
                    res.body.should.have.property('data');

                    // Update a non-existing reflection ID
                    chai.request('http://localhost:3000')
                      .put('/api/v1/reflections/9852046-9-8375')
                      .send({ success: 'Made it into Tech', low_point: 'Unbroken however' })
                      .end((err, res) => {
                        expect(res).to.have.status(400);


                        done();
                      });
                  });
                /*
});
}); */
                /* it('should return a 404 status code if there are no reflections', (done) => {
                    chai.request('http://localhost:3000')
                      .delete('/api/v1/reflections/deleteall')
                      .end((err, res) => {
                        expect(res).to.have.status(400);
                        expect(res).to.be.json;


                    chai.request('http://localhost:3000')
                      .get('/api/v1/reflections')
                      .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res).to.be.json;
                        res.body.should.have.property('error');
                        done();
                      })
                  })
                }) */
              });
          });
      });
  });

  describe('remove a specific reflection', () => {
    it('should return a 200 status code if the reflection was removed successfully', (done) => {
      chai.request('http://localhost:3000')
        .get('/api/v1/reflections')
        .end((err, res) => {
          const id = res.body.data[0].id;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          console.log(id);

          // delete an existing reflection
          chai.request('http://localhost:3000')
            .delete(`/api/v1/reflections/${id}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.be.json;


              // delete a non-existing reflection
              chai.request('http://localhost:3000')
                .delete('/api/v1/reflections/1875206-bnvbbutb')
                .end((err, res) => {
                  expect(res).to.have.status(400);
                  expect(res).to.be.json;

                  done();
                });
            });
        });
    });
  });
});
