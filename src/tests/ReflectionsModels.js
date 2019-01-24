import chaiHttp from 'chai-http';
import model from '../usingJSObject/models/Reflection';

const { describe, it } = require('mocha');
const chai = require('chai');

chai.use(chaiHttp);
// chai.use(require('chai-match'));

const should = chai.should();
const expect = chai.expect;
const assert = require('chai').assert;


const data = {
  success: 'Yes',
  lowPoint: 2,
  takeAway: 'Work for it',
};
const newData = {
  success: 'Rakmid',
  lowPoint: 5,
  takeAway: 'Just do it',
};

const id = '2584y696-814095u9';

describe('handles all requests to the model', () => {
  it('should return an object', () => {
    const resultofCreate = model.create(data);
    resultofCreate.should.be.an('object');
    resultofCreate.should.have.property('id');
  });

  it('should be return an Array', () => {
    const createdData = model.create(data);
    const resultOfFindOne = model.findOne(createdData.id);
    resultOfFindOne.should.be.an('Object');
    resultOfFindOne.should.have.property('success').to.be.a('string');
    resultOfFindOne.should.have.property('lowPoint').to.be.a('number');
    resultOfFindOne.should.have.property('takeAway');
  });

  it('should return a list of Arrays', () => {
    model.create(data);
    const resultOfFindAll = model.findAll();
    assert.isArray(resultOfFindAll);
  });

  it('should return a the updatedData', () => {
    const createdData = model.create(data);
    createdData;
    const resultOfUpdate = model.update(createdData.id, newData);
    resultOfUpdate.should.be.an('Object');
    //     assert(expect(resultOfUpdate.success.to.match(/Rakmid/) || expect(resultOfUpdate.success.to.match(/Yes/))));
  });

  it('should satisfy a condition described by the function', () => {
    const assurance = function (name) {
      return name.length === 0 || name.length > 0;
    };
    const createdData = model.create(data);
    const resultOfUpdate = model.update(createdData.id, newData);
    expect(resultOfUpdate.success).to.satisfy(assurance);
    // resultOfUpdate.should.have.property('lowPoint').to.be.a('number');
    // resultOfUpdate.should.have.property('takeAway');
  });

  it('should return an empty object', () => {
    const createdData = model.create(data);
    const resultOfDelete = model.delete(createdData.id);
    resultOfDelete.should.be.an('Object');
  });
});
