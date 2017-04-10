const chai = require('chai');
const rockfall = require('../src/index');

const expect = chai.expect;

describe('promise-rockfall', () => {
  const promiseFactories = Array(100).fill(Math.random()).map(n => () => (Promise.resolve(n)));
  const batchSize = 10;
  expect(rockfall).to.be.a.function;
  it('should return a promise', () => {
    expect(rockfall([])).to.be.a('promise');
    const myBatchifiedPromise = rockfall(promiseFactories, batchSize);
    expect(myBatchifiedPromise).to.be.a('promise');
    return myBatchifiedPromise.then((rs) => {
      expect(rs).to.be.an.array;
      expect(rs).to.have.length.within(1, batchSize);
    });
  });
  describe('batch()', () => {
    expect(rockfall).to.have.property('batch');
    it('should return a function which returns an array of promises', () => {
      const f = rockfall.batch(promiseFactories);
      expect(f).to.be.a.function;
      expect(f()).to.be.a('promise');
    });
  });
});
