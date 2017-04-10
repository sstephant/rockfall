const waterfall = require('promise-waterfall');

/**
 * @param {Function<Promise<*>>[]} promiseFactories
 * @returns {Function<Promise<*>>}
 */
const batch = promiseFactories => (
  () => (Promise.all(promiseFactories.map(pf => (pf()))))
);
/**
 *
 * @param {Function<Promise<*>>[]} promiseFactories an array of functions returning a promise
 * @param {Number} batchSize integer expected to be >= 1
 * @returns {*}
 */
const rockfall = (promiseFactories = [], batchSize = 1) => {
  const size = parseInt(batchSize, 10);
  if (!Array.isArray(promiseFactories) || promiseFactories.length === 0) {
    return Promise.resolve([]);
  }
  if (isNaN(size) || size <= 1) {
    return waterfall(promiseFactories);
  }
  if (size === promiseFactories.length) {
    return batch(promiseFactories);
  }
  const batches = [];
  let currentBatch = [];
  promiseFactories.forEach((pf) => {
    if (currentBatch.length === size) {
      batches.push(batch(currentBatch));
      currentBatch = [];
    }
    currentBatch.push(pf);
  });
  batches.push(batch(currentBatch));
  return waterfall(batches);
};

/**
 *
 */
module.exports = rockfall;