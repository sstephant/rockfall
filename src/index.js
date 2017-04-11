const waterfall = require('promise-waterfall');
const debug = require('debug');

const trace = debug('rockfall');

const identity = rs => (Promise.resolve(rs));
// TODO: Add timings ?
const tracer = (n, then) => (rs) => {
  trace(`batch ${n} is resolved`);
  return then(rs);
};

/**
 * @param {Function<Promise<*>>[]} promiseFactories
 * @param {Function<Promise<*>>} batchThen
 * @returns {Function<Promise<*>>}
 */
const batch = (promiseFactories, batchThen = identity) => (
  () => (Promise.all(promiseFactories.map(pf => (pf()))).then(batchThen))
);

/**
 *
 * @param {Function<Promise<*>>[]} promiseFactories an array of functions returning a promise
 * @param {Number} batchSize integer expected to be >= 1
 * @param {Function} batchThen
 * @returns {Promise}
 */
const rockfall = (promiseFactories = [], batchSize = 10, batchThen = identity) => {
  let size = parseInt(batchSize, 10);
  if (!Array.isArray(promiseFactories) || promiseFactories.length === 0) {
    return Promise.resolve([]);
  }
  if (isNaN(size) || size < 1) {
    size = 1;
  }
  const batches = [];
  let currentBatch = [];
  promiseFactories.forEach((pf) => {
    if (currentBatch.length === size) {
      batches.push(batch(currentBatch, tracer(batches.length, batchThen)));
      currentBatch = [];
    }
    currentBatch.push(pf);
  });
  batches.push(batch(currentBatch, tracer(batches.length, batchThen)));
  return waterfall(batches);
};

module.exports = rockfall;
module.exports.batch = batch;
