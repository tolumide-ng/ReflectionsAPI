import chai from 'chai';
import chaiHttp from 'chai-http';
import model from './../models/Reflection';

chai.use(chaiHttp);

chai.should();
const expect = chai.expect;

const data = {
    success: 'Yes',
    lowPoint: 'Sleep',
    takeAway: 'Work for it'
};

const id = '2584y696-814095u9';

describe('handles all requests to the model', ()=> {
    it('should return an object', () => {
        const resultofCreate = model.create(data);
        resultofCreate.should.be.an('object');
        resultofCreate.should.have.property('createdDate');
    })

    it('should be return an Array', ()=> {
        const createdData = model.create(data);
        const resultOfFindOne = model.findOne(createdData.id);
        resultOfFindOne.should.be.an('Array');
        resultOfFindOne.should.have('success');
    })

    it('should return a list of Arrays', () => {
        model.create(data);
        const resultOfFindAll = model.findAll();
        resultOfFindAll.should.be.an('Array');
    })

    it('should return a the updatedData', () => {
        const createdData = model.create(data);
        const resultOfUpdate = model.update(createdData, newData);
        resultOfUpdate.should.be.an('Array');
    })

    it('should return an empty object', () => {
        const createdData = model.create(data);
        const resultOfDelete = this.delete(createdData.id);
        resultOfDelete.should.be.an('Object');
    })
})