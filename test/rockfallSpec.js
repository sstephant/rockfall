const chai = require('chai');
const debug = require('debug');
const rockfall = require('../src/index');

const trace = debug('test:rockfall');
const expect = chai.expect;

describe('promise-rockfall', () => {
  const promiseFactories = Array(100).fill(Math.random()).map(n => () => (Promise.resolve(n)));
  const batchSize = 10;
  trace(`${promiseFactories.length} promises to be resolved in chunk of ${batchSize}`);
  expect(rockfall).to.be.a.function;
  it('should return a promise', () => {
    expect(rockfall([])).to.be.a('promise');
    const myBatchifiedPromises = rockfall(promiseFactories, batchSize);
    return myBatchifiedPromises.then((rs) => {
      trace(rs.length);
      expect(rs).to.be.an.array;
      expect(rs).to.have.length.within(1, batchSize);
    });
  });
  describe('batch()', () => {
    expect(rockfall).to.have.property('batch');
    it('should return a function which returns a promise', () => {
      const f = rockfall.batch(promiseFactories);
      expect(f).to.be.a.function;
      expect(f()).to.be.a('promise');
    });
  });
});
